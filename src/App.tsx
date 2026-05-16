import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";

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
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ScrollRestore />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/education" element={<Education />} />
        <Route path="/enrol" element={<Enrol />} />
        <Route path="/media" element={<Media />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
