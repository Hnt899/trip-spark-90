import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import type { PageContentDocument, PageKey } from "@/types/pageContent";
import {
  getPageDefaults,
  getSectionFields,
  isSectionVisible,
  mergePageContent,
} from "@/lib/pageContentMerge";

type PageCmsContextValue = {
  pageKey: PageKey;
  content: PageContentDocument;
  /** When true, UI may show edit chrome (admin editor). */
  editMode: boolean;
  selectedSectionId: string | null;
  setSelectedSectionId: (id: string | null) => void;
  patchSectionFields: (sectionId: string, fields: Record<string, unknown>) => void;
  setSectionVisible: (sectionId: string, visible: boolean) => void;
  moveSection: (sectionId: string, direction: "up" | "down") => void;
  replaceContent: (doc: PageContentDocument) => void;
};

const PageCmsContext = createContext<PageCmsContextValue | null>(null);

export function PageCmsProvider({
  pageKey,
  content,
  editMode = false,
  selectedSectionId = null,
  setSelectedSectionId,
  onChange,
  children,
}: {
  pageKey: PageKey;
  content: PageContentDocument;
  editMode?: boolean;
  selectedSectionId?: string | null;
  setSelectedSectionId?: (id: string | null) => void;
  onChange?: (doc: PageContentDocument) => void;
  children: ReactNode;
}) {
  const value = useMemo<PageCmsContextValue>(
    () => ({
      pageKey,
      content,
      editMode,
      selectedSectionId,
      setSelectedSectionId: setSelectedSectionId || (() => {}),
      patchSectionFields: (sectionId, fields) => {
        if (!onChange) return;
        const prev = content.sections[sectionId] || { visible: true, fields: {} };
        onChange({
          ...content,
          sections: {
            ...content.sections,
            [sectionId]: {
              ...prev,
              fields: { ...prev.fields, ...fields },
            },
          },
        });
      },
      setSectionVisible: (sectionId, visible) => {
        if (!onChange) return;
        const prev = content.sections[sectionId] || { visible: true, fields: {} };
        onChange({
          ...content,
          sections: {
            ...content.sections,
            [sectionId]: { ...prev, visible },
          },
        });
      },
      moveSection: (sectionId, direction) => {
        if (!onChange) return;
        const order = [...content.sectionOrder];
        const idx = order.indexOf(sectionId);
        if (idx < 0) return;
        const swap = direction === "up" ? idx - 1 : idx + 1;
        if (swap < 0 || swap >= order.length) return;
        [order[idx], order[swap]] = [order[swap], order[idx]];
        onChange({ ...content, sectionOrder: order });
      },
      replaceContent: (doc) => onChange?.(doc),
    }),
    [pageKey, content, editMode, selectedSectionId, setSelectedSectionId, onChange]
  );

  return (
    <PageCmsContext.Provider value={value}>{children}</PageCmsContext.Provider>
  );
}

export function usePageCms(): PageCmsContextValue | null {
  return useContext(PageCmsContext);
}

export function usePageSectionFields<T extends Record<string, unknown>>(
  sectionId: string,
  fallback?: T
): T {
  const ctx = usePageCms();
  if (!ctx) {
    return (fallback || {}) as T;
  }
  return getSectionFields<T>(ctx.content, sectionId);
}

export function useSectionVisible(sectionId: string): boolean {
  const ctx = usePageCms();
  if (!ctx) return true;
  return isSectionVisible(ctx.content, sectionId);
}

export function resolvePublishedContent(
  pageKey: PageKey,
  override: Partial<PageContentDocument> | null | undefined
): PageContentDocument {
  return mergePageContent(getPageDefaults(pageKey), override);
}
