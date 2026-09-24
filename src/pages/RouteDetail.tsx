import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import RouteTabsHeader from "@/components/routes/RouteTabsHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ArrowLeft, Loader2 } from "lucide-react";
import BlogBlockRenderer from "@/components/blog/BlogBlockRenderer";
import type { BlogContentBlock, RouteTab } from "@/types/blogContent";

type ApiRoute = {
  id: string;
  legacy_id: string | null;
  slug: string;
  name: string;
  region: string;
  rating: number;
  cover_image_url: string | null;
  excerpt: string;
  content_blocks: BlogContentBlock[];
  views: number;
  tabs?: RouteTab[];
};

const RouteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [activeTabId, setActiveTabId] = useState<string>("__main__");

  const apiQ = useQuery({
    queryKey: ["route-page-public", id],
    queryFn: () =>
      fetch(`/api/route-pages/by-id/${id}`).then((r) => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json() as Promise<ApiRoute>;
      }),
    retry: false,
    enabled: !!id,
  });

  const apiRoute = apiQ.data;
  const isLoading = apiQ.isLoading;

  // Сбрасываем активный таб при смене маршрута (только при смене id, не при ре-рендере)
  useEffect(() => {
    if (apiRoute?.id) {
      setActiveTabId("__main__");
    }
  }, [apiRoute?.id]);

  const { data: relatedRoutes } = useQuery({
    queryKey: ["related-routes", apiRoute?.region],
    enabled: !!apiRoute?.region,
    queryFn: () =>
      fetch(`/api/route-pages/related?region=${encodeURIComponent(apiRoute!.region)}&exclude=${apiRoute!.id}`)
        .then((r) => {
          if (!r.ok) throw new Error("Failed to fetch related");
          return r.json();
        }),
  });

  const [relatedPage, setRelatedPage] = useState(0);
  const [allRelated, setAllRelated] = useState<any[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    if (relatedRoutes) {
      setAllRelated(relatedRoutes);
      setRelatedPage(0);
    }
  }, [relatedRoutes]);

  const loadMoreRelated = async () => {
    if (!apiRoute?.region) return;
    setLoadingMore(true);
    try {
      const offset = (relatedPage + 1) * 3;
      const res = await fetch(
        `/api/route-pages/related?region=${encodeURIComponent(apiRoute.region)}&exclude=${apiRoute.id}&offset=${offset}`
      );
      if (!res.ok) throw new Error("Failed to load more");
      const data = await res.json();
      setAllRelated((prev) => [...prev, ...data]);
      setRelatedPage((prev) => prev + 1);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingMore(false);
    }
  };

  const routeName = apiRoute?.name;
  const routeRegion = apiRoute?.region ?? "";
  const routeRating = apiRoute?.rating ?? 0;
  const routeImage = apiRoute?.cover_image_url;

  const currentBlocks: BlogContentBlock[] = (() => {
    if (activeTabId === "__main__") {
      return apiRoute?.content_blocks || [];
    }
    const tab = apiRoute?.tabs?.find((t) => t.id === activeTabId);
    return tab?.blocks || [];
  })();

  const hasContent = Array.isArray(currentBlocks) && currentBlocks.length > 0;

  const renderContent = () => {
    if (!hasContent) {
      return (
        <div className="prose max-w-none">
          <p className="mb-4 text-base text-muted-foreground md:mb-6 md:text-lg">
            Детальная информация о маршруте находится в разработке.
          </p>
          <p className="text-base text-muted-foreground md:text-lg">
            Здесь будет размещена подробная информация о маршруте,
            включая описание достопримечательностей, рекомендации по
            посещению, карту маршрута и другую полезную информацию для
            путешественников.
          </p>
        </div>
      );
    }

    return currentBlocks.map((block, index) => {
      if (block.type === "image") {
        return (
          <div key={index} className="my-4 w-full max-w-[896px] mx-auto">
            <img
              src={block.url}
              alt={block.alt || "Изображение"}
              className="w-full aspect-[16/9] object-cover rounded-lg"
              loading="lazy"
            />
            {block.caption && (
              <p className="mt-2 text-center text-sm text-muted-foreground">{block.caption}</p>
            )}
          </div>
        );
      }
      return <BlogBlockRenderer key={index} blocks={[block]} />;
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5FA]">
        <Header />
        <main className="flex items-center justify-center py-32">
          <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!routeName) {
    return (
      <div className="min-h-screen bg-[#F5F5FA]">
        <Header />
        <main className="container px-4 py-12 pt-20 md:px-6 md:py-20 md:pt-32">
          <h1 className="heading-gradient mb-6 text-2xl font-bold tracking-tight md:text-4xl">
            Маршрут не найден
          </h1>
          <Button onClick={() => navigate("/routes/list")}>
            Вернуться к списку маршрутов
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5FA]">
      <Header />
      <main className="pt-20 md:pt-16">
        <SEO
          title={apiRoute?.name || routeName || "Маршрут"}
          description={apiRoute?.excerpt}
          image={routeImage || undefined}
          url={window.location.href}
        />
        {/* Третья шапка с табами — только если есть дополнительные табы */}
        {apiRoute?.tabs && apiRoute.tabs.length > 0 && (
          <RouteTabsHeader
            tabs={apiRoute.tabs}
            activeTabId={activeTabId}
            onChange={(id) => {
              setActiveTabId(id);
              // Ждём перерендер контента, потом скроллим в начало страницы
              requestAnimationFrame(() => {
                window.scrollTo(0, 0);
              });
            }}
          />
        )}
        <div className="container px-4 py-6 md:px-6 md:py-12">
          <Button
            variant="ghost"
            onClick={() => navigate("/routes/list")}
            className="mb-4 text-sm md:mb-6 md:text-base"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к маршрутам
          </Button>

          <Card className="overflow-hidden shadow-lg">
            {routeImage && (
              <div className="relative w-full max-w-[896px] mx-auto overflow-hidden rounded-lg">
                <img
                  src={routeImage}
                  alt={routeName}
                  className="w-full aspect-[16/9] object-cover"
                />
              </div>
            )}
            <CardContent className="p-4 md:p-6 lg:p-8">
              <div className="mb-4 flex flex-col gap-4 md:mb-6 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <h1 className="heading-gradient mb-2 text-2xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                    {routeName}
                  </h1>
                  <p className="text-base text-muted-foreground md:text-lg">
                    {routeRegion}
                  </p>
                </div>
                <div className="flex items-center gap-2 md:flex-shrink-0">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 md:h-6 md:w-6" />
                  <span className="text-lg font-semibold text-foreground md:text-xl">
                    {routeRating}
                  </span>
                </div>
              </div>

              {renderContent()}
            </CardContent>
          </Card>

          {allRelated.length > 0 && (
            <div className="mt-12 md:mt-16">
              <h2 className="heading-gradient mb-6 text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
                Похожие маршруты
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {allRelated.map((route) => (
                  <Card
                    key={route.id}
                    className="overflow-hidden shadow-md transition-shadow hover:shadow-xl cursor-pointer"
                    onClick={() => navigate(`/routes/${route.id}`)}
                  >
                    {route.cover_image_url && (
                      <div className="h-40 overflow-hidden md:h-48">
                        <img
                          src={route.cover_image_url}
                          alt={route.name}
                          className="h-full w-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    )}
                    <CardContent className="p-4">
                      <h3 className="mb-1 text-lg font-semibold line-clamp-1">{route.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{route.excerpt || route.region}</p>
                      <div className="mt-2 flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{route.rating}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {relatedRoutes && relatedRoutes.length === 3 && (
                <div className="mt-6 text-center">
                  <Button
                    variant="outline"
                    onClick={loadMoreRelated}
                    disabled={loadingMore}
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Загрузка...
                      </>
                    ) : (
                      "Загрузить ещё"
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RouteDetail;