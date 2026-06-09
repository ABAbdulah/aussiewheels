import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = { title: "About us" };

export default function AboutPage() {
  return (
    <ContentPage
      title="About AussieWheels"
      subtitle="We're on a mission to make buying and selling cars in Australia simpler, fairer and safer."
      blocks={[
        { heading: "Who we are", paragraphs: ["AussieWheels is an online automotive marketplace connecting Australian buyers and sellers. We bring together new, used and demo cars from dealers and private sellers, alongside the tools people need to research, finance, value and pay for a car with confidence."] },
        { heading: "What we believe", paragraphs: ["Buying a car should be transparent. That's why our price guides are algorithmic and can't be bought, our valuations come with no strings attached, and our secure payments protect both sides of every private sale."] },
        { heading: "More than a marketplace", bullets: ["Powerful search across thousands of listings", "Expert reviews scored out of 100", "Free, data-backed valuations", "Secure in-platform messaging and payments", "Vehicle history and inspection options"] },
        { heading: "Backed by trust", paragraphs: ["From plate blurring and virtual phone numbers to ID verification and a 7-day Trust & Safety team, we've built protection into every step — so you can focus on finding the right car."] },
      ]}
    />
  );
}
