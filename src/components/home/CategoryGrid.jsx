import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Palmtree, Mountain, Building2, TreePine, Sun, Waves } from "lucide-react";

const categories = [
  { name: "Beach", icon: Palmtree, color: "bg-cyan-50 text-cyan-600", value: "beach" },
  { name: "Mountain", icon: Mountain, color: "bg-emerald-50 text-emerald-600", value: "mountain" },
  { name: "City", icon: Building2, color: "bg-violet-50 text-violet-600", value: "city" },
  { name: "Forest", icon: TreePine, color: "bg-green-50 text-green-600", value: "forest" },
  { name: "Desert", icon: Sun, color: "bg-amber-50 text-amber-600", value: "desert" },
  { name: "Island", icon: Waves, color: "bg-blue-50 text-blue-600", value: "island" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function CategoryGrid() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-14">
        <span className="text-primary font-medium text-sm tracking-widest uppercase">
          Browse by Type
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-3">
          Find Your Perfect Escape
        </h2>
        <p className="text-muted-foreground mt-4 max-w-md mx-auto">
          Whether you crave waves or peaks, bustling streets or quiet trails — we've got you covered.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <motion.div key={cat.value} variants={item}>
              <Link
                to={`/explore?category=${cat.value}`}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-border bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-xl ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="font-medium text-sm">{cat.name}</span>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}