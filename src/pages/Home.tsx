import { useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import HeroPhysics from "../components/HeroPhysics";

export default function Home() {
  useEffect(() => {
    document.title = "뉴질랜드 한민족 한글학교";
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = "https://www.nzsok.school.nz/";
  }, []);

  return (
    <div>
      <Navigation variant="full" transparent />
      <HeroPhysics />
      <Footer />
    </div>
  );
}
