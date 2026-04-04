import { Fragment, type ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Info,
  FileText,
  Shield,
  Luggage,
  CalendarDays,
  AlertTriangle,
  CheckCircle,
  Sparkles,
  AlertOctagon,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import {
  applyBrandToText,
  BRAND_DISPLAY_NAME,
  expandParagraphBreaks,
  splitLongParagraph,
  classifyParagraph,
  calloutClass,
  rewriteTutuLink,
  isHomePageLink,
  isTutuAnchorLink,
} from "@/lib/flightArticleText";

export type ArticleSection = { title: string | null; body: string };

export type ArticleBundle = {
  title?: string;
  sections?: ArticleSection[];
  error?: string;
};

const BRAND_SPLIT = new RegExp(`(${BRAND_DISPLAY_NAME.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "g");

function brandHighlight(text: string, keyPrefix: string): ReactNode[] {
  const parts = text.split(BRAND_SPLIT);
  return parts.map((p, i) =>
    p === BRAND_DISPLAY_NAME ? (
      <span key={`${keyPrefix}-b-${i}`} className="font-bold text-primary">
        {BRAND_DISPLAY_NAME}
      </span>
    ) : (
      <Fragment key={`${keyPrefix}-t-${i}`}>{p}</Fragment>
    ),
  );
}

function parseLinksWithBranding(segment: string, keyBase: number): ReactNode[] {
  const branded = applyBrandToText(segment);
  const parts: ReactNode[] = [];
  const re = /\[([^\]]*)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = keyBase;
  while ((m = re.exec(branded)) !== null) {
    if (m.index > last) {
      parts.push(
        <Fragment key={`t-${key++}`}>{brandHighlight(branded.slice(last, m.index), `k${key}`)}</Fragment>,
      );
    }
    const rawLabel = m[1].trim() || m[2];
    const rawHref = m[2].trim();
    const href = rewriteTutuLink(rawHref);
    const label = applyBrandToText(rawLabel);
    const isJs = href.startsWith("javascript:");
    if (!isJs) {
      const linkBody =
        label.includes(BRAND_DISPLAY_NAME) ? brandHighlight(label, `l${key}`) : label;
      if (isTutuAnchorLink(rawHref) || isHomePageLink(href)) {
        parts.push(
          <span key={`plain-${key++}`} className="text-foreground">
            {linkBody}
          </span>,
        );
      } else {
        parts.push(
          <a
            key={`a-${key++}`}
            href={href}
            target={href.startsWith("/") ? undefined : "_blank"}
            rel={href.startsWith("/") ? undefined : "noopener noreferrer"}
            className="text-primary hover:underline font-semibold"
          >
            {linkBody}
          </a>,
        );
      }
    }
    last = m.index + m[0].length;
  }
  if (last < branded.length) {
    parts.push(<Fragment key={`t-${key++}`}>{brandHighlight(branded.slice(last), `e${key}`)}</Fragment>);
  }
  return parts.length ? parts : brandHighlight(branded, `f${keyBase}`);
}

function renderPlainParagraphs(text: string, bi: number) {
  const expanded = expandParagraphBreaks(applyBrandToText(text));
  const subBlocks = expanded.split(/\n\n+/).filter((b) => b.trim());
  return subBlocks.map((sub, si) => {
    const tone = classifyParagraph(sub);
    const chunks = splitLongParagraph(sub, 180);
    const inner = chunks.map((chunk, ci) => (
      <p key={`${bi}-${si}-${ci}`} className="text-base leading-relaxed mb-3 last:mb-0 text-foreground">
        {parseLinksWithBranding(chunk, bi * 1000 + si * 100 + ci)}
      </p>
    ));
    const box = calloutClass(tone);
    if (!box) {
      return (
        <div key={`${bi}-${si}`} className="mb-2">
          {inner}
        </div>
      );
    }
    const Icon =
      tone === "critical" ? AlertOctagon : tone === "warn" ? Lightbulb : Sparkles;
    return (
      <div key={`${bi}-${si}`} className={`${box} flex gap-3`}>
        <Icon
          className={`h-5 w-5 shrink-0 mt-0.5 ${
            tone === "critical"
              ? "text-red-600"
              : tone === "warn"
                ? "text-amber-600"
                : "text-emerald-600"
          }`}
        />
        <div className="min-w-0 flex-1">{inner}</div>
      </div>
    );
  });
}

function renderBlock(block: string, bi: number) {
  const blockBranded = applyBrandToText(block);
  const lines = blockBranded.split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) return null;

  const bulletLike = (l: string) =>
    /^[•\-\u2014\u2013]/.test(l) || /^\d+\.\s/.test(l);

  if (lines.length >= 2 && lines.every(bulletLike)) {
    const ordered = lines.every((l) => /^\d+\.\s/.test(l));
    if (ordered) {
      return (
        <div
          key={bi}
          className="rounded-xl border border-blue-200 bg-blue-50/70 p-5 my-5 shadow-sm"
        >
          <ol className="list-decimal list-inside space-y-3 text-base leading-relaxed text-blue-950 pl-1">
            {lines.map((l, i) => {
              const cleaned = l.replace(/^\d+\.\s*/, "");
              return (
                <li key={i} className="marker:font-semibold marker:text-blue-700 pl-1">
                  {parseLinksWithBranding(cleaned, bi * 100 + i)}
                </li>
              );
            })}
          </ol>
        </div>
      );
    }
    return (
      <div
        key={bi}
        className="rounded-xl border border-emerald-200/90 bg-emerald-50/75 p-5 my-5 shadow-sm"
      >
        <ul className="space-y-3.5">
          {lines.map((l, i) => {
            const cleaned = l.replace(/^[•\-\u2014\u2013]\s*/, "");
            return (
              <li
                key={i}
                className="flex gap-3 items-start text-base leading-relaxed text-emerald-950"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-primary/80 bg-primary/10">
                  <CheckCircle className="h-4 w-4 text-primary" strokeWidth={2.5} />
                </span>
                <span className="pt-0.5">{parseLinksWithBranding(cleaned, bi * 100 + i)}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return <div key={bi}>{renderPlainParagraphs(block, bi)}</div>;
}

function SectionBody({ text }: { text: string }) {
  const prepared = expandParagraphBreaks(text);
  const blocks = prepared.split(/\n\n+/).filter((b) => b.trim());
  return <div className="space-y-2">{blocks.map((block, bi) => renderBlock(block, bi))}</div>;
}

function SectionHeading({ title, icon: Icon }: { title: string; icon: LucideIcon }) {
  const branded = applyBrandToText(title);
  return (
    <h2 className="heading-sub mb-5 flex items-center gap-3">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
        <Icon className="h-6 w-6 text-primary" strokeWidth={2} />
      </span>
      <span className="flex flex-wrap items-center gap-x-1">
        {brandHighlight(branded, "h2")}
      </span>
    </h2>
  );
}

const TAIL_ICONS: LucideIcon[] = [
  BookOpen,
  Info,
  FileText,
  Shield,
  Luggage,
  CalendarDays,
  AlertTriangle,
];

export function ReferenceArticleBody({
  slug,
  dataset,
  heroIcon: HeroIcon,
}: {
  slug: string;
  dataset: Record<string, ArticleBundle>;
  heroIcon: LucideIcon;
}) {
  const sectionIcons: LucideIcon[] = [HeroIcon, ...TAIL_ICONS];

  const data = dataset[slug] as ArticleBundle | undefined;

  if (!data?.sections?.length) {
    return (
      <p className="text-muted-foreground">
        Текст статьи временно недоступен. Загляните позже или обратитесь в поддержку.
      </p>
    );
  }

  const sections = data.sections;
  const [first, ...rest] = sections;

  return (
    <div className="space-y-8">
      {first ? (
        <Card className="border-primary/25 bg-primary/5 shadow-md overflow-hidden">
          <CardContent className="p-6 sm:p-8 pt-7 sm:pt-9">
            {!first.title ? (
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15 border-2 border-primary/25">
                  <HeroIcon className="h-6 w-6 text-primary" />
                </span>
                <span className="text-sm font-semibold uppercase tracking-wide text-primary/90">
                  Справочная статья
                </span>
              </div>
            ) : (
              <SectionHeading title={first.title} icon={HeroIcon} />
            )}
            <div className="rounded-lg border border-primary/15 bg-background/60 p-4 sm:p-5">
              <SectionBody text={first.body} />
            </div>
          </CardContent>
        </Card>
      ) : null}

      {rest.map((sec, idx) => {
        const Icon = sectionIcons[idx % sectionIcons.length];
        return (
          <Card key={idx} className="shadow-md border-border/90">
            <CardContent className="p-6 sm:p-8 pt-7 sm:pt-9">
              {sec.title ? <SectionHeading title={sec.title} icon={Icon} /> : null}
              <div
                className={
                  sec.title ? "rounded-lg border border-muted bg-muted/20 p-4 sm:p-5" : ""
                }
              >
                <SectionBody text={sec.body} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
