export interface InsuranceProduct {
  id: string;
  providerId: string;
  name: string;
  type: 'health' | 'auto' | 'life';
  description: string;
  price: number;
  coverage: string[];
  providerName: string;
  providerLogoUrl: string;
}

export interface Provider {
  id: string;
  name: string;
  logoUrl: string;
}
