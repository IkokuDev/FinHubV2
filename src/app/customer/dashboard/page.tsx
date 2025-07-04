
'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCard from "@/components/admin/stats-card";
import SpendingChart from "@/components/customer/spending-chart";
import { CreditCard, Calendar, FileText, Loader2 } from "lucide-react";
import WealthQuestionnaire from '@/components/customer/wealth-questionnaire';

export default function CustomerDashboardPage() {
    const { userRole, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && userRole !== 'customer') {
            router.push('/login');
        }
    }, [userRole, loading, router]);

    if (loading || userRole !== 'customer') {
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
                    Customer Dashboard
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Your financial overview and subscriptions.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <StatsCard
                    title="Active Subscriptions"
                    value="3"
                    change="2 Health, 1 Auto"
                    icon={FileText}
                />
                <StatsCard
                    title="Total Monthly Cost"
                    value="₦550"
                    change="Across all policies"
                    icon={CreditCard}
                />
                <StatsCard
                    title="Next Payment Due"
                    value="July 15, 2024"
                    change="Auto-renewal active"
                    icon={Calendar}
                />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Spending Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <SpendingChart />
                </CardContent>
            </Card>

            <WealthQuestionnaire />

        </div>
    );
}
