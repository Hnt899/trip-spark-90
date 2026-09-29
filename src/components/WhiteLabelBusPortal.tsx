import { useEffect } from "react";
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

/**
 * White Label модуль поиска АВТОБУСОВ (tripandfly embedded portal).
 * Отображается ТОЛЬКО на вкладке «Автобусы» в hero-форме.
 */
const WhiteLabelBusPortal = () => {
  useEffect(() => {
    // Скрипт подключается один раз на всю страницу
    if (document.querySelector(`script[src="${WL_SCRIPT_SRC}"]`)) {
      return;
    }
    const script = document.createElement("script");
    script.type = "module";
    script.src = WL_SCRIPT_SRC;
    script.async = true;
    script.onload = () => console.info("[WL] embedded.js загружен");
    script.onerror = () => console.error("[WL] не удалось загрузить embedded.js");
    document.body.appendChild(script);
    // НЕ удаляем скрипт при размонтировании — модуль должен переживать переключение вкладок
  }, []);

  return (
    <div
      className="w-full overflow-x-auto"
      style={{ minWidth: 360 }}
    >
      <div
        className="min-h-[400px] md:min-h-[600px] w-full rounded-lg bg-white p-2 md:p-4 shadow-inner"
        style={{ minWidth: 360 }}
      >
        <wl-embedded-portal partnerid={WL_PARTNER_ID} />
      </div>
    </div>
  );
};

export default WhiteLabelBusPortal;