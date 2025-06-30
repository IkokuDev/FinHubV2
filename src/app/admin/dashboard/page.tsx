'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCard from "@/components/admin/stats-card";
import OverviewChart from "@/components/admin/overview-chart";
import { DollarSign, Users, Briefcase, Activity, Loader2 } from "lucide-react";

export default function AdminDashboardPage() {
    const { userRole, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && userRole !== 'admin') {
        router.push('/login');
        }
    }, [userRole, loading, router]);

    if (loading || userRole !== 'admin') {
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
                Admin Dashboard
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                Overview of platform activity and performance.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard 
                    title="Total Revenue"
                    value="$1,250,450"
                    change="+12.5% from last month"
                    icon={DollarSign}
                />
                <StatsCard 
                    title="Active Subscriptions"
                    value="4,823"
                    change="+201 this month"
                    icon={Users}
                />
                <StatsCard 
                    title="Active Providers"
                    value="12"
                    change="+2 this month"
                    icon={Briefcase}
                />
                <StatsCard 
                    title="New Subscriptions (Today)"
                    value="38"
                    change="Simulated live data"
                    icon={Activity}
                />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <OverviewChart />
                </CardContent>
            </Card>

        </div>
    );
}
