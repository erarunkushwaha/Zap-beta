"use client";

import { useState } from "react";
import Header from "@/components/header";
import Hero from "@/components/hero";
import FeaturedBanner from "@/components/featured-banner";
import Products from "@/components/products";
import Workflows from "@/components/workflows";
import Statistics from "@/components/statistics";
import Templates from "@/components/templates";
import RealTeams from "@/components/real-teams";
import Automation from "@/components/automation";
import Subscription from "@/components/subscription";
import Integration from "@/components/integration";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="w-full bg-white">
      <Header />
      <Hero />
      <FeaturedBanner />
      <Products />
      <Workflows />
      <Statistics />
      <Templates />
      <RealTeams />
      <Automation />
      <Subscription />
      <Integration />
      <Footer />
    </main>
  );
}
