import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.scss';

import SectionLayout from './components/SectionLayout';
import Lp from './components/Lp';
import Search from './components/Search';
import NewsFeedsList from './components/NewsFeedsList';
import NewsContent from './components/NewsContent';

const router = createBrowserRouter([
  {
    path: "/",
    element: <SectionLayout component={Lp} />
  },
  {
    path: "/news/search",
    element: <SectionLayout component={Search} />
  },
  {
    path: "/news/list",
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
