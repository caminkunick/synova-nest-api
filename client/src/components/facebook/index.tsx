import React, { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    FB: any;
  }
}

interface FacebookWidgetProps {
  pageUrl: string;
}

export const FacebookBlock: React.FC<FacebookWidgetProps> = ({ pageUrl }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [isSdkLoaded, setIsSdkLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (window.FB) {
      setIsSdkLoaded(true);
      return;
    }

    if (document.getElementById("facebook-jssdk")) {
      return;
    }

    const script = document.createElement("script");
    script.id = "facebook-jssdk";
    script.src =
      "https://connect.facebook.net/th_TH/sdk.js#xfbml=1&version=v19.0";
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.onload = () => {
      setIsSdkLoaded(true);
    };
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const newWidth = Math.floor(entry.contentRect.width);
        const clampedWidth = Math.max(180, Math.min(500, newWidth));

        setContainerWidth((prev) =>
          prev !== clampedWidth ? clampedWidth : prev,
        );
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (
      isSdkLoaded &&
      window.FB &&
      containerWidth > 0 &&
      containerRef.current
    ) {
      const timeoutId = setTimeout(() => {
        window.FB.XFBML.parse(containerRef.current);
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [containerWidth, isSdkLoaded]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", display: "flex", justifyContent: "center" }}
    >
      {/* จะเริ่ม render โครงของ Facebook ก็ต่อเมื่อรู้ขนาด และ SDK โหลดเสร็จแล้ว */}
      {isSdkLoaded && containerWidth > 0 && (
        <div
          key={containerWidth} // บังคับสร้างใหม่เมื่อขนาดเปลี่ยน
          className="fb-page"
          data-href={pageUrl}
          data-tabs="timeline"
          data-width={containerWidth}
          data-height=""
          data-small-header="false"
          data-adapt-container-width="false"
          data-hide-cover="false"
          data-show-facepile="true"
        />
      )}
      {!isSdkLoaded && (
        <div
          style={{ minHeight: "300px", display: "flex", alignItems: "center" }}
        >
          กำลังโหลด Facebook Feed...
        </div>
      )}
    </div>
  );
};
