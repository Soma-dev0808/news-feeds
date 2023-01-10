import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './redux/app/configureStore';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import SectionLayout from './components/ui/SectionLayout';
import Lp from './components/pages/Lp';
import Search from './components/pages/Search';
import NewsFeedsList from './components/pages/NewsFeedsList';
import NewsContent from './components/pages/NewsContent';

import 'styles/index.scss';

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
