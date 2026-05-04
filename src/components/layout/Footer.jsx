import React from "react";
import { Link } from "react-router-dom";
import { Compass, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Compass className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-heading text-xl font-bold">Wonder Worlds</span>
            </Link>
            <p className="text-background/60 text-sm leading-relaxed max-w-xs">
              Discover breathtaking destinations around the globe. Your next adventure starts here.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-3">
              <Link to="/" className="block text-sm text-background/60 hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/explore" className="block text-sm text-background/60 hover:text-primary transition-colors">
                Explore Destinations
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Categories</h4>
            <div className="grid grid-cols-2 gap-2">
              {["Beaches", "Mountains", "Cities", "Islands", "Deserts", "Forests"].map((cat) => (
                <Link
                  key={cat}
                  to={`/explore?category=${cat.toLowerCase()}`}
                  className="text-sm text-background/60 hover:text-primary transition-colors"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/40">
            © 2026 Wonder Worlds. All rights reserved.
          </p>
          <p className="text-sm text-background/40 flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-primary fill-primary" /> for travelers
          </p>
        </div>
      </div>
    </footer>
  );
}