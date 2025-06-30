
'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { BarChart, CheckCircle, Clock, Target, TrendingUp } from 'lucide-react';

const questionnaireSchema = z.object({
  fullName: z.string().min(2, 'Full name is required.'),
  age: z.coerce.number().min(18, 'You must be at least 18 years old.'),
  netWorth: z.string({ required_error: 'Please select your net worth.' }),
  incomeSource: z.string({ required_error: 'Please select your primary income source.' }),
  investmentObjective: z.enum(['preservation', 'income', 'growth'], {
    required_error: 'You need to select an investment objective.',
  }),
  riskTolerance: z.array(z.number()).min(1).max(1),
  investmentHorizon: z.string({ required_error: 'Please select your investment horizon.' }),
  financialKnowledge: z.string({ required_error: 'Please select your financial knowledge level.' }),
  esgPreference: z.boolean().default(false),
});

type QuestionnaireFormValues = z.infer<typeof questionnaireSchema>;

const defaultValues: Partial<QuestionnaireFormValues> = {
  riskTolerance: [5],
  esgPreference: false,
};

const ResultsDisplay = ({ data, onRetake }: { data: QuestionnaireFormValues, onRetake: () => void }) => {
    const riskLabels: { [key: number]: string } = {
        1: 'Very Conservative', 2: 'Conservative', 3: 'Conservative',
        4: 'Moderate', 5: 'Moderate', 6: 'Moderate',
        7: 'Aggressive', 8: 'Aggressive', 9: 'Very Aggressive', 10: 'Very Aggressive'
    };
    const riskLevel = Math.round(data.riskTolerance[0]);
    const riskLabel = riskLabels[riskLevel];

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="font-headline text-2xl">Your Wealth Profile Summary</CardTitle>
                        <CardDescription>Based on your answers, here is a summary of your investment profile.</CardDescription>
                    </div>
                    <Button onClick={onRetake} variant="outline">Retake Questionnaire</Button>
                </div>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6 pt-4">
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Risk Tolerance</CardTitle>
                        <Target className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{riskLabel} ({riskLevel}/10)</div>
                        <Progress value={riskLevel * 10} className="mt-2" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Primary Objective</CardTitle>
                        <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold capitalize">{data.investmentObjective}</div>
                        <p className="text-xs text-muted-foreground">Focus on capital {data.investmentObjective}.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Investment Horizon</CardTitle>
                        <Clock className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.investmentHorizon}</div>
                         <p className="text-xs text-muted-foreground">Timeframe for investments.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Financial Knowledge</CardTitle>
                        <BarChart className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.financialKnowledge}</div>
                        <p className="text-xs text-muted-foreground">Self-assessed expertise.</p>
                    </CardContent>
                </Card>
                <Card className="md:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Preferences</CardTitle>
                         <CheckCircle className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-2">
                             <Checkbox id="esg-result" checked={data.esgPreference} disabled />
                            <label htmlFor="esg-result" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Interested in ESG (Environmental, Social, and Governance) Investing
                            </label>
                        </div>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
};

export default function WealthQuestionnaire() {
    const [results, setResults] = useState<QuestionnaireFormValues | null>(null);

    const form = useForm<QuestionnaireFormValues>({
        resolver: zodResolver(questionnaireSchema),
        defaultValues,
        mode: 'onChange'
    });

    function onSubmit(data: QuestionnaireFormValues) {
        setResults(data);
    }

    if (results) {
        return <ResultsDisplay data={results} onRetake={() => { form.reset(); setResults(null); }} />;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Wealth Management Questionnaire</CardTitle>
                <CardDescription>Help us understand your financial goals and risk tolerance. All fields are required.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Section 1: Personal & Financial Information</AccordionTrigger>
                                <AccordionContent className="space-y-4 pt-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <FormField control={form.control} name="fullName" render={({ field }) => (
                                            <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                        <FormField control={form.control} name="age" render={({ field }) => (
                                            <FormItem><FormLabel>Age</FormLabel><FormControl><Input type="number" placeholder="35" {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                    <FormField control={form.control} name="netWorth" render={({ field }) => (
                                        <FormItem><FormLabel>Approximate Net Worth</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select range" /></SelectTrigger></FormControl><SelectContent><SelectItem value="< $50k">&lt; $50,000</SelectItem><SelectItem value="$50k - $250k">$50,000 - $250,000</SelectItem><SelectItem value="$250k - $1M">$250,000 - $1,000,000</SelectItem><SelectItem value="> $1M">&gt; $1,000,000</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                                    )} />
                                    <FormField control={form.control} name="incomeSource" render={({ field }) => (
                                        <FormItem><FormLabel>Primary Income Source</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select source" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Employment">Employment</SelectItem><SelectItem value="Business">Business</SelectItem><SelectItem value="Investments">Investments</SelectItem><SelectItem value="Retirement">Retirement</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                                    )} />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Section 2: Investment Goals & Risk Profile</AccordionTrigger>
                                <AccordionContent className="space-y-8 pt-4">
                                    <FormField control={form.control} name="investmentObjective" render={({ field }) => (
                                        <FormItem className="space-y-3"><FormLabel>Primary Investment Objective</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1"><FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="preservation" /></FormControl><FormLabel className="font-normal">Capital Preservation: Focus on protecting my initial investment.</FormLabel></FormItem><FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="income" /></FormControl><FormLabel className="font-normal">Income: Generate regular cash flow from my investments.</FormLabel></FormItem><FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="growth" /></FormControl><FormLabel className="font-normal">Growth: Maximize long-term returns, accepting higher volatility.</FormLabel></FormItem></RadioGroup></FormControl><FormMessage /></FormItem>
                                    )} />
                                    <FormField control={form.control} name="riskTolerance" render={({ field }) => (
                                        <FormItem><FormLabel>Risk Tolerance (1=Low, 10=High)</FormLabel><FormControl><Slider defaultValue={[5]} min={1} max={10} step={1} onValueChange={field.onChange} /></FormControl><FormDescription>How much risk are you willing to take on for potential returns?</FormDescription><FormMessage /></FormItem>
                                    )} />
                                     <FormField control={form.control} name="investmentHorizon" render={({ field }) => (
                                        <FormItem><FormLabel>Investment Horizon</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select timeframe" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Short-term (< 3 years)">Short-term (&lt; 3 years)</SelectItem><SelectItem value="Medium-term (3-10 years)">Medium-term (3-10 years)</SelectItem><SelectItem value="Long-term (> 10 years)">Long-term (&gt; 10 years)</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                                    )} />
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3">
                                <AccordionTrigger>Section 3: Knowledge & Preferences</AccordionTrigger>
                                <AccordionContent className="space-y-6 pt-4">
                                   <FormField control={form.control} name="financialKnowledge" render={({ field }) => (
                                        <FormItem><FormLabel>Financial Knowledge</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Beginner">Beginner</SelectItem><SelectItem value="Intermediate">Intermediate</SelectItem><SelectItem value="Advanced">Advanced</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                                    )} />
                                    <FormField control={form.control} name="esgPreference" render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><div className="space-y-1 leading-none"><FormLabel>ESG Investing</FormLabel><FormDescription>I am interested in Environmental, Social, and Governance factors in my investments.</FormDescription></div></FormItem>
                                    )} />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <Button type="submit">View My Profile</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
