/*
  DESIGN: "Warm Editorial"
  Home page — single-page experience
  Sections: Hero → Divider → Timeline → Divider → Gallery → Divider → Menu → Divider → Locations → Divider → RSVP → Footer
*/

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SectionDivider from "@/components/SectionDivider";
import TimelineSection from "@/components/TimelineSection";
import GallerySection from "@/components/GallerySection";
import MenuSection from "@/components/MenuSection";
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
      <GallerySection />
      <SectionDivider showMonogram />
      <MenuSection />
      <SectionDivider showMonogram />
      <LocationsSection />
      <SectionDivider light />
      <RSVPSection />
      <Footer />
    </div>
  );
}
