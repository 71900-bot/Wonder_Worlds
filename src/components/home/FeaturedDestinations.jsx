import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { destinationsApi } from "@/api/destinations";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import DestinationCard from "../shared/DestinationCard";

export default function FeaturedDestinations() {
  const { data: destinations = [], isLoading } = useQuery({
    queryKey: ["featured-destinations"],
    queryFn: () => destinationsApi.getFeatured(),
  });

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4">
          <div>
            <span className="text-primary font-medium text-sm tracking-widest uppercase">
              Handpicked for You
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-3">
              Featured Destinations
            </h2>
            <p className="text-muted-foreground mt-3 max-w-md">
              Our most loved travel spots, curated to spark your wanderlust.
            </p>
          </div>
          <Link to="/explore">
            <Button variant="outline" className="rounded-full gap-2 group">
              View All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden bg-card border border-border">
                <Skeleton className="aspect-[4/3] w-full" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : destinations.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p>No featured destinations yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest, i) => (
              <DestinationCard key={dest.id} destination={dest} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}