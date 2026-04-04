import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogArticleCard from "@/components/blog/BlogArticleCard";
import EditorsPickSlider from "@/components/blog/EditorsPickSlider";
import PartnersArticleScroller from "@/components/blog/PartnersArticleScroller";
import { BlogFiltersPanelInner } from "@/components/blog/BlogFiltersPanel";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { blogArticles } from "@/data/blogArticles";
import { filterAndSortBlogArticles } from "@/lib/blogFeed";
import { logoGradientText } from "@/lib/sectionSurface";
import { cn } from "@/lib/utils";
import type { BlogChannelTab, BlogSortMode } from "@/types/blogArticle";
import type { LucideIcon } from "lucide-react";
import {
  ArrowDown,
  AtSign,
  BookOpen,
  Bus,
  Instagram,
  ListFilter,
  Megaphone,
  Plane,
  Radio,
  Send,
  Share2,
  Sparkles,
  Train,
} from "lucide-react";

const PAGE_SIZE = 6;

const BLOG_FEED_GRID_CLASS =
  "grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3";

const CHANNEL_TABS: { id: BlogChannelTab; label: string }[] = [
  { id: "all", label: "Все статьи" },
  { id: "tudasuda", label: "Полезное от TudaSuda" },
  { id: "partners", label: "Советы партнёров" },
  { id: "special", label: "Спецпроекты" },
];

const SORT_OPTIONS: { id: BlogSortMode; label: string }[] = [
  { id: "new", label: "Сначала новые" },
  { id: "popular", label: "Популярные" },
];

/** Плитки справа: фирменные цвета, иконки белые */
const HERO_CHIPS: { label: string }[] = [
  { label: "Материалы редакции" },
  { label: "Партнёры с пометкой" },
  { label: "Спецпроекты" },
];

/** Иконки в hero-карточке: по очереди самолёт → поезд → автобус */
const HERO_TRANSPORT_CYCLE: { Icon: LucideIcon; iconClass: string }[] = [
  {
    Icon: Plane,
    iconClass:
      "-rotate-45 text-primary drop-shadow-sm dark:text-violet-300",
  },
  {
    Icon: Train,
    iconClass: "text-primary drop-shadow-sm dark:text-violet-300",
  },
  {
    Icon: Bus,
    iconClass: "text-primary drop-shadow-sm dark:text-violet-300",
  },
];

const HERO_TRANSPORT_INTERVAL_MS = 3200;

const SOCIAL_TILES: {
  label: string;
  href: string;
  Icon: LucideIcon;
  tileClass: string;
}[] = [
  {
    label: "Telegram",
    href: "https://t.me/tudasuda_support",
    Icon: Send,
    tileClass:
      "bg-[#229ED9] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] hover:brightness-110",
  },
  {
    label: "VK",
    href: "https://vk.com/tudasuda",
    Icon: Share2,
    tileClass:
      "bg-[#0077FF] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] hover:brightness-110",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/tudasuda",
    Icon: Instagram,
    tileClass:
      "bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] hover:brightness-110",
  },
  {
    label: "Threads",
    href: "https://www.threads.net/@tudasuda",
    Icon: AtSign,
    tileClass:
      "bg-[#101010] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-[#1a1a1a]",
  },
];

const Blog = () => {
  const [channel, setChannel] = useState<BlogChannelTab>("all");
  const [sort, setSort] = useState<BlogSortMode>("new");
  const [selectedTagIds, setSelectedTagIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [onlyEditorsPick, setOnlyEditorsPick] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [heroTransportIdx, setHeroTransportIdx] = useState(0);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [channel, sort, onlyEditorsPick, selectedTagIds]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setHeroTransportIdx((i) => (i + 1) % HERO_TRANSPORT_CYCLE.length);
    }, HERO_TRANSPORT_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const toggleTag = (id: string) => {
    setSelectedTagIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const clearFilters = () => {
    setSelectedTagIds(new Set());
    setOnlyEditorsPick(false);
  };

  const filtered = useMemo(
    () =>
      filterAndSortBlogArticles(blogArticles, {
        channel,
        sort,
        selectedTagIds,
        onlyEditorsPick,
      }),
    [channel, sort, selectedTagIds, onlyEditorsPick],
  );

  const firstFeedChunk = filtered.slice(0, PAGE_SIZE);
  const moreFeedChunk = filtered.slice(PAGE_SIZE, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const feedHasExtraPages = filtered.length > PAGE_SIZE;

  const editorsPickArticles = useMemo(
    () => blogArticles.filter((a) => a.editorsPick),
    [],
  );

  const partnerCarouselArticles = useMemo(
    () => blogArticles.filter((a) => a.partnerCarousel),
    [],
  );

  const sponsoredArticles = useMemo(
    () => blogArticles.filter((a) => a.sponsoredGrid),
    [],
  );

  const filtersNode = (
    <BlogFiltersPanelInner
      selectedTagIds={selectedTagIds}
      onToggleTag={toggleTag}
      onlyEditorsPick={onlyEditorsPick}
      onOnlyEditorsPick={setOnlyEditorsPick}
      onClear={clearFilters}
    />
  );

  const heroTransport = HERO_TRANSPORT_CYCLE[heroTransportIdx]!;
  const HeroTransportIcon = heroTransport.Icon;

  return (
    <div className="min-h-screen bg-white text-foreground dark:bg-background">
      <Header />
      <main className="mx-auto min-w-0 max-w-[1280px] overflow-x-hidden px-4 pb-16 pt-[calc(var(--site-header-height)+1.5rem)] md:px-6 lg:px-8 lg:pb-20">
        <header className="relative mb-10 md:mb-14">
          <div
            className={cn(
              "relative overflow-hidden rounded-[1.75rem] border border-[hsl(var(--primary)/0.14)]",
              "bg-gradient-to-br from-white via-violet-50/60 to-sky-50/50",
              "shadow-[0_24px_64px_-18px_rgba(16,10,111,0.14),0_0_0_1px_rgba(255,255,255,0.6)_inset]",
              "dark:from-slate-950 dark:via-[#14102a] dark:to-slate-950 dark:border-primary/25",
              "dark:shadow-[0_28px_70px_-20px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)]",
            )}
          >
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(74,63,173,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(74,63,173,0.045)_1px,transparent_1px)] bg-[length:40px_40px] dark:bg-[linear-gradient(to_right,rgba(138,112,248,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(138,112,248,0.07)_1px,transparent_1px)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -left-24 top-0 h-[min(100%,420px)] w-[420px] rounded-full bg-[#8A70F8] opacity-[0.2] blur-[100px] dark:opacity-[0.35]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-32 right-0 h-[380px] w-[380px] rounded-full bg-[#100A6F] opacity-[0.14] blur-[90px] dark:bg-primary dark:opacity-[0.22]"
              aria-hidden
            />

            <div className="relative grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_minmax(0,300px)] lg:gap-12 lg:p-10 xl:min-h-[280px] xl:grid-cols-[1fr_minmax(0,340px)]">
              <div className="min-w-0">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/75 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary shadow-sm backdrop-blur-md dark:border-primary/35 dark:bg-white/[0.08] dark:text-violet-200">
                  <Sparkles
                    className="h-3.5 w-3.5 shrink-0 text-[#8A70F8]"
                    aria-hidden
                  />
                  Журнал путешествий
                </div>
                <h1 className="max-w-full">
                  <span className="block text-2xl font-semibold tracking-tight text-slate-700 dark:text-slate-200 sm:text-3xl">
                    Блог о путешествиях
                  </span>
                  <span
                    className={cn(
                      "mt-1 block text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl",
                      logoGradientText,
                    )}
                  >
                    от TudaSuda
                  </span>
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300 md:text-lg">
                  Идеи для поездок, лайфхаки в дороге, новости сервиса — и честные
                  материалы партнёров, которые мы всегда помечаем отдельно.
                </p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Рубрики блога">
                  {HERO_CHIPS.map((c) => (
                    <li
                      key={c.label}
                      className="rounded-full border border-primary/15 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-sm dark:border-primary/25 dark:bg-slate-900/50 dark:text-slate-200"
                    >
                      {c.label}
                    </li>
                  ))}
                </ul>
                <a
                  href="#blog-editors-pick-heading"
                  className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:text-violet-300 dark:ring-offset-slate-950"
                >
                  К подборке редакции
                  <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
                </a>
              </div>

              <div
                className="relative mx-auto hidden h-[260px] w-full max-w-[300px] sm:block lg:mx-0 lg:h-[280px] lg:max-w-none"
                aria-hidden
              >
                <div className="absolute inset-0 flex items-center justify-center motion-safe:animate-[spin_42s_linear_infinite] motion-reduce:animate-none">
                  <div className="h-[220px] w-[220px] rounded-full border-2 border-dashed border-primary/25 opacity-70 dark:border-primary/40" />
                  <div className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#8A70F8] shadow-[0_0_12px_rgba(138,112,248,0.7)]" />
                  <div className="absolute bottom-6 left-6 h-2 w-2 rounded-full bg-primary/80" />
                  <div className="absolute right-10 top-1/3 h-2 w-2 rounded-full bg-violet-400/90" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={cn(
                      "relative flex flex-col items-center justify-center rounded-3xl border border-white/50 px-8 py-7 text-center",
                      "bg-gradient-to-b from-white/95 to-violet-50/95 shadow-[0_20px_50px_-12px_rgba(16,10,111,0.2)] backdrop-blur-md",
                      "dark:border-white/10 dark:from-slate-900/95 dark:to-[#1c1540]/95 dark:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.6)]",
                    )}
                  >
                    <div className="flex h-12 w-12 items-center justify-center">
                      <HeroTransportIcon
                        key={heroTransportIdx}
                        className={cn(
                          "h-12 w-12 animate-in fade-in zoom-in-95 duration-500 motion-reduce:animate-none",
                          heroTransport.iconClass,
                        )}
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    </div>
                    <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/75 dark:text-violet-300/90">
                      В путь
                    </p>
                    <p className="mt-2 text-3xl font-extrabold tabular-nums tracking-tight text-[#100A6F] dark:text-white">
                      {blogArticles.length}+
                    </p>
                    <p className="mt-1 max-w-[9rem] text-[11px] leading-snug text-muted-foreground">
                      материалов в журнале
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-10">
          <div className="min-w-0 flex-1">
            {/* Вкладки + сортировка + моб. фильтры */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <div
                className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2"
                role="tablist"
                aria-label="Разделы блога"
              >
                {CHANNEL_TABS.map((tab) => {
                  const active = channel === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setChannel(tab.id)}
                      className={cn(
                        "flex min-h-[5.25rem] w-full items-center justify-center rounded-2xl border px-2.5 py-2.5 text-center text-sm font-medium leading-snug transition-colors",
                        "sm:min-h-0 sm:w-auto sm:rounded-full sm:px-3 sm:py-1.5 sm:leading-normal",
                        active
                          ? "border-primary bg-primary/10 text-primary shadow-[0_1px_0_rgba(0,0,0,0.04)]"
                          : "border-slate-200 bg-white text-slate-700 hover:border-primary/40 hover:text-primary dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:border-primary/50",
                      )}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex w-full max-sm:justify-between max-sm:gap-2 sm:w-auto sm:flex-wrap sm:items-center sm:gap-3">
                <div
                  className="flex shrink-0 items-center gap-2"
                  role="group"
                  aria-label="Сортировка списка"
                >
                  {SORT_OPTIONS.map((opt) => {
                    const active = sort === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSort(opt.id)}
                        className={cn(
                          "rounded-full border-2 px-2.5 py-1 text-xs transition-colors sm:px-3 sm:text-sm",
                          active
                            ? "border-primary bg-primary/10 font-medium text-primary"
                            : "border-transparent text-muted-foreground hover:border-primary/30 hover:text-foreground",
                        )}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>

                <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="shrink-0 gap-2 lg:hidden"
                    >
                      <ListFilter className="h-4 w-4" />
                      Фильтры
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:max-w-md">
                    <SheetHeader>
                      <SheetTitle>Рубрики и теги</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 max-h-[calc(100vh-8rem)] overflow-y-auto pr-1">
                      {filtersNode}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            <p className="mb-4 text-sm text-muted-foreground">
              Найдено материалов:{" "}
              <span className="font-medium text-foreground">
                {filtered.length}
              </span>
            </p>

            {filtered.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-10 text-center text-muted-foreground dark:border-slate-700 dark:bg-slate-900/40">
                По выбранным фильтрам пока ничего нет. Попробуйте снять часть
                тегов или переключить раздел.
              </p>
            ) : (
              <>
                <div className={BLOG_FEED_GRID_CLASS}>
                  {firstFeedChunk.map((article) => (
                    <div key={article.id} className="min-w-0">
                      <BlogArticleCard article={article} />
                    </div>
                  ))}
                </div>

                {feedHasExtraPages ? (
                  <Collapsible open={visibleCount > PAGE_SIZE}>
                    <CollapsibleContent
                      className={cn(
                        "overflow-hidden",
                        "data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
                      )}
                    >
                      <div className={cn(BLOG_FEED_GRID_CLASS, "mt-6")}>
                        {moreFeedChunk.map((article, i) => (
                          <div
                            key={article.id}
                            className="min-w-0 animate-in fade-in slide-in-from-bottom-3 duration-500 motion-reduce:animate-none"
                            style={{
                              animationDelay: `${Math.min(i, 11) * 45}ms`,
                            }}
                          >
                            <BlogArticleCard article={article} />
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ) : null}

                {hasMore ? (
                  <div className="mt-10 flex justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="min-w-[200px] border-primary/40 bg-white/90 text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground dark:bg-slate-900/80 dark:hover:bg-primary dark:hover:text-primary-foreground"
                      onClick={() =>
                        setVisibleCount((c) => c + PAGE_SIZE)
                      }
                    >
                      Показать ещё
                    </Button>
                  </div>
                ) : null}
              </>
            )}
          </div>

          <aside className="hidden w-[300px] shrink-0 lg:block">
            <div className="sticky top-[calc(var(--site-header-height)+1rem)] rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_32px_rgba(16,10,111,0.06)] dark:border-slate-800 dark:bg-card">
              {filtersNode}
            </div>
          </aside>
        </div>

        <div className="mt-14 w-full border-t border-slate-200 pt-12 dark:border-slate-800 md:mt-16 md:pt-14">
          <EditorsPickSlider articles={editorsPickArticles} />
        </div>

        <div className="mt-16 w-full border-t border-slate-200 pt-16 dark:border-slate-800">
          <PartnersArticleScroller
            id="blog-partners-heading"
            title="Рекомендуют наши партнёры"
            articles={partnerCarouselArticles}
            layout="grid"
          />
        </div>

        <section
          className="mb-16 w-full rounded-3xl border border-amber-200/90 bg-gradient-to-b from-amber-50/95 via-white to-white p-6 shadow-[0_12px_40px_rgba(146,94,20,0.09)] md:p-8 dark:border-amber-900/55 dark:from-amber-950/35 dark:via-slate-950 dark:to-slate-950"
          aria-labelledby="blog-sponsored-heading"
        >
          <header className="mb-8 max-w-3xl border-l-4 border-amber-400 pl-4 dark:border-amber-500">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-400/60 bg-amber-100/95 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-950 shadow-sm dark:border-amber-700 dark:bg-amber-950/70 dark:text-amber-100">
              <Megaphone className="h-3.5 w-3.5 shrink-0" aria-hidden />
              Реклама
            </div>
            <h2
              id="blog-sponsored-heading"
              className="heading-gradient text-2xl font-bold tracking-tight md:text-3xl"
            >
              Рекламные спецпроекты
            </h2>
            <p className="mt-2 text-sm font-medium leading-relaxed text-amber-950/85 dark:text-amber-100/90">
              Материалы предоставлены рекламодателем. Мы отмечаем такие публикации
              отдельно, чтобы вы могли отличить их от редакционных текстов.
            </p>
          </header>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sponsoredArticles.map((article) => (
              <BlogArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        <section
          className="mb-12 w-full min-w-0 rounded-3xl border border-sky-200/85 bg-gradient-to-br from-sky-50/95 via-white to-blue-50/35 p-6 shadow-[0_10px_36px_rgba(56,130,190,0.08)] md:mb-14 md:p-7 dark:border-sky-900/55 dark:from-sky-950/35 dark:via-slate-950 dark:to-blue-950/25"
          aria-label="Социальные сети TudaSuda"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="min-w-0 max-w-xl lg:flex-1">
              <header>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-300/70 bg-white/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-sky-900 shadow-sm dark:border-sky-800 dark:bg-slate-900/80 dark:text-sky-100">
                  <Radio className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                  Соцсети сервиса
                </div>
                <h2
                  className={cn(
                    "text-xl font-bold tracking-tight md:text-2xl",
                    logoGradientText,
                  )}
                >
                  Мы в соцсетях
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Подписывайтесь — рассказываем о новинках, акциях и лайфхаках для
                  путешествий.
                </p>
              </header>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <p>
                  В Telegram удобно задать вопрос поддержке и следить за
                  обновлениями сервиса. Во «ВКонтакте» и Instagram делимся
                  подборками маршрутов и вдохновением для выходных и отпуска.
                </p>
                <p>
                  Нажмите на плитку справа — откроется наша официальная страница в
                  выбранной сети.
                </p>
              </div>
            </div>

            <div className="mx-auto grid w-full max-w-[280px] shrink-0 grid-cols-2 gap-3 sm:max-w-[300px] sm:gap-4 lg:mx-0">
              {SOCIAL_TILES.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} — открыть в новой вкладке`}
                  className={cn(
                    "flex aspect-square items-center justify-center rounded-2xl text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-sky-50 dark:focus-visible:ring-offset-slate-950",
                    s.tileClass,
                  )}
                >
                  <s.Icon className="h-10 w-10 drop-shadow-sm sm:h-11 sm:w-11" aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section
          className="mb-16 w-full min-w-0 rounded-3xl border border-[hsl(var(--primary)/0.14)] bg-gradient-to-br from-slate-50/98 via-white to-[hsl(var(--primary)/0.05)] px-6 py-7 shadow-[0_12px_44px_rgba(16,10,111,0.07)] md:px-8 md:py-9 dark:border-primary/30 dark:from-slate-950 dark:via-slate-950 dark:to-primary/[0.08]"
          aria-label="О блоге"
        >
              <header className="mb-6 border-l-4 border-primary pl-4 dark:border-[#8A70F8]">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-[hsl(var(--primary)/0.08)] px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary dark:border-primary/40 dark:bg-primary/15 dark:text-violet-200">
                  <BookOpen className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  Для читателей
                </div>
                <h2
                  className={cn(
                    "text-xl font-bold tracking-tight md:text-2xl",
                    logoGradientText,
                  )}
                >
                  Зачем читать блог TudaSuda
                </h2>
              </header>
              <div className="space-y-4 text-sm leading-relaxed text-slate-600 md:text-base dark:text-slate-300">
                <p>
                  Мы пишем о том, как проще планировать поездки по России и за
                  её пределами: от выбора билетов и отелей до документов и
                  бюджета. Статьи редакции основаны на опыте команды и обратной
                  связи пассажиров.
                </p>
                <p>
                  Отдельно отмечаем материалы партнёров и рекламные спецпроекты —
                  так вы понимаете источник рекомендаций и можете сравнивать
                  предложения спокойно и осознанно.
                </p>
                <p>
                  Блог дополняет справочную и путеводитель: здесь больше про
                  идеи для поездок, обновления сервиса и практичные советы в
                  одном месте.
                </p>
              </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
