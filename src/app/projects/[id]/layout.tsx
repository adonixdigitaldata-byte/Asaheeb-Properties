import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const capitalized = id ? id.replace(/-/g, " ").toUpperCase() : "PROJECT";
  return {
    title: `${capitalized} | Asaheeb Real Estate Saudi Arabia`,
    description: `Discover investment opportunities at ${capitalized}. Detailed pricing, size, amenities, brochure, and advisory in Jeddah & Riyadh.`,
  };
}

export default function ProjectDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
