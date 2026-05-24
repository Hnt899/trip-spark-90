import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Search, X, ChevronDown, Loader2 } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { apiFetch } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { GuideCategory, GuidePostListItem } from "@/types/guideCms";

type SectionModel = {
  id: string;
  title: string;
  description: string;
  category: string;
  articles: GuidePostListItem[];
};

const FALLBACK_DESCRIPTIONS: Record<string, string> = {
  passenger: "Ответы на частые вопросы пассажиров",
  analysis: "Глубокие разборы тем о путешествиях",
  tourism: "Практические материалы и заметки о туризме",
  transport: "Все о поездах, самолетах и автобусах",
  "long-term": "Гайды для длительного пребывания за границей",
  "first-time": "С чего начать новое хобби или активность",
  "russia-features": "Интересные особенности и традиции России",
  important: "Актуальные и важные материалы",
  russia: "Путеводители по городам России",
  countries: "Путеводители по странам",
};

export default function GuideCms() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const categoriesQ = useQuery({
    queryKey: ["guide-categories"],
    queryFn: () => apiFetch<GuideCategory[]>("/api/guide/categories"),
    retry: false,
  });
  const postsQ = useQuery({
    queryKey: ["guide-posts"],
    queryFn: () => apiFetch<GuidePostListItem[]>("/api/guide/posts"),
    retry: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = useMemo(() => {
    if (!categoriesQ.data || !postsQ.data) return [];
    const topCategories = categoriesQ.data
      .filter((c) => !c.parent_id)
      .sort((a, b) => a.sort_order - b.sort_order || a.name.localeCompare(b.name));
    return topCategories.map((category) => ({
      id: category.slug,
      category: category.slug,
      title: category.name,
      description: FALLBACK_DESCRIPTIONS[category.slug] || "",
      articles: postsQ.data.filter((p) => p.category_slug === category.slug),
    }));
  }, [categoriesQ.data, postsQ.data]);

  const allArticles = useMemo(() => sections.flatMap((section) => section.articles), [sections]);
  const sectionsWithAll = useMemo<SectionModel[]>(
    () => [{ id: "all", category: "all", title: "Все", description: "Все статьи путеводителя", articles: allArticles }, ...sections],
    [allArticles, sections],
  );
  const sectionsForTabs = useMemo(
    () => sectionsWithAll.filter((section) => section.id !== "important"),
    [sectionsWithAll],
  );
  const tabRows = useMemo(() => {
    const rows: SectionModel[][] = [];
    for (let i = 0; i < sectionsForTabs.length; i += 8) rows.push(sectionsForTabs.slice(i, i + 8));
    return rows;
  }, [sectionsForTabs]);

  const tabTriggerClass =
    "shrink-0 whitespace-nowrap rounded-full px-3.5 py-2.5 text-sm font-semibold transition-colors shadow-none data-[state=active]:shadow-none md:px-4 md:py-3 md:text-base lg:px-5 lg:py-3.5 lg:text-lg";

  const renderTabTrigger = (section: SectionModel) => (
    <TabsTrigger
      key={section.id}
      value={section.id}
      className={tabTriggerClass}
      style={{
        backgroundColor: activeTab === section.id ? "#897CFF" : "transparent",
        color: activeTab === section.id ? "#F9C850" : "white",
      }}
    >
      {section.title}
    </TabsTrigger>
  );
  const popularArticles = useMemo(() => [...allArticles].slice(0, 5), [allArticles]);
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return allArticles.filter((a) => a.title.toLowerCase().includes(q)).slice(0, 10);
  }, [allArticles, searchQuery]);

  useEffect(() => {
    setShowSearchResults(searchQuery.trim().length > 0 && searchResults.length > 0);
  }, [searchQuery, searchResults.length]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
      }
    };
    if (showSearchResults) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearchResults]);

  const isLoading = categoriesQ.isLoading || postsQ.isLoading;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {!isMobile ? (
        <section className="px-3 pb-6 pt-20 sm:px-4 md:px-6 md:pb-8 md:pt-32">
          <div className="mx-auto w-full max-w-[96vw]">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mx-auto block w-full">
              <TabsList className="guide-tabs-rail !flex h-auto w-full flex-col items-center gap-0 overflow-visible rounded-2xl p-2.5 text-white backdrop-blur-md ring-1 ring-white/15 md:gap-2.5 md:p-3.5 lg:gap-3">
                {tabRows.map((row, index) => (
                  <div
                    key={`tab-row-${index}`}
                    className={cn(
                      "flex w-full flex-wrap items-center justify-center gap-2 md:gap-2.5 lg:gap-3",
                      index > 0 ? "mt-2" : "",
                    )}
                  >
                    {row.map(renderTabTrigger)}
                  </div>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </section>
      ) : null}

      <main className={cn("container max-w-6xl pb-12", isMobile ? "pt-20 md:pt-32" : "pt-0")}>

        <div className="mb-6 md:mb-8">
          <h1 className="heading-gradient mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Путеводитель TudaSuda
          </h1>
        </div>

        <div className="relative mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Поиск по путеводителю..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.trim().length > 0 && activeTab !== "all") setActiveTab("all");
              }}
              onFocus={() => {
                if (searchQuery.trim() && searchResults.length > 0) setShowSearchResults(true);
              }}
              className="pl-10 pr-10"
            />
            {searchQuery ? (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 z-10 h-8 w-8 -translate-y-1/2 transform p-0"
                onClick={() => {
                  setSearchQuery("");
                  setShowSearchResults(false);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            ) : null}
          </div>
          {showSearchResults && searchResults.length > 0 ? (
            <div
              ref={searchResultsRef}
              className="absolute left-0 right-0 top-full z-[1000] mt-2 max-h-[400px] overflow-y-auto rounded-lg border bg-background shadow-lg"
            >
              <div className="p-4">
                <div className="mb-3 text-sm text-muted-foreground">Найдено: {searchResults.length}</div>
                <div className="space-y-2">
                  {searchResults.map((result) => (
                    <Link
                      key={result.id}
                      to={`/guide/${result.category_slug}/${result.slug}`}
                      onClick={() => {
                        setSearchQuery("");
                        setShowSearchResults(false);
                      }}
                      className="block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-purple-50"
                    >
                      {result.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {categoriesQ.isError || postsQ.isError ? (
          <p className="mb-8 text-sm text-destructive">Не удалось загрузить категории или статьи из API.</p>
        ) : null}

        <section className="mb-8">
          <h2 className="mb-4 text-center text-xl font-bold md:text-left md:text-2xl">Популярные темы</h2>
          {isLoading ? (
            <div className="flex py-4 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-2 md:justify-start md:gap-3">
              {popularArticles.map((article) => (
                <Link
                  key={article.id}
                  to={`/guide/${article.category_slug}/${article.slug}`}
                  className="rounded-lg bg-purple-100 px-3 py-2 text-sm font-medium text-purple-900 transition-colors hover:bg-purple-200 md:px-4 md:text-base"
                >
                  {article.title}
                </Link>
              ))}
            </div>
          )}
        </section>

        <div>
          {sectionsForTabs.map((section) => {
            if (activeTab !== section.id) return null;
            const filteredArticles = searchQuery.trim()
              ? section.articles.filter((a) => a.title.toLowerCase().includes(searchQuery.toLowerCase()))
              : section.articles;
            return (
              <Card key={section.id} className="mb-6">
                <CardContent className="p-6">
                  {isMobile ? (
                    <div className="mb-4">
                      <DropdownMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="h-auto w-full justify-between px-4 py-3 text-base font-medium"
                            style={{
                              backgroundColor: "rgba(32, 8, 255, 0.4)",
                              borderColor: "rgba(32, 8, 255, 0.3)",
                              color: "white",
                            }}
                          >
                            <span>{sectionsForTabs.find((s) => s.id === activeTab)?.title || "Все"}</span>
                            <ChevronDown
                              className={cn("h-5 w-5 text-primary transition-transform", mobileMenuOpen && "rotate-180")}
                              style={{ color: "#897CFF" }}
                            />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[calc(100vw-2rem)] max-w-none">
                          {sectionsForTabs.map((sectionItem) => (
                            <DropdownMenuItem
                              key={sectionItem.id}
                              onClick={() => {
                                setActiveTab(sectionItem.id);
                                setMobileMenuOpen(false);
                              }}
                              className={cn(
                                "cursor-pointer px-4 py-3 text-base",
                                activeTab === sectionItem.id && "bg-primary/10 font-medium",
                              )}
                            >
                              {sectionItem.title}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ) : null}

                  <div className="mb-4">
                    <h2 className="mb-2 hidden text-2xl font-bold md:block">{section.title}</h2>
                    <p className="text-center text-muted-foreground md:text-left">{section.description}</p>
                  </div>

                  <Accordion type="single" collapsible value={section.id}>
                    <AccordionItem value={section.id} className="border-none">
                      <AccordionTrigger className="py-2 hover:no-underline">
                        <span className="text-sm text-muted-foreground">
                          {filteredArticles.length}{" "}
                          {filteredArticles.length === 1
                            ? "статья"
                            : filteredArticles.length < 5
                              ? "статьи"
                              : "статей"}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-wrap gap-2 pt-4 md:gap-3">
                          {filteredArticles.map((article) => (
                            <Link
                              key={article.id}
                              to={`/guide/${article.category_slug}/${article.slug}`}
                              className="rounded-lg bg-purple-100 px-3 py-2 text-sm text-purple-900 transition-colors hover:bg-purple-200 md:px-4 md:text-base"
                            >
                              {article.title}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
