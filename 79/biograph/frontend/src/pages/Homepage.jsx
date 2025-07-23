import React from "react";
import HeroSection from "../components/HeroSection";
import FeaturedArticles from "../components/FeaturedArticles";
import TrendingSection from "../components/TrendingSection";
import BioGrid from "../components/BioGrid";

export default function Homepage() {
  return (
    <div className="bg-gray-900 text-white">
      <HeroSection />
      <FeaturedArticles />
      <TrendingSection />
      <BioGrid />
    </div>
  );
}
