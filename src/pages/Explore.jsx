import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { destinationsApi } from "@/api/destinations";
import { Skeleton } from "@/components/ui/skeleton";
import { Compass } from "lucide-react";
import SearchAndFilters from "../components/explore/SearchAndFilters";
import DestinationCard from "../components/shared/DestinationCard";

export default function Explore() {
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get("category") || "all";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [continent, setContinent] = useState("all");

  const { data: destinations = [], isLoading } = useQuery({
    queryKey: ["all-destinations"],
    queryFn: () => destinationsApi.list(),
  });

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      const matchSearch =
        !search ||
        d.name?.toLowerCase().includes(search.toLowerCase()) ||
        d.country?.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "all" || d.category === category;
      const matchContinent = continent === "all" || d.continent === continent;
      return matchSearch && matchCategory && matchContinent;
    });
  }, [destinations, search, category, continent]);

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <span className="text-primary font-medium text-sm tracking-widest uppercase">
            Discover
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold mt-2">
            Explore Destinations
          </h1>
          <p className="text-muted-foreground mt-2 max-w-lg">
            Browse our collection of handpicked travel destinations from around the world.
          </p>
        </div>

        <SearchAndFilters
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          continent={continent}
          onContinentChange={setContinent}
        />

        <div className="mt-10">
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
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <Compass className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-heading text-xl font-semibold">No destinations found</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your filters or search term.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((dest, i) => (
                <DestinationCard key={dest.id} destination={dest} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}