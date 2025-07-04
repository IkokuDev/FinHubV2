'use client';

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import type { InsuranceProduct } from "@/lib/types";
import Link from "next/link";

interface ConfirmationProps {
    product: InsuranceProduct;
}

export default function Confirmation({ product }: ConfirmationProps) {
    return (
        <div className="flex flex-col items-center justify-center text-center p-8 max-w-lg mx-auto">
            <CheckCircle className="w-24 h-24 text-primary mb-6" />
            <h1 className="font-headline text-3xl font-bold">Subscription Confirmed!</h1>
            <p className="text-muted-foreground mt-2">
                Thank you for subscribing to {product.name}. A confirmation email has been sent to you (simulated).
            </p>
            <Button asChild className="mt-8">
                <Link href="/">Back to Marketplace</Link>
            </Button>
        </div>
    );
}
