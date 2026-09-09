import { useLayoutEffect, useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * При смене маршрута всегда открываем страницу с верха (без «наследия» скролла с предыдущей).
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

/**
 * Компонент для отправки событий просмотра страниц в Яндекс Метрику
 * при навигации по SPA-маршрутам.
 */
export const YandexMetrikaPageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Отправляем событие просмотра страницы при каждом изменении маршрута
    if (window.ym) {
      window.ym(112394184, 'hit', window.location.href);
    }
  }, [location]);

  return null;
};

export default ScrollToTop;
