import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'hero.title': 'UnityMedia',
    'hero.subtitle': "Dubai's Premier Media Powerhouse",
    'hero.cta': 'Get Started',
    'services.title': 'Our Services',
    'services.startingFrom': 'Starting from AED',
    'whyChooseUs.title': 'Why Choose UnityMedia',
    'cta.title': 'Ready to Transform Your Media Presence?',
    'cta.subtitle': 'Join us in shaping the future of media in UAE and India',
    'cta.button': 'Contact Us Today',
    'footer.copyright': '© 2024 UnityMedia. All rights reserved.',
    'footer.address': 'Al Fahad Tower 2, TECOM - Barsha Heights, Dubai, UAE',
    'footer.phone': '+970 50 514 8299',
    'footer.email': 'kapadnis81@gmail.com',
    'footer.contact': 'Contact Us',
    'services.cinematography.title': 'Cinematography & Photography',
    'services.cinematography.description': 'Professional cinematography and photography services for commercial and creative projects.',
    'services.aerial.title': 'Aerial Filming & Drone Services',
    'services.aerial.description': 'Stunning aerial perspectives for real estate, events, and promotional content.',
    'services.social.title': 'Social Media Marketing',
    'services.social.description': 'Strategic social media management and content creation for maximum engagement.',
    'services.equipment.title': 'Equipment Rentals',
    'services.equipment.description': 'High-end photography and videography equipment available for rent.',
    'services.matterport.title': 'Matterport 3D Tours',
    'services.matterport.description': 'Immersive virtual tours for real estate and hospitality sectors.',
    'services.tourism.title': 'Tourism Experiences',
    'services.tourism.description': 'Comprehensive media packages for tourism and hospitality businesses.',
    'advantages.solutions.title': '360° Solutions',
    'advantages.solutions.description': 'Complete media services under one roof',
    'advantages.technology.title': 'Latest Technology',
    'advantages.technology.description': 'State-of-the-art equipment and expertise',
    'advantages.partners.title': 'Strategic Partners',
    'advantages.partners.description': 'Strong industry collaborations',
    'advantages.model.title': 'Scalable Model',
    'advantages.model.description': 'Sustainable growth and innovation',
    'faq.title': 'Frequently Asked Questions',
    'faq.q1': 'What types of media services do you offer?',
    'faq.a1': 'We offer a comprehensive suite of media services including professional cinematography, aerial filming, drone services, social media marketing, equipment rentals, Matterport 3D tours, and specialized tourism media packages.',
    'faq.q2': 'What areas do you serve?',
    'faq.a2': 'We primarily serve Dubai and the UAE, with operations extending to India. We can accommodate projects across the GCC region upon request.',
    'faq.q3': 'How much does a typical video production cost?',
    'faq.a3': 'Our video production services start from AED 8,000, with final pricing depending on project scope, duration, equipment requirements, and post-production needs.',
    'faq.q4': 'Do you provide equipment rentals without operators?',
    'faq.a4': 'Yes, we offer both operated and dry-hire equipment rentals. All rentals require a security deposit and proof of insurance.',
    'faq.q5': 'What is the turnaround time for a typical project?',
    'faq.a5': 'Turnaround times vary by project. Simple shoots might take 2-3 days for delivery, while complex productions could take 2-3 weeks. We will provide a detailed timeline during consultation.',
    'faq.q6': 'Do you offer drone filming permits?',
    'faq.a6': 'Yes, we handle all necessary permits for drone filming in Dubai and the UAE. Permit processing typically takes 3-5 working days.'
  },
  ar: {
    'hero.title': 'يونيتي ميديا',
    'hero.subtitle': 'قوة الإعلام الرائدة في دبي',
    'hero.cta': 'ابدأ الآن',
    'services.title': 'خدماتنا',
    'services.startingFrom': 'تبدأ من',
    'whyChooseUs.title': 'لماذا تختار يونيتي ميديا',
    'cta.title': 'هل أنت مستعد لتحويل حضورك الإعلامي؟',
    'cta.subtitle': 'انضم إلينا في تشكيل مستقبل الإعلام في الإمارات والهند',
    'cta.button': 'تواصل معنا اليوم',
    'footer.copyright': '© 2024 يونيتي ميديا. جميع الحقوق محفوظة.',
    'footer.address': 'برج الفهد 2 ، تيكوم - برشا هايتس ، دبي ، الإمارات العربية المتحدة',
    'footer.phone': '٨٢٩٩ ٥١٤ ٥٠ ٩٧٠+',
    'footer.email': 'kapadnis81@gmail.com',
    'footer.contact': 'اتصل بنا',
    'services.cinematography.title': 'التصوير السينمائي والفوتوغرافي',
    'services.cinematography.description': 'خدمات التصوير السينمائي والفوتوغرافي المحترفة للمشاريع التجارية والإبداعية.',
    'services.aerial.title': 'التصوير الجوي وخدمات الدرون',
    'services.aerial.description': 'مناظر جوية مذهلة للعقارات والفعاليات والمحتوى الترويجي.',
    'services.social.title': 'التسويق عبر وسائل التواصل الاجتماعي',
    'services.social.description': 'إدارة استراتيجية لوسائل التواصل الاجتماعي وإنشاء محتوى لأقصى تفاعل.',
    'services.equipment.title': 'تأجير المعدات',
    'services.equipment.description': 'معدات تصوير فوتوغرافي وفيديو عالية الجودة متاحة للإيجار.',
    'services.matterport.title': 'جولات ماتربورت ثلاثية الأبعاد',
    'services.matterport.description': 'جولات افتراضية غامرة لقطاعات العقارات والضيافة.',
    'services.tourism.title': 'تجارب سياحية',
    'services.tourism.description': 'حزم إعلامية شاملة لأعمال السياحة والضيافة.',
    'advantages.solutions.title': 'حلول 360 درجة',
    'advantages.solutions.description': 'خدمات إعلامية كاملة تحت سقف واحد',
    'advantages.technology.title': 'أحدث التقنيات',
    'advantages.technology.description': 'معدات وخبرات متطورة',
    'advantages.partners.title': 'شراكات استراتيجية',
    'advantages.partners.description': 'تعاون قوي في الصناعة',
    'advantages.model.title': 'نموذج قابل للتطوير',
    'advantages.model.description': 'نمو مستدام وابتكار',
    'faq.title': 'الأسئلة الشائعة',
    'faq.q1': 'ما هي أنواع الخدمات الإعلامية التي تقدمونها؟',
    'faq.a1': 'نقدم مجموعة شاملة من الخدمات الإعلامية تشمل التصوير السينمائي الاحترافي، والتصوير الجوي، وخدمات الدرون، والتسويق عبر وسائل التواصل الاجتماعي، وتأجير المعدات، وجولات ماتربورت ثلاثية الأبعاد، وحزم الإعلام السياحي المتخصصة.',
    'faq.q2': 'ما هي المناطق التي تخدمونها؟',
    'faq.a2': 'نخدم بشكل أساسي دبي والإمارات العربية المتحدة، مع عمليات تمتد إلى الهند. يمكننا تنفيذ المشاريع في جميع أنحاء دول مجلس التعاون الخليجي عند الطلب.',
    'faq.q3': 'كم تكلف إنتاج الفيديو النموذجي؟',
    'faq.a3': 'تبدأ خدمات إنتاج الفيديو لدينا من 8,000 درهم، ويعتمد السعر النهائي على نطاق المشروع ومدته ومتطلبات المعدات واحتياجات ما بعد الإنتاج.',
    'faq.q4': 'هل تقدمون تأجير المعدات بدون مشغلين؟',
    'faq.a4': 'نعم، نقدم تأجير المعدات مع وبدون مشغلين. جميع عمليات التأجير تتطلب تأميناً وإثبات تأمين.',
    'faq.q5': 'ما هو وقت التنفيذ للمشروع النموذجي؟',
    'faq.a5': 'تختلف أوقات التنفيذ حسب المشروع. قد تستغرق عمليات التصوير البسيطة 2-3 أيام للتسليم، بينما قد تستغرق الإنتاجات المعقدة 2-3 أسابيع. سنقدم جدولاً زمنياً مفصلاً خلال الاستشارة.',
    'faq.q6': 'هل تقدمون تصاريح تصوير الدرون؟',
    'faq.a6': 'نعم، نتعامل مع جميع التصاريح اللازمة للتصوير بالدرون في دبي والإمارات العربية المتحدة. تستغرق معالجة التصريح عادةً 3-5 أيام عمل.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}