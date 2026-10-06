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
const WL_TAG = "wl-embedded-portal";
const WL_READY_TIMEOUT_MS = 8000;

type WlStatus = "loading" | "ready" | "error";

/**
 * White Label модуль поиска АВТОБУСОВ (tripandfly embedded portal).
 *
 * ВАЖНО (по требованию Tripandfly):
 *  - тег `<wl-embedded-portal>` должен быть в DOM ДО загрузки `embedded.js`;
 *  - после загрузки скрипта ждём `customElements.whenDefined(WL_TAG)`,
 *    затем «прокачиваем» тег через `customElements.upgrade(el)`.
 */
const WhiteLabelBusPortal = () => {
  const [status, setStatus] = useState<WlStatus>("loading");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      // 1. Ждём, пока React отрендерит <wl-embedded-portal>
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
      if (cancelled) return;

      const el = containerRef.current?.querySelector(
        WL_TAG
      ) as HTMLElement | null;

      if (!el) {
        console.warn(`[WL] <${WL_TAG}> не найден в DOM`);
        if (!cancelled) setStatus("error");
        return;
      }

      // 2. Скрипт уже в DOM?
      let script = document.querySelector<HTMLScriptElement>(
        `script[src="${WL_SCRIPT_SRC}"]`
      );

      // 3. Если нет — создаём
      if (!script) {
        script = document.createElement("script");
        script.type = "module";
        script.src = WL_SCRIPT_SRC;
        script.async = true;
        document.body.appendChild(script);
      }

      // 4. Ждём, пока custom element будет зарегистрирован.
      //    Это самый надёжный способ: onload у module-скрипта ≠ define выполнен.
      const readyPromise = customElements.whenDefined(WL_TAG).then(() => {
        customElements.upgrade(el);
        console.info("[WL] custom element определён, тег «прокачан»");
      });

      const timeoutPromise = new Promise<void>((_, reject) => {
        setTimeout(
          () => reject(new Error("Таймаут: embedded.js не зарегистрировал custom element")),
          WL_READY_TIMEOUT_MS
        );
      });

      try {
        await Promise.race([readyPromise, timeoutPromise]);
        if (cancelled) return;
        setStatus("ready");
      } catch (e) {
        if (cancelled) return;
        console.warn("[WL]", e);
        setStatus("error");
      }
    };

    void init();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="mx-auto w-full max-w-full md:max-w-[600px]"
    >
      <div className="relative mx-auto flex min-h-[400px] w-full max-w-full items-center justify-center overflow-hidden rounded-lg bg-white/95 p-2 shadow-inner md:min-h-[600px] md:p-4">
        {/* ТЕГ РЕНДЕРИТСЯ ВСЕГДА И СРАЗУ — до загрузки скрипта */}
        <div className="w-full">
          <wl-embedded-portal partnerid={WL_PARTNER_ID} />
        </div>

        {status === "loading" && (
          <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white/85 p-6 text-center backdrop-blur-sm">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0A8FE8] border-t-transparent" />
            <p className="text-sm text-[#21252E]/60">
              Загружаем поиск автобусов…
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white/85 p-6 text-center backdrop-blur-sm">
            <p className="text-sm text-[#21252E]/70">
              Поиск автобусов временно недоступен. Попробуйте обновить
              страницу позже.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhiteLabelBusPortal;