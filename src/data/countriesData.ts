import { parsePhoneNumberFromString, AsYouType, CountryCode } from "libphonenumber-js";

export interface CountryInfo {
  code: CountryCode;
  nameEn: string;
  nameAr: string;
  dialCode: string;
  flag: string;
  placeholder: string;
  priority?: boolean;
}

// ─── Priority Countries (KSA, UAE, Gulf Countries, India, Pakistan, USA, etc.) ───
export const PRIORITY_COUNTRIES: CountryInfo[] = [
  {
    code: "SA",
    nameEn: "Saudi Arabia",
    nameAr: "المملكة العربية السعودية",
    dialCode: "+966",
    flag: "🇸🇦",
    placeholder: "50 123 4567",
    priority: true,
  },
  {
    code: "AE",
    nameEn: "United Arab Emirates",
    nameAr: "الإمارات العربية المتحدة",
    dialCode: "+971",
    flag: "🇦🇪",
    placeholder: "50 123 4567",
    priority: true,
  },
  {
    code: "QA",
    nameEn: "Qatar",
    nameAr: "قطر",
    dialCode: "+974",
    flag: "🇶🇦",
    placeholder: "3312 3456",
    priority: true,
  },
  {
    code: "KW",
    nameEn: "Kuwait",
    nameAr: "الكويت",
    dialCode: "+965",
    flag: "🇰🇼",
    placeholder: "9123 4567",
    priority: true,
  },
  {
    code: "BH",
    nameEn: "Bahrain",
    nameAr: "البحرين",
    dialCode: "+973",
    flag: "🇧🇭",
    placeholder: "3912 3456",
    priority: true,
  },
  {
    code: "OM",
    nameEn: "Oman",
    nameAr: "عُمان",
    dialCode: "+968",
    flag: "🇴🇲",
    placeholder: "9123 4567",
    priority: true,
  },
  {
    code: "IN",
    nameEn: "India",
    nameAr: "الهند",
    dialCode: "+91",
    flag: "🇮🇳",
    placeholder: "98765 43210",
    priority: true,
  },
  {
    code: "PK",
    nameEn: "Pakistan",
    nameAr: "باكستان",
    dialCode: "+92",
    flag: "🇵🇰",
    placeholder: "300 1234567",
    priority: true,
  },
  {
    code: "US",
    nameEn: "United States",
    nameAr: "الولايات المتحدة",
    dialCode: "+1",
    flag: "🇺🇸",
    placeholder: "(555) 000-0000",
    priority: true,
  },
  {
    code: "GB",
    nameEn: "United Kingdom",
    nameAr: "المملكة المتحدة",
    dialCode: "+44",
    flag: "🇬🇧",
    placeholder: "7911 123456",
    priority: true,
  },
  {
    code: "EG",
    nameEn: "Egypt",
    nameAr: "مصر",
    dialCode: "+20",
    flag: "🇪🇬",
    placeholder: "100 123 4567",
    priority: true,
  },
  {
    code: "JO",
    nameEn: "Jordan",
    nameAr: "الأردن",
    dialCode: "+962",
    flag: "🇯🇴",
    placeholder: "7 9012 3456",
    priority: true,
  },
  {
    code: "LB",
    nameEn: "Lebanon",
    nameAr: "لبنان",
    dialCode: "+961",
    flag: "🇱🇧",
    placeholder: "70 123 456",
    priority: true,
  },
  {
    code: "CA",
    nameEn: "Canada",
    nameAr: "كندا",
    dialCode: "+1",
    flag: "🇨🇦",
    placeholder: "(555) 000-0000",
    priority: true,
  },
];

// ─── All World Countries (Alphabetical) ───────────────────────────────────────
const RAW_WORLD_COUNTRIES: CountryInfo[] = [
  ...PRIORITY_COUNTRIES,
  { code: "AF", nameEn: "Afghanistan", nameAr: "أفغانستان", dialCode: "+93", flag: "🇦🇫", placeholder: "70 123 4567" },
  { code: "AL", nameEn: "Albania", nameAr: "ألبانيا", dialCode: "+355", flag: "🇦🇱", placeholder: "67 123 4567" },
  { code: "DZ", nameEn: "Algeria", nameAr: "الجزائر", dialCode: "+213", flag: "🇩🇿", placeholder: "551 23 45 67" },
  { code: "AD", nameEn: "Andorra", nameAr: "أندورا", dialCode: "+376", flag: "🇦🇩", placeholder: "312 345" },
  { code: "AO", nameEn: "Angola", nameAr: "أنغولا", dialCode: "+244", flag: "🇦🇴", placeholder: "923 123 456" },
  { code: "AR", nameEn: "Argentina", nameAr: "الأرجنتين", dialCode: "+54", flag: "🇦🇷", placeholder: "9 11 1234-5678" },
  { code: "AM", nameEn: "Armenia", nameAr: "أرمينيا", dialCode: "+374", flag: "🇦🇲", placeholder: "77 123456" },
  { code: "AU", nameEn: "Australia", nameAr: "أستراليا", dialCode: "+61", flag: "🇦🇺", placeholder: "412 345 678" },
  { code: "AT", nameEn: "Austria", nameAr: "النمسا", dialCode: "+43", flag: "🇦🇹", placeholder: "664 1234567" },
  { code: "AZ", nameEn: "Azerbaijan", nameAr: "أذربيجان", dialCode: "+994", flag: "🇦🇿", placeholder: "40 123 45 67" },
  { code: "BD", nameEn: "Bangladesh", nameAr: "بنغلاديش", dialCode: "+880", flag: "🇧🇩", placeholder: "1712-345678" },
  { code: "BE", nameEn: "Belgium", nameAr: "بلجيكا", dialCode: "+32", flag: "🇧🇪", placeholder: "470 12 34 56" },
  { code: "BR", nameEn: "Brazil", nameAr: "البرازيل", dialCode: "+55", flag: "🇧🇷", placeholder: "11 91234-5678" },
  { code: "BG", nameEn: "Bulgaria", nameAr: "بلغاريا", dialCode: "+359", flag: "🇧🇬", placeholder: "87 123 4567" },
  { code: "CL", nameEn: "Chile", nameAr: "تشيلي", dialCode: "+56", flag: "🇨🇱", placeholder: "9 1234 5678" },
  { code: "CN", nameEn: "China", nameAr: "الصين", dialCode: "+86", flag: "🇨🇳", placeholder: "131 2345 6789" },
  { code: "CO", nameEn: "Colombia", nameAr: "كولومبيا", dialCode: "+57", flag: "🇨🇴", placeholder: "300 1234567" },
  { code: "HR", nameEn: "Croatia", nameAr: "كرواتيا", dialCode: "+385", flag: "🇭🇷", placeholder: "91 234 5678" },
  { code: "CY", nameEn: "Cyprus", nameAr: "قبرص", dialCode: "+357", flag: "🇨🇾", placeholder: "96 123456" },
  { code: "CZ", nameEn: "Czech Republic", nameAr: "التشيك", dialCode: "+420", flag: "🇨🇿", placeholder: "601 123 456" },
  { code: "DK", nameEn: "Denmark", nameAr: "الدنمارك", dialCode: "+45", flag: "🇩🇰", placeholder: "20 12 34 56" },
  { code: "ET", nameEn: "Ethiopia", nameAr: "إثيوبيا", dialCode: "+251", flag: "🇪🇹", placeholder: "91 123 4567" },
  { code: "FI", nameEn: "Finland", nameAr: "فنلندا", dialCode: "+358", flag: "🇫🇮", placeholder: "41 2345678" },
  { code: "FR", nameEn: "France", nameAr: "فرنسا", dialCode: "+33", flag: "🇫🇷", placeholder: "6 12 34 56 78" },
  { code: "GE", nameEn: "Georgia", nameAr: "جورجيا", dialCode: "+995", flag: "🇬🇪", placeholder: "555 12 34 56" },
  { code: "DE", nameEn: "Germany", nameAr: "ألمانيا", dialCode: "+49", flag: "🇩🇪", placeholder: "151 23456789" },
  { code: "GR", nameEn: "Greece", nameAr: "اليونان", dialCode: "+30", flag: "🇬🇷", placeholder: "691 234 5678" },
  { code: "HK", nameEn: "Hong Kong", nameAr: "هونغ كونغ", dialCode: "+852", flag: "🇭🇰", placeholder: "5123 4567" },
  { code: "HU", nameEn: "Hungary", nameAr: "المجر", dialCode: "+36", flag: "🇭🇺", placeholder: "20 123 4567" },
  { code: "ID", nameEn: "Indonesia", nameAr: "إندونيسيا", dialCode: "+62", flag: "🇮🇩", placeholder: "812-3456-7890" },
  { code: "IQ", nameEn: "Iraq", nameAr: "العراق", dialCode: "+964", flag: "🇮🇶", placeholder: "790 123 4567" },
  { code: "IE", nameEn: "Ireland", nameAr: "أيرلندا", dialCode: "+353", flag: "🇮🇪", placeholder: "85 123 4567" },
  { code: "IT", nameEn: "Italy", nameAr: "إيطاليا", dialCode: "+39", flag: "🇮🇹", placeholder: "312 345 6789" },
  { code: "JP", nameEn: "Japan", nameAr: "اليابان", dialCode: "+81", flag: "🇯🇵", placeholder: "90 1234 5678" },
  { code: "KZ", nameEn: "Kazakhstan", nameAr: "كازاخستان", dialCode: "+7", flag: "🇰🇿", placeholder: "701 123 4567" },
  { code: "KE", nameEn: "Kenya", nameAr: "كينيا", dialCode: "+254", flag: "🇰🇪", placeholder: "712 345678" },
  { code: "KR", nameEn: "South Korea", nameAr: "كوريا الجنوبية", dialCode: "+82", flag: "🇰🇷", placeholder: "10-1234-5678" },
  { code: "LY", nameEn: "Libya", nameAr: "ليبيا", dialCode: "+218", flag: "🇱🇾", placeholder: "91 1234567" },
  { code: "MY", nameEn: "Malaysia", nameAr: "ماليزيا", dialCode: "+60", flag: "🇲🇾", placeholder: "12-345 6789" },
  { code: "MX", nameEn: "Mexico", nameAr: "المكسيك", dialCode: "+52", flag: "🇲🇽", placeholder: "1 55 1234 5678" },
  { code: "MA", nameEn: "Morocco", nameAr: "المغرب", dialCode: "+212", flag: "🇲🇦", placeholder: "612-345678" },
  { code: "NL", nameEn: "Netherlands", nameAr: "هولندا", dialCode: "+31", flag: "🇳🇱", placeholder: "6 12345678" },
  { code: "NZ", nameEn: "New Zealand", nameAr: "نيوزيلندا", dialCode: "+64", flag: "🇳🇿", placeholder: "21 123 4567" },
  { code: "NG", nameEn: "Nigeria", nameAr: "نيجيريا", dialCode: "+234", flag: "🇳🇬", placeholder: "802 123 4567" },
  { code: "NO", nameEn: "Norway", nameAr: "النرويج", dialCode: "+47", flag: "🇳🇴", placeholder: "412 34 567" },
  { code: "PH", nameEn: "Philippines", nameAr: "الفلبين", dialCode: "+63", flag: "🇵🇭", placeholder: "917 123 4567" },
  { code: "PL", nameEn: "Poland", nameAr: "بولندا", dialCode: "+48", flag: "🇵🇱", placeholder: "512 345 678" },
  { code: "PT", nameEn: "Portugal", nameAr: "البرتغال", dialCode: "+351", flag: "🇵🇹", placeholder: "912 345 678" },
  { code: "RO", nameEn: "Romania", nameAr: "رومانيا", dialCode: "+40", flag: "🇷🇴", placeholder: "712 345 678" },
  { code: "RU", nameEn: "Russia", nameAr: "روسيا", dialCode: "+7", flag: "🇷🇺", placeholder: "912 345-67-89" },
  { code: "SG", nameEn: "Singapore", nameAr: "سنغافورة", dialCode: "+65", flag: "🇸🇬", placeholder: "8123 4567" },
  { code: "ZA", nameEn: "South Africa", nameAr: "جنوب أفريقيا", dialCode: "+27", flag: "🇿🇦", placeholder: "71 123 4567" },
  { code: "ES", nameEn: "Spain", nameAr: "إسبانيا", dialCode: "+34", flag: "🇪🇸", placeholder: "612 34 56 78" },
  { code: "LK", nameEn: "Sri Lanka", nameAr: "سريلانكا", dialCode: "+94", flag: "🇱🇰", placeholder: "71 234 5678" },
  { code: "SD", nameEn: "Sudan", nameAr: "السودان", dialCode: "+249", flag: "🇸🇩", placeholder: "91 123 4567" },
  { code: "SE", nameEn: "Sweden", nameAr: "السويد", dialCode: "+46", flag: "🇸🇪", placeholder: "70 123 45 67" },
  { code: "CH", nameEn: "Switzerland", nameAr: "سويسرا", dialCode: "+41", flag: "🇨🇭", placeholder: "78 123 45 67" },
  { code: "SY", nameEn: "Syria", nameAr: "سوريا", dialCode: "+963", flag: "🇸🇾", placeholder: "944 123 456" },
  { code: "TH", nameEn: "Thailand", nameAr: "تايلاند", dialCode: "+66", flag: "🇹🇭", placeholder: "81 234 5678" },
  { code: "TN", nameEn: "Tunisia", nameAr: "تونس", dialCode: "+216", flag: "🇹🇳", placeholder: "20 123 456" },
  { code: "TR", nameEn: "Turkey", nameAr: "تركيا", dialCode: "+90", flag: "🇹🇷", placeholder: "501 234 56 78" },
  { code: "UA", nameEn: "Ukraine", nameAr: "أوكرانيا", dialCode: "+380", flag: "🇺🇦", placeholder: "50 123 4567" },
];

export const ALL_COUNTRIES: CountryInfo[] = RAW_WORLD_COUNTRIES.filter(
  (item, index, self) => index === self.findIndex((t) => t.code === item.code)
);

// Default country
export const DEFAULT_COUNTRY = PRIORITY_COUNTRIES[0]; // Saudi Arabia

/**
 * Checks for junk / dummy repeating sequences like 00000000, 11111111, 12345678, 99999999
 */
export function isDummyOrFakeNumber(digits: string): boolean {
  if (!digits || digits.length < 5) return true;

  // Check all identical digits (e.g. 00000000, 11111111, 999999999)
  const allSame = /^(\d)\1+$/.test(digits);
  if (allSame) return true;

  // Check simple sequential runs (e.g. 12345678, 01234567, 98765432)
  const ascending = "01234567890123456789";
  const descending = "98765432109876543210";
  if (digits.length >= 6 && (ascending.includes(digits) || descending.includes(digits))) {
    return true;
  }

  // Check repeating short patterns (e.g. 12121212, 123123123)
  if (digits.length >= 6) {
    const pairRepeat = /^(\d{2})\1{2,}$/.test(digits);
    const tripletRepeat = /^(\d{3})\1{2,}$/.test(digits);
    if (pairRepeat || tripletRepeat) return true;
  }

  return false;
}

export interface PhoneValidationResult {
  isValid: boolean;
  formattedInternational?: string;
  e164?: string;
  countryCode?: CountryCode;
  errorMessageEn?: string;
  errorMessageAr?: string;
}

/**
 * Validates a phone number against country regional rules using libphonenumber-js
 * and rejects fake dummy patterns.
 */
export function validatePhoneNumber(
  rawPhone: string,
  countryCode: CountryCode = "SA"
): PhoneValidationResult {
  if (!rawPhone || !rawPhone.trim()) {
    return {
      isValid: false,
      errorMessageEn: "Phone number is required",
      errorMessageAr: "رقم الهاتف مطلوب",
    };
  }

  const clean = rawPhone.trim();
  const digitsOnly = clean.replace(/\D/g, "");

  // Catch dummy sequences
  if (isDummyOrFakeNumber(digitsOnly)) {
    return {
      isValid: false,
      errorMessageEn: "Please enter a valid active phone number",
      errorMessageAr: "يرجى إدخال رقم هاتف حقيقي وصحيح",
    };
  }

  try {
    // Parse using libphonenumber-js with default country context
    const parsed = parsePhoneNumberFromString(clean, countryCode);

    if (!parsed) {
      return {
        isValid: false,
        errorMessageEn: "Invalid phone number format",
        errorMessageAr: "صيغة رقم الهاتف غير صحيحة",
      };
    }

    if (!parsed.isValid()) {
      const countryObj = ALL_COUNTRIES.find((c) => c.code === countryCode);
      const countryNameEn = countryObj ? countryObj.nameEn : countryCode;
      const countryNameAr = countryObj ? countryObj.nameAr : countryCode;

      return {
        isValid: false,
        errorMessageEn: `Please enter a valid phone number for ${countryNameEn}`,
        errorMessageAr: `يرجى إدخال رقم هاتف صحيح لـ ${countryNameAr}`,
      };
    }

    return {
      isValid: true,
      formattedInternational: parsed.formatInternational(),
      e164: parsed.number,
      countryCode: parsed.country || countryCode,
    };
  } catch {
    return {
      isValid: false,
      errorMessageEn: "Invalid phone number",
      errorMessageAr: "رقم الهاتف غير صالح",
    };
  }
}

/**
 * Format input string as you type for a given country.
 */
export function formatPhoneAsYouType(raw: string, countryCode: CountryCode = "SA"): string {
  if (!raw) return "";
  const formatter = new AsYouType(countryCode);
  return formatter.input(raw);
}
