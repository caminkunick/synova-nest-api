import React from "react";
import { createRoot } from "react-dom/client";
import {  } from "react-dom/server";
import { App } from "./App";

import "./index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import type { Doc } from "./dto/response";

const renderReact = (id: string, data: Doc, lang: string = "en") => {
  const root = document.getElementById(id) as HTMLElement;
  if (root) {
    const reactRoot = createRoot(root);
    reactRoot.render(
      <React.StrictMode>
        <App data={data} lang={lang} />
      </React.StrictMode>,
    );
  }
};

// @ts-ignore
globalThis.renderReact = renderReact;
