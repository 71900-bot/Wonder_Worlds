import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { destinationsApi } from "@/api/destinations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  MapPin,
  Star,
  Calendar,
  DollarSign,
  Sparkles,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";

export default function DestinationDetail() {
  const { id } = useParams();

  const { data: destination, isLoading } = useQuery({
    queryKey: ["destination", id],
    queryFn: () => destinationsApi.getById(id),
  });

  if (isLoading) {
    return (
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <Skeleton className="h-8 w-32 mb-8" />
        <Skeleton className="aspect-[21/9] w-full rounded-2xl mb-8" />
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-5 w-1/3 mb-6" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="pt-24 pb-16 text-center min-h-screen flex flex-col items-center justify-center">
        <h2 className="font-heading text-2xl font-bold">Destination not found</h2>
        <Link to="/explore" className="mt-4">
          <Button variant="outline" className="rounded-full gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Explore
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16 min-h-screen">
      {/* Hero Image */}
      <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
        <img
          src={destination.image_url}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12">
          <div className="max-w-5xl mx-auto">
            <Link to="/explore">
              <Button variant="ghost" size="sm" className="rounded-full gap-2 text-white hover:bg-white/20 mb-4">
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl border border-border shadow-lg p-6 sm:p-10"
        >
          <div className="flex flex-wrap items-start gap-3 mb-2">
            {destination.category && (
              <Badge className="capitalize bg-primary/10 text-primary border-primary/20">
                {destination.category}
              </Badge>
            )}
            {destination.is_featured && (
              <Badge className="bg-accent/10 text-accent border-accent/20 gap-1">
                <Sparkles className="w-3 h-3" /> Featured
              </Badge>
            )}
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mt-4">
            {destination.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mt-4 text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>{destination.country}</span>
            </div>
            {destination.continent && (
              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4" />
                <span>{destination.continent}</span>
              </div>
            )}
            {destination.rating && (
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-primary fill-primary" />
                <span className="font-semibold text-foreground">{destination.rating}/5</span>
              </div>
            )}
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {destination.best_time_to_visit && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
                <Calendar className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Best Time to Visit</p>
                  <p className="font-medium mt-1">{destination.best_time_to_visit}</p>
                </div>
              </div>
            )}
            {destination.average_cost && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
                <DollarSign className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Average Budget</p>
                  <p className="font-medium mt-1">{destination.average_cost}/day</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {(destination.long_description || destination.description) && (
            <div className="mt-8">
              <h2 className="font-heading text-xl font-semibold mb-3">About</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {destination.long_description || destination.description}
              </p>
            </div>
          )}

          {/* Highlights */}
          {destination.highlights && destination.highlights.length > 0 && (
            <div className="mt-8">
              <h2 className="font-heading text-xl font-semibold mb-4">Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {destination.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-primary/5">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery */}
          {destination.gallery && destination.gallery.length > 0 && (
            <div className="mt-8">
              <h2 className="font-heading text-xl font-semibold mb-4">Gallery</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {destination.gallery.map((img, i) => (
                  <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden">
                    <img src={img} alt={`${destination.name} gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}