import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  VideoCameraIcon,
  GlobeAltIcon,
  ShareIcon,
  CameraIcon,
  CubeIcon,
  GlobeAsiaAustraliaIcon,
  ChevronRightIcon,
  TrophyIcon,
  ArrowTrendingUpIcon,
  UsersIcon,
  Square3Stack3DIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from './contexts/LanguageContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';

function App() {
  const { t, language } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const faqs = [
    { q: 'faq.q1', a: 'faq.a1' },
    { q: 'faq.q2', a: 'faq.a2' },
    { q: 'faq.q3', a: 'faq.a3' },
    { q: 'faq.q4', a: 'faq.a4' },
    { q: 'faq.q5', a: 'faq.a5' },
    { q: 'faq.q6', a: 'faq.a6' },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const sections = [
    { id: 'services', label: t('services.title') },
    { id: 'why-choose-us', label: t('whyChooseUs.title') },
    { id: 'faq', label: t('faq.title') },
    { id: 'contact', label: t('footer.contact') },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Fixed Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <motion.h1 
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400"
            >
              UnityMedia
            </motion.h1>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => scrollToSection(section.id)}
                  className="text-gray-300 hover:text-white transition-colors relative group"
                >
                  {section.label}
                  <motion.div 
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"
                    whileHover={{ width: '100%' }}
                  />
                </motion.button>
              ))}
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 rounded-lg hover:bg-gray-800/50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gray-900/95 backdrop-blur-md overflow-hidden"
            >
              <div className="px-4 py-3 space-y-3">
                {sections.map((section) => (
                  <motion.button
                    key={section.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(section.id)}
                    className="block w-full text-left text-gray-300 hover:text-white py-2"
                  >
                    {section.label}
                  </motion.button>
                ))}
                <div className="py-2">
                  <LanguageSwitcher />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80"
            alt="Dubai Skyline"
            className="w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/50" />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            {t('hero.subtitle')}
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('contact')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all"
          >
            {t('hero.cta')}
          </motion.button>
        </motion.div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            {t('services.title')}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedService(selectedService === index ? null : index)}
                className="bg-gray-800/50 p-6 rounded-xl hover:bg-gray-700/50 transition-all cursor-pointer"
              >
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{t(service.titleKey)}</h3>
                <p className="text-gray-400">{t(service.descriptionKey)}</p>
                <div className="mt-4 text-blue-400 flex items-center justify-between">
                  <span>{t('services.startingFrom')} {service.price}</span>
                  <ChevronDownIcon className={`w-5 h-5 transition-transform ${selectedService === index ? 'rotate-180' : ''}`} />
                </div>
                
                <AnimatePresence>
                  {selectedService === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-gray-700"
                    >
                      <h4 className="text-lg font-semibold mb-2">Sub Services:</h4>
                      <ul className="space-y-2">
                        {service.subServices.map((subService, subIndex) => (
                          <motion.li
                            key={subIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: subIndex * 0.1 }}
                            className="flex items-center text-gray-300"
                          >
                            <ChevronRightIcon className="w-4 h-4 mr-2 text-blue-400" />
                            <span>{subService}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-choose-us" className="py-20 px-4 bg-gray-900/50 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            {t('whyChooseUs.title')}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  {advantage.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{t(advantage.titleKey)}</h3>
                <p className="text-gray-400">{t(advantage.descriptionKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-gray-800/50 scroll-mt-16">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-8"
          >
            {t('faq.title')}
          </motion.h2>
          
          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative max-w-xl mx-auto mb-12"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search FAQs..."
              className="w-full px-4 py-3 bg-gray-900/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <MagnifyingGlassIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </motion.div>

          <div className="space-y-4">
            {faqs
              .filter(
                (faq) =>
                  !searchQuery ||
                  t(faq.q).toLowerCase().includes(searchQuery.toLowerCase()) ||
                  t(faq.a).toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((faq, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900/50 rounded-lg overflow-hidden"
                >
                  <button
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-800/50 transition-colors"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="text-lg font-medium">{t(faq.q)}</span>
                    <ChevronDownIcon
                      className={`w-5 h-5 transition-transform ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 py-4 text-gray-300 bg-gray-800/30"
                      >
                        {t(faq.a)}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-emerald-600">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('cta.title')}</h2>
          <p className="text-xl mb-8">{t('cta.subtitle')}</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('contact')}
            className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all"
          >
            {t('cta.button')}
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 py-12 px-4 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4">{t('footer.contact')}</h3>
              <motion.div 
                whileHover={{ x: 10 }}
                className="flex items-center space-x-3 group"
              >
                <PhoneIcon className="w-5 h-5 text-blue-400" />
                <a href="tel:+970505148299" className="text-gray-300 group-hover:text-blue-400 transition-colors">
                  {t('footer.phone')}
                </a>
              </motion.div>
              <motion.div 
                whileHover={{ x: 10 }}
                className="flex items-center space-x-3 group"
              >
                <EnvelopeIcon className="w-5 h-5 text-blue-400" />
                <a href="mailto:kapadnis81@gmail.com" className="text-gray-300 group-hover:text-blue-400 transition-colors">
                  {t('footer.email')}
                </a>
              </motion.div>
            </div>
            <div className="text-center md:text-right">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/970505148299" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 rounded-full text-white transition-all"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </motion.a>
            </div>
          </div>
          <div className="text-center text-gray-400 border-t border-gray-800 pt-8">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const services = [
  {
    icon: <VideoCameraIcon className="w-6 h-6 text-blue-400" />,
    titleKey: 'services.cinematography.title',
    descriptionKey: 'services.cinematography.description',
    price: "8,000",
    subServices: [
      "Commercial Video Production",
      "Corporate Films",
      "Event Coverage",
      "Product Photography",
      "Fashion Photography",
      "Architectural Photography",
      "Time-lapse Photography",
      "360° Virtual Tours"
    ]
  },
  {
    icon: <CubeIcon className="w-6 h-6 text-blue-400" />,
    titleKey: 'services.aerial.title',
    descriptionKey: 'services.aerial.description',
    price: "3,000",
    subServices: [
      "Real Estate Aerial Photography",
      "Construction Progress Monitoring",
      "Event Aerial Coverage",
      "Landscape Aerial Photography",
      "4K Drone Videography",
      "Thermal Imaging",
      "Mapping & Surveying",
      "Industrial Inspections"
    ]
  },
  {
    icon: <ShareIcon className="w-6 h-6 text-blue-400" />,
    titleKey: 'services.social.title',
    descriptionKey: 'services.social.description',
    price: "10,000",
    subServices: [
      "Social Media Strategy",
      "Content Creation",
      "Community Management",
      "Influencer Marketing",
      "Paid Social Campaigns",
      "Analytics & Reporting",
      "Social Media Audit",
      "Brand Voice Development"
    ]
  },
  {
    icon: <CameraIcon className="w-6 h-6 text-blue-400" />,
    titleKey: 'services.equipment.title',
    descriptionKey: 'services.equipment.description',
    price: "500",
    subServices: [
      "Professional Cameras",
      "Lighting Equipment",
      "Audio Equipment",
      "Drones & Accessories",
      "Stabilizers & Gimbals",
      "Studio Equipment",
      "Lenses & Filters",
      "Production Accessories"
    ]
  },
  {
    icon: <CubeIcon className="w-6 h-6 text-blue-400" />,
    titleKey: 'services.matterport.title',
    descriptionKey: 'services.matterport.description',
    price: "2,000",
    subServices: [
      "Real Estate Virtual Tours",
      "Hotel & Resort Tours",
      "Restaurant Virtual Tours",
      "Retail Space Scanning",
      "Museum Tours",
      "Educational Facility Tours",
      "Construction Documentation",
      "Event Space Showcases"
    ]
  },
  {
    icon: <GlobeAltIcon className="w-6 h-6 text-blue-400" />,
    titleKey: 'services.tourism.title',
    descriptionKey: 'services.tourism.description',
    price: "500",
    subServices: [
      "Destination Marketing",
      "Travel Photography",
      "Tourism Video Production",
      "Virtual Reality Experiences",
      "Hotel & Resort Media",
      "Adventure Tourism Content",
      "Cultural Experience Documentation",
      "Tourism Marketing Strategy"
    ]
  }
];

const advantages = [
  {
    icon: <Square3Stack3DIcon className="w-8 h-8 text-blue-400" />,
    titleKey: 'advantages.solutions.title',
    descriptionKey: 'advantages.solutions.description'
  },
  {
    icon: <TrophyIcon className="w-8 h-8 text-blue-400" />,
    titleKey: 'advantages.technology.title',
    descriptionKey: 'advantages.technology.description'
  },
  {
    icon: <UsersIcon className="w-8 h-8 text-blue-400" />,
    titleKey: 'advantages.partners.title',
    descriptionKey: 'advantages.partners.description'
  },
  {
    icon: <ArrowTrendingUpIcon className="w-8 h-8 text-blue-400" />,
    titleKey: 'advantages.model.title',
    descriptionKey: 'advantages.model.description'
  }
];

export default App;