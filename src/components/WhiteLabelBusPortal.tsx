import { useEffect, useRef, useState } from "react";
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
 *
 * На мобилке контейнер центрирован и не растягивается шире экрана.
 */
const WhiteLabelBusPortal = () => {
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (document.querySelector(`script[src="${WL_SCRIPT_SRC}"]`)) {
      setStatus("ready");
      return;
    }

    const script = document.createElement("script");
    script.type = "module";
    script.src = WL_SCRIPT_SRC;
    script.async = true;

    script.onload = () => {
      console.info("[WL] embedded.js успешно загружен");
      setStatus("ready");
    };

    script.onerror = () => {
      console.warn(
        "[WL] embedded.js не загрузился (вероятно, CORS на стороне Tripandfly)."
      );
      setStatus("error");
    };

    document.body.appendChild(script);
  }, []);

  return (
    // Внешний контейнер: центрируем по горизонтали, ограничиваем ширину
    <div
      ref={containerRef}
      className="mx-auto w-full max-w-full md:max-w-[600px]"
    >
      {/* Внутренний контейнер: min-height 400px (моб), 600px (десктоп) */}
      <div
        className="mx-auto flex min-h-[400px] w-full max-w-full items-center justify-center overflow-hidden rounded-lg bg-white/95 p-2 shadow-inner md:min-h-[600px] md:p-4"
      >
        {status === "ready" ? (
          <div className="w-full">
            <wl-embedded-portal partnerid={WL_PARTNER_ID} />
          </div>
        ) : (
          <div className="flex h-full min-h-[380px] w-full flex-col items-center justify-center gap-3 p-6 text-center md:min-h-[580px]">
            {status === "loading" ? (
              <>
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0A8FE8] border-t-transparent" />
                <p className="text-sm text-[#21252E]/60">
                  Загружаем поиск автобусов…
                </p>
              </>
            ) : (
              <p className="text-sm text-[#21252E]/70">
                Поиск автобусов временно недоступен. Попробуйте обновить
                страницу позже.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WhiteLabelBusPortal;