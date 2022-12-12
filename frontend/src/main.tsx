import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.scss';

import SectionLayout from './components/SectionLayout';
import NewsFeedsList from './components/NewsFeedsList';
import NewsContent from './components/NewsContent';

const router = createBrowserRouter([
  {
    path: "/",
    element: <SectionLayout component={NewsFeedsList} />
  },
  {
    path: '/news/content',
    element: <SectionLayout component={NewsContent} />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
