"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { mockInsuranceProducts } from '@/lib/mock-data';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, CreditCard, User, Check, ArrowRight, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function SubscribePage() {
  const params = useParams();
  const { toast } = useToast();
  const product = mockInsuranceProducts.find(p => p.id === params.id);
  const [activeTab, setActiveTab] = useState("personal");
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const handleNext = (nextTab: string) => {
    setActiveTab(nextTab);
  };
  
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Simulating payment...");
    
    setTimeout(() => {
      setIsLoading(false);
      console.log("Payment successful (simulated).");
      handleNext("confirmation");
      setIsComplete(true);
      toast({
        title: "Subscription Successful!",
        description: `You are now subscribed to ${product?.name}.`,
        variant: "default",
      });
    }, 2000);
  };

  if (!product) {
    return <div>Product not found</div>;
  }
  
  if (isComplete) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-8 max-w-lg mx-auto">
            <CheckCircle className="w-24 h-24 text-primary mb-6" />
            <h1 className="font-headline text-3xl font-bold">Subscription Confirmed!</h1>
            <p className="text-muted-foreground mt-2">
                Thank you for subscribing to {product.name}. A confirmation email has been sent to you (simulated).
            </p>
            <Button asChild className="mt-8">
                <a href="/">Back to Marketplace</a>
            </Button>
        </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50 p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-grow">
              <h1 className="font-headline text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                <Image src={product.providerLogoUrl} alt={product.providerName} width={24} height={24} className="rounded-full" data-ai-hint="logo" />
                <span>{product.providerName}</span>
              </div>
            </div>
            <div className="text-3xl font-bold font-headline text-primary self-start md:self-center">
                ${product.price}
                <span className="text-sm font-normal text-muted-foreground">/mo</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
           <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal" disabled={isComplete}>
                  <User className="mr-2 h-4 w-4" /> Personal Info
              </TabsTrigger>
              <TabsTrigger value="payment" disabled={isComplete}>
                  <CreditCard className="mr-2 h-4 w-4" /> Payment
              </TabsTrigger>
              <TabsTrigger value="confirmation" disabled={!isComplete}>
                  <Check className="mr-2 h-4 w-4" /> Confirmation
              </TabsTrigger>
            </TabsList>
            <TabsContent value="personal" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Information</CardTitle>
                  <CardDescription>Please enter your details to proceed.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" />
                  </div>
                  <Button onClick={() => handleNext('payment')} className="w-full md:w-auto">
                    Next <ArrowRight className="ml-2 h-4 w-4"/>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="payment" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Simulation</CardTitle>
                  <CardDescription>Enter dummy details to simulate payment.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePayment} className="space-y-4">
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
                      {isLoading ? 'Processing...' : `Pay $${product.price}`}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
