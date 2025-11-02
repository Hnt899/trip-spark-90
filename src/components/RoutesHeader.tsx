import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const RoutesHeader = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/20">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/routes" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-2xl font-bold">
            <span className="text-white">Go</span>
            <span className="text-primary">Trip</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/routes" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/routes") ? "text-primary" : "text-white"
            }`}
          >
            Главная
          </Link>
          <Link 
            to="/routes/list" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/routes/list") ? "text-primary" : "text-white"
            }`}
          >
            Маршруты
          </Link>
        </nav>

        <Button 
          asChild 
          variant="outline" 
          className="border-white text-white !bg-transparent hover:!bg-white/10"
        >
          <Link to="/">Вернуться на главную</Link>
        </Button>
      </div>
    </header>
  );
};

export default RoutesHeader;

