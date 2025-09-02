// components/LanguageSelector.tsx
import React, { useEffect } from "react";

const LanguageSelector: React.FC = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      if ((window as any).google?.translate?.TranslateElement) {
        clearInterval(interval);
        new (window as any).google.translate.TranslateElement(
          { pageLanguage: "en" },
          "google_translate_element"
        );
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="google_translate_element"
      className="-mt-[30px]"
      style={{
        position: "fixed", // stays in place even when scrolling
        bottom: 20, // distance from bottom
        left: 20, // distance from left
        zIndex: 1000, // always on top
      }}
    />
  );
};

export default LanguageSelector;
