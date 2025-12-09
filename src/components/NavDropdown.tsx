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
            "text-lg font-medium transition-colors px-3 py-2 rounded-md",
            isActive 
              ? isHomePage 
                ? "text-white bg-white/20" 
                : "text-primary bg-primary/10"
              : isHomePage
                ? "text-white/90 hover:text-white hover:bg-white/10"
                : "text-foreground/80 hover:text-primary hover:bg-muted/50"
          )}
        >
          {label}
        </Link>
      </HoverCardTrigger>
      <HoverCardContent
        className="w-80 p-4 rounded-xl shadow-lg bg-background border data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-3 data-[side=top]:slide-in-from-bottom-3 transition-all duration-200"
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
                "hover:bg-accent hover:text-accent-foreground",
                isItemActive(item.href) && "bg-accent text-accent-foreground font-medium"
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
            "text-lg font-medium transition-colors px-2 py-1 rounded whitespace-nowrap",
            isActive 
              ? isHomePage 
                ? "text-white bg-white/20" 
                : "text-primary bg-primary/10"
              : isHomePage
                ? "text-white/90 hover:text-white hover:bg-white/10"
                : "text-foreground/80 hover:text-primary"
          )}
        >
          {label}
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 p-4 rounded-xl shadow-lg bg-background border data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-3 data-[side=top]:slide-in-from-bottom-3 transition-all duration-200"
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
                "hover:bg-accent hover:text-accent-foreground",
                isItemActive(item.href) && "bg-accent text-accent-foreground font-medium"
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

