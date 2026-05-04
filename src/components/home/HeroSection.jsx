import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Star, Globe } from "lucide-react";
import { motion } from "framer-motion";

const HERO_IMAGE = "https://media.base44.com/images/public/69f2cea44572cde83f56ec59/b7e7b4120_generated_9ef4616f.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Santorini sunset with white domed churches"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-foreground/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px w-10 bg-primary" />
              <span className="text-primary font-medium text-sm tracking-widest uppercase">
                Explore the World
              </span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6">
              Discover Your Next{" "}
              <span className="text-primary italic">Wonder</span>
            </h1>

            <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-10 max-w-lg">
              Journey through breathtaking destinations across every continent.
              Let the world inspire your next unforgettable adventure.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/explore">
                <Button size="lg" className="rounded-full px-8 text-base font-medium gap-2 group">
                  Explore Destinations
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-8 mt-16 text-white/60"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm">50+ Destinations</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-sm">7 Continents</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm">Curated Picks</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}