import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import LoadingScreen from "./components/LoadingScreen";
import Navigation from "./components/Navigation";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Education = lazy(() => import("./pages/Education"));
const Enrol = lazy(() => import("./pages/Enrol"));
const Media = lazy(() => import("./pages/Media"));

function ScrollRestore() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const tryScroll = () => {
      const el = document.querySelector(hash);
      if (el) { el.scrollIntoView({ behavior: "smooth" }); return true; }
      return false;
    };
    if (!tryScroll()) {
      const t = setTimeout(tryScroll, 400);
      return () => clearTimeout(t);
    }
  }, [pathname, hash]);
  return null;
}

function AppRoutes() {
  const location = useLocation();
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ScrollRestore />
      <Navigation variant="full" transparent={location.pathname === "/"} />
      <div key={location.pathname} className="page-enter">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/education" element={<Education />} />
          <Route path="/enrol" element={<Enrol />} />
          <Route path="/media" element={<Media />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Analytics />
    </BrowserRouter>
  );
}
