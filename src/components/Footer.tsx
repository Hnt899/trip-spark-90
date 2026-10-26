import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/images/logo/logo_full_4.png";
import { Mail } from "lucide-react";
import { useFooterContent } from "@/hooks/useFooterContent";
import type { SocialLink } from "@/types/footerContent";

function SocialFallback({ label, bgColor }: { label: string; bgColor?: string }) {
  const letter = (label || "?").trim().charAt(0).toUpperCase();
  return (
    <div
      className={`w-full h-full flex items-center justify-center text-white font-bold text-sm ${bgColor || "bg-primary"}`}
    >
      {letter}
    </div>
  );
}

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const footer = useFooterContent();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    }
  };

  const visibleSocials: SocialLink[] = footer.socials.filter(
    (s) => s.url && s.url.trim().length > 0
  );
  const visibleDocuments = footer.documents.filter(
    (d) => d.label && d.label.trim().length > 0
  );
  const visibleImportant = footer.importantLinks.filter(
    (l) => l.label && l.url && l.url.trim().length > 0
  );

  return (
    <footer className="bg-[#0B0F26] text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container relative z-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-1 space-y-6">
            <Link
              to="/"
              onClick={handleLogoClick}
              className="inline-block relative hover:opacity-90 transition-opacity"
            >
              <img
                src={logoImage}
                alt="TudaSuda"
                className="h-20 md:h-24 w-auto object-contain relative z-10"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Сервис для поиска и бронирования билетов на поезда, самолёты и
              автобусы по всей России.
            </p>

            <Button
              asChild
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <a
                href="https://travelhelp.care/login"
                target="_blank"
                rel="noopener noreferrer"
              >
                Нужна помощь с заказом?
              </a>
            </Button>

            <p className="text-xs text-muted-foreground/70">
              Только для ж/д и автобусов
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-6">Навигация</h3>
            <nav className="flex flex-col gap-4">
              <Link to="/" className="text-muted-foreground hover:text-white transition-colors duration-200 text-sm">
                Главная
              </Link>
              <Link to="/routes" className="text-muted-foreground hover:text-white transition-colors duration-200 text-sm">
                Маршруты
              </Link>
              <Link to="/reference" className="text-muted-foreground hover:text-white transition-colors duration-200 text-sm">
                Справочная
              </Link>
              <Link to="/blog" className="text-muted-foreground hover:text-white transition-colors duration-200 text-sm">
                Блог
              </Link>
              <Link to="/guide" className="text-muted-foreground hover:text-white transition-colors duration-200 text-sm">
                Путеводитель
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-6">Поддержка</h3>
            {footer.email && (
              <div className="flex flex-col gap-4 mb-6">
                <a
                  href={`mailto:${footer.email}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors duration-200 text-sm group"
                >
                  <Mail className="w-4 h-4 group-hover:text-primary transition-colors" />
                  <span>{footer.email}</span>
                </a>
              </div>
            )}

            {visibleSocials.length > 0 && (
              <>
                <h3 className="text-lg font-bold text-white mb-4">Мы в соцсетях</h3>
                <div className="flex flex-wrap gap-3">
                  {visibleSocials.map((s) => {
                    const iconUrl = s.iconSmall || s.iconLarge;
                    return (
                      <a
                        key={s.id}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden transition-all hover:brightness-110"
                        aria-label={s.label}
                        title={s.label}
                      >
                        {iconUrl ? (
                          <img
                            src={iconUrl}
                            alt={s.label}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <SocialFallback label={s.label} bgColor={s.bgColor} />
                        )}
                      </a>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-6">ВАЖНЫЕ ВОПРОСЫ</h3>
            <div className="flex flex-col gap-3">
              {visibleImportant.map((l, i) => {
                const isInternal = l.url.startsWith("/");
                if (isInternal) {
                  return (
                    <Link
                      key={i}
                      to={l.url}
                      className="text-muted-foreground hover:text-white transition-colors duration-200 text-sm"
                    >
                      {l.label}
                    </Link>
                  );
                }
                return (
                  <a
                    key={i}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-white transition-colors duration-200 text-sm"
                  >
                    {l.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 my-12"></div>

        <div className="flex flex-col gap-6">
          {footer.freeText && footer.freeText.trim() !== "" && (
            <div className="text-muted-foreground text-sm whitespace-pre-wrap leading-relaxed">
              {footer.freeText}
            </div>
          )}

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-muted-foreground text-sm">{footer.copyright}</div>
            <div className="flex flex-wrap gap-6 text-sm">
              {visibleDocuments.map((d, i) => {
                const isInternal = d.fileUrl && d.fileUrl.startsWith("/");
                if (isInternal) {
                  return (
                    <Link
                      key={i}
                      to={d.fileUrl!}
                      className="text-muted-foreground hover:text-white transition-colors duration-200"
                    >
                      {d.label}
                    </Link>
                  );
                }
                return (
                  <a
                    key={i}
                    href={d.fileUrl || "#"}
                    target={d.fileUrl ? "_blank" : undefined}
                    rel={d.fileUrl ? "noopener noreferrer" : undefined}
                    className={
                      "transition-colors duration-200 " +
                      (d.fileUrl
                        ? "text-muted-foreground hover:text-white"
                        : "text-muted-foreground/60 cursor-not-allowed")
                    }
                    onClick={(e) => {
                      if (!d.fileUrl) e.preventDefault();
                    }}
                  >
                    {d.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
