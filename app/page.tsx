import Header from "@/components/portfolio/header";
import HeroSection from "@/components/portfolio/hero-section";
import PortfolioGrid from "@/components/portfolio/portfolio-grid";
import ServicesSection from "@/components/portfolio/services-section";
import ContactSection from "@/components/portfolio/contact-section";
import Footer from "@/components/portfolio/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <PortfolioGrid />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
