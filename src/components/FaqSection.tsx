"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, FileText, BookOpen, AlertTriangle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface FaqData {
  id: number;
  badge_text: string;
  main_title: string;
  subtitle: string;
}

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  icon: string;
  order_number: number;
}

const iconMap = {
  HelpCircle: HelpCircle,
  FileText: FileText,
  BookOpen: BookOpen,
  AlertTriangle: AlertTriangle
};

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqData, setFaqData] = useState<FaqData | null>(null);
  const [faqItems, setFaqItems] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFaqData() {
      try {
        // FAQ section data'yı yükle
        const { data: faqData, error: faqError } = await supabase
          .from('faq')
          .select('*')
          .limit(1)
          .single();

        if (faqError) {
          console.error('FAQ data fetch error:', faqError);
          // Varsayılan verileri kullan
          setFaqData({
            id: 1,
            badge_text: 'Sıkça Sorulan Sorular',
            main_title: 'Sıkça Sorulan Sorular',
            subtitle: 'Hizmetlerimiz ve süreçlerimiz hakkında en çok merak edilen konuları sizin için derledik.'
          });
        } else {
          setFaqData(faqData);
        }

        // FAQ items data'yı yükle
        const { data: itemsData, error: itemsError } = await supabase
          .from('faq_items')
          .select('*')
          .order('order_number', { ascending: true });

        if (itemsError) {
          console.error('FAQ items fetch error:', itemsError);
          // Varsayılan verileri kullan
          setFaqItems([
            {
              id: 1,
              question: "OSGB hizmeti almak yasal bir zorunluluk mu?",
              answer: "Evet, 6331 sayılı İş Sağlığı ve Güvenliği Kanunu'na göre, bir veya daha fazla çalışanı olan tehlike sınıfına bakılmaksızın tüm işyerleri OSGB hizmeti almakla veya kendi bünyesinde İSG profesyoneli bulundurmakla yükümlüdür.",
              icon: "HelpCircle",
              order_number: 1
            },
            {
              id: 2,
              question: "Risk değerlendirmesi ne sıklıkla yenilenmelidir?",
              answer: "Çok tehlikeli sınıftaki işyerlerinde en geç iki yılda bir, tehlikeli sınıfta dört yılda bir ve az tehlikeli sınıfta altı yılda bir yenilenmelidir. Ayrıca işyerinde yeni bir makine, süreç veya kaza olması durumunda derhal yenilenir.",
              icon: "FileText",
              order_number: 2
            },
            {
              id: 3,
              question: "Temel İSG eğitimleri kimler için zorunludur?",
              answer: "İşe yeni başlayan tüm çalışanlar ve çalışma yeri veya işi değişenler için zorunludur. Ayrıca, tüm çalışanların yasal olarak belirlenmiş periyotlarla (tehlike sınıfına göre 1, 2 veya 3 yılda bir) bu eğitimi tekrarlaması gerekmektedir.",
              icon: "BookOpen",
              order_number: 3
            },
            {
              id: 4,
              question: "Acil durum planı neleri içermelidir?",
              answer: "Acil durum planı; yangın, deprem, sel gibi olası afet ve acil durumları, tahliye yollarını, toplanma alanlarını, acil durum ekiplerini (söndürme, kurtarma, ilk yardım) ve bu ekiplerin görevlerini detaylı bir şekilde içermelidir.",
              icon: "AlertTriangle",
              order_number: 4
            }
          ]);
        } else {
          setFaqItems(itemsData);
        }
      } catch (error) {
        console.error('FAQ data fetch error:', error);
        // Varsayılan verileri kullan
        setFaqData({
          id: 1,
          badge_text: 'Sıkça Sorulan Sorular',
          main_title: 'Sıkça Sorulan Sorular',
          subtitle: 'Hizmetlerimiz ve süreçlerimiz hakkında en çok merak edilen konuları sizin için derledik.'
        });
        setFaqItems([
          {
            id: 1,
    question: "OSGB hizmeti almak yasal bir zorunluluk mu?",
    answer: "Evet, 6331 sayılı İş Sağlığı ve Güvenliği Kanunu'na göre, bir veya daha fazla çalışanı olan tehlike sınıfına bakılmaksızın tüm işyerleri OSGB hizmeti almakla veya kendi bünyesinde İSG profesyoneli bulundurmakla yükümlüdür.",
            icon: "HelpCircle",
            order_number: 1
  },
  {
            id: 2,
    question: "Risk değerlendirmesi ne sıklıkla yenilenmelidir?",
    answer: "Çok tehlikeli sınıftaki işyerlerinde en geç iki yılda bir, tehlikeli sınıfta dört yılda bir ve az tehlikeli sınıfta altı yılda bir yenilenmelidir. Ayrıca işyerinde yeni bir makine, süreç veya kaza olması durumunda derhal yenilenir.",
            icon: "FileText",
            order_number: 2
  },
  {
            id: 3,
    question: "Temel İSG eğitimleri kimler için zorunludur?",
    answer: "İşe yeni başlayan tüm çalışanlar ve çalışma yeri veya işi değişenler için zorunludur. Ayrıca, tüm çalışanların yasal olarak belirlenmiş periyotlarla (tehlike sınıfına göre 1, 2 veya 3 yılda bir) bu eğitimi tekrarlaması gerekmektedir.",
            icon: "BookOpen",
            order_number: 3
  },
  {
            id: 4,
    question: "Acil durum planı neleri içermelidir?",
    answer: "Acil durum planı; yangın, deprem, sel gibi olası afet ve acil durumları, tahliye yollarını, toplanma alanlarını, acil durum ekiplerini (söndürme, kurtarma, ilk yardım) ve bu ekiplerin görevlerini detaylı bir şekilde içermelidir.",
            icon: "AlertTriangle",
            order_number: 4
  }
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchFaqData();
  }, []);

  return (
    <section id="faq" className="relative bg-gradient-to-br from-gray-50 to-white py-24 md:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#003366]/5 to-[#4CAF50]/5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#4CAF50]/10 border border-[#4CAF50]/20 rounded-full px-6 py-3 mb-6">
            <span className="w-2 h-2 bg-[#4CAF50] rounded-full"></span>
            <span className="text-[#4CAF50] font-medium text-sm">{faqData?.badge_text || 'Sıkça Sorulan Sorular'}</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-[#003366] leading-tight">
            {faqData?.main_title || 'Sıkça Sorulan Sorular'}
          </h2>
          <p className="mt-6 text-lg text-dark/80 max-w-3xl mx-auto leading-relaxed">
            {faqData?.subtitle || 'Hizmetlerimiz ve süreçlerimiz hakkında en çok merak edilen konuları sizin için derledik.'}
          </p>
        </motion.div>

        {/* Accordion Wrapper */}
        <motion.div 
          className="mt-16 max-w-4xl mx-auto flex flex-col gap-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const IconComponent = iconMap[item.icon as keyof typeof iconMap] || HelpCircle;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl ${
                  isOpen 
                    ? 'border-2 border-[#4CAF50] shadow-2xl shadow-[#4CAF50]/20 scale-[1.02]' 
                    : 'border border-gray-200 hover:border-[#4CAF50]/30'
                }`}
              >
                {/* Question Header */}
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-8 flex items-center gap-x-6 text-left group-hover:bg-gray-50/50 transition-colors"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isOpen 
                      ? 'bg-gradient-to-br from-[#4CAF50] to-[#4CAF50]/80 text-white' 
                      : 'bg-[#4CAF50]/10 text-[#003366] group-hover:bg-[#4CAF50]/20'
                  }`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <p className="flex-1 text-lg font-semibold text-primary leading-relaxed">
                    {item.question}
                  </p>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      isOpen 
                        ? 'bg-[#4CAF50] text-white' 
                        : 'bg-gray-100 text-[#003366] group-hover:bg-[#4CAF50]/10'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                {/* Answer Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: 'auto' },
                        collapsed: { opacity: 0, height: 0 }
                      }}
                      transition={{ 
                        duration: 0.4, 
                        ease: [0.04, 0.62, 0.23, 0.98] 
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8">
                        <p className="text-dark/80 pt-6 border-t border-gray-200 leading-relaxed text-lg">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
} 