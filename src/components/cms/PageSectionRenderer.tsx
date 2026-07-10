import type { ReactNode } from "react";
import type { PageKey } from "@/types/pageContent";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import RecommendedTrainsSection from "@/components/sections/RecommendedTrainsSection";
import RoutesSection from "@/components/sections/RoutesSection";
import EventsSection from "@/components/sections/EventsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import SupportSection from "@/components/sections/SupportSection";
import BlogInviteSection from "@/components/sections/BlogInviteSection";
import InspirationSection from "@/components/sections/InspirationSection";
import VerifiedSection from "@/components/sections/VerifiedSection";
import HeroRoutes from "@/components/sections/HeroRoutes";
import RoutesHeroSection from "@/components/sections/RoutesHeroSection";
import ProcessSection from "@/components/sections/ProcessSection";
import RegionsRoutesSection from "@/components/sections/RegionsRoutesSection";
import PhotographersSection from "@/components/sections/PhotographersSection";
import { isSectionVisible } from "@/lib/pageContentMerge";
import type { PageContentDocument } from "@/types/pageContent";

const HOME_SECTIONS: Record<string, ReactNode> = {
  hero: <HeroSection />,
  features: <FeaturesSection surface="light" />,
  recommendedTrains: <RecommendedTrainsSection surface="light" />,
  routesSection: <RoutesSection surface="light" />,
  events: <EventsSection surface="light" />,
  inspiration: <InspirationSection surface="light" />,
  testimonials: <TestimonialsSection surface="light" />,
  support: <SupportSection surface="light" />,
  blogInvite: <BlogInviteSection surface="light" />,
  verified: <VerifiedSection surface="light" />,
};

const ROUTES_SECTIONS: Record<string, ReactNode> = {
  heroRoutes: <HeroRoutes surface="light" />,
  routesHero: <RoutesHeroSection surface="light" />,
  regionsDay: <RegionsRoutesSection surface="light" />,
  verified: <VerifiedSection surface="light" />,
  process: <ProcessSection />,
  photographers: <PhotographersSection surface="light" />,
};

export const SECTION_LABELS: Record<string, string> = {
  hero: "Hero (поиск + видео)",
  features: "Преимущества",
  recommendedTrains: "Рекомендуемые поезда",
  routesSection: "Маршруты (главная)",
  events: "События",
  inspiration: "Вдохновение",
  testimonials: "Отзывы",
  support: "Бот-поддержка",
  blogInvite: "Приглашение в блог",
  verified: "Проверено TudaSuda",
  heroRoutes: "Мозаика маршрутов",
  routesHero: "Видео + плашки",
  regionsDay: "Make Your DAY",
  process: "Процесс",
  photographers: "Фотографы",
};

export function getSectionMap(pageKey: PageKey): Record<string, ReactNode> {
  return pageKey === "home" ? HOME_SECTIONS : ROUTES_SECTIONS;
}

export function renderPageSections(pageKey: PageKey, content: PageContentDocument) {
  const map = getSectionMap(pageKey);
  return content.sectionOrder
    .filter((id) => isSectionVisible(content, id) && map[id])
    .map((id) => <div key={id}>{map[id]}</div>);
}
