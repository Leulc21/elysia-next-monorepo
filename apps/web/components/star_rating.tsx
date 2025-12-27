"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  count?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  showCount = false,
  count,
  interactive = false,
  onRatingChange,
}: StarRatingProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const handleClick = (value: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: maxRating }).map((_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= Math.round(rating);

          return (
            <Star
              key={index}
              className={cn(
                sizeClasses[size],
                isFilled ? "fill-accent text-accent" : "text-muted-foreground",
                interactive &&
                  "cursor-pointer transition-colors hover:text-accent"
              )}
              onClick={() => handleClick(starValue)}
            />
          );
        })}
      </div>
      {showCount && count !== undefined && (
        <span className="text-sm text-muted-foreground">({count})</span>
      )}
    </div>
  );
}
