"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "../../lib/LanguageContext";
import { useState, useEffect } from 'react';

export default function About() {
  const { language, setLanguage, t } = useLanguage();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 100) {
        // Always show header when near top
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide header
        setIsHeaderVisible(false);
      } else {
        // Scrolling up - show header
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <header className={`fixed top-0 left-0 right-0 bg-white shadow p-4 z-10 transition-transform duration-300 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-xl md:text-2xl font-bold text-black">Jiale Trading GmbH</h1>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="space-x-4 text-gray-700">
              <Link href="/" className="hover:text-blue-600 transition-colors">{t('nav.home')}</Link>
              <Link href="/about" className="text-blue-600 font-semibold">{t('nav.about')}</Link>
              <Link href="/products" className="hover:text-blue-600 transition-colors">{t('nav.products')}</Link>
              <Link href="/contact" className="hover:text-blue-600 transition-colors">{t('nav.contact')}</Link>
            </nav>
            
            {/* Desktop Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <span className="text-xl">{language === 'de' ? '🇩🇪' : '🇺🇸'}</span>
                <span className="uppercase font-medium">{language}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 py-2 w-24 bg-white rounded-md shadow-lg border">
                  <button
                    onClick={() => {
                      setLanguage('de');
                      setShowLanguageMenu(false);
                    }}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    <span>🇩🇪</span>
                    <span>DE</span>
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('en');
                      setShowLanguageMenu(false);
                    }}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    <span>🇺🇸</span>
                    <span>EN</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'de' ? 'en' : 'de')}
              className="flex items-center space-x-1 px-2 py-1 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <span className="text-lg">{language === 'de' ? '🇩🇪' : '🇺🇸'}</span>
            </button>
            
            {/* Hamburger Menu */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {showMobileMenu ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {showMobileMenu && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3 pt-4">
              <Link 
                href="/" 
                className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                {t('nav.home')}
              </Link>
              <Link 
                href="/about" 
                className="block px-4 py-2 text-blue-600 font-semibold bg-blue-50 rounded"
                onClick={() => setShowMobileMenu(false)}
              >
                {t('nav.about')}
              </Link>
              <Link 
                href="/products" 
                className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                {t('nav.products')}
              </Link>
              <Link 
                href="/contact" 
                className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                {t('nav.contact')}
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-white mb-6">
              {t('about.hero.title')}
            </h1>
            <p className="text-xl text-blue-100">
              {t('about.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              {t('about.company.title')}
            </h2>
            
            <div className="bg-white rounded-lg shadow-lg p-8 text-left space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('about.company.description1')}
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('about.company.description2')}
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('about.company.description3')}
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('about.company.description4')}
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('about.company.description5')}
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('about.company.description6')}
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <div className="bg-blue-50 rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {t('about.company.mission.title')}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('about.company.mission.description')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-3xl font-bold text-center text-gray-800 mb-12"
          >
            {t('about.values.title')}
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: t('about.values.delivery.title'),
                description: t('about.values.delivery.description'),
                icon: "🚚"
              },
              {
                title: t('about.values.quality.title'),
                description: t('about.values.quality.description'),
                icon: "✅"
              },
              {
                title: t('about.values.timeline.title'),
                description: t('about.values.timeline.description'),
                icon: "⏰"
              }
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 + idx * 0.2 }}
                className="bg-white rounded-lg shadow-lg p-6 text-center"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              {t('about.contact.title')}
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              {t('about.contact.description')}
            </p>
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-700 transition-colors"
            >
              {t('about.contact.cta')}
            </Link>
            
            <div className="mt-8 p-6 bg-gray-100 rounded-lg">
              <p className="text-gray-600 italic whitespace-pre-line">
                {t('about.contact.signature')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; 2025 Jiale Trading GmbH. {t('footer.copyright')}
      </footer>
    </main>
  );
}
