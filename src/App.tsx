import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { HomePage } from "./pages/HomePage";
import { ProjectPage } from "./pages/ProjectPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { getSiteContent } from "./content/loadContent";

const siteContent = getSiteContent();

export function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout profile={siteContent.profile} socials={siteContent.socials}>
            <HomePage siteContent={siteContent} />
          </MainLayout>
        }
      />
      <Route
        path="/projects/:slug"
        element={
          <MainLayout profile={siteContent.profile} socials={siteContent.socials}>
            <ProjectPage siteContent={siteContent} />
          </MainLayout>
        }
      />
      <Route
        path="*"
        element={
          <MainLayout profile={siteContent.profile} socials={siteContent.socials}>
            <NotFoundPage />
          </MainLayout>
        }
      />
    </Routes>
  );
}
