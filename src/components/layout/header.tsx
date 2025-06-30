"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Marketplace" },
  { href: "/provider/dashboard", label: "Provider Portal" },
  { href: "/admin/dashboard", label: "Admin Dashboard" },
];

export default function Header() {
  const pathname = usePathname();

  const renderLink = (link: {href: string, label: string}) => (
    <Button
      key={link.href}
      variant="ghost"
      asChild
      className={cn(
        "transition-colors",
        pathname === link.href
          ? "text-primary hover:text-primary"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      <Link href={link.href}>{link.label}</Link>
    </Button>
  );

  return (
    <header className="bg-card shadow-sm sticky top-0 z-40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="font-headline text-xl font-semibold">FinHub</span>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(renderLink)}
          </nav>
        </div>
      </div>
    </header>
  );
}
