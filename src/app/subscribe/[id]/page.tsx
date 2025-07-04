"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { mockInsuranceProducts } from '@/lib/mock-data';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';

// New components
import Stepper from '@/components/subscription/stepper';
import PersonalInfoForm from '@/components/subscription/personal-info-form';
import PaymentForm from '@/components/subscription/payment-form';
import Confirmation from '@/components/subscription/confirmation';

const STEPS = [
  { id: 'personal', name: 'Personal Info' },
  { id: 'payment', name: 'Payment' },
  { id: 'confirmation', name: 'Confirmation' },
];

export default function SubscribePage() {
  const params = useParams();
  const { toast } = useToast();
  const product = mockInsuranceProducts.find(p => p.id === params.id);
  
  const [currentStep, setCurrentStep] = useState('personal');
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    const currentIndex = STEPS.findIndex(step => step.id === currentStep);
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1].id);
    }
  };
  
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Simulating payment...");
    
    setTimeout(() => {
      setIsLoading(false);
      console.log("Payment successful (simulated).");
      handleNext(); // Move to confirmation
      toast({
        title: "Subscription Successful!",
        description: `You are now subscribed to ${product?.name}.`,
      });
    }, 2000);
  };

  if (!product) {
    return <div>Product not found</div>;
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
                ₦{product.price}
                <span className="text-sm font-normal text-muted-foreground">/mo</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
           <Stepper steps={STEPS} currentStepId={currentStep} />
           <div className="mt-8">
            {currentStep === 'personal' && (
              <PersonalInfoForm onNext={handleNext} />
            )}
            {currentStep === 'payment' && (
              <PaymentForm 
                price={product.price}
                isLoading={isLoading}
                onSubmit={handlePayment}
              />
            )}
            {currentStep === 'confirmation' && (
              <Confirmation product={product} />
            )}
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
