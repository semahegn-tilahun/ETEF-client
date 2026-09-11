import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      home: "Home",
      about: "About ETEF",
      membership: "Membership",
      faq: "FAQ",
      gallery: "Gallery",
      vacancies: "Vacancies",
      contact: "Contact",
      register: "Register as a Member",
      language: "Language",
      explore: "Explore",
      connect: "Connect",
      officialEmail: "Official organizational email",
      heroEyebrow: "ETHIOPIAN TRANSPORT EMPLOYERS' FEDERATION",
      hero: "A stronger voice for Ethiopia's transport employers.",
      heroText:
        "Connecting transport employers, protecting member interests and supporting a stronger, sustainable and peaceful transport industry.",
      heroNote: "Professional. Inclusive. Member-focused.",
      discover: "Discover ETEF",
    },
  },
  am: {
    translation: {
      home: "መነሻ",
      about: "ስለ ETEF",
      membership: "አባልነት",
      faq: "ተደጋጋሚ ጥያቄዎች",
      gallery: "የፎቶ ማዕከል",
      vacancies: "የሥራ ዕድሎች",
      contact: "ያግኙን",
      register: "አባል ለመሆን ይመዝገቡ",
      language: "ቋንቋ",
      explore: "ይመልከቱ",
      connect: "ያግኙን",
      officialEmail: "የድርጅቱ ኢሜይል",
      heroEyebrow: "የኢትዮጵያ ትራንስፖርት አሰሪዎች ፌዴሬሽን",
      hero: "ለኢትዮጵያ ትራንስፖርት አሰሪዎች ጠንካራ ድምፅ።",
      heroText:
        "የትራንስፖርት አሰሪዎችን በማገናኘት፣ የአባላትን ጥቅም በመጠበቅ እና ጠንካራ፣ ዘላቂ እና ሰላማዊ የትራንስፖርት ኢንዱስትሪን በመደገፍ።",
      heroNote: "ሙያዊ። አካታች። ለአባላት ተኮር።",
      discover: "ስለ ETEF ይወቁ",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
