// // src/hooks/useScript.ts
// import { useEffect } from "react";

// export default function useScript(url: string) {
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = url;
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, [url]);
// }
import { useEffect } from "react";

const ChatWidget = () => {
  useEffect(() => {
    // Create script element
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/YOUR_PROPERTY_ID/DEFAULT"; // Replace with your Tawk.to ID
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    // Append to body
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // No visible UI needed, script injects widget
};

export default ChatWidget;
