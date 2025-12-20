import React from "react";
import Hero from "../components/Hero";
import MobileHero from "../components/MobileHero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsletterBox from "../components/NewsletterBox";
import CategoryCollection from "../components/CategoryCollection";

const Home = () => {
  return (
    <div>
      {/* ================= HERO ================= */}

      {/* MOBILE HERO (full-width, no padding issue) */}
      <div className="block sm:hidden -mx-4">
        <MobileHero />
      </div>

      {/* DESKTOP HERO (unchanged, perfect as is) */}
      <div className="hidden sm:block">
        <Hero />
      </div>

      {/* ================= CONTENT ================= */}

      {/* Latest Drop */}
      <LatestCollection />

      {/* Top Men's Collection */}
      <CategoryCollection title="Men" category="Men" limit={3} />

      {/* Top Women's Collection */}
      <CategoryCollection title="Women" category="Women" limit={3} />

      {/* Top Kids Collection */}
      <CategoryCollection title="Kids" category="Kids" limit={3} />

      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </div>
  );
};

export default Home;
