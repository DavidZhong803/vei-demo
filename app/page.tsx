import EngineBackdrop from "@/components/vea-site/EngineBackdrop";
import Nav from "@/components/vea-site/Nav";
import Hero from "@/components/vea-site/Hero";
import LivingEngine from "@/components/vea-site/LivingEngine";
import SellingPoints from "@/components/vea-site/SellingPoints";
import Access from "@/components/vea-site/Access";
import BetaCTA from "@/components/vea-site/BetaCTA";
import Footer from "@/components/vea-site/Footer";

export default function Home() {
  return (
    <main className="relative text-white">
      <EngineBackdrop />
      <Nav />
      <Hero />
      <LivingEngine />
      <SellingPoints />
      <Access />
      <BetaCTA />
      <Footer />
    </main>
  );
}
