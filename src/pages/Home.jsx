import React from "react";
import HeroSection from "../components/home/HeroSection";
import CategoryGrid from "../components/home/CategoryGrid";
import FeaturedDestinations from "../components/home/FeaturedDestinations";
import StatsSection from "../components/home/StatsSection";
import CTASection from "../components/home/CTASection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <FeaturedDestinations />
      <CategoryGrid />
      <CTASection />
    </div>
  );
}