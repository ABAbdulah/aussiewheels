import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = { title: "Safer with AussieWheels" };

export default function TrustPage() {
  return (
    <ContentPage
      title="Safer with AussieWheels"
      subtitle="Trust and safety is built into everything we do — for buyers and sellers alike."
      blocks={[
        { heading: "For buyers", bullets: ["ID verification on secure payments", "Funds held safely until the car is handed over", "Independent vehicle history reports", "Optional third-party inspections before you buy", "Algorithmic price guides you can rely on"] },
        { heading: "For sellers", bullets: ["Automatic number-plate blurring on photos", "Virtual phone numbers hide your real mobile", "Secure messaging blocks spam and scams", "A dedicated Trust & Safety team, 7 days a week", "Suspicious activity detection across the platform"] },
        { heading: "Report a concern", paragraphs: ["If something doesn't look right, our Trust & Safety team is here to help every day of the week. Use the in-app report option on any listing or message, and we'll investigate promptly."] },
      ]}
    />
  );
}
