"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpen, Search } from "lucide-react";
import Link from "next/link";

const categories = [
  "All Categories",
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Science Fiction",
  "Romance",
  "Biography",
  "History",
  "Self-Help",
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center gap-4 px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-accent" />
          <span className="font-serif text-xl font-bold">Bookshelf</span>
        </Link>

        {/* Search - center on desktop */}
        <div className="flex flex-1 items-center gap-2 md:mx-8">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by title or author..."
              className="w-full pl-9"
            />
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          <Select defaultValue="all">
            <SelectTrigger className="hidden w-[140px] md:flex">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem
                  key={category}
                  value={category.toLowerCase().replace(/\s+/g, "-")}
                >
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button asChild size="sm" className="hidden sm:flex">
            <Link href="/create">Add Book</Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/diverse-person-portrait.png" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Jane Doe</p>
                  <p className="text-xs text-muted-foreground">
                    jane@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">My Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/create" className="sm:hidden">
                  Add Book
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
