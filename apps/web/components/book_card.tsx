"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import Image from "next/image";
import Link from "next/link";
import { StarRating } from "./star_rating";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  category: string;
  description: string;
  rating: number;
  ratingCount: number;
  userName: string;
  userAvatar: string;
}

export function BookCard({
  id,
  title,
  author,
  coverImage,
  category,
  description,
  rating,
  ratingCount,
  userName,
  userAvatar,
}: BookCardProps) {
  return (
    <Link href={`/book/${id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <CardContent className="p-0">
          {/* Book Cover */}
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
            <Image
              src={coverImage || "/placeholder.svg"}
              alt={`${title} cover`}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="space-y-3 p-5">
            {/* Title & Author */}
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-semibold leading-tight line-clamp-2">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground">{author}</p>
            </div>

            {/* Category Badge */}
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>

            {/* Description */}
            <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
              {description}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <StarRating rating={rating} size="sm" />
              <span className="text-xs text-muted-foreground">
                ({ratingCount})
              </span>
            </div>

            {/* User */}
            <div className="flex items-center gap-2 border-t border-border pt-3">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={userAvatar || "/placeholder.svg"}
                  alt={userName}
                />
                <AvatarFallback>{userName[0]}</AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">{userName}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
