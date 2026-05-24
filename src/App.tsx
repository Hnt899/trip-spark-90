import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import RoutesPage from "./pages/Routes";
import RouteList from "./pages/RouteList";
import RouteDetail from "./pages/RouteDetail";
import Reference from "./pages/Reference";
import Blog from "./pages/Blog";
import BlogArticlePage from "./pages/BlogArticlePage";
import Guide from "./pages/GuideCms";
import GuideArticlePage from "./pages/guide/GuideArticlePage";
import TrainSearchResults from "./pages/TrainSearchResults";
import FlightSearch from "./pages/FlightSearch";
import BusSearch from "./pages/BusSearch";
import HotelSearch from "./pages/HotelSearch";
import SelectSeats from "./pages/SelectSeats";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBlogList from "./pages/admin/AdminBlogList";
import AdminBlogEdit from "./pages/admin/AdminBlogEdit";
import AdminRouteList from "./pages/admin/AdminRouteList";
import AdminRouteEdit from "./pages/admin/AdminRouteEdit";
import AdminReferenceList from "./pages/admin/AdminReferenceList";
import AdminReferenceEdit from "./pages/admin/AdminReferenceEdit";
import AdminGuideList from "./pages/admin/AdminGuideList";
import AdminGuideEdit from "./pages/admin/AdminGuideEdit";
import NotFound from "./pages/NotFound";
import TestimonialDetail from "./pages/TestimonialDetail";
import ChatWidget from "./components/ChatWidget";
import ScrollToTop from "./components/ScrollToTop";

// Reference pages
import Trains from "./pages/reference/Trains";
import Flights from "./pages/reference/Flights";
import FlightArticle from "./pages/reference/FlightArticle";
import Buses from "./pages/reference/Buses";
import BusArticle from "./pages/reference/BusArticle";
import TrainArticle from "./pages/reference/TrainArticle";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <ScrollToTop />
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
          </Route>
          <Route path="/testimonials/:id" element={<TestimonialDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ChatWidget />
    </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
