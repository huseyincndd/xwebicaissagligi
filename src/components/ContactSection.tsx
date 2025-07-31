"use client";

import { useState, useEffect } from 'react';
import { ArrowRight, Mail, Phone, MapPin, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface ContactData {
  id: number;
  badge_text: string;
  main_title: string;
  subtitle: string;
  email: string;
  phone: string;
  address: string;
  form_title: string;
  form_subtitle: string;
}

export default function ContactSection() {
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContactData() {
      try {
        const { data, error } = await supabase
          .from('contact')
          .select('*')
          .limit(1)
          .single();

        if (error) {
          console.error('Contact data fetch error:', error);
          // Varsayılan verileri kullan
          setContactData({
            id: 1,
            badge_text: 'İletişime Geçin',
            main_title: 'İşbirliğine Hazır mısınız?',
            subtitle: 'Güvenli bir çalışma ortamı yaratma yolculuğunuzda size rehberlik edelim. Aşağıdaki formu doldurun, uzmanlarımız en kısa sürede size ulaşsın.',
            email: 'info@isgsirketi.com',
            phone: '+90 (555) 123 45 67',
            address: 'Örnek Mah. Atatürk Cad. No:123, İstanbul',
            form_title: 'Mesajınızı Gönderin',
            form_subtitle: 'Uzmanlarımız en kısa sürede size ulaşacaktır.'
          });
        } else {
          setContactData(data);
        }
      } catch (error) {
        console.error('Contact data fetch error:', error);
        // Varsayılan verileri kullan
        setContactData({
          id: 1,
          badge_text: 'İletişime Geçin',
          main_title: 'İşbirliğine Hazır mısınız?',
          subtitle: 'Güvenli bir çalışma ortamı yaratma yolculuğunuzda size rehberlik edelim. Aşağıdaki formu doldurun, uzmanlarımız en kısa sürede size ulaşsın.',
          email: 'info@isgsirketi.com',
          phone: '+90 (555) 123 45 67',
          address: 'Örnek Mah. Atatürk Cad. No:123, İstanbul',
          form_title: 'Mesajınızı Gönderin',
          form_subtitle: 'Uzmanlarımız en kısa sürede size ulaşacaktır.'
        });
      } finally {
        setLoading(false);
      }
    }
    fetchContactData();
  }, []);

  return (
    <section id="contact" className="relative bg-gradient-to-br from-gray-50 to-white py-24 md:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#003366]/5 to-[#4CAF50]/5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Contact Block */}
        <div className="max-w-6xl mx-auto relative grid lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          
          {/* Left Side - Persuasive Message */}
          <div className="p-8 md:p-12 lg:p-16 relative">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#4CAF50]/10 border border-[#4CAF50]/20 rounded-full px-6 py-3 mb-8">
              <span className="w-2 h-2 bg-[#4CAF50] rounded-full"></span>
              <span className="text-[#4CAF50] font-medium text-sm">{contactData?.badge_text || 'İletişime Geçin'}</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-[#003366] leading-tight">
              {contactData?.main_title || 'İşbirliğine Hazır mısınız?'}
            </h2>
            <p className="mt-6 text-lg text-dark/80 leading-relaxed">
              {contactData?.subtitle || 'Güvenli bir çalışma ortamı yaratma yolculuğunuzda size rehberlik edelim. Aşağıdaki formu doldurun, uzmanlarımız en kısa sürede size ulaşsın.'}
            </p>
            
            {/* Enhanced Contact Info */}
            <div className="mt-12 space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="w-12 h-12 bg-[#4CAF50]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-[#4CAF50]" />
                </div>
                <div>
                  <p className="font-semibold text-[#003366] text-sm">E-posta</p>
                  <a href={`mailto:${contactData?.email || 'info@isgsirketi.com'}`} className="text-dark/80 hover:text-[#4CAF50] transition-colors">
                    {contactData?.email || 'info@isgsirketi.com'}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="w-12 h-12 bg-[#4CAF50]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-[#4CAF50]" />
                </div>
                <div>
                  <p className="font-semibold text-[#003366] text-sm">Telefon</p>
                  <a href={`tel:${contactData?.phone?.replace(/\s/g, '') || '+905551234567'}`} className="text-dark/80 hover:text-[#4CAF50] transition-colors">
                    {contactData?.phone || '+90 (555) 123 45 67'}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="w-12 h-12 bg-[#4CAF50]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#4CAF50]" />
                </div>
                <div>
                  <p className="font-semibold text-[#003366] text-sm">Adres</p>
                  <p className="text-dark/80">
                    {contactData?.address || 'Örnek Mah. Atatürk Cad. No:123, İstanbul'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Layered Form Block */}
          <div className="bg-gradient-to-br from-[#003366] to-[#003366]/90 p-8 md:p-12 lg:p-16 h-full relative">
            {/* Floating Elements */}
            <div className="absolute top-8 right-8 w-20 h-20 bg-[#4CAF50]/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-8 left-8 w-16 h-16 bg-[#4CAF50]/5 rounded-full blur-lg"></div>
            
            <form className="flex flex-col gap-y-8 relative z-10">
              {/* Form Header */}
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-white mb-2">{contactData?.form_title || 'Mesajınızı Gönderin'}</h3>
                <p className="text-white/70">{contactData?.form_subtitle || 'Uzmanlarımız en kısa sürede size ulaşacaktır.'}</p>
              </div>
              
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  placeholder="Adınız Soyadınız"
                  className="w-full bg-transparent border-b-2 border-white/30 text-white placeholder-white/50 text-lg py-3 focus:border-[#4CAF50] focus:outline-none transition-all duration-300 group-hover:border-white/50"
                  required
                />
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4CAF50] transition-all duration-300 group-focus-within:w-full"></div>
              </div>

              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  placeholder="E-posta Adresiniz"
                  className="w-full bg-transparent border-b-2 border-white/30 text-white placeholder-white/50 text-lg py-3 focus:border-[#4CAF50] focus:outline-none transition-all duration-300 group-hover:border-white/50"
                  required
                />
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4CAF50] transition-all duration-300 group-focus-within:w-full"></div>
              </div>

              <div className="relative group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Telefon Numaranız"
                  className="w-full bg-transparent border-b-2 border-white/30 text-white placeholder-white/50 text-lg py-3 focus:border-[#4CAF50] focus:outline-none transition-all duration-300 group-hover:border-white/50"
                  required
                />
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4CAF50] transition-all duration-300 group-focus-within:w-full"></div>
              </div>

              <div className="relative group">
                <input
                  type="text"
                  name="company"
                  placeholder="Şirket Adı (Opsiyonel)"
                  className="w-full bg-transparent border-b-2 border-white/30 text-white placeholder-white/50 text-lg py-3 focus:border-[#4CAF50] focus:outline-none transition-all duration-300 group-hover:border-white/50"
                />
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4CAF50] transition-all duration-300 group-focus-within:w-full"></div>
              </div>

              <div className="relative group">
                <textarea
                  name="message"
                  placeholder="Mesajınız"
                  rows={3}
                  className="w-full bg-transparent border-b-2 border-white/30 text-white placeholder-white/50 text-lg py-3 focus:border-[#4CAF50] focus:outline-none transition-all duration-300 group-hover:border-white/50 resize-none"
                  required
                />
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4CAF50] transition-all duration-300 group-focus-within:w-full"></div>
              </div>

              {/* Enhanced Submit Button */}
              <button
                type="submit"
                className="group self-start mt-6 flex items-center gap-3 bg-gradient-to-r from-[#4CAF50] to-[#4CAF50]/90 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#4CAF50]/25"
              >
                <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                <span>Mesajı Gönder</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
} 