"use client";

import { useState } from "react";
import { InsuranceProduct } from "@/lib/types";
import { mockInsuranceProducts } from "@/lib/mock-data";
import ProductCard from "@/components/insurance/product-card";
import ProductFilters from "@/components/insurance/product-filters";

export default function Home() {
  const [products, setProducts] = useState<InsuranceProduct[]>(mockInsuranceProducts);
  const [filter, setFilter] = useState<'all' | 'health' | 'auto' | 'life'>('all');

  const handleFilterChange = (newFilter: 'all' | 'health' | 'auto' | 'life') => {
    setFilter(newFilter);
    if (newFilter === 'all') {
      setProducts(mockInsuranceProducts);
    } else {
      setProducts(mockInsuranceProducts.filter(p => p.type === newFilter));
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight lg:text-5xl">
          Find Your Perfect Insurance
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Compare and subscribe to the best plans from top providers.
        </p>
      </div>

      <ProductFilters activeFilter={filter} onFilterChange={handleFilterChange} />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
