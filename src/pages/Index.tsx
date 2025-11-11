import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import PromoSpotlight from "@/components/PromoSpotlight";
import ProductShowcaseTabs from "@/components/ProductShowcaseTabs";
import EssenzaCTA from "@/components/EssenzaCTA";
import CustomOrdersSection from "@/components/CustomOrdersSection";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <PromoSpotlight />
        <ProductShowcaseTabs />
        <EssenzaCTA />
        <CustomOrdersSection />
        <Testimonials />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
