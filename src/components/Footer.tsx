import Link from 'next/link';
import { Linkedin, Twitter, Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function Footer() {
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
                  <h3 className="text-2xl font-bold text-[#003366]">İSG PRO</h3>
                  <p className="text-sm text-dark/60">Güvenli Gelecek</p>
                </div>
              </div>
              <p className="text-dark/70 leading-relaxed mb-6">
                Türkiye'nin öncü OSGB'si olarak, iş yerlerini daha güvenli, çalışanları daha bilinçli ve işletmeleri daha verimli hale getirme misyonuyla çalışıyoruz.
              </p>
              
              {/* Social Media */}
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gradient-to-br from-[#003366] to-[#4CAF50] rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gradient-to-br from-[#003366] to-[#4CAF50] rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gradient-to-br from-[#003366] to-[#4CAF50] rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
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
                    <a href="tel:+905551234567" className="text-dark/70 hover:text-[#4CAF50] transition-colors">
                      +90 (555) 123 45 67
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[#4CAF50]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#4CAF50]" />
                  </div>
                  <div>
                    <p className="font-medium text-dark">E-posta</p>
                    <a href="mailto:info@isgsirketi.com" className="text-dark/70 hover:text-[#4CAF50] transition-colors">
                      info@isgsirketi.com
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
                      Örnek Mah. Atatürk Cad. No:123, İstanbul
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
                  <Link href="/hakkimizda" className="text-dark/70 hover:text-[#4CAF50] transition-colors flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link href="/hizmetler" className="text-dark/70 hover:text-[#4CAF50] transition-colors flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Hizmetler
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-dark/70 hover:text-[#4CAF50] transition-colors flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-[#003366] mb-4 flex items-center">
                <span className="w-2 h-2 bg-[#4CAF50] rounded-full mr-3"></span>
                Hizmetlerimiz
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/hizmetler/risk-degerlendirmesi" className="text-dark/70 hover:text-[#4CAF50] transition-colors flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Risk Değerlendirmesi
                  </Link>
                </li>
                <li>
                  <Link href="/hizmetler/isg-egitimleri" className="text-dark/70 hover:text-[#4CAF50] transition-colors flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    İSG Eğitimleri
                  </Link>
                </li>
                <li>
                  <Link href="/hizmetler/acil-durum-planlamasi" className="text-dark/70 hover:text-[#4CAF50] transition-colors flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Acil Durum Planlaması
                  </Link>
                </li>
                <li>
                  <Link href="/hizmetler/saglik-taramalari" className="text-dark/70 hover:text-[#4CAF50] transition-colors flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Sağlık Taramaları
                  </Link>
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
                  <Link href="/gizlilik-politikasi" className="text-dark/70 hover:text-[#4CAF50] transition-colors flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Gizlilik Politikası
                  </Link>
                </li>
                <li>
                  <Link href="/kullanim-kosullari" className="text-dark/70 hover:text-[#4CAF50] transition-colors flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Kullanım Koşulları
                  </Link>
                </li>
                <li>
                  <Link href="/kvkk-aydinlatma" className="text-dark/70 hover:text-[#4CAF50] transition-colors flex items-center group">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    KVKK Aydınlatma Metni
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold text-[#003366] mb-4 flex items-center">
                <span className="w-2 h-2 bg-[#4CAF50] rounded-full mr-3"></span>
                Bülten
              </h4>
              <p className="text-dark/70 mb-4 text-sm">
                İSG güncellemeleri ve yeni hizmetlerimizden haberdar olun.
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
              © {new Date().getFullYear()} İSG PRO. Tüm Hakları Saklıdır.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                Çerez Politikası
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                Kullanım Şartları
              </a>
              <p className="text-white/60 text-sm">
                Tasarım & Geliştirme: <a href="#" className="hover:text-white transition-colors">Modern Web Solutions</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 