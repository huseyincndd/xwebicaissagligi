'use client';

import { motion } from 'framer-motion';
import { Users, ShieldCheck, Cpu, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface WhyUsData {
  id: number;
  badge_text: string;
  main_title: string;
  subtitle: string;
  item1_title: string;
  item1_description: string;
  item1_icon: string;
  item2_title: string;
  item2_description: string;
  item2_icon: string;
  item3_title: string;
  item3_description: string;
  item3_icon: string;
  item4_title: string;
  item4_description: string;
  item4_icon: string;
}

const iconMap = {
  Users,
  ShieldCheck,
  Cpu,
  Clock
};

export default function WhyUsSection() {
  const [whyUsData, setWhyUsData] = useState<WhyUsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWhyUsData() {
      try {
        const { data, error } = await supabase
          .from('whyus')
          .select('*')
          .limit(1)
          .single();

        if (error) {
          console.error('WhyUs data fetch error:', error);
          // Varsayılan verileri kullan
          setWhyUsData({
            id: 1,
            badge_text: 'Neden Biz?',
            main_title: 'Farkımız, Güvenliğiniz',
            subtitle: 'Sadece yasal bir zorunluluğu yerine getirmekle kalmıyor, işletmenize değer katan bir iş ortağı oluyoruz.',
            item1_title: 'Uzman ve Sertifikalı Kadro',
            item1_description: 'Sektörde yılların deneyimine sahip, A, B ve C sınıfı İSG uzmanları ve işyeri hekimlerinden oluşan ekibimizle hizmet veriyoruz.',
            item1_icon: 'Users',
            item2_title: 'Proaktif Güvenlik Yaklaşımı',
            item2_description: 'Sorunlar ortaya çıkmadan önlem alıyoruz. Riskleri proaktif bir şekilde yöneterek iş kazalarını ve meslek hastalıklarını en aza indiriyoruz.',
            item2_icon: 'ShieldCheck',
            item3_title: 'Teknoloji Odaklı Çözümler',
            item3_description: 'Tüm raporlama, takip ve eğitim süreçlerinizi dijital platformumuz üzerinden yöneterek size zaman ve verimlilik kazandırıyoruz.',
            item3_icon: 'Cpu',
            item4_title: '7/24 Ulaşılabilirlik ve Destek',
            item4_description: 'Acil bir durumda veya aklınıza takılan bir soruda, uzmanlarımıza günün her saati kolayca ulaşabilir, anında destek alabilirsiniz.',
            item4_icon: 'Clock'
          });
        } else {
          setWhyUsData(data);
        }
      } catch (error) {
        console.error('WhyUs data fetch error:', error);
        // Varsayılan verileri kullan
        setWhyUsData({
          id: 1,
          badge_text: 'Neden Biz?',
          main_title: 'Farkımız, Güvenliğiniz',
          subtitle: 'Sadece yasal bir zorunluluğu yerine getirmekle kalmıyor, işletmenize değer katan bir iş ortağı oluyoruz.',
          item1_title: 'Uzman ve Sertifikalı Kadro',
          item1_description: 'Sektörde yılların deneyimine sahip, A, B ve C sınıfı İSG uzmanları ve işyeri hekimlerinden oluşan ekibimizle hizmet veriyoruz.',
          item1_icon: 'Users',
          item2_title: 'Proaktif Güvenlik Yaklaşımı',
          item2_description: 'Sorunlar ortaya çıkmadan önlem alıyoruz. Riskleri proaktif bir şekilde yöneterek iş kazalarını ve meslek hastalıklarını en aza indiriyoruz.',
          item2_icon: 'ShieldCheck',
          item3_title: 'Teknoloji Odaklı Çözümler',
          item3_description: 'Tüm raporlama, takip ve eğitim süreçlerinizi dijital platformumuz üzerinden yöneterek size zaman ve verimlilik kazandırıyoruz.',
          item3_icon: 'Cpu',
          item4_title: '7/24 Ulaşılabilirlik ve Destek',
          item4_description: 'Acil bir durumda veya aklınıza takılan bir soruda, uzmanlarımıza günün her saati kolayca ulaşabilir, anında destek alabilirsiniz.',
          item4_icon: 'Clock'
        });
      } finally {
        setLoading(false);
      }
    }

    fetchWhyUsData();
  }, []);

  if (loading) {
    return (
      <section id="why-us" className="relative bg-gradient-to-br from-gray-50 to-white py-20 md:py-28 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="text-gray-600 text-xl">Yükleniyor...</div>
          </div>
        </div>
      </section>
    );
  }

  if (!whyUsData) {
    return null;
  }

  // Value props'ları array'e çevir
  const valueProps = [
    {
      icon: iconMap[whyUsData.item1_icon as keyof typeof iconMap] || Users,
      title: whyUsData.item1_title,
      description: whyUsData.item1_description
    },
    {
      icon: iconMap[whyUsData.item2_icon as keyof typeof iconMap] || ShieldCheck,
      title: whyUsData.item2_title,
      description: whyUsData.item2_description
    },
    {
      icon: iconMap[whyUsData.item3_icon as keyof typeof iconMap] || Cpu,
      title: whyUsData.item3_title,
      description: whyUsData.item3_description
    },
    {
      icon: iconMap[whyUsData.item4_icon as keyof typeof iconMap] || Clock,
      title: whyUsData.item4_title,
      description: whyUsData.item4_description
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section id="why-us" className="relative bg-gradient-to-br from-gray-50 to-white py-20 md:py-28 overflow-hidden">
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
            <span className="text-[#4CAF50] font-medium text-sm">{whyUsData.badge_text}</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-[#003366] leading-tight">
            {whyUsData.main_title}
          </h2>
          <p className="mt-6 text-lg text-dark/80 text-center max-w-3xl mx-auto leading-relaxed">
            {whyUsData.subtitle}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div 
          className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {valueProps.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                className="group relative bg-white p-8 rounded-2xl text-center transform transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl border border-gray-100 shadow-lg hover:shadow-[#4CAF50]/10"
                variants={itemVariants}
              >
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#4CAF50]/20 to-[#003366]/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Icon Container */}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#4CAF50] to-[#4CAF50]/80 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#003366] mb-4 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-dark/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                
                {/* Hover Indicator */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-[#4CAF50] to-[#003366] group-hover:w-1/2 transition-all duration-500 rounded-t-full"></div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
} 