import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 rounded-3xl p-12 sm:p-16 border border-primary/10">
            <span className="text-primary font-medium text-sm tracking-widest uppercase">
              Ready to Go?
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mt-4 leading-tight">
              The World Awaits You
            </h2>
            <p className="text-muted-foreground text-lg mt-4 max-w-lg mx-auto">
              Start exploring incredible destinations today. Your dream trip is just a click away.
            </p>
            <Link to="/explore" className="inline-block mt-8">
              <Button size="lg" className="rounded-full px-10 text-base font-medium gap-2 group">
                Start Exploring
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}