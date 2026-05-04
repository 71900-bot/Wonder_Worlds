import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

/**
 * @typedef {{
 *   id: string;
 *   image_url?: string;
 *   name?: string;
 *   category?: string;
 *   rating?: number;
 *   country?: string;
 *   continent?: string;
 *   description?: string;
 *   average_cost?: string;
 * }} Destination
 * @typedef {{ destination: Destination; index?: number }} DestinationCardProps
 */

/**
 * @param {DestinationCardProps} props
 */
export default function DestinationCard({ destination, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        to={`/destination/${destination.id}`}
        className="group block rounded-2xl overflow-hidden bg-card border border-border hover:shadow-xl transition-all duration-500"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={destination.image_url}
            alt={destination.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {destination.category && (
            <Badge className="absolute top-4 left-4 bg-white/90 text-foreground backdrop-blur-sm border-0 capitalize text-xs font-medium">
              {destination.category}
            </Badge>
          )}

          {destination.rating && (
            <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1">
              <Star className="w-3.5 h-3.5 text-primary fill-primary" />
              <span className="text-xs font-semibold text-foreground">{destination.rating}</span>
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="font-heading text-lg font-semibold group-hover:text-primary transition-colors">
            {destination.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1.5 text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            <span className="text-sm">{destination.country}{destination.continent ? `, ${destination.continent}` : ""}</span>
          </div>
          {destination.description && (
            <p className="text-sm text-muted-foreground mt-3 line-clamp-2 leading-relaxed">
              {destination.description}
            </p>
          )}
          {destination.average_cost && (
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <span className="text-xs text-muted-foreground">From</span>
              <span className="font-semibold text-sm text-primary">{destination.average_cost}/day</span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}