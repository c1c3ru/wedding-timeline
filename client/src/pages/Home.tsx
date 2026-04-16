/*
  DESIGN: "Warm Editorial"
  Home page — single-page experience
  Sections: Hero → Divider → Timeline → Divider → Menu → Divider → Gallery → Divider → Locations → Divider → RSVP → Footer
*/

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SectionDivider from "@/components/SectionDivider";
import TimelineSection from "@/components/TimelineSection";
import MenuSection from "@/components/MenuSection";
import GallerySection from "@/components/GallerySection";
import LocationsSection from "@/components/LocationsSection";
import RSVPSection from "@/components/RSVPSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.97 0.01 85)" }}>
      <Header />
      <HeroSection />
      <SectionDivider showMonogram />
      <TimelineSection />
      <SectionDivider light />
      <MenuSection />
      <SectionDivider showMonogram />
      <GallerySection />
      <SectionDivider light />
      <LocationsSection />
      <SectionDivider light />
      <RSVPSection />
      <Footer />
    </div>
  );
}
