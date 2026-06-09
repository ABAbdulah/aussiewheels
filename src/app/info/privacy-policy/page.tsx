import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <ContentPage
      title="Privacy Policy"
      subtitle="How we collect, use and protect your personal information."
      updated="1 June 2026"
      blocks={[
        { heading: "Information we collect", paragraphs: ["We collect information you provide directly — such as your name, contact details and listing information — as well as information about how you use the platform."] },
        { heading: "How we use it", bullets: ["To operate and improve the platform", "To connect buyers and sellers", "To prevent fraud and keep the community safe", "To send alerts and updates you've opted into"] },
        { heading: "Sharing", paragraphs: ["We don't sell your personal information. We share data only with service providers who help us run the platform, or where required by law."] },
        { heading: "Your choices", paragraphs: ["You can access, update or delete your account information at any time, and manage your notification and marketing preferences from your account settings."] },
        { heading: "Contact", paragraphs: ["If you have any questions about your privacy, please contact our privacy team via the Help centre."] },
      ]}
    />
  );
}
