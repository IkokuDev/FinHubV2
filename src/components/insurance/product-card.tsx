import Image from "next/image";
import Link from "next/link";
import { InsuranceProduct } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

interface ProductCardProps {
  product: InsuranceProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="flex-row items-center gap-4">
        <Image src={product.providerLogoUrl} alt={product.providerName} width={40} height={40} className="rounded-full" data-ai-hint="logo" />
        <div>
          <CardTitle className="font-headline text-xl">{product.name}</CardTitle>
          <CardDescription>{product.providerName}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <p className="text-muted-foreground">{product.description}</p>
        <div className="space-y-2">
          {product.coverage.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center bg-muted/50 p-4">
        <div className="text-2xl font-bold font-headline text-primary">
          ${product.price}
          <span className="text-sm font-normal text-muted-foreground">/mo</span>
        </div>
        <Button asChild>
          <Link href={`/subscribe/${product.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
