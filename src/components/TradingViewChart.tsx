// src/components/TradingViewChart.tsx
import React, { useEffect, useRef } from "react";

const TradingViewChart: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      // check if TradingView script already loaded
      if (!(window as any).TradingView) {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/tv.js";
        script.async = true;
        script.onload = () => createWidget();
        document.head.appendChild(script);
      } else {
        createWidget();
      }
    }

    function createWidget() {
      if (container.current && (window as any).TradingView) {
        new (window as any).TradingView.widget({
          container_id: container.current.id,
          autosize: true,
          symbol: "BINANCE:BTCUSDT",
          interval: "D",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          hide_side_toolbar: false,
          allow_symbol_change: true,
        });
      }
    }
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div
        id="tradingview_chart"
        ref={container}
        style={{ height: "400px", width: "100%" }}
      />
    </div>
  );
};

export default TradingViewChart;
