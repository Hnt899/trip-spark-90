import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Виджет трансферов Travelpayouts (KiwiTaxi).
 *
 * Скрипт tpwdgt.com при выполнении сам находит <script> с promo_id=3879,
 * помечает его script-initialized и вставляет обёртку KiwiTaxi ПЕРЕД собой
 * внутри родителя. Поэтому скрипт обязан лежать внутри своего контейнера.
 *
 * ВАЖНО: виджет инициализируется ОДИН раз на страницу. Если смонтировать
 * второй экземпляр, скрипт может «подхватить» уже вставленный чужой <script>
 * и отрисоваться не в том блоке. Повторную инициализацию блокирует
 * isTransferWidgetMounted() + отказ от размонтирования в HeroSection.
 */
const WIDGET_SRC =
  "https://tpwdgt.com/content?currency=RUB&trs=566840&shmarker=677806&locale=ru" +
  "&powered_by=true&transfer_options_limit=10&transfer_options=MCR" +
  "&disable_currency_selector=true&hide_form_extras=true&hide_external_links=true" +
  "&erid=2VtzqwP9GQu&campaign_id=1&promo_id=3879";

let mountedHost: HTMLElement | null = null;

/** true, если виджет уже отрисован и его контейнер ещё в документе */
export function isTransferWidgetMounted(): boolean {
  return !!mountedHost && mountedHost.isConnected;
}

type Props = {
  className?: string;
};

const TransferWidget = ({ className }: Props) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    if (isTransferWidgetMounted() && mountedHost !== host) {
      // Виджет уже живёт в другом блоке страницы — второй не поднимаем.
      setFailed(true);
      return;
    }

    mountedHost = host;

    const script = document.createElement("script");
    script.src = WIDGET_SRC;
    script.async = true;
    script.charset = "utf-8";
    script.addEventListener("error", () => setFailed(true));
    host.appendChild(script);

    // KiwiTaxi вставляет iframe асинхронно — ждём его, чтобы убрать скелетон.
    const observer = new MutationObserver(() => {
      if (host.querySelector("iframe")) {
        setReady(true);
        observer.disconnect();
      }
    });
    observer.observe(host, { childList: true, subtree: true });

    const safety = window.setTimeout(() => observer.disconnect(), 15000);

    return () => {
      observer.disconnect();
      window.clearTimeout(safety);
      host
        .querySelectorAll(
          '[data-kiwitaxi-white-label], [data-kiwitaxi-white-label-element], script[src*="tpwdgt.com"]'
        )
        .forEach((node) => node.remove());
      if (mountedHost === host) mountedHost = null;
    };
  }, []);

  return (
    <div className={cn("relative w-full", className)}>
      <div ref={hostRef} className="w-full" />

      {/* Скелетон, пока виджет не отрисовал iframe */}
      {!ready && !failed && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
          Загружаем варианты трансфера…
        </div>
      )}

      {failed && (
        <div className="flex flex-col items-center gap-2 py-4 text-sm text-muted-foreground">
          <span>Не удалось загрузить подбор трансфера.</span>
          <a
            className="text-primary underline underline-offset-4"
            href="https://kiwitaxi.ru/?partner=677806"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            Открыть подбор трансфера на KiwiTaxi
          </a>
        </div>
      )}
    </div>
  );
};

export default TransferWidget;
