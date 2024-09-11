import HeroSection from '@/components/HeroSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import DigitalSignsSection from '@/components/DigitalSignsSection';
import CallToActionSection from '@/components/CallToActionSection';
// import BenefitsSection from '@/components/BenefitsSection';
export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <HeroSection />
        <WhyChooseUsSection />
        {/* <BenefitsSection /> */}
        <DigitalSignsSection />
        <CallToActionSection />
      </main>
    </div>
  );
}