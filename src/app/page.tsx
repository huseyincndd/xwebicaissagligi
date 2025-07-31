import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import WhyUsSection from "../components/WhyUsSection";
import SocialProofSection from "../components/SocialProofSection";
import TeamSection from "../components/TeamSection";
import ProcessSection from "../components/ProcessSection";
import FaqSection from "../components/FaqSection";
import ContactSection from "../components/ContactSection";

// ISR için revalidation süresi (60 saniye)
export const revalidate = 60;

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <SocialProofSection />
      <TeamSection />
      <ProcessSection />
      <FaqSection />
      <ContactSection />
    </main>
  );
}
