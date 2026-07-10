/** Page CMS content model (Home + Routes landings). */

export type PageKey = "home" | "routes";

export type PageSectionId =
  | "hero"
  | "features"
  | "recommendedTrains"
  | "routesSection"
  | "events"
  | "inspiration"
  | "testimonials"
  | "support"
  | "blogInvite"
  | "verified"
  | "heroRoutes"
  | "routesHero"
  | "regionsDay"
  | "process"
  | "photographers";

export type PageSectionMeta = {
  visible: boolean;
  fields: Record<string, unknown>;
};

export type PageContentDocument = {
  version: number;
  sectionOrder: string[];
  sections: Record<string, PageSectionMeta>;
};

export type HeroFields = {
  title: string;
  titleColor?: string;
  videoTrain: string;
  videoFlight: string;
  videoBus: string;
};

export type FeaturesItemFields = {
  title: string;
  description: string;
  fullDescription: string;
  bgColor: string;
  iconBgColor: string;
  titleColor: string;
  descriptionColor: string;
};

export type FeaturesFields = {
  title: string;
  subtitle: string;
  titleColor: string;
  subtitleColor: string;
  items: FeaturesItemFields[];
};

export type RecommendedTrainItemFields = {
  from: string;
  to: string;
  image: string;
  oldPrice: string;
  newPrice: string;
  discount: number | string;
  tag: string;
  description: string;
  href?: string;
};

export type RecommendedTrainsFields = {
  title: string;
  subtitle: string;
  titleColor: string;
  subtitleColor: string;
  items: RecommendedTrainItemFields[];
};

export type RoutesSectionRouteFields = {
  from: string;
  to: string;
  minPrice: number | string;
  isPopular: boolean;
  duration: string;
  borderColor?: string;
  textColor?: string;
  priceColor?: string;
};

export type RoutesSectionFields = {
  title: string;
  subtitle: string;
  titleColor: string;
  subtitleColor: string;
  routes: RoutesSectionRouteFields[];
};

export type EventsItemFields = {
  city: string;
  age: string;
  price: string;
  artist: string;
  date: string;
  venue: string;
  color: string;
  bgColor: string;
  image: string;
  href: string;
  textColor: string;
};

export type EventsFields = {
  title: string;
  subtitle: string;
  moreLabel: string;
  moreHref: string;
  titleColor: string;
  subtitleColor: string;
  items: EventsItemFields[];
};

export type InspirationItemFields = {
  name: string;
  description: string;
  image: string;
  href: string;
  titleColor?: string;
  descriptionColor?: string;
};

export type InspirationFields = {
  title: string;
  subtitle: string;
  titleColor: string;
  subtitleColor: string;
  items: InspirationItemFields[];
};

export type TestimonialsItemFields = {
  id: number | string;
  name: string;
  avatar: string;
  photo: string;
  text: string;
  route: string;
  date: string;
  body: string;
  gallery: string[];
};

export type TestimonialsFields = {
  title: string;
  subtitle: string;
  titleColor: string;
  subtitleColor: string;
  items: TestimonialsItemFields[];
};

export type BlogInviteFields = {
  badge: string;
  title: string;
  titleColor?: string;
  textColor?: string;
  paragraph1: string;
  paragraph2: string;
  ctaLabel: string;
  ctaHref: string;
};

export type SupportFields = {
  title: string;
  titleColor?: string;
  subtitle: string;
  subtitleColor?: string;
  textColor?: string;
  description1: string;
  description2: string;
  contactHeading: string;
  chatCta: string;
};

export type VerifiedFields = {
  badgeLeft: string;
  badgeRight: string;
  title: string;
  titleColor?: string;
  description: string;
  descriptionColor?: string;
  ctaLabel: string;
  ctaHref: string;
  polaroids: { caption: string; image: string }[];
};

export type RoutesHeroFields = {
  titleLine1: string;
  titleLine2: string;
  titleColor?: string;
  videoUrl: string;
  advantages: { number: string; title: string; description: string; textColor?: string }[];
};

export type HeroRouteCardFields = {
  id: string;
  title: string;
  titleColor?: string;
  description: string;
  image: string;
  hoverImage: string;
  href: string;
  routePageId: string;
  /** Layout stays in code defaults; optional overrides rarely used */
  lgWidth?: number;
  lgHeight?: number;
  lgLeft?: number;
  lgTop?: number;
};

export type HeroRoutesFields = {
  mobileTitleAccent: string;
  mobileTitleRest: string;
  cards: HeroRouteCardFields[];
};

export type DayItemKind = "route" | "blog" | "custom";

export type DayCarouselItem = {
  id: string;
  kind: DayItemKind;
  name: string;
  image: string;
  rating: number;
  href: string;
  /** CMS route page UUID or blog post UUID when kind is route/blog */
  refId: string;
};

export type RegionsDayFields = {
  titlePrefix: string;
  titleAccent: string;
  accentColor?: string;
  items: DayCarouselItem[];
};

export type ProcessFields = {
  title: string;
  titleColor: string;
  paragraph: string;
  paragraphColor: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  bottomText: string;
  bottomColor: string;
};

export type PhotographerItemFields = {
  name: string;
  handle: string;
  avatar: string;
  image: string;
  href?: string;
};

export type PhotographersFields = {
  eyebrow: string;
  title: string;
  subtitle: string;
  titleColor: string;
  subtitleColor: string;
  eyebrowColor: string;
  items: PhotographerItemFields[];
};

export const PAGE_CMS_PALETTE = [
  "#100A6F",
  "#3F3F7F",
  "#867DFF",
  "#2b47b4",
  "#8a4cf0",
  "#FFFFFF",
  "#0F172A",
  "#64748B",
  "#FFD700",
  "#F9C850",
] as const;
