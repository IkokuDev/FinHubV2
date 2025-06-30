'use client';

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Briefcase } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = (role: 'provider' | 'customer') => {
    login(role);
    if (role === 'provider') {
      router.push('/provider/dashboard');
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex justify-center items-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold font-headline">Login</CardTitle>
          <CardDescription>Select a role to continue (for development)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={() => handleLogin('provider')}
            className="w-full"
            size="lg"
          >
            <Briefcase className="mr-2 h-5 w-5" />
            Login as Provider
          </Button>
          <Button
            onClick={() => handleLogin('customer')}
            className="w-full"
            variant="secondary"
            size="lg"
          >
            <User className="mr-2 h-5 w-5" />
            Login as Customer
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
