import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import pages from "./generated/manifest.json";
import { PortfolioPage } from "./components/PortfolioPage";

const redirectRoutes = {
  "/careers": "/teams",
  "/careers/full-stack-developer": "/teams",
  "/elements": "/services",
};

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }

    const anchorId = location.hash.replace(/^#/, "");
    const scrollToHash = () => {
      const target = document.getElementById(anchorId);

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const rafId = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(scrollToHash);
    });

    return () => window.cancelAnimationFrame(rafId);
  }, [location.pathname, location.hash]);

  return null;
}

export default function App() {
  const blogPage = pages.find((page) => page.id === "blog");

  return (
    <>
      <ScrollManager />
      <Routes>
        {pages.map((page) => (
          <Route key={page.path} path={page.path} element={<PortfolioPage page={page} />} />
        ))}
        {blogPage ? <Route path="/blog/page/:pageNumber" element={<PortfolioPage page={blogPage} />} /> : null}
        {Object.entries(redirectRoutes).map(([from, to]) => (
          <Route key={from} path={from} element={<Navigate replace to={to} />} />
        ))}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
}
