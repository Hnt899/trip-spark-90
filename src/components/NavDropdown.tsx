import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { NavLinkItem } from "@/data/navLinks";
import { cn } from "@/lib/utils";

interface NavDropdownProps {
  label: string;
  items: NavLinkItem[];
  href: string;
  isActive?: boolean;
  isHomePage?: boolean;
}

const NavDropdown = ({ label, items, href, isActive = false, isHomePage = false }: NavDropdownProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isItemActive = (itemHref: string) => location.pathname === itemHref;

  // Десктоп версия с hover
  const DesktopDropdown = () => (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Link
          to={href}
          className={cn(
            "text-lg font-medium transition-colors px-3 py-2 rounded-md border",
            isActive 
              ? isHomePage 
                ? "text-foreground bg-white/80 backdrop-blur-lg border-foreground/20" 
                : "text-primary bg-primary/10 border-transparent"
              : isHomePage
                ? "text-white/90 border-transparent hover:bg-white/80 hover:backdrop-blur-lg hover:border-foreground/20 hover:text-foreground"
                : "text-foreground/80 border-transparent hover:text-primary hover:bg-muted/50"
          )}
        >
          {label}
        </Link>
      </HoverCardTrigger>
      <HoverCardContent
        className={cn(
          "w-80 p-4 rounded-xl shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-3 data-[side=top]:slide-in-from-bottom-3 transition-all duration-200",
          isHomePage
            ? "bg-white/95 supports-[backdrop-filter]:bg-white/90 backdrop-blur-lg border border-foreground/20"
            : "bg-background border"
        )}
        sideOffset={12}
        align="start"
      >
        <div className="space-y-1">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={cn(
                "block px-3 py-2 rounded-lg text-base transition-colors",
                isHomePage
                  ? "text-foreground hover:bg-muted/50 hover:text-primary"
                  : "text-foreground/80 hover:bg-muted/50 hover:text-primary",
                isItemActive(item.href) && (
                  isHomePage
                    ? "bg-primary/10 text-primary font-medium"
                    : "bg-primary/10 text-primary font-medium"
                )
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  );

  // Мобильная версия с кликом
  const MobileDropdown = () => (
    <Popover open={mobileOpen} onOpenChange={setMobileOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "text-lg font-medium transition-colors px-2 py-1 rounded whitespace-nowrap border",
            isActive 
              ? isHomePage 
                ? "text-foreground bg-white/80 backdrop-blur-lg border-foreground/20" 
                : "text-primary bg-primary/10 border-transparent"
              : isHomePage
                ? "text-white/90 border-transparent hover:bg-white/80 hover:backdrop-blur-lg hover:border-foreground/20 hover:text-foreground"
                : "text-foreground/80 border-transparent hover:text-primary"
          )}
        >
          {label}
        </button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-80 p-4 rounded-xl shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-3 data-[side=top]:slide-in-from-bottom-3 transition-all duration-200",
          isHomePage
            ? "bg-white/95 supports-[backdrop-filter]:bg-white/90 backdrop-blur-lg border border-foreground/20"
            : "bg-background border"
        )}
        sideOffset={12}
        align="start"
      >
        <div className="space-y-1">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block px-3 py-2 rounded-lg text-base transition-colors",
                isHomePage
                  ? "text-foreground hover:bg-muted/50 hover:text-primary"
                  : "text-foreground/80 hover:bg-muted/50 hover:text-primary",
                isItemActive(item.href) && (
                  isHomePage
                    ? "bg-primary/10 text-primary font-medium"
                    : "bg-primary/10 text-primary font-medium"
                )
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <>
      {/* Десктоп: показываем HoverCard */}
      <div className="hidden md:block">
        <DesktopDropdown />
      </div>
      {/* Мобильный: показываем Popover */}
      <div className="md:hidden">
        <MobileDropdown />
      </div>
    </>
  );
};

export default NavDropdown;

