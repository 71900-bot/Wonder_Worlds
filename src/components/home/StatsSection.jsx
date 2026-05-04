import React from "react";
import { motion } from "framer-motion";
import { Globe, MapPin, Compass, Users } from "lucide-react";

const stats = [
  { icon: Globe, value: "7", label: "Continents" },
  { icon: MapPin, value: "50+", label: "Destinations" },
  { icon: Compass, value: "8", label: "Categories" },
  { icon: Users, value: "10K+", label: "Explorers" },
];

export default function StatsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <p className="font-heading text-3xl sm:text-4xl font-bold">{stat.value}</p>
                <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}