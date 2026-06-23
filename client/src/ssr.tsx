import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';
import type { Doc } from './dto/response';

export const renderAppToString = (data: Doc, lang: string = 'en') => {
  return renderToString(<App data={data} lang={lang} />);
};
