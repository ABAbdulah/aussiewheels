import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <ContentPage
      title="Terms & Conditions"
      subtitle="The terms that govern your use of the AussieWheels platform."
      updated="1 June 2026"
      blocks={[
        { heading: "1. Acceptance of terms", paragraphs: ["By accessing or using AussieWheels, you agree to be bound by these Terms & Conditions and our Privacy Policy. If you do not agree, please do not use the platform."] },
        { heading: "2. Using the platform", paragraphs: ["You must be at least 18 years old to create an account or list a vehicle. You agree to provide accurate information and to use the platform lawfully and in good faith."] },
        { heading: "3. Listings", paragraphs: ["Sellers are responsible for the accuracy of their listings, including descriptions, pricing and images. We may remove listings that breach these terms or applicable law."] },
        { heading: "4. Payments", paragraphs: ["Pay through AussieWheels is provided subject to additional terms. Funds are held securely and released in line with the agreed process. Cars over $100,000 are currently excluded."] },
        { heading: "5. Limitation of liability", paragraphs: ["AussieWheels is a marketplace and is not a party to transactions between buyers and sellers. To the extent permitted by law, we are not liable for the conduct of users or the condition of vehicles."] },
        { heading: "6. Changes", paragraphs: ["We may update these terms from time to time. Continued use of the platform after changes take effect constitutes acceptance of the updated terms."] },
      ]}
    />
  );
}
