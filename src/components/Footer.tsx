'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Linkedin, Twitter, Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface FooterData {
  id: number;
  company_name: string;
  company_tagline: string;
  company_description: string;
  phone: string;
  email: string;
  address: string;
  linkedin_url: string;
  twitter_url: string;
  instagram_url: string;
  newsletter_title: string;
  newsletter_description: string;
  copyright_text: string;
  design_credit: string;
}

export default function Footer() {
  const [footerData, setFooterData] = useState<FooterData | null>(null);

  useEffect(() => {
    async function fetchFooterData() {
      try {
        const { data, error } = await supabase
          .from('footer')
          .select('*')
          .limit(1)
          .single();

        if (error) {
          console.error('Footer data fetch error:', error);
          // Varsayılan verileri kullan
          setFooterData({
            id: 1,
            company_name: 'Kılıçoğlu OSGB',
            company_tagline: 'Hatay\'ın Güvenilir İSG Partneri',
            company_description: 'Hatay\'ın lider OSGB\'si olarak, iş yerlerini daha güvenli, çalışanları daha bilinçli ve işletmeleri daha verimli hale getirme misyonuyla çalışıyoruz. Hatay OSGB hizmetleri ile iş güvenliği danışmanlığı.',
            phone: '+90 (555) 123 45 67',
            email: 'info@isgsirketi.com',
            address: 'Örnek Mah. Atatürk Cad. No:123, İstanbul',
            linkedin_url: '#',
            twitter_url: '#',
            instagram_url: '#',
            newsletter_title: 'Bülten',
            newsletter_description: 'İSG güncellemeleri ve yeni hizmetlerimizden haberdar olun.',
            copyright_text: '© 2024 İSG PRO. Tüm Hakları Saklıdır.',
            design_credit: 'Tasarım & Geliştirme: Modern Web Solutions'
          });
        } else {
          setFooterData(data);
        }
      } catch (error) {
        console.error('Footer data fetch error:', error);
        // Varsayılan verileri kullan
        setFooterData({
          id: 1,
                      company_name: 'Kılıçoğlu OSGB',
            company_tagline: 'Hatay\'ın Güvenilir İSG Partneri',
            company_description: 'Hatay\'ın lider OSGB\'si olarak, iş yerlerini daha güvenli, çalışanları daha bilinçli ve işletmeleri daha verimli hale getirme misyonuyla çalışıyoruz. Hatay OSGB hizmetleri ile iş güvenliği danışmanlığı.',
          phone: '+90 (555) 123 45 67',
          email: 'info@isgsirketi.com',
          address: 'Örnek Mah. Atatürk Cad. No:123, İstanbul',
          linkedin_url: '#',
          twitter_url: '#',
          instagram_url: '#',
          newsletter_title: 'Bülten',
          newsletter_description: 'İSG güncellemeleri ve yeni hizmetlerimizden haberdar olun.',
          copyright_text: '© 2024 İSG PRO. Tüm Hakları Saklıdır.',
          design_credit: 'Tasarım & Geliştirme: Modern Web Solutions'
        });
      }
    }
    fetchFooterData();
  }, []);

  return (
    <footer>
      {/* Main Footer Content */}
      <div className="relative py-20 md:py-24">
        {/* Background Image - Only for main footer */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80')`
          }}
        ></div>
        
        {/* Background Pattern Overlay - Only for main footer */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#003366]/20 to-[#4CAF50]/20"></div>
        
        {/* Content with backdrop blur */}
        <div className="relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Section - Brand & Contact */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#003366] to-[#4CAF50] rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">İ</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#003366]">{footerData?.company_name || 'İSG PRO'}</h3>
                  <p className="text-sm text-dark/60">{footerData?.company_tagline || 'Güvenli Gelecek'}</p>
                </div>
              </div>
              <p className="text-dark/70 leading-relaxed mb-6">
                {footerData?.company_description || 'Türkiye\'nin öncü OSGB\'si olarak, iş yerlerini daha güvenli, çalışanları daha bilinçli ve işletmeleri daha verimli hale getirme misyonuyla çalışıyoruz.'}
              </p>
              
              {/* Social Media */}
              <div className="flex space-x-4">
                <a href={footerData?.linkedin_url || '#'} className="w-10 h-10 bg-gradient-to-br from-[#003366] to-[#4CAF50] rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={footerData?.twitter_url || '#'} className="w-10 h-10 bg-gradient-to-br from-[#003366] to-[#4CAF50] rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href={footerData?.instagram_url || '#'} className="w-10 h-10 bg-gradient-to-br from-[#003366] to-[#4CAF50] rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h4 className="text-lg font-semibold text-[#003366] mb-6">İletişim Bilgileri</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[#4CAF50]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#4CAF50]" />
                  </div>
                  <div>
                    <p className="font-medium text-dark">Telefon</p>
                    <a href={`tel:${footerData?.phone?.replace(/\s/g, '') || '+905551234567'}`} className="text-dark/70 hover:text-[#4CAF50] transition-colors">
                      {footerData?.phone || '+90 (555) 123 45 67'}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[#4CAF50]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#4CAF50]" />
                  </div>
                  <div>
                    <p className="font-medium text-dark">E-posta</p>
                    <a href={`mailto:${footerData?.email || 'info@isgsirketi.com'}`} className="text-dark/70 hover:text-[#4CAF50] transition-colors">
                      {footerData?.email || 'info@isgsirketi.com'}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[#4CAF50]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#4CAF50]" />
                  </div>
                  <div>
                    <p className="font-medium text-dark">Adres</p>
                    <p className="text-dark/70">
                      {footerData?.address || 'Örnek Mah. Atatürk Cad. No:123, İstanbul'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Section - Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-[#003366] mb-4 flex items-center">
                <span className="w-2 h-2 bg-[#4CAF50] rounded-full mr-3"></span>
                Hızlı Erişim
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-dark/70 hover:text-[#4CAF50] transition-colors flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Ana Sayfa
                  </Link>
                </li>
                <li>
                  <a href="#services" className="text-dark/70 hover:text-[#4CAF50] transition-colors flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Hatay OSGB Hizmetleri
                  </a>
                </li>
                <li>
                  <a href="#why-us" className="text-dark/70 hover:text-[#4CAF50] transition-colors flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Neden Biz
                  </a>
                </li>
                <li>
                  <a href="#team" className="text-dark/70 hover:text-[#4CAF50] transition-colors flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Hatay İSG Ekibi
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-[#003366] mb-4 flex items-center">
                <span className="w-2 h-2 bg-[#4CAF50] rounded-full mr-3"></span>
                İSG Hizmetlerimiz
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#services" className="text-dark/70 hover:text-[#4CAF50] transition-colors flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Risk Değerlendirmesi
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-dark/70 hover:text-[#4CAF50] transition-colors flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    İSG Eğitimleri
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-dark/70 hover:text-[#4CAF50] transition-colors flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Acil Durum Planlaması
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-dark/70 hover:text-[#4CAF50] transition-colors flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Sağlık Taramaları
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-[#003366] mb-4 flex items-center">
                <span className="w-2 h-2 bg-[#4CAF50] rounded-full mr-3"></span>
                Yasal
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#contact" className="text-dark/70 hover:text-[#4CAF50] transition-colors flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Gizlilik Politikası
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-dark/70 hover:text-[#4CAF50] transition-colors flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Kullanım Koşulları
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-dark/70 hover:text-[#4CAF50] transition-colors flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    KVKK Aydınlatma Metni
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold text-[#003366] mb-4 flex items-center">
                <span className="w-2 h-2 bg-[#4CAF50] rounded-full mr-3"></span>
                {footerData?.newsletter_title || 'Bülten'}
              </h4>
              <p className="text-dark/70 mb-4 text-sm">
                {footerData?.newsletter_description || 'İSG güncellemeleri ve yeni hizmetlerimizden haberdar olun.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg sm:rounded-l-lg sm:rounded-r-none focus:outline-none focus:border-[#4CAF50] text-sm"
                />
                <button className="px-4 py-2 bg-[#4CAF50] text-white rounded-lg sm:rounded-l-none sm:rounded-r-lg hover:bg-[#4CAF50]/90 transition-colors flex items-center justify-center">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Bottom Section - Copyright */}
      <div className="bg-gradient-to-r from-[#003366] to-[#003366]/90 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/80 text-sm">
              {footerData?.copyright_text?.replace('2024', new Date().getFullYear().toString()) || `© ${new Date().getFullYear()} İSG PRO. Tüm Hakları Saklıdır.`}
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                Çerez Politikası
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                Kullanım Şartları
              </a>
              <p className="text-white/60 text-sm">
                {footerData?.design_credit || 'Tasarım & Geliştirme: Modern Web Solutions'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 