import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { PrivacySection } from "@/components/PrivacySection";
import { InfrastructureSection } from "@/components/InfrastructureSection";
import { PartnerStrip } from "@/components/PartnerStrip";
import { StatsRow } from "@/components/StatsRow";
import { FAQSection } from "@/components/FAQSection";
import { FinalCTA } from "@/components/FinalCTA";
import { SiteFooter } from "@/components/SiteFooter";
import { HelpBubble } from "@/components/HelpBubble";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <CapabilitiesSection />
        <PrivacySection />
        <InfrastructureSection />
        <PartnerStrip />
        <StatsRow />
        <FAQSection />
        <FinalCTA />
      </main>
      <SiteFooter />
      <HelpBubble />
    </>
  );
}
