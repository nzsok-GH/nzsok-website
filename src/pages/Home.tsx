import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import HeroPhysics from "../components/HeroPhysics";

export default function Home() {
  return (
    <div>
      <Navigation variant="full" transparent />
      <HeroPhysics />
      <Footer />
    </div>
  );
}
