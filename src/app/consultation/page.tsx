import { getLiveConsultationSettings } from "@/lib/consultationData";
import ConsultationClient from "./ConsultationClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ConsultationPage() {
  const initialSettings = await getLiveConsultationSettings();
  return <ConsultationClient initialSettings={initialSettings} />;
}
