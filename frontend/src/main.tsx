import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './app/configureStore';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.scss';

import SectionLayout from './components/SectionLayout';
import Lp from './pages/Lp';
import Search from './pages/Search';
import NewsFeedsList from './pages/NewsFeedsList';
import NewsContent from './pages/NewsContent';

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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
