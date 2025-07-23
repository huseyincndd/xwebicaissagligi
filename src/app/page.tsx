import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import WhyUsSection from "../components/WhyUsSection";
import SocialProofSection from "../components/SocialProofSection";
import ProcessSection from "../components/ProcessSection";
import FaqSection from "../components/FaqSection";
import ContactSection from "../components/ContactSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <SocialProofSection />
      <ProcessSection />
      <FaqSection />
      <ContactSection />
    </main>
  );
}
