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

type WlStatus = "loading" | "ready" | "error";

/**
 * White Label модуль поиска АВТОБУСОВ (tripandfly embedded portal).
 *
 * ВАЖНО (по требованию Tripandfly):
 *  - тег `<wl-embedded-portal>` должен быть в DOM ДО загрузки `embedded.js`;
 *  - после загрузки скрипта — «прокачиваем» существующий тег через
 *    `customElements.upgrade(el)`, чтобы скрипт его подхватил.
 */
const WhiteLabelBusPortal = () => {
  const [status, setStatus] = useState<WlStatus>("loading");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      // 1. Ждём, пока React точно отрендерит <wl-embedded-portal>
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
      if (cancelled) return;

      const el = containerRef.current?.querySelector(
        WL_TAG
      ) as HTMLElement | null;

      if (!el) {
        console.warn(`[WL] <${WL_TAG}> не найден в DOM`);
        setStatus("error");
        return;
      }

      // 2. Скрипт уже загружен и custom element зарегистрирован?
      if (customElements.get(WL_TAG)) {
        customElements.upgrade(el);
        console.info("[WL] custom element уже зарегистрирован, тег «прокачан»");
        setStatus("ready");
        return;
      }

      // 3. Скрипт уже в DOM, но ещё не загрузился? Дождаться.
      let script = document.querySelector<HTMLScriptElement>(
        `script[src="${WL_SCRIPT_SRC}"]`
      );

      if (!script) {
        script = document.createElement("script");
        script.type = "module";
        script.src = WL_SCRIPT_SRC;
        script.async = true;
        document.body.appendChild(script);
      }

      // 4. Ждём загрузки скрипта
      await new Promise<void>((resolve, reject) => {
        if (script!.dataset.loaded === "true") {
          resolve();
          return;
        }
        const onLoad = () => {
          script!.dataset.loaded = "true";
          resolve();
        };
        const onError = () =>
          reject(new Error("embedded.js не загрузился (CORS?)"));
        script!.addEventListener("load", onLoad, { once: true });
        script!.addEventListener("error", onError, { once: true });
      });

      if (cancelled) return;

      // 5. После загрузки — «прокачиваем» наш тег
      if (customElements.get(WL_TAG)) {
        customElements.upgrade(el);
        console.info("[WL] embedded.js загружен, элемент «прокачан»");
        setStatus("ready");
      } else {
        console.warn(
          `[WL] embedded.js загружен, но custom element <${WL_TAG}> не зарегистрирован`
        );
        setStatus("error");
      }
    };

    void init().catch((e) => {
      if (cancelled) return;
      console.warn("[WL] ошибка инициализации:", e);
      setStatus("error");
    });

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
        {/*
          ТЕГ РЕНДЕРИТСЯ ВСЕГДА И СРАЗУ — до подключения скрипта.
          Спиннер/ошибка — поверх, через absolute, чтобы тег оставался в DOM
          и не размонтировался при смене статуса.
        */}
        <div className="w-full">
          <wl-embedded-portal partnerid={WL_PARTNER_ID} />
        </div>

        {status !== "ready" && (
          <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white/85 p-6 text-center backdrop-blur-sm">
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