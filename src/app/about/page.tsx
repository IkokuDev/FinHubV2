
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Handshake } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight lg:text-5xl">
          About FinHub
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Simplifying insurance for everyone. We're on a mission to create a transparent, user-friendly marketplace for financial products.
        </p>
      </div>

      <div className="relative">
        <Image 
          src="https://placehold.co/1200x500.png"
          alt="Our Team"
          width={1200}
          height={500}
          className="rounded-lg object-cover w-full h-auto"
          data-ai-hint="team business"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div className="flex flex-col items-center">
          <Handshake className="h-12 w-12 text-primary mb-4" />
          <h3 className="font-headline text-2xl font-semibold">Our Mission</h3>
          <p className="text-muted-foreground mt-2">To connect individuals and businesses with the best insurance providers through a seamless digital experience.</p>
        </div>
        <div className="flex flex-col items-center">
          <Target className="h-12 w-12 text-primary mb-4" />
          <h3 className="font-headline text-2xl font-semibold">Our Vision</h3>
          <p className="text-muted-foreground mt-2">To be the most trusted and transparent financial marketplace, empowering users to make informed decisions with confidence.</p>
        </div>
        <div className="flex flex-col items-center">
          <Users className="h-12 w-12 text-primary mb-4" />
          <h3 className="font-headline text-2xl font-semibold">Our Team</h3>
          <p className="text-muted-foreground mt-2">A passionate group of innovators, technologists, and financial experts dedicated to revolutionizing the industry.</p>
        </div>
      </div>
    </div>
  )
}
