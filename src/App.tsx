import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { ProjectDetail } from "./pages/ProjectDetail";
import { People } from "./pages/People";
import { PersonDetail } from "./pages/PersonDetail";
import { Publications } from "./pages/Publications";
import { PublicationDetail } from "./pages/PublicationDetail";
import { News } from "./pages/News";
import { NewsDetail } from "./pages/NewsDetail";

function App() {
  return (
    <BrowserRouter basename="/cowellcomplab/">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="people" element={<People />} />
          <Route path="people/:slug" element={<PersonDetail />} />
          <Route path="publications" element={<Publications />} />
          <Route path="publications/:slug" element={<PublicationDetail />} />
          <Route path="news" element={<News />} />
          <Route path="news/:slug" element={<NewsDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
