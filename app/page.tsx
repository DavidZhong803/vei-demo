import Backdrop from "@/components/vei/Backdrop";
import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import Thesis from "@/components/site/Thesis";
import Pillars from "@/components/site/Pillars";
import HowItThinks from "@/components/site/HowItThinks";
import CasesPreview from "@/components/site/CasesPreview";
import VisionMission from "@/components/site/VisionMission";
import Footer from "@/components/site/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Backdrop />
      <Nav />
      <Hero />
      <Thesis />
      <Pillars />
      <HowItThinks />
      <CasesPreview />
      <VisionMission />
      <Footer />
    </main>
  );
}
