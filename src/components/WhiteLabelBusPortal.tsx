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
const WL_TAG = "wl-embedded-portal";

/**
 * White Label модуль поиска АВТОБУСОВ (tripandfly embedded portal).
 *
 * Требования Tripandfly:
 *  - тег `<wl-embedded-portal>` должен быть в DOM ДО загрузки `embedded.js`;
 *  - после загрузки скрипта «прокачиваем» существующий тег
 *    через `customElements.upgrade(el)`.
 *
 * Никаких оверлеев / спиннеров / заглушек — рендерится только сам виджет.
 */
const WhiteLabelBusPortal = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      // Ждём кадр, чтобы React точно отрендерил <wl-embedded-portal>
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
      if (cancelled) return;

      const el = containerRef.current?.querySelector(
        WL_TAG
      ) as HTMLElement | null;
      if (!el) {
        console.warn(`[WL] <${WL_TAG}> не найден в DOM`);
        return;
      }

      // Если custom element уже зарегистрирован — просто «прокачиваем» тег
      if (customElements.get(WL_TAG)) {
        customElements.upgrade(el);
        console.info("[WL] custom element уже определён, тег «прокачан»");
        return;
      }

      // Подключаем скрипт только один раз
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

      // Ждём регистрации custom element (а не просто onload модуля)
      try {
        await customElements.whenDefined(WL_TAG);
        if (cancelled) return;
        customElements.upgrade(el);
        console.info("[WL] custom element определён, тег «прокачан»");
      } catch (e) {
        console.warn("[WL] ошибка инициализации:", e);
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
      <div className="mx-auto flex min-h-[400px] w-full max-w-full items-center justify-center overflow-hidden rounded-lg bg-white/95 p-2 shadow-inner md:min-h-[600px] md:p-4">
        <div className="w-full">
          <wl-embedded-portal partnerid={WL_PARTNER_ID} />
        </div>
      </div>
    </div>
  );
};

export default WhiteLabelBusPortal;