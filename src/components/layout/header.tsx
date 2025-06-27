"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";

const publicLinks = [
  { href: "/", label: "Marketplace" },
];

const protectedLinks = [
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
            {publicLinks.map(renderLink)}
            <SignedIn>
              {protectedLinks.map(renderLink)}
            </SignedIn>
          </nav>
          <div className="flex items-center gap-2">
              <SignedOut>
                  <SignInButton mode="modal">
                      <Button variant="ghost">Sign In</Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                      <Button>Sign Up</Button>
                  </SignUpButton>
              </SignedOut>
              <SignedIn>
                  <UserButton afterSignOutUrl="/" />
              </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}
