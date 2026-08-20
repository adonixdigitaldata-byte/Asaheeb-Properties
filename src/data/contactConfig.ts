export const PHONE_NUMBER_DISPLAY = "+966 56 565 4450";
export const WHATSAPP_NUMBER = "966565654450";
export const CONTACT_EMAIL = "buy@asaheebrealestate.com";

export const COMPANY_ADDRESS_EN = "Office number 602, Matbouli Plaza, Fayd As Samaa, Al-Ruwais, Jeddah 23213, Saudi Arabia";
export const COMPANY_ADDRESS_AR = "مكتب رقم ٦٠٢، متبولي بلازا، فيض السماء، الرويس، جدة ٢٣٢١٣، المملكة العربية السعودية";

export const GOOGLE_MAPS_LINK = "https://maps.app.goo.gl/azGoR8U9jpaXa3Qh8";
export const GOOGLE_MAPS_EMBED_URL = "https://maps.google.com/maps?q=Matbouli%20Plaza,%20Al-Ruwais,%20Jeddah&t=k&z=17&ie=UTF8&iwloc=&output=embed";

export const BUSINESS_HOURS_EN = [
  { days: "Sun – Thu", hours: "8:00 AM – 8:00 PM" },
  { days: "Friday", hours: "Closed" },
  { days: "Saturday", hours: "10:00 AM – 5:00 PM" },
];

export const BUSINESS_HOURS_AR = [
  { days: "الأحد – الخميس", hours: "٨:٠٠ ص – ٨:٠٠ م" },
  { days: "الجمعة", hours: "مغلق" },
  { days: "السبت", hours: "١٠:٠٠ ص – ٥:٠٠ م" },
];

export function getWhatsAppLink(messageEn?: string, messageAr?: string, isAr?: boolean): string {
  const defaultEn = "Hello Asaheeb Real Estate, I would like to inquire about your available real estate investment opportunities.";
  const defaultAr = "مرحباً أصاهيب العقارية، أود الاستفسار عن الفرص الاستثمارية العقارية المتاحة لديكم.";
  
  const text = isAr 
    ? (messageAr || defaultAr) 
    : (messageEn || defaultEn);
    
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function getProjectWhatsAppLink(projectNameEn: string, projectNameAr: string, isAr: boolean): string {
  const textEn = `Hello Asaheeb Real Estate, I am interested in inquiring about "${projectNameEn}". Please provide me with more details.`;
  const textAr = `مرحباً أصاهيب العقارية، أود الاستفسار عن مشروع "${projectNameAr}". يرجى تزويدي بالمزيد من التفاصيل.`;
  
  return getWhatsAppLink(textEn, textAr, isAr);
}
