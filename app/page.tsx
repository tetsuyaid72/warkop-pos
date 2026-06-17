import { LandingNav } from "@/components/landing/nav";
import { LandingHero } from "@/components/landing/hero";
import { LandingMarquee } from "@/components/landing/marquee";
import { LandingMenu } from "@/components/landing/menu";
import { LandingGallery } from "@/components/landing/gallery";
import { LandingFeatures } from "@/components/landing/features";
import { LandingHowItWorks } from "@/components/landing/how-it-works";
import { LandingTestimonials } from "@/components/landing/testimonials";
import { LandingLocation } from "@/components/landing/location";
import { LandingFAQ } from "@/components/landing/faq";
import { LandingCTA } from "@/components/landing/cta";
import { LandingFooter } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <main>
        <LandingHero />
        <LandingMarquee />
        <LandingGallery />
        <LandingMenu />
        <LandingFeatures />
        <LandingHowItWorks />
        <LandingTestimonials />
        <LandingLocation />
        <LandingFAQ />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
