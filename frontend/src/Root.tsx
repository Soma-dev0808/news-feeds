import { Route, Routes } from "react-router-dom";
import NewsContent from "./components/NewsContent";
import NewsFeedsList from "./components/NewsFeedsList";

const Root = () => {
  return (
    <div className="app-root">
      <Routes>
        <Route path="/" element={<NewsFeedsList />} />
        <Route path="/news/content" element={<NewsContent />} />
      </Routes>
    </div>
  );
};

export default Root;
