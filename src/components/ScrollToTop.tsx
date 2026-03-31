import { useLayoutEffect } from "react";
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

export default ScrollToTop;
