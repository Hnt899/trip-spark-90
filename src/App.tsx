import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import RoutesPage from "./pages/Routes";
import RouteList from "./pages/RouteList";
import RouteDetail from "./pages/RouteDetail";
import Reference from "./pages/Reference";
import Blog from "./pages/Blog";
import Guide from "./pages/Guide";
import GuideArticlePage from "./pages/guide/GuideArticlePage";
import ChtodelatEsliya from "./pages/guide/articles/passenger/ChtodelatEsliya";
import TrainSearchResults from "./pages/TrainSearchResults";
import SelectSeats from "./pages/SelectSeats";
import Checkout from "./pages/Checkout";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// Reference pages
import Trains from "./pages/reference/Trains";
import DocumentsForPurchase from "./pages/reference/articles/DocumentsForPurchase";
import HowToBuy from "./pages/reference/articles/HowToBuy";
import HowToPay from "./pages/reference/articles/HowToPay";
import PayLater from "./pages/reference/articles/PayLater";
import PreOrder from "./pages/reference/articles/PreOrder";
import NoTickets from "./pages/reference/articles/NoTickets";
import HowToGetTicket from "./pages/reference/articles/HowToGetTicket";
import PrintedTicket from "./pages/reference/articles/PrintedTicket";
import AutoFillPassengerData from "./pages/reference/articles/AutoFillPassengerData";
import ElectronicRegistration from "./pages/reference/articles/ElectronicRegistration";
import ChangeAfterPayment from "./pages/reference/articles/ChangeAfterPayment";
import WhatNeededForBoarding from "./pages/reference/articles/WhatNeededForBoarding";
import HowToReturnTicket from "./pages/reference/articles/HowToReturnTicket";
import TrainSchedule from "./pages/reference/articles/TrainSchedule";
import CheckTicketsAvailability from "./pages/reference/articles/CheckTicketsAvailability";
import ProfilePurpose from "./pages/reference/articles/ProfilePurpose";
import CardPaymentFailed from "./pages/reference/articles/CardPaymentFailed";
import RefundToCard from "./pages/reference/articles/RefundToCard";
import BuyWholeCompartment from "./pages/reference/articles/BuyWholeCompartment";
import SuburbanTrains from "./pages/reference/articles/SuburbanTrains";
import SportsEquipment from "./pages/reference/articles/SportsEquipment";
import CheapTickets from "./pages/reference/articles/CheapTickets";
import PassportIssues from "./pages/reference/articles/PassportIssues";
import TicketOrderRules from "./pages/reference/articles/TicketOrderRules";
import ChildrenBenefits from "./pages/reference/articles/ChildrenBenefits";
import LuggageRules from "./pages/reference/articles/LuggageRules";
import AnimalsRules from "./pages/reference/articles/AnimalsRules";
import RegulatoryActs from "./pages/reference/articles/RegulatoryActs";
import PublicOffer from "./pages/reference/articles/PublicOffer";
import Sapsan from "./pages/reference/articles/Sapsan";
import TrainTypes from "./pages/reference/articles/TrainTypes";
import CarriageSchemes from "./pages/reference/articles/CarriageSchemes";
import TrainCompositionSchemes from "./pages/reference/articles/TrainCompositionSchemes";
import SeasonalCoefficients from "./pages/reference/articles/SeasonalCoefficients";
import CrimeaByTrain from "./pages/reference/articles/CrimeaByTrain";
import TicketSalesPeriods from "./pages/reference/articles/TicketSalesPeriods";
import TicketOnForm from "./pages/reference/articles/TicketOnForm";
import NewYearTravel from "./pages/reference/articles/NewYearTravel";
import MayHolidays from "./pages/reference/articles/MayHolidays";
import BuyTicketTips from "./pages/reference/articles/BuyTicketTips";
import TiltingCarriages from "./pages/reference/articles/TiltingCarriages";
import UnusualRailways from "./pages/reference/articles/UnusualRailways";
import TimeZones from "./pages/reference/articles/TimeZones";
import RailwayFacts from "./pages/reference/articles/RailwayFacts";
import TicketAvailability from "./pages/reference/articles/TicketAvailability";
import RussianRailwaysHistory from "./pages/reference/articles/RussianRailwaysHistory";
import RussianStations from "./pages/reference/articles/RussianStations";
import MoscowStations from "./pages/reference/articles/MoscowStations";
import SpbStations from "./pages/reference/articles/SpbStations";
import RestaurantCars from "./pages/reference/articles/RestaurantCars";
import EatingOnTrain from "./pages/reference/articles/EatingOnTrain";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/routes/list" element={<RouteList />} />
          <Route path="/routes/:id" element={<RouteDetail />} />
          <Route path="/reference" element={<Reference />} />
          <Route path="/reference/trains" element={<Trains />} />
          <Route path="/reference/trains/documents-for-purchase" element={<DocumentsForPurchase />} />
          <Route path="/reference/trains/how-to-buy" element={<HowToBuy />} />
          <Route path="/reference/trains/how-to-pay" element={<HowToPay />} />
          <Route path="/reference/trains/pay-later" element={<PayLater />} />
          <Route path="/reference/trains/pre-order" element={<PreOrder />} />
          <Route path="/reference/trains/no-tickets" element={<NoTickets />} />
          <Route path="/reference/trains/how-to-get-ticket" element={<HowToGetTicket />} />
          <Route path="/reference/trains/printed-ticket" element={<PrintedTicket />} />
          <Route path="/reference/trains/auto-fill-passenger-data" element={<AutoFillPassengerData />} />
          <Route path="/reference/trains/electronic-registration" element={<ElectronicRegistration />} />
          <Route path="/reference/trains/change-after-payment" element={<ChangeAfterPayment />} />
          <Route path="/reference/trains/what-needed-for-boarding" element={<WhatNeededForBoarding />} />
          <Route path="/reference/trains/how-to-return-ticket" element={<HowToReturnTicket />} />
          <Route path="/reference/trains/train-schedule" element={<TrainSchedule />} />
          <Route path="/reference/trains/check-tickets-availability" element={<CheckTicketsAvailability />} />
          <Route path="/reference/trains/profile-purpose" element={<ProfilePurpose />} />
          <Route path="/reference/trains/card-payment-failed" element={<CardPaymentFailed />} />
          <Route path="/reference/trains/refund-to-card" element={<RefundToCard />} />
          <Route path="/reference/trains/buy-whole-compartment" element={<BuyWholeCompartment />} />
          <Route path="/reference/trains/suburban-trains" element={<SuburbanTrains />} />
          <Route path="/reference/trains/sports-equipment" element={<SportsEquipment />} />
          <Route path="/reference/trains/cheap-tickets" element={<CheapTickets />} />
          <Route path="/reference/trains/passport-issues" element={<PassportIssues />} />
          <Route path="/reference/trains/ticket-order-rules" element={<TicketOrderRules />} />
          <Route path="/reference/trains/children-benefits" element={<ChildrenBenefits />} />
          <Route path="/reference/trains/luggage-rules" element={<LuggageRules />} />
          <Route path="/reference/trains/animals-rules" element={<AnimalsRules />} />
          <Route path="/reference/trains/regulatory-acts" element={<RegulatoryActs />} />
          <Route path="/reference/trains/public-offer" element={<PublicOffer />} />
          <Route path="/reference/trains/sapsan" element={<Sapsan />} />
          <Route path="/reference/trains/train-types" element={<TrainTypes />} />
          <Route path="/reference/trains/carriage-schemes" element={<CarriageSchemes />} />
          <Route path="/reference/trains/train-composition-schemes" element={<TrainCompositionSchemes />} />
          <Route path="/reference/trains/seasonal-coefficients" element={<SeasonalCoefficients />} />
          <Route path="/reference/trains/crimea-by-train" element={<CrimeaByTrain />} />
          <Route path="/reference/trains/ticket-sales-periods" element={<TicketSalesPeriods />} />
          <Route path="/reference/trains/ticket-on-form" element={<TicketOnForm />} />
          <Route path="/reference/trains/new-year-travel" element={<NewYearTravel />} />
          <Route path="/reference/trains/may-holidays" element={<MayHolidays />} />
          <Route path="/reference/trains/buy-ticket-tips" element={<BuyTicketTips />} />
          <Route path="/reference/trains/tilting-carriages" element={<TiltingCarriages />} />
          <Route path="/reference/trains/unusual-railways" element={<UnusualRailways />} />
          <Route path="/reference/trains/time-zones" element={<TimeZones />} />
          <Route path="/reference/trains/railway-facts" element={<RailwayFacts />} />
          <Route path="/reference/trains/ticket-availability" element={<TicketAvailability />} />
          <Route path="/reference/trains/russian-railways-history" element={<RussianRailwaysHistory />} />
          <Route path="/reference/trains/russian-stations" element={<RussianStations />} />
          <Route path="/reference/trains/moscow-stations" element={<MoscowStations />} />
          <Route path="/reference/trains/spb-stations" element={<SpbStations />} />
          <Route path="/reference/trains/restaurant-cars" element={<RestaurantCars />} />
          <Route path="/reference/trains/eating-on-train" element={<EatingOnTrain />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/guide/passenger/chto-delat-esli-ya-zabelel-v-doroge" element={<ChtodelatEsliya />} />
          <Route path="/guide/:category/:slug" element={<GuideArticlePage />} />
          <Route path="/train-search" element={<TrainSearchResults />} />
          <Route path="/select-seats" element={<SelectSeats />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
