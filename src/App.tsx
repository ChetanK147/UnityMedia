import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
  VideoCameraIcon,
  CameraIcon,
  SpeakerWaveIcon,
  LightBulbIcon,
  CubeIcon,
  PlayIcon,
  CheckIcon,
  StarIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { AuthProvider } from './contexts/AuthContext';
import { AuthModal } from './components/auth/AuthModal';
import { Dashboard } from './components/dashboard/Dashboard';
import { useAuth } from './contexts/AuthContext';

function AppContent() {
  const { user, loading } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (user) {
    return <Dashboard />;
  }

  return <HomePage onAuthOpen={(mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  }} />;
}

interface HomePageProps {
  onAuthOpen: (mode: 'signin' | 'signup') => void;
}

function HomePage({ onAuthOpen }: HomePageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [activeEquipmentCategory, setActiveEquipmentCategory] = useState('cameras');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const equipmentCategories = {
    cameras: {
      title: 'Professional Cameras',
      items: [
        { name: 'Sony FX3', specs: 'Full Frame Cinema Camera', image: 'src/lib/SonyFX3.jpg' },
        { name: 'Sony A7C II', specs: 'Compact Full Frame Mirrorless', image: 'src/lib/SonyA7Cii.jpg' },
        { name: 'RED KOMODO 6K', specs: 'Global Shutter Cinema Camera', image: 'src/lib/RED Komodo 6K.jpg' },
        { name: 'ARRI Alexa Mini LF', specs: 'Large Format Cinema Camera', image: 'src/lib/Arri Alexa Mini LF.jpg' }
      ]
    },
    lenses: {
      title: 'Cinema Lenses',
      items: [
        { name: 'Sony 16mm f/1.8', specs: 'Ultra-Wide Prime Lens', image: 'src/lib/Sony 16mm f:1.8.jpg' },
        { name: 'Sony 50mm f/1.2 GM', specs: 'Professional Portrait Prime', image: 'src/lib/Sony 50mm f:1.8.jpg' },
        { name: 'Sony 24-70mm f/2.8 GM II', specs: 'Professional Zoom Lens', image: 'src/lib/Sony 24-70mm f:1.8.jpg' },
        { name: 'DZO Vespid Prime Cine Lenses', specs: 'Cinema Prime Lens Set', image: 'src/lib/DZOFilm Vespid Prime SET.jpg' },
        { name: 'Cooke S4 Mini', specs: 'Professional Cinema Primes', image: 'src/lib/Cooke SP3 SET.jpg' }
      ]
    },
    accessories: {
      title: 'Accessories & Support',
      items: [
        { name: 'DJI Ronin S', specs: '3-Axis Handheld Gimbal', image: 'src/lib/DJI Ronin S.jpg' },
        { name: 'DJI Ronin RS4 Pro', specs: 'Professional Gimbal Stabilizer', image: 'src/lib/DJI RS4Pro.jpg' },
        { name: 'Sony NPF-Z Battery', specs: 'High Capacity Camera Battery', image: 'src/lib/Sony NP-FZ100.jpg' },
        { name: 'Professional Tripods', specs: 'Carbon Fiber Support Systems', image: 'src/lib/Professional Tripod.jpg' }
      ]
    },
    lighting: {
      title: 'Lighting & Accessories',
      items: [
        { name: 'ARRI SkyPanel S60-C', specs: 'LED Softlight', image: 'src/lib/ARRI Skypanel S60-C.jpg' },
        { name: 'Aputure 300d Mark II', specs: 'Daylight LED Light', image: 'src/lib/Aputure LS C300d II.jpg' },
        { name: 'Godox VL300', specs: 'Bi-Color LED Video Light', image: 'src/lib/GODOX VL300.jpg' },
        { name: 'C-Stands & Modifiers', specs: 'Complete Grip Package', image: 'src/lib/C Stands.jpg' }
      ]
    }
  };

  const shortFormPackages = [
    {
      name: 'Basic',
      price: 300,
      features: [
        'Up to 60 seconds',
        'Basic editing',
        'Color correction',
        'Audio sync',
        '1 revision included'
      ]
    },
    {
      name: 'Standard',
      price: 500,
      features: [
        'Up to 90 seconds',
        'Advanced editing',
        'Color grading',
        'Motion graphics',
        'Sound design',
        '2 revisions included'
      ]
    },
    {
      name: 'Premium',
      price: 700,
      features: [
        'Up to 120 seconds',
        'Professional editing',
        'Advanced color grading',
        'Custom motion graphics',
        'Professional sound design',
        'Unlimited revisions'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-gray-900 cursor-pointer"
              onClick={() => scrollToSection('hero')}
            >
              UnityMedia
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { id: 'equipment', label: 'Equipment Rentals' },
                { id: 'video-services', label: 'Video Services' },
                { id: 'drone-services', label: 'Drone Filming' },
                { id: 'matterport', label: '3D Tours' },
                { id: 'production', label: 'Production' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                >
                  {item.label}
                </motion.button>
              ))}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => onAuthOpen('signin')}
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                Sign In
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => onAuthOpen('signup')}
                className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white px-4 py-2 rounded-lg font-medium transition-all"
              >
                Get Started
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
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
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="px-4 py-3 space-y-3">
                {[
                  { id: 'equipment', label: 'Equipment Rentals' },
                  { id: 'video-services', label: 'Video Services' },
                  { id: 'drone-services', label: 'Drone Filming' },
                  { id: 'matterport', label: '3D Tours' },
                  { id: 'production', label: 'Production' },
                  { id: 'contact', label: 'Contact' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left text-gray-600 hover:text-gray-900 py-2 font-medium"
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => onAuthOpen('signin')}
                  className="block w-full text-left text-gray-600 hover:text-gray-900 py-2 font-medium"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onAuthOpen('signup')}
                  className="block w-full text-left bg-gradient-to-r from-primary-500 to-accent-500 text-white px-4 py-2 rounded-lg font-medium mt-2"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-accent-50 to-creative-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-creative bg-clip-text text-transparent"
          >
            Professional Media
            <span className="block text-primary-600">Solutions</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-gray-600 max-w-3xl mx-auto"
          >
            Equipment rentals, video production, and 3D tours for Dubai's creative professionals
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button 
              onClick={() => scrollToSection('equipment')}
              className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              View Equipment
            </button>
            <button 
              onClick={() => onAuthOpen('signup')}
              className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all"
            >
              Get Started
            </button>
          </motion.div>
        </div>
      </section>

      {/* Equipment Rentals Section */}
      <section id="equipment" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Equipment Rentals</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Professional-grade equipment for all your production needs
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all inline-flex items-center shadow-lg hover:shadow-xl"
            >
              <DocumentTextIcon className="w-5 h-5 mr-2" />
              View Rate Card
            </motion.button>
          </motion.div>

          {/* Equipment Categories */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {Object.entries(equipmentCategories).map(([key, category]) => (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveEquipmentCategory(key)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    activeEquipmentCategory === key
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.title}
                </motion.button>
              ))}
            </div>

            <motion.div 
              key={activeEquipmentCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {equipmentCategories[activeEquipmentCategory as keyof typeof equipmentCategories].items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
                >
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.specs}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Rental Inquiry Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-lg p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">Equipment Rental Inquiry</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                type="text" 
                placeholder="Full Name" 
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input 
                type="date" 
                placeholder="Rental Date" 
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea 
                placeholder="Equipment needed and project details" 
                rows={4}
                className="md:col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="md:col-span-2 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                Submit Inquiry
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Video Services Section */}
      <section id="video-services" className="py-20 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Video Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional video editing and content creation services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Real Estate Video Editing */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-8 shadow-sm"
            >
              <div className="flex items-center mb-6">
                <VideoCameraIcon className="w-8 h-8 text-primary-600 mr-3" />
                <h3 className="text-2xl font-bold">Real Estate Video Editing</h3>
              </div>
              <div className="mb-6">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">AED 1,500</div>
                <p className="text-gray-600">Base price for up to 12-minute videos</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                  <span>Up to 12-minute final video</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                  <span>Professional color grading</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                  <span>One free revision included</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                  <span>Additional revisions: AED 250 each</span>
                </li>
              </ul>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                Get Started
              </motion.button>
            </motion.div>

            {/* Short-Form Content Creation */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-8 shadow-sm"
            >
              <div className="flex items-center mb-6">
                <PlayIcon className="w-8 h-8 text-primary-600 mr-3" />
                <h3 className="text-2xl font-bold">Short-Form Content Creation</h3>
              </div>
              
              <div className="space-y-4">
                {shortFormPackages.map((pkg, index) => (
                  <motion.div
                    key={pkg.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPackage === pkg.name 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedPackage(selectedPackage === pkg.name ? null : pkg.name)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-lg">{pkg.name} Package</h4>
                      <div className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">AED {pkg.price}</div>
                    </div>
                    <AnimatePresence>
                      {selectedPackage === pkg.name && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2 mt-4"
                        >
                          {pkg.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm">
                              <CheckIcon className="w-4 h-4 text-green-500 mr-2" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Drone Filming Services */}
      <section id="drone-services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-creative bg-clip-text text-transparent">Drone Filming Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional aerial cinematography with cutting-edge DJI technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="src/lib/DJI Mavic 4pro Creator Combo.jpg"
                alt="DJI Mavic 4 Pro Drone"
                className="w-full rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-overlay rounded-lg opacity-20"></div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-8">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">AED 15,000</div>
                <p className="text-xl text-gray-600">Per day with DJI Mavic 4 Pro</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckIcon className="w-6 h-6 text-creative-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold">DJI Mavic 4 Pro</h4>
                    <p className="text-gray-600">Latest professional drone technology</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="w-6 h-6 text-creative-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold">4K Cinematic Recording</h4>
                    <p className="text-gray-600">Ultra-high definition aerial footage</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="w-6 h-6 text-creative-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold">Professional Pilot</h4>
                    <p className="text-gray-600">Licensed and experienced drone operator</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="w-6 h-6 text-creative-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold">Raw Footage Delivery</h4>
                    <p className="text-gray-600">Unprocessed files for maximum flexibility</p>
                  </div>
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  <CalendarDaysIcon className="w-5 h-5 mr-2" />
                  Book Drone Service
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center"
                >
                  <EyeIcon className="w-5 h-5 mr-2" />
                  View Portfolio
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Matterport 3D Tours */}
      <section id="matterport" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Matterport 3D Tours</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Immersive virtual experiences for real estate and commercial spaces
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-8">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">AED 1,500</div>
                <p className="text-xl text-gray-600">Per space scanning</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckIcon className="w-6 h-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold">High-Resolution 3D Scanning</h4>
                    <p className="text-gray-600">Precise spatial measurements and details</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="w-6 h-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold">Interactive Virtual Tours</h4>
                    <p className="text-gray-600">Fully navigable 3D experiences</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="w-6 h-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold">Floor Plans & Measurements</h4>
                    <p className="text-gray-600">Accurate architectural drawings included</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="w-6 h-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold">VR Compatible</h4>
                    <p className="text-gray-600">Works with VR headsets for immersive viewing</p>
                  </div>
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  <CalendarDaysIcon className="w-5 h-5 mr-2" />
                  Book Scanning
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center"
                >
                  <EyeIcon className="w-5 h-5 mr-2" />
                  View Demo
                </motion.button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80"
                alt="3D Virtual Tour Example"
                className="w-full rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-overlay rounded-lg flex items-center justify-center">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white/90 hover:bg-white text-primary-600 w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                >
                  <PlayIcon className="w-8 h-8 ml-1" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Production */}
      <section id="production" className="py-20 bg-gradient-to-br from-accent-50 to-creative-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Video Production</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete video production services with professional crew and equipment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80"
                alt="Video Production Setup"
                className="w-full rounded-lg shadow-lg"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-8">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">AED 3,000</div>
                <p className="text-xl text-gray-600">Per day production rent per set of camera</p>
              </div>
              
              <div className="space-y-6 mb-8">
                <div>
                  <h4 className="font-semibold text-lg mb-2">Service Scope</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Professional cinematography</li>
                    <li>• Multi-camera setups</li>
                    <li>• Audio recording</li>
                  </ul>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white py-4 rounded-lg font-semibold transition-all flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                <CalendarDaysIcon className="w-5 h-5 mr-2" />
                Book Production Day
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Trusted by Professionals</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join hundreds of satisfied clients across Dubai and the UAE
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { metric: '500+', label: 'Projects Completed' },
              { metric: '200+', label: 'Happy Clients' },
              { metric: '50+', label: 'Equipment Items' },
              { metric: '100+', label: 'Drone Flights' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">{stat.metric}</div>
                <div className="text-xl text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                name: "Ahmed Al-Rashid",
                role: "Real Estate Developer",
                content: "UnityMedia delivered exceptional 3D tours for our luxury properties. The quality and attention to detail exceeded our expectations.",
                rating: 5
              },
              {
                name: "Sarah Johnson",
                role: "Marketing Director",
                content: "Their equipment rental service is top-notch. Always reliable, professional gear that helps us deliver outstanding results for our clients.",
                rating: 5
              },
              {
                name: "Omar Hassan",
                role: "Content Creator",
                content: "The drone filming service captured stunning aerial shots for our project. The DJI Mavic 4 Pro delivered incredible 4K footage.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to start your next project? Contact us for a consultation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
              <div className="space-y-6">
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-center group"
                >
                  <PhoneIcon className="w-6 h-6 text-primary-400 mr-4" />
                  <div>
                    <div className="font-semibold">Phone</div>
                    <a href="tel:+97143792667" className="text-gray-300 group-hover:text-primary-400 transition-colors">
                      +971 4 379 2667
                    </a>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-center group"
                >
                  <EnvelopeIcon className="w-6 h-6 text-primary-400 mr-4" />
                  <div>
                    <div className="font-semibold">Email</div>
                    <a href="mailto:unitymediafze@icloud.com" className="text-gray-300 group-hover:text-primary-400 transition-colors">
                      unitymediafze@icloud.com
                    </a>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-center group"
                >
                  <MapPinIcon className="w-6 h-6 text-primary-400 mr-4" />
                  <div>
                    <div className="font-semibold">Location</div>
                    <div className="text-gray-300">Dubai, UAE</div>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="flex items-center group"
                >
                  <ChatBubbleLeftRightIcon className="w-6 h-6 text-creative-400 mr-4" />
                  <div>
                    <div className="font-semibold">WhatsApp</div>
                    <a 
                      href="https://wa.me/971505148299" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-300 group-hover:text-creative-400 transition-colors"
                    >
                      +971 50 514 8299
                    </a>
                  </div>
                </motion.div>
              </div>
              
              <motion.a
                href="https://wa.me/971505148299"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-gradient-to-r from-creative-500 to-creative-600 hover:from-creative-600 hover:to-creative-700 text-white px-6 py-3 rounded-lg font-semibold transition-all mt-8 shadow-lg hover:shadow-xl"
              >
                <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
                Chat on WhatsApp
              </motion.a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-8">Send Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                </div>
                <input 
                  type="text" 
                  placeholder="Subject" 
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
                <textarea 
                  placeholder="Your message" 
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                ></textarea>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-2xl font-bold mb-4 text-white">UnityMedia</div>
          <p className="text-gray-400 mb-4">Professional Media Solutions in Dubai</p>
          <p className="text-gray-500">© 2025 UnityMedia. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/*" element={<AppContent />} />
          </Routes>
          
          <AuthModal
            isOpen={authModalOpen}
            onClose={() => setAuthModalOpen(false)}
            initialMode={authMode}
          />
          
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;