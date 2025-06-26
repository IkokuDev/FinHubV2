import ServiceForm from "@/components/provider/service-form";

export default function ProviderDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight lg:text-5xl">
          Provider Portal
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Manage your insurance products and services.
        </p>
      </div>

      <ServiceForm />
    </div>
  );
}
