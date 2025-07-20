"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "../lib/LanguageContext";
import { useState } from 'react';

export default function Home() {
  const { language, setLanguage, t } = useLanguage();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <header className="fixed top-0 left-0 right-0 bg-white shadow p-4 flex justify-between items-center z-10">
        <h1 className="text-2xl font-bold text-black">Jiale Trading GmbH</h1>
        <div className="flex items-center space-x-6">
          <nav className="space-x-4 text-gray-700">
            <Link href="/">{t('nav.home')}</Link>
            <Link href="/about">{t('nav.about')}</Link>
            <Link href="/products">{t('nav.products')}</Link>
            <Link href="/contact">{t('nav.contact')}</Link>
          </nav>
          
          {/* Language Switcher */}
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
      </header>

      <section className="relative flex flex-col justify-center items-center text-center h-screen bg-gradient-to-br from-gray-800 via-blue-900 to-gray-900 overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-24 h-24 bg-blue-400 rounded-full"></div>
          <div className="absolute bottom-40 right-32 w-16 h-16 bg-white rounded-full"></div>
          <div className="absolute bottom-20 left-40 w-32 h-32 bg-blue-300 rounded-full"></div>
        </div>
        
        {/* Gentle Floating Animation */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/3 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-60"
            animate={{
              y: [0, -15, 0],
              opacity: [0.6, 0.9, 0.6]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-white rounded-full opacity-50"
            animate={{
              y: [0, -20, 0],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 max-w-5xl mx-auto px-4"
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
              {t('home.hero.title')}
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-blue-100 mb-10 font-light max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
          >
            {t('home.hero.subtitle')}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <Link
              href="/contact"
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-4 rounded-lg text-lg font-semibold shadow-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300"
            >
              {t('home.hero.cta')} →
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Welcome Section */}
      <section className="relative py-20 bg-gradient-to-br from-white via-blue-50 to-gray-50">
        {/* Subtle Background Decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 right-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-gray-200 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-blue-800 bg-clip-text text-transparent mb-8 leading-tight">
              {t('home.welcome.title')}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-gray-200"
                >
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    {t('home.welcome.description1')}
                  </p>
                  
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    <strong className="text-blue-700">{t('home.welcome.description2')}</strong>
                  </p>
                  
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    {t('home.welcome.description3')}
                  </p>
                  
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {t('home.welcome.description4')}
                  </p>
                  
                  <p className="text-xl font-semibold text-blue-700 text-center py-4 bg-blue-50 rounded-lg border border-blue-200">
                    {t('home.welcome.description5')}
                  </p>
                </motion.div>
              </div>

              {/* Professional Visual Element */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-8 shadow-xl">
                  <div className="text-white text-center">
                    <div className="text-5xl mb-6">🎨</div>
                    <h3 className="text-2xl font-bold mb-6">{t('home.features.title')}</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-center space-x-3 text-left">
                        <span className="w-2 h-2 bg-blue-200 rounded-full flex-shrink-0"></span>
                        <span>{t('home.features.environmentally_friendly')}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-3 text-left">
                        <span className="w-2 h-2 bg-blue-200 rounded-full flex-shrink-0"></span>
                        <span>{t('home.features.high_quality')}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-3 text-left">
                        <span className="w-2 h-2 bg-blue-200 rounded-full flex-shrink-0"></span>
                        <span>{t('home.features.experience')}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-3 text-left">
                        <span className="w-2 h-2 bg-blue-200 rounded-full flex-shrink-0"></span>
                        <span>{t('home.features.reliable_delivery')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gray-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl font-bold text-center bg-gradient-to-r from-gray-800 to-blue-800 bg-clip-text text-transparent mb-16"
          >
            {t('home.products.title')}
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Baumwolltaschen",
                subtitle: "100% Natürlich & Nachhaltig",
                features: ["Umweltfreundlich", "Langlebig", "Individuell bedruckbar"],
                color: "from-green-600 to-emerald-700",
                bgColor: "bg-green-50",
                borderColor: "border-green-200"
              },
              {
                title: "PP Taschen", 
                subtitle: "Robust & Vielseitig",
                features: ["Wasserfest", "Reißfest", "Kostengünstig"],
                color: "from-blue-600 to-blue-700",
                bgColor: "bg-blue-50",
                borderColor: "border-blue-200"
              },
              {
                title: "Beschichtete Taschen",
                subtitle: "Premium Qualität",
                features: ["Elegant", "Pflegeleicht", "Hochwertig"],
                color: "from-purple-600 to-purple-700",
                bgColor: "bg-purple-50",
                borderColor: "border-purple-200"
              }
            ].map((product, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + idx * 0.2 }}
                className="group"
                whileHover={{ y: -5 }}
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-gray-300">
                  {/* Product Image Placeholder */}
                  <div className={`h-48 ${product.bgColor} flex items-center justify-center relative overflow-hidden`}>
                    <div className="text-gray-500 text-sm">Produktbild</div>
                    {/* Subtle gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-10`}></div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 mb-4 font-medium">
                      {product.subtitle}
                    </p>
                    
                    <ul className="space-y-2 mb-6">
                      {product.features.map((feature, featureIdx) => (
                        <li key={featureIdx} className="flex items-center text-gray-700">
                          <span className={`w-2 h-2 bg-gradient-to-r ${product.color} rounded-full mr-3`}></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <button className={`w-full bg-gradient-to-r ${product.color} text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300`}>
                      Mehr erfahren
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center mt-16"
          >
            <Link
              href="/products"
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Alle Produkte ansehen
            </Link>
          </motion.div>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-blue-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Jiale Trading GmbH
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Ihr zuverlässiger Partner für hochwertige Werbeartikel und umweltfreundliche Taschen seit über 20 Jahren.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                  📧
                </div>
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors cursor-pointer">
                  📞
                </div>
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center hover:bg-purple-700 transition-colors cursor-pointer">
                  🌐
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-300">Navigation</h4>
              <ul className="space-y-3">
                <li><Link href="/" className="text-gray-300 hover:text-blue-200 transition-colors">Startseite</Link></li>
                <li><Link href="/about" className="text-gray-300 hover:text-blue-200 transition-colors">Über uns</Link></li>
                <li><Link href="/products" className="text-gray-300 hover:text-blue-200 transition-colors">Produkte</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-blue-200 transition-colors">Kontakt</Link></li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-300">Kontakt</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p>Hempbarg 38</p>
                <p>22589 Hamburg</p>
                <p>Tel: +49 40/87082588</p>
                <p>Fax: +49 40/71498135</p>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; 2025 Jiale Trading GmbH. {t('footer.copyright')}
            </p>
            
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>Made with</span>
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-red-400"
              >
                ❤️
              </motion.span>
              <span>in Hamburg</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
