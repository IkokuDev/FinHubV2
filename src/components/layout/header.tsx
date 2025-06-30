
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Leaf, LogIn, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { userRole, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/');
  };
  
  const allNavLinks = [
    { href: "/", label: "Marketplace" },
    { href: "/about", label: "About Us" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact Us" },
    { href: "/provider/dashboard", label: "Provider Portal" },
    { href: "/admin/dashboard", label: "Admin Dashboard" },
  ];

  const navLinks = allNavLinks.filter(link => {
    switch (link.href) {
      case '/provider/dashboard':
        return userRole === 'provider';
      case '/admin/dashboard':
        return userRole === 'admin';
      default:
        // Show other links like Marketplace
        return true;
    }
  });

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
          <div className="w-px h-6 bg-border mx-2 hidden md:block" />
          {userRole ? (
            <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground capitalize hidden sm:inline">
                    Hi, {userRole}
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                    <LogOut className="mr-0 sm:mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Logout</span>
                </Button>
            </div>
          ) : (
            <Button asChild>
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
