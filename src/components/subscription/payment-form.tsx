'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface PaymentFormProps {
  price: number;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export default function PaymentForm({ price, isLoading, onSubmit }: PaymentFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Simulation</CardTitle>
        <CardDescription>Enter dummy details to simulate payment.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="card-name">Name on Card</Label>
            <Input id="card-name" placeholder="John M Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="card-number">Card Number</Label>
            <Input id="card-number" placeholder="1234 5678 9101 1121" />
          </div>
          <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                  <Label htmlFor="expiry-date">Expiry</Label>
                  <Input id="expiry-date" placeholder="MM/YY" />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="zip">ZIP</Label>
                  <Input id="zip" placeholder="10001" />
              </div>
          </div>
          <p className="text-xs text-muted-foreground pt-2">
              This is a simulated payment form. No real transaction will occur.
          </p>
          <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isLoading ? 'Processing...' : `Pay ₦${price}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
