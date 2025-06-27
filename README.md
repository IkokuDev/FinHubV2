 FinHub: Your Modern Insurance Marketplace
Welcome to FinHub, a cutting-edge digital platform designed to revolutionize the insurance industry. This repository contains the technical blueprint and core implementation details for a secure, scalable, and user-friendly insurance marketplace, connecting providers with users seamlessly.
 Key Features
FinHub is built around a "triple-portal setup" to cater to different user roles:
•
Provider Portal: Allows insurance providers to add and update their insurance products, including PDF uploads and pricing tiers. Providers can also view analytics related to sales and user engagement.
•
User Portal: Enables users to browse the insurance marketplace, with the ability to filter by type (e.g., health, auto, life). Users can also manage their subscriptions, claims, and payments.
•
Admin Portal: Provides administrators with capabilities to approve new providers and products, access real-time revenue dashboards, and perform user and provider activity audits.
 Technology Stack
FinHub leverages a battle-tested and modern stack for optimal performance, scalability, and developer experience:
•
Frontend:
◦
Next.js 14 (App Router) + TypeScript + Tailwind CSS + Shadcn UI
◦
Why?: Utilizes Server components for speed, TypeScript for type-safe insurance data, and Tailwind/Shadcn for rapid, responsive UI development. The Next.js Frontend makes API calls to the Payload CMS.
•
Backend:
◦
Payload CMS 2.0 (self-hosted)
◦
Why?: Chosen for its native TypeScript support, auto-generated Admin UI (benefiting providers, users, and admins), and extensible hooks for insurance workflows. Payload CMS is central to API calls from various portals. It defines all data models, such as InsurancePolicy and UserSubscription.
•
Database:
◦
PostgreSQL (Vercel/AWS RDS)
◦
Why?: Provides relational integrity crucial for policies, users, and subscriptions, and is preferred over MongoDB for financial data joins. The Payload CMS interacts with the PostgreSQL DB.
•
Authentication:
◦
Next-Auth + OAuth (Google/LinkedIn) + Custom JWT
◦
Why?: Ensures secure multi-role access for consumers, providers, and admins.
•
Payments:
◦
Stripe + Flutterwave (for Africa)
◦
Why?: Handles subscriptions and payouts to providers. The Payload CMS integrates with Stripe/Flutterwave.
•
Analytics:
◦
Mixpanel + Metabase (self-hosted)
◦
Why?: Used to track user journeys, popular insurance products, and revenue. Mixpanel receives data from the Next.js Frontend and Payload CMS, while the Admin Portal interacts with the Metabase Dashboard.
•
Infrastructure:
◦
Vercel (Frontend) + AWS EC2/Docker (Payload)
◦
Why?: Allows Next.js to scale dynamically, and self-hosting Payload provides full data control.
 System Architecture Overview
The system architecture is designed for clarity and efficiency:
•
The Provider Portal, Next.js Frontend, User Portal, and Admin Portal all interact with the Payload CMS through API Calls.
•
The Payload CMS is the core backend, connecting to the PostgreSQL DB for data storage and Stripe/Flutterwave for payment processing.
•
Mixpanel receives data from both the Next.js Frontend and the Payload CMS for analytics.
•
The Admin Portal specifically interfaces with the Metabase Dashboard for real-time reporting.
 Critical Considerations
During development, the following critical aspects are being addressed:
•
Regulatory Compliance: Implementing GDPR/HIPAA-ready data encryption, utilizing Payload’s beforeOperation hooks to redact sensitive fields.
•
Multi-Tenancy: Ensuring provider data isolation (e.g., Provider A cannot see Provider B’s statistics).
•
Marketplace Discovery: Planning to integrate Algolia for instant insurance product search capabilities.
 Phase 1: MVP Roadmap (6 Weeks)
The initial Minimum Viable Product (MVP) development follows this timeline:
•
Week 1-2:
◦
Set up Next.js and Payload CMS.
◦
Define core data models: User, Provider, InsuranceProduct.
◦
Develop the Provider portal's service creation form using Tailwind and React Hook Form.
•
Week 3-4:
◦
Implement the User marketplace UI, including filters and the subscription flow.
◦
Integrate Stripe webhooks for payment processing.
•
Week 5-6:
◦
Build the Admin dashboard, likely incorporating Metabase embeds.
◦
Implement authentication roles using Next-Auth middleware.
 Getting Started
(This section will provide instructions on how to set up the project locally. Details to be added.)
 Contributing
(This section will outline how others can contribute to the project. Details to be added.)
 License
(This section will specify the project's licensing. Details to be added.)

--------------------------------------------------------------------------------