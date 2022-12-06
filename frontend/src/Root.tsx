import { Route, Routes } from "react-router-dom";
import NewsContent from "./components/NewsContent";
import NewsFeedsList from "./components/NewsFeedsList";
import SectionLayout from "./components/SectionLayout";

const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<SectionLayout component={NewsFeedsList} />} />
      <Route path="/news/content" element={<SectionLayout component={NewsContent} />} />
    </Routes>
  );
};

export default Root;
