import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

/**
 * @typedef {(value: string) => void} ChangeHandler
 * @typedef {{
 *   search: string;
 *   onSearchChange: ChangeHandler;
 *   category: string;
 *   onCategoryChange: ChangeHandler;
 *   continent: string;
 *   onContinentChange: ChangeHandler;
 * }} SearchAndFiltersProps
 */

const categories = [
  { label: "All", value: "all" },
  { label: "Beach", value: "beach" },
  { label: "Mountain", value: "mountain" },
  { label: "City", value: "city" },
  { label: "Desert", value: "desert" },
  { label: "Forest", value: "forest" },
  { label: "Island", value: "island" },
  { label: "Historical", value: "historical" },
  { label: "Adventure", value: "adventure" },
];

const continents = [
  { label: "All", value: "all" },
  { label: "Africa", value: "Africa" },
  { label: "Asia", value: "Asia" },
  { label: "Europe", value: "Europe" },
  { label: "N. America", value: "North America" },
  { label: "S. America", value: "South America" },
  { label: "Oceania", value: "Oceania" },
];

/**
 * @param {SearchAndFiltersProps} props
 */
export default function SearchAndFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  continent,
  onContinentChange,
}) {
  return (
    <div className="space-y-6">
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search destinations..."
          value={search}
          onChange={(/** @type {React.ChangeEvent<HTMLInputElement>} */ e) => onSearchChange(e.target.value)}
          className="pl-10 pr-10 rounded-full bg-card border-border h-11"
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat.value}
              variant={category === cat.value ? "default" : "outline"}
              size="sm"
              className="rounded-full text-xs h-8 px-4"
              onClick={() => onCategoryChange(cat.value)}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Continent</p>
        <div className="flex flex-wrap gap-2">
          {continents.map((cont) => (
            <Button
              key={cont.value}
              variant={continent === cont.value ? "default" : "outline"}
              size="sm"
              className="rounded-full text-xs h-8 px-4"
              onClick={() => onContinentChange(cont.value)}
            >
              {cont.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}