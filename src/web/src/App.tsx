import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ContactPage } from "./pages/Contact";
import { CvPage } from "./pages/Cv";
import { HomePage } from "./pages/Home";
import { NotFoundPage } from "./pages/NotFound";
import { ServicesPage } from "./pages/Services";
import { WorkPage } from "./pages/Work";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="work" element={<WorkPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="cv" element={<CvPage />} />
      </Routes>
    </>
  );
}
