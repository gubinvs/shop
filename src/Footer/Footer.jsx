import React, { useState, useEffect } from "react";
import "./Footer.css";

const Footer = () => {
  const [html, setHtml] = useState("");

  useEffect(() => {
    fetch("https://encomponent.ru/php/modules/footer.php")
      .then((res) => res.text())
      .then(setHtml);
  }, []);

  useEffect(() => {
    // === COOKIE BANNER ===
    const KEY = "cookieConsent";

    // Создаем баннер
    const banner = document.createElement("div");
    banner.id = "cookie-banner";
    banner.innerHTML = `
      <div class="cookie-inner">
        <p>Мы используем cookies для улучшения работы сайта. Подробнее — 
          <a href="/privacy" target="_blank" style="color:#8fcafc;">Политика конфиденциальности</a>.
        </p>
        <div class="cookie-actions">
          <button id="cookie-accept" class="btn btn-accept">Принять</button>
          <button id="cookie-decline" class="btn btn-decline">Отклонить</button>
        </div>
      </div>
    `;

    banner.style.cssText = `
      position:fixed;left:0;right:0;bottom:0;background:#222;color:#fff;
      padding:16px;box-shadow:0 -2px 8px rgba(0,0,0,.2);z-index:9999;
      font-family:sans-serif;display:none;
    `;

    document.body.appendChild(banner);

    const style = document.createElement("style");
    style.textContent = `
      .cookie-inner{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:12px}
      .cookie-inner p{margin:0;font-size:14px;line-height:1.4}
      .cookie-actions{display:flex;gap:8px}
      .btn{padding:8px 12px;border-radius:6px;border:0;cursor:pointer;font-size:14px}
      .btn-accept{background:#2b8a3e;color:white}
      .btn-decline{background:transparent;color:white;border:1px solid rgba(255,255,255,0.3)}
    `;
    document.head.appendChild(style);

    const sendChoiceToServer = (accepted) => {
      fetch("/php/modules/cookie-banner.php?log_cookie=1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accepted,
          timestamp: new Date().toISOString(),
          path: window.location.pathname,
          userAgent: navigator.userAgent,
        }),
      }).catch(() => {});
    };

    const setConsent = (accepted) => {
      localStorage.setItem(
        KEY,
        JSON.stringify({ accepted, timestamp: new Date().toISOString() })
      );
      sendChoiceToServer(accepted);
      banner.style.display = "none";
      if (accepted) loadAnalytics();
    };

    const loadAnalytics = () => {
      // console.log("✅ Cookies приняты — можно подключать аналитику");
      const s = document.createElement("script");
      s.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX";
      s.async = true;
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "G-XXXXXXX");
    };

    const consent = localStorage.getItem(KEY);
    if (!consent) {
      banner.style.display = "block";
      banner.querySelector("#cookie-accept").onclick = () => setConsent(true);
      banner.querySelector("#cookie-decline").onclick = () => setConsent(false);
    } else {
      const parsed = JSON.parse(consent);
      if (parsed.accepted) loadAnalytics();
    }
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Footer;
