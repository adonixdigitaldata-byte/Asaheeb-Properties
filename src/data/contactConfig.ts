export const PHONE_NUMBER_DISPLAY = "+966 56 565 4450";
export const WHATSAPP_NUMBER = "966565654450";
export const CONTACT_EMAIL = "buy@asaheebrealestate.com";

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
