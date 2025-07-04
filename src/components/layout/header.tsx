"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Leaf, LogIn, LogOut, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

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
    { href: "/customer/dashboard", label: "Customer Portal" },
    { href: "/provider/dashboard", label: "Provider Portal" },
    { href: "/admin/dashboard", label: "Admin Dashboard" },
    { href: "/about", label: "About Us" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact Us" },
  ];

  const navLinks = allNavLinks.filter(link => {
    switch (link.href) {
      case '/customer/dashboard':
        return userRole === 'customer';
      case '/provider/dashboard':
        return userRole === 'provider';
      case '/admin/dashboard':
        return userRole === 'admin';
      default:
        // Show other links like Marketplace
        return true;
    }
  });

  return (
    <header className="bg-card shadow-sm sticky top-0 z-40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="font-headline text-xl font-semibold">FinHub</span>
        </Link>
        
        {/* Desktop Nav & Auth */}
        <div className="hidden md:flex items-center gap-4">
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
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
            ))}
          </nav>
          <div className="w-px h-6 bg-border mx-2" />
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

        {/* Mobile Nav */}
        <div className="md:hidden">
           <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                  <div className="flex flex-col h-full">
                    <SheetClose asChild>
                      <Link href="/" className="flex items-center gap-2 mb-8">
                        <Leaf className="h-6 w-6 text-primary" />
                        <span className="font-headline text-xl font-semibold">FinHub</span>
                      </Link>
                    </SheetClose>
                    <nav className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                           <SheetClose asChild key={link.href}>
                             <Link
                               href={link.href}
                               className={cn(
                                 "text-lg hover:text-primary transition-colors",
                                 pathname === link.href ? "font-semibold text-primary" : "text-muted-foreground"
                               )}
                             >
                               {link.label}
                             </Link>
                           </SheetClose>
                        ))}
                    </nav>
                     <div className="mt-auto">
                        <div className="pt-4 border-t">
                          {userRole ? (
                              <div className="flex flex-col gap-4">
                                  <p className="text-lg text-muted-foreground capitalize">
                                      Hi, {userRole}
                                  </p>
                                  <SheetClose asChild>
                                      <Button variant="outline" onClick={handleLogout} className="w-full">
                                          <LogOut className="mr-2 h-4 w-4" />
                                          Logout
                                      </Button>
                                  </SheetClose>
                              </div>
                          ) : (
                              <SheetClose asChild>
                                  <Button asChild className="w-full">
                                      <Link href="/login">
                                          <LogIn className="mr-2 h-4 w-4" />
                                          Login
                                      </Link>
                                  </Button>
                              </SheetClose>
                          )}
                        </div>
                    </div>
                  </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
