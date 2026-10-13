import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoImage from "@/assets/images/logo/logo_full_4.png";
import { MessageCircle, Mail, ArrowRight, Loader2, Send, Instagram, Share2, Rss } from "lucide-react";
import { useState } from "react";
import { useFooterContent } from "@/hooks/useFooterContent";
import type { SocialKind, SocialLink } from "@/types/footerContent";

function socialIcon(kind: SocialKind) {
  switch (kind) {
    case "telegram": return <Send className="w-5 h-5 text-white" />;
    case "vk": return <Share2 className="w-5 h-5 text-white" />;
    case "instagram": return <Instagram className="w-5 h-5 text-white" />;
    case "dzen": return <Rss className="w-5 h-5 text-white" />;
  }
}
function socialClass(kind: SocialKind): string {
  switch (kind) {
    case "telegram": return "bg-[#229ED9] hover:brightness-110";
    case "vk": return "bg-[#0077FF] hover:brightness-110";
    case "instagram": return "bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:brightness-110";
    case "dzen": return "bg-[#000000] hover:brightness-110";
  }
}
function socialLabel(kind: SocialKind): string {
  switch (kind) {
    case "telegram": return "Telegram"; case "vk": return "VK";
    case "instagram": return "Instagram"; case "dzen": return "Dzen";
  }
}

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const footer = useFooterContent();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"already"|"error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname === "/") { window.scrollTo({ top: 0, behavior: "smooth" }); }
    else { navigate("/"); setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100); }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading"); setErrorMsg("");
    try {
      const res = await fetch("/api/subscriptions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: email.trim() }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setStatus("error"); setErrorMsg(data?.error || "Не удалось подписаться. Попробуйте позже."); return; }
      if (data?.already) { setStatus("already"); } else { setStatus("success"); setEmail(""); }
    } catch { setStatus("error"); setErrorMsg("Ошибка сети. Попробуйте позже."); }
  };

  const visibleSocials: SocialLink[] = footer.socials.filter((s) => s.url && s.url.trim().length > 0);
  const visibleDocuments = footer.documents.filter((d) => d.label && d.label.trim().length > 0);

  return (
    <footer className="bg-[#0B0F26] text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      <div className="container relative z-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-1 space-y-6">
            <Link to="/" onClick={handleLogoClick} className="inline-block relative hover:opacity-90 transition-opacity">
              <img src={logoImage} alt="TudaSuda" className="h-20 md:h-24 w-auto object-contain relative z-10" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Сервис для поиска и бронирования билетов на поезда, самолёты и автобусы по всей России.
            </p>
            <Button asChild className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              <Link to="/" className="flex items-center gap-2"><MessageCircle className="w-5 h-5" />Нужна помощь?</Link>
            </Button>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-6">Навигация</h3>
            <nav className="flex flex-col gap-4">
              <Link to="/" className="text-muted-foreground hover:text-white transition-colors duration-200 text-sm">Главная</Link>
              <Link to="/routes" className="text-muted-foreground hover:text-white transition-colors duration-200 text-sm">Маршруты</Link>
              <Link to="/reference" className="text-muted-foreground hover:text-white transition-colors duration-200 text-sm">Справочная</Link>
              <Link to="/blog" className="text-muted-foreground hover:text-white transition-colors duration-200 text-sm">Блог</Link>
              <Link to="/guide" className="text-muted-foreground hover:text-white transition-colors duration-200 text-sm">Путеводитель</Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-6">Поддержка</h3>
            {footer.email && (
              <div className="flex flex-col gap-4 mb-6">
                <a href={`mailto:${footer.email}`} className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors duration-200 text-sm group">
                  <Mail className="w-4 h-4 group-hover:text-primary transition-colors" /><span>{footer.email}</span>
                </a>
              </div>
            )}
            {visibleSocials.length > 0 && (
              <>
                <h3 className="text-lg font-bold text-white mb-4">Мы в соцсетях</h3>
                <div className="flex gap-3">
                  {visibleSocials.map((s) => (
                    <a key={s.kind} href={s.url} target="_blank" rel="noopener noreferrer"
                      className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${socialClass(s.kind)}`}
                      aria-label={socialLabel(s.kind)}>
                      {socialIcon(s.kind)}
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-6">Подписка на новости</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">Получайте актуальные предложения и специальные акции на почту</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input type="email" placeholder="Ваш email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={status === "loading"}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-primary h-12 disabled:opacity-50" required />
              <Button type="submit" disabled={status === "loading"}
                className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-semibold h-12 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50">
                {status === "loading" ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Отправка…</>) :
                 status === "success" ? "Спасибо! Подписка оформлена." :
                 status === "already" ? "Вы уже подписаны." :
                 (<>Подписаться<ArrowRight className="w-4 h-4 ml-2" /></>)}
              </Button>
              {status === "error" && (<p className="text-red-400 text-sm">{errorMsg}</p>)}
            </form>
          </div>
        </div>
        <div className="border-t border-white/10 my-12"></div>
        <div className="flex flex-col gap-6">
          {footer.freeText && footer.freeText.trim() !== "" && (
            <div className="text-muted-foreground text-sm whitespace-pre-wrap leading-relaxed">{footer.freeText}</div>
          )}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-muted-foreground text-sm">{footer.copyright}</div>
            <div className="flex flex-wrap gap-6 text-sm">
              {visibleDocuments.map((d, i) => (
                <a key={i} href={d.fileUrl || "#"} target={d.fileUrl ? "_blank" : undefined} rel={d.fileUrl ? "noopener noreferrer" : undefined}
                  className={"transition-colors duration-200 " + (d.fileUrl ? "text-muted-foreground hover:text-white" : "text-muted-foreground/60 cursor-not-allowed")}
                  onClick={(e) => { if (!d.fileUrl) e.preventDefault(); }}>
                  {d.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
