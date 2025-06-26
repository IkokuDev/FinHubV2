# **App Name**: FinHub MVP

## Core Features:

- Insurance Marketplace: User Portal (Marketplace UI): Display insurance products using mock data with filters by type (health, auto, life).
- Simulated Subscription Flow: Subscription Flow (UI Only): Develop a simulated user subscription flow within the User Portal, demonstrating the steps involved.
- Payment Simulation: Payment UI: Integrate Stripe and Flutterwave UI elements to simulate the payment process, including displaying payment forms and a simulated checkout experience. No actual payment processing.
- Provider Service Creation: Provider Portal: Implement the service creation form UI for adding/updating insurance products with temporary storage (logging to console).
- Admin Mock Dashboard: Admin Dashboard (UI Only): Populate the dashboard UI with insights derived from static mock data, showing simulated revenue metrics, and user/provider activity.
- Static Data Simulation: Mock Data: Utilization of comprehensive static mock data (e.g., JSON objects or arrays) for InsuranceProduct and Provider collections, without database persistence.
- Multi-Tenancy Consideration: Conceptual Multi-Tenancy: Structure the mock data and UI to conceptually reflect provider data isolation.

## Style Guidelines:

- Primary color: Forest green (#228B22) to evoke growth, stability, and trust, fitting for financial services.
- Background color: Off-white (#F5F5F5), providing a clean and neutral backdrop for content, ensuring readability and focus.
- Accent color: Medium grey (#808080) to draw attention to important CTAs and highlights within the UI in a subtle, sophisticated manner.
- Headline font: 'Poppins' (sans-serif) for headlines and short amounts of body text, giving a geometric and contemporary feel. Body font: 'Inter' (sans-serif) is for longer text passages.
- Use clear, modern icons from Shadcn UI to represent different insurance types and actions within the application.
- A clean and structured layout utilizing Tailwind CSS grid and flexbox to ensure responsiveness and optimal content presentation across devices.
- Subtle transitions and animations using React Transition Group to provide smooth user interactions and visual feedback on actions (e.g., loading states, form submissions).