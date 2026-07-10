import type { PageContentDocument, PageKey, PageSectionMeta } from "@/types/pageContent";
import { homePageDefaults } from "@/content/pages/home.defaults";
import { routesPageDefaults } from "@/content/pages/routes.defaults";

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function deepMergeFields(
  base: Record<string, unknown>,
  override: Record<string, unknown> | undefined
): Record<string, unknown> {
  if (!override) return { ...base };
  const out: Record<string, unknown> = { ...base };
  for (const [k, v] of Object.entries(override)) {
    if (v === undefined) continue;
    const baseVal = out[k];
    if (Array.isArray(v)) {
      out[k] = v;
    } else if (isPlainObject(v) && isPlainObject(baseVal)) {
      out[k] = deepMergeFields(baseVal, v);
    } else {
      out[k] = v;
    }
  }
  return out;
}

export function getPageDefaults(pageKey: PageKey): PageContentDocument {
  return pageKey === "home" ? homePageDefaults : routesPageDefaults;
}

/**
 * Merge code defaults with DB overrides.
 * Empty override object → pure defaults.
 */
export function mergePageContent(
  defaults: PageContentDocument,
  override: Partial<PageContentDocument> | Record<string, unknown> | null | undefined
): PageContentDocument {
  const o = (override && isPlainObject(override) ? override : {}) as Partial<PageContentDocument>;

  const sectionOrder =
    Array.isArray(o.sectionOrder) && o.sectionOrder.length > 0
      ? o.sectionOrder.filter((id): id is string => typeof id === "string")
      : [...defaults.sectionOrder];

  const sections: Record<string, PageSectionMeta> = {};
  const allIds = new Set([
    ...Object.keys(defaults.sections),
    ...Object.keys(o.sections || {}),
    ...sectionOrder,
  ]);

  for (const id of allIds) {
    const def = defaults.sections[id] || { visible: true, fields: {} };
    const ov = o.sections?.[id];
    sections[id] = {
      visible: typeof ov?.visible === "boolean" ? ov.visible : def.visible,
      fields: deepMergeFields(
        (def.fields || {}) as Record<string, unknown>,
        ov?.fields as Record<string, unknown> | undefined
      ),
    };
  }

  return {
    version: typeof o.version === "number" ? o.version : defaults.version,
    sectionOrder,
    sections,
  };
}

export function getSectionFields<T extends Record<string, unknown>>(
  doc: PageContentDocument,
  sectionId: string
): T {
  return (doc.sections[sectionId]?.fields || {}) as T;
}

export function isSectionVisible(doc: PageContentDocument, sectionId: string): boolean {
  return doc.sections[sectionId]?.visible !== false;
}

export function mediaOrFallback(url: string | undefined | null, fallback: string): string {
  if (typeof url === "string" && url.trim()) return url.trim();
  return fallback;
}

function fieldsEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
}

/**
 * Store only overrides vs code defaults so deploys can update the “original”.
 */
export function toPageOverrides(
  defaults: PageContentDocument,
  current: PageContentDocument
): Partial<PageContentDocument> {
  const out: Partial<PageContentDocument> = { version: current.version || defaults.version };

  const orderChanged =
    current.sectionOrder.length !== defaults.sectionOrder.length ||
    current.sectionOrder.some((id, i) => id !== defaults.sectionOrder[i]);
  if (orderChanged) {
    out.sectionOrder = [...current.sectionOrder];
  }

  const sections: Record<string, PageSectionMeta> = {};
  const ids = new Set([
    ...Object.keys(defaults.sections),
    ...Object.keys(current.sections),
  ]);

  for (const id of ids) {
    const def = defaults.sections[id] || { visible: true, fields: {} };
    const cur = current.sections[id] || { visible: true, fields: {} };
    const patch: Partial<PageSectionMeta> = {};

    if (cur.visible !== def.visible) {
      patch.visible = cur.visible;
    }

    const fieldPatch: Record<string, unknown> = {};
    const fieldKeys = new Set([
      ...Object.keys(def.fields || {}),
      ...Object.keys(cur.fields || {}),
    ]);
    for (const key of fieldKeys) {
      if (!fieldsEqual(cur.fields?.[key], def.fields?.[key])) {
        fieldPatch[key] = cur.fields?.[key];
      }
    }
    if (Object.keys(fieldPatch).length > 0) {
      patch.fields = fieldPatch;
    }

    if (Object.keys(patch).length > 0) {
      const sparse: PageSectionMeta = {
        visible: typeof patch.visible === "boolean" ? patch.visible : def.visible,
        fields: patch.fields || {},
      };
      // If visibility unchanged, still OK — merge prefers override boolean only when set;
      // keep sparse honest for reset/diff.
      if (typeof patch.visible !== "boolean") {
        sparse.visible = def.visible;
      }
      sections[id] = sparse;
    }
  }

  if (Object.keys(sections).length > 0) {
    out.sections = sections;
  }

  return out;
}
