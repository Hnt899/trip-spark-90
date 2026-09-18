import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

const DEFAULT_SEO: Record<string, { title: string; description: string }> = {
  home: {
    title: "TudaSuda — поиск билетов на поезд, самолёт и автобус",
    description: "Онлайн-сервис поиска и бронирования билетов. Поезда, самолёты, автобусы — всё в одном месте.",
  },
  routes: {
    title: "Маршруты по России — TudaSuda",
    description: "Популярные маршруты по регионам России: описания, цены, лучшие сезоны и достопримечательности.",
  },
  "routes-list": {
    title: "Список маршрутов — TudaSuda",
    description: "Все маршруты по России с рейтингами, ценами и описаниями.",
  },
  blog: {
    title: "Блог о путешествиях — TudaSuda",
    description: "Статьи о путешествиях по России и миру: лайфхаки, обзоры, инструкции и вдохновение.",
  },
  reference: {
    title: "Справочная информация — TudaSuda",
    description: "Правила покупки билетов, возврат, провоз багажа, оформление документов — всё в одном месте.",
  },
  guide: {
    title: "Путеводитель — TudaSuda",
    description: "Подробные гиды по городам и регионам России: что посмотреть, где поесть, как добраться.",
  },
};

export function useSEO(pageKey: string) {
  const q = useQuery({
    queryKey: ["seo", pageKey],
    queryFn: () =>
      apiFetch<{ title: string; description: string }>(
        `/api/seo/${encodeURIComponent(pageKey)}`
      ),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const fallback = DEFAULT_SEO[pageKey] || { title: "TudaSuda", description: "" };
  return {
    title: q.data?.title || fallback.title,
    description: q.data?.description || fallback.description,
    isLoading: q.isLoading,
  };
}
