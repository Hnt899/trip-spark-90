import { useEffect, useRef } from "react";
import type React from "react";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "wl-embedded-portal"?: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { partnerid?: string },
        HTMLElement
      >;
    }
  }
}

const WL_SCRIPT_SRC = "https://tripandfly.ru/embedded-portal/embedded.js";
const WL_PARTNER_ID = "ippilipenko_wl";

let wlScriptInjected = false;

/**
 * White Label модуль поиска АВТОБУСОВ (tripandfly embedded portal).
 * Отображается ТОЛЬКО на вкладке "Автобусы" в hero-форме.
 */
const WhiteLabelBusPortal = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Скрипт подключается один раз на страницу
    if (wlScriptInjected) return;
    if (document.querySelector(`script[src="${WL_SCRIPT_SRC}"]`)) {
      wlScriptInjected = true;
      return;
    }
    const script = document.createElement("script");
    script.type = "module";
    script.src = WL_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
    wlScriptInjected = true;
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-x-auto"
      style={{ minWidth: 360 }}
    >
      {/* Контейнер: min-height 400px (мобильные), 600px (десктоп) */}
      <div
        className="min-h-[400px] md:min-h-[600px] w-full rounded-lg bg-white/95 p-2 md:p-4 shadow-inner"
        style={{ minWidth: 360 }}
      >
        <wl-embedded-portal partnerid={WL_PARTNER_ID} />
      </div>
    </div>
  );
};

export default WhiteLabelBusPortal;
