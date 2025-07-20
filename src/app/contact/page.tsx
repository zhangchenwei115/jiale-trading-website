"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "../../lib/LanguageContext";
import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
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
  
  // 表单状态
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  // 处理表单输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitError('');

    try {
      // 使用 EmailJS 发送邮件
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'shengshun@jiale.de',
        reply_to: formData.email,
        timestamp: new Date().toLocaleString('de-DE', { 
          timeZone: 'Europe/Berlin',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      // 使用环境变量中的 EmailJS 配置
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
      );

      setSubmitMessage(t('contact.form.success') || '消息发送成功！我们会尽快回复您。');
      setFormData({ name: '', email: '', subject: '', message: '' }); // 清空表单
      
    } catch (error) {
      console.error('邮件发送错误:', error);
      setSubmitError('发送失败，请稍后再试或直接发邮件到 shengshun@jiale.de');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 手动发送邮件功能
  const handleEmailDirect = () => {
    const mailtoLink = `mailto:shengshun@jiale.de?subject=${encodeURIComponent(`网站咨询: ${formData.subject || '产品询问'}`)}&body=${encodeURIComponent(
      `姓名: ${formData.name}\n邮箱: ${formData.email}\n\n消息:\n${formData.message || '请在这里填写您的问题...'}\n\n---\n发送自 Jiale Trading GmbH 网站`
    )}`;
    window.open(mailtoLink);
  };

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
              <Link href="/about" className="hover:text-blue-600 transition-colors">{t('nav.about')}</Link>
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
                className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
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
              {t('contact.hero.title')}
            </h1>
            <p className="text-xl text-blue-100">
              {t('contact.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="max-w-4xl mx-auto py-16 px-4">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              {t('contact.info.title')}
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-3">
                  {t('contact.info.company')}
                </h3>
                <p className="text-gray-700 whitespace-pre-line">
                  {t('contact.info.address')}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-3">
                  {t('contact.info.phone_title')}
                </h3>
                <p className="text-gray-700">
                  <strong>Tel.:</strong> {t('contact.info.phone')}
                </p>
                <p className="text-gray-700">
                  <strong>Fax.:</strong> {t('contact.info.fax')}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-3">
                  {t('contact.info.email_title')}
                </h3>
                <p className="text-gray-700">
                  <a href="mailto:shengshun@jiale.de" className="text-blue-600 hover:underline">
                    shengshun@jiale.de
                  </a>
                </p>
                <p className="text-gray-700">
                  <a href="mailto:jiale@gmx.de" className="text-blue-600 hover:underline">
                    jiale@gmx.de
                  </a>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              {t('contact.form.title')}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 成功消息 */}
              {submitMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                  {submitMessage}
                </div>
              )}
              
              {/* 错误消息 */}
              {submitError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                  {submitError}
                </div>
              )}
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('contact.form.name_placeholder')}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('contact.form.email_placeholder')}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t('contact.form.subject')}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('contact.form.subject_placeholder')}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {t('contact.form.message')}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('contact.form.message_placeholder')}
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {language === 'de' ? 'Wird gesendet...' : 'Sending...'}
                  </span>
                ) : (
                  t('contact.form.submit')
                )}
              </button>
              
              {/* 备用邮件发送按钮 */}
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  {language === 'de' ? 'Oder senden Sie uns direkt eine E-Mail:' : 'Or send us an email directly:'}
                </p>
                <button
                  type="button"
                  onClick={handleEmailDirect}
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm border border-gray-300"
                >
                  📧 {language === 'de' ? 'E-Mail-Client öffnen' : 'Open Email Client'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; 2025 Jiale Trading GmbH. {t('footer.copyright')}
      </footer>
    </main>
  );
}
