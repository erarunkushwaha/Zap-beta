"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-between overflow-hidden bg-white">
      {/* Left side content */}
      <div className="max-w-7xl mx-auto px-6 py-16 flex-1 z-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold text-orange-500 uppercase tracking-wide mb-4">
            SCALE AI AGENTS WITH ZAPIER
          </p>
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            The most connected AI orchestration platform
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Build and ship AI workflows in minutes—no IT bottlenecks, no
            complexity. Just results.
          </p>
          <div className="flex items-center gap-4 mb-12">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-6 text-base">
              Start free with email
            </Button>
          </div>
        </div>
      </div>

      {/* Right side decorative elements */}
      <div className="flex-1 relative h-full min-h-screen hidden lg:flex items-center justify-end pr-12">
        <Image
          src="/hero.png"
          width={1000}
          height={1000}
          alt="Hero Image"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
