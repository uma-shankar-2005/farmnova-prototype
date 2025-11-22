import { useEffect } from "react";

const ChatSupportWidget = () => {
  useEffect(() => {
    if (window.Tawk_API) return;
    const s1 = document.createElement("script");
    s1.async = true;
    s1.src = "https://embed.tawk.to/YOUR_TAWKTO_PROPERTY_ID/1hxxxxxxx";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    document.body.appendChild(s1);
  }, []);
  return null;
};

export default ChatSupportWidget;
