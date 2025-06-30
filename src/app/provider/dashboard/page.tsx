'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import ServiceForm from "@/components/provider/service-form";
import { Loader2 } from 'lucide-react';

export default function ProviderDashboardPage() {
  const { userRole, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && userRole !== 'provider') {
      router.push('/login');
    }
  }, [userRole, loading, router]);

  if (loading || userRole !== 'provider') {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 min-h-[calc(100vh-200px)]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <p className="text-muted-foreground mt-4">Verifying access...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight lg:text-5xl">
          Provider Portal
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Manage your insurance products and services.
        </p>
      </div>

      <ServiceForm />
    </div>
  );
}
