import { useEffect } from "react";
import { MAIN_SITE_URL } from "@/lib/transfer";

/** Относительный путь внутри сайта ("/routes"), но не протокол-относительный ("//x"). */
function isInternalHref(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

/** Ссылка уже ведёт на основной сайт. */
function isMainSiteHref(href: string): boolean {
  return href === MAIN_SITE_URL || href.startsWith(`${MAIN_SITE_URL}/`) || href.startsWith(`${MAIN_SITE_URL}?`);
}

/** Превращает "/routes" в "https://ts-trip.ru/routes". */
export function toMainSiteUrl(href: string): string {
  return new URL(href, MAIN_SITE_URL).toString();
}

/**
 * На поддомене (taxi.*) все внутренние ссылки должны вести на основной сайт.
 * Шапка, подвал и контент из CMS используют относительные пути ("/routes"),
 * которые иначе открывались бы внутри поддомена: https://taxi.ts-trip.ru/routes.
 *
 * Одного переписывания href недостаточно — React Router перехватывает клик по
 * <Link> и делает pushState внутри поддомена, поэтому клик ловим на фазе
 * перехвата (capture) до обработчиков React.
 */
export function useMainSiteLinks(): void {
  useEffect(() => {
    const rewrite = (anchor: HTMLAnchorElement) => {
      const href = anchor.getAttribute("href");
      if (!href || !isInternalHref(href)) return;
      const abs = toMainSiteUrl(href);
      if (href !== abs) anchor.setAttribute("href", abs);
    };

    const rewriteAll = () => {
      document.querySelectorAll<HTMLAnchorElement>("a[href^='/']").forEach(rewrite);
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as Element | null;
      const anchor = target?.closest?.("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const url = isInternalHref(href)
        ? toMainSiteUrl(href)
        : isMainSiteHref(href)
          ? href
          : null;
      if (!url) return;

      // Ссылки, открывающиеся в новой вкладке, просто получают абсолютный адрес.
      if (anchor.target === "_blank") {
        anchor.setAttribute("href", url);
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      window.location.assign(url);
    };

    rewriteAll();

    // До клика: чтобы контекстное меню и «копировать ссылку» давали основной домен.
    document.addEventListener("mousedown", rewriteAll, true);
    document.addEventListener("click", onClick, true);

    // Подвал и статьи приходят из CMS асинхронно — ловим новые ссылки.
    const observer = new MutationObserver(rewriteAll);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousedown", rewriteAll, true);
      document.removeEventListener("click", onClick, true);
      observer.disconnect();
    };
  }, []);
}
