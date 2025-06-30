
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FaqPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight lg:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Find answers to common questions about our platform and services.
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is FinHub?</AccordionTrigger>
          <AccordionContent>
            FinHub is a modern insurance marketplace that connects customers with top insurance providers, making it easy to compare and purchase policies.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How do I subscribe to a policy?</AccordionTrigger>
          <AccordionContent>
            Simply browse our marketplace, find a product you like, click "View Details", and follow the on-screen instructions to subscribe.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Can I manage my subscriptions online?</AccordionTrigger>
          <AccordionContent>
            Yes, once you are logged in as a customer, you will have access to a portal to manage your subscriptions, view policy details, and handle claims.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Are you an insurance provider?</AccordionTrigger>
          <AccordionContent>
            No, FinHub is a marketplace platform. We partner with reputable insurance providers to offer their products to a wider audience.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
