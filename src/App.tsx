import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import ScrollToTop, { YandexMetrikaPageTracker } from "./components/ScrollToTop";
import AdminLayout from "./pages/admin/AdminLayout";

/**
 * Code-splitting: всё, кроме главной, грузится отдельными чанками.
 * Раньше все 50+ страниц (включая админку) были в одном бандле ~3.2 МБ,
 * из-за чего /routes и редакторы админки открывались по 5–8 секунд.
 */
const RoutesPage = lazy(() => import("./pages/Routes"));
const RouteList = lazy(() => import("./pages/RouteList"));
const RouteDetail = lazy(() => import("./pages/RouteDetail"));
const Reference = lazy(() => import("./pages/Reference"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticlePage = lazy(() => import("./pages/BlogArticlePage"));
const Guide = lazy(() => import("./pages/GuideCms"));
const GuideArticlePage = lazy(() => import("./pages/guide/GuideArticlePage"));
const TrainSearchResults = lazy(() => import("./pages/TrainSearchResults"));
const FlightSearch = lazy(() => import("./pages/FlightSearch"));
const BusSearch = lazy(() => import("./pages/BusSearch"));
const HotelSearch = lazy(() => import("./pages/HotelSearch"));
const SelectSeats = lazy(() => import("./pages/SelectSeats"));
const Checkout = lazy(() => import("./pages/Checkout"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const PaymentCancel = lazy(() => import("./pages/PaymentCancel"));
const Auth = lazy(() => import("./pages/Auth"));
const Profile = lazy(() => import("./pages/Profile"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminBlogList = lazy(() => import("./pages/admin/AdminBlogList"));
const AdminBlogEdit = lazy(() => import("./pages/admin/AdminBlogEdit"));
const AdminRouteList = lazy(() => import("./pages/admin/AdminRouteList"));
const AdminRouteEdit = lazy(() => import("./pages/admin/AdminRouteEdit"));
const AdminReferenceList = lazy(() => import("./pages/admin/AdminReferenceList"));
const AdminReferenceEdit = lazy(() => import("./pages/admin/AdminReferenceEdit"));
const AdminGuideList = lazy(() => import("./pages/admin/AdminGuideList"));
const AdminGuideEdit = lazy(() => import("./pages/admin/AdminGuideEdit"));
const AdminPageEditor = lazy(() => import("./pages/admin/AdminPageEditor"));
const AdminSubscriptions = lazy(() => import("./pages/admin/AdminSubscriptions"));
const AdminRegions = lazy(() => import("./pages/admin/AdminRegions"));
const AdminSEO = lazy(() => import("./pages/admin/AdminSEO"));
const AdminFooter = lazy(() => import("./pages/admin/AdminFooter"));
const AdminStaticPages = lazy(() => import("./pages/admin/AdminStaticPages"));
const AdminStaticPageEdit = lazy(() => import("./pages/admin/AdminStaticPageEdit"));
const AdminStaticPageCreate = lazy(() => import("./pages/admin/AdminStaticPageCreate"));
const NotFound = lazy(() => import("./pages/NotFound"));
const TestimonialDetail = lazy(() => import("./pages/TestimonialDetail"));
const StaticPage = lazy(() => import("./pages/StaticPage"));
const Trains = lazy(() => import("./pages/reference/Trains"));
const Flights = lazy(() => import("./pages/reference/Flights"));
const FlightArticle = lazy(() => import("./pages/reference/FlightArticle"));
const Buses = lazy(() => import("./pages/reference/Buses"));
const BusArticle = lazy(() => import("./pages/reference/BusArticle"));
const TrainArticle = lazy(() => import("./pages/reference/TrainArticle"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      // На 4xx повторы бессмысленны: раньше при 404 React Query делал 3 попытки
      // с паузами 1 + 2 + 4 с — это и превращало ошибку в «8 секунд загрузки».
      retry: (failureCount: number, error: unknown) => {
        const status = (error as { status?: number } | null)?.status;
        if (typeof status === "number" && status >= 400 && status < 500) {
          return false;
        }
        return failureCount < 2;
      },
    },
  },
});

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center text-muted-foreground">
    Загрузка…
  </div>
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <YandexMetrikaPageTracker />
            <Suspense fallback={<PageFallback />}>
              <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/routes" element={<RoutesPage />} />
              <Route path="/routes/list" element={<RouteList />} />
              <Route path="/routes/:id" element={<RouteDetail />} />
              <Route path="/reference" element={<Reference />} />
              <Route path="/reference/trains" element={<Trains />} />
              <Route path="/reference/flights" element={<Flights />} />
              <Route path="/reference/flights/:slug" element={<FlightArticle />} />
              <Route path="/reference/buses" element={<Buses />} />
              <Route path="/reference/buses/:slug" element={<BusArticle />} />
              <Route path="/reference/trains/:slug" element={<TrainArticle />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogArticlePage />} />
              <Route path="/guide" element={<Guide />} />
              <Route path="/guide/:category/:slug" element={<GuideArticlePage />} />
              <Route path="/train-search" element={<TrainSearchResults />} />
              <Route path="/flight-search" element={<FlightSearch />} />
              <Route path="/bus-search" element={<BusSearch />} />
              <Route path="/hotel-search" element={<HotelSearch />} />
              <Route path="/select-seats" element={<SelectSeats />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route path="/payment/cancel" element={<PaymentCancel />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />

              {/* Статические страницы (FAQ, Privacy, Terms, Offer) */}
              <Route path="/p/:slug" element={<StaticPage />} />

              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="blog" element={<AdminBlogList />} />
                <Route path="blog/:postId" element={<AdminBlogEdit />} />
                <Route path="routes" element={<AdminRouteList />} />
                <Route path="routes/:routeId" element={<AdminRouteEdit />} />
                <Route path="reference" element={<AdminReferenceList />} />
                <Route path="reference/:postId" element={<AdminReferenceEdit />} />
                <Route path="guide" element={<AdminGuideList />} />
                <Route path="guide/:postId" element={<AdminGuideEdit />} />
                <Route path="regions" element={<AdminRegions />} />
                <Route path="footer" element={<AdminFooter />} />
                <Route path="seo" element={<AdminSEO />} />
                <Route path="pages/:pageKey" element={<AdminPageEditor />} />
                <Route path="subscriptions" element={<AdminSubscriptions />} />

                {/* Управление статическими страницами */}
                <Route path="static-pages" element={<AdminStaticPages />} />
                <Route path="static-pages/new" element={<AdminStaticPageCreate />} />
                <Route path="static-pages/:slug" element={<AdminStaticPageEdit />} />
              </Route>

              <Route path="/testimonials/:id" element={<TestimonialDetail />} />
              <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
