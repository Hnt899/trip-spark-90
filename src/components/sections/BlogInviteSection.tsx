import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sectionShellClass } from "@/lib/sectionSurface";
import { logoGradientText } from "@/lib/sectionSurface";
import type { SectionSurface } from "@/lib/sectionSurface";
import { cn } from "@/lib/utils";
import { usePageSectionFields } from "@/contexts/PageCmsContext";
import type { BlogInviteFields } from "@/types/pageContent";
import { CmsEditable } from "@/components/cms/CmsEditable";
import { cmsColorStyle, cmsHeadingClass } from "@/lib/cmsStyle";

interface BlogInviteSectionProps {
  surface?: SectionSurface;
}

const BlogInviteSection = ({ surface = "light" }: BlogInviteSectionProps) => {
  const f = usePageSectionFields<BlogInviteFields>("blogInvite");
  const badge = f.badge || "Для читателей";
  const title = f.title || "Зачем читать блог TudaSuda";
  const p1 =
    f.paragraph1 ||
    "Мы пишем о том, как проще планировать поездки по России и за её пределами: от выбора билетов и отелей до документов и бюджета. Статьи редакции основаны на опыте команды и обратной связи пассажиров.";
  const p2 =
    f.paragraph2 ||
    "Блог дополняет справочник и путеводитель: здесь больше про идеи для поездок, обновления сервиса и практичные советы в одном месте.";
  const ctaLabel = f.ctaLabel || "Перейти в блог";
  const ctaHref = f.ctaHref || "/blog";

  return (
    <CmsEditable sectionId="blogInvite">
      <section className={sectionShellClass(surface, "py-16 md:py-24")}>
        <div className="container relative z-10">
          <div
            className="w-full min-w-0 rounded-3xl border border-[hsl(var(--primary)/0.14)] bg-gradient-to-br from-slate-50/98 via-white to-[hsl(var(--primary)/0.05)] px-6 py-7 shadow-[0_12px_44px_rgba(16,10,111,0.07)] md:px-8 md:py-9"
            aria-label="Приглашение в блог"
          >
            <header className="mb-6 border-l-4 border-primary pl-4">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-[hsl(var(--primary)/0.08)] px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
                <BookOpen className="h-3.5 w-3.5 shrink-0" aria-hidden />
                {badge}
              </div>
              <h2
                className={cn(
                  cmsHeadingClass(f.titleColor, "text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl " + logoGradientText)
                )}
                style={cmsColorStyle(f.titleColor)}
              >
                {title}
              </h2>
            </header>
            <div
              className="space-y-4 text-sm leading-relaxed md:text-base"
              style={cmsColorStyle(f.textColor) || undefined}
            >
              <p className={f.textColor?.trim() ? undefined : "text-slate-600"}>{p1}</p>
              <p className={f.textColor?.trim() ? undefined : "text-slate-600"}>{p2}</p>
            </div>
            <div className="mt-8">
              <Button asChild size="lg" className="rounded-full font-semibold">
                <Link to={ctaHref}>{ctaLabel}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </CmsEditable>
  );
};

export default BlogInviteSection;
