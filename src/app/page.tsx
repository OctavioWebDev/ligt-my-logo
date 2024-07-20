import HeroSection from '@/components/HeroSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import DigitalSignsSection from '@/components/DigitalSignsSection';
import CallToActionSection from '@/components/CallToActionSection';
import Header from '@/components/Header';
import MainFooter from '@/components/MainFooter';

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <WhyChooseUsSection />
        <DigitalSignsSection />
        <CallToActionSection />
      </main>
      <MainFooter />
    </div>
  );
}