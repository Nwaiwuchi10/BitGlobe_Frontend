import React, { useEffect, useRef } from "react";
import "./TradingTicker.css";

const TradingTicker: React.FC = () => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "FX_IDC:EURUSD", title: "EUR/USD" },
        { proName: "FX_IDC:CADJPY", title: "CAD/JPY" },
        { proName: "FX_IDC:USDJPY", title: "USD/JPY" },
        { proName: "FX_IDC:GBPJPY", title: "GBP/JPY" },
        { proName: "FX_IDC:EURAUD", title: "EUR/AUD" },
      ],
      colorTheme: "light",
      isTransparent: false,
      displayMode: "regular",
      locale: "en",
    });

    if (widgetRef.current) {
      widgetRef.current.innerHTML = ""; // Clear any previous script
      widgetRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="ticker-container">
      <div className="tradingview-widget-container" ref={widgetRef}></div>
    </div>
  );
};

export default TradingTicker;
