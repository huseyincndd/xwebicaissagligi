'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface ServicesData {
  id: number;
  badge_text: string;
  main_title: string;
  subtitle: string;
  service1_title: string;
  service1_description: string;
  service1_image: string;
  service1_feature1: string;
  service1_feature2: string;
  service1_feature3: string;
  service1_feature4: string;
  service2_title: string;
  service2_description: string;
  service2_image: string;
  service2_feature1: string;
  service2_feature2: string;
  service2_feature3: string;
  service2_feature4: string;
  service3_title: string;
  service3_description: string;
  service3_image: string;
  service3_feature1: string;
  service3_feature2: string;
  service3_feature3: string;
  service3_feature4: string;
}

export default function ServicesSection() {
  const [servicesData, setServicesData] = useState<ServicesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServicesData() {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .limit(1)
          .single();

        if (error) {
          console.error('Services data fetch error:', error);
          // Varsayılan verileri kullan
          setServicesData({
            id: 1,
            badge_text: 'Profesyonel Hizmetler',
            main_title: 'Kapsamlı İSG Çözümleri',
            subtitle: 'İşletmenizin ihtiyaçlarına özel, proaktif ve sonuç odaklı hizmetler sunuyoruz.',
            service1_title: 'Risk Analizi ve Değerlendirme',
            service1_description: 'İşletmenizin faaliyetlerine özel tehlikeleri belirleyip, riskleri analiz ederek önleyici ve düzeltici eylem planları oluşturuyoruz.',
            service1_image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
            service1_feature1: 'Kapsamlı saha denetimleri',
            service1_feature2: 'Yasal mevzuata tam uyumluluk raporu',
            service1_feature3: 'Dijital risk takip platformu',
            service1_feature4: 'Acil durum senaryoları entegrasyonu',
            service2_title: 'İSG Eğitimleri',
            service2_description: 'Çalışanlarınızın bilinç seviyesini artırarak güvenli bir çalışma kültürü oluşturmak için teorik ve pratik eğitimler düzenliyoruz.',
            service2_image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop',
            service2_feature1: 'Temel İSG eğitimleri',
            service2_feature2: 'Yangın ve tahliye tatbikatları',
            service2_feature3: 'Yüksekte çalışma eğitimleri',
            service2_feature4: 'Sektöre özel mesleki eğitimler',
            service3_title: 'Acil Durum Planlaması',
            service3_description: 'Olası acil durumlara karşı hazırlıklı olmanızı sağlayacak, tatbikatlarla test edilmiş, kapsamlı ve uygulanabilir eylem planları hazırlıyoruz.',
            service3_image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop',
            service3_feature1: 'Deprem, yangın, sel senaryoları',
            service3_feature2: 'Tahliye planları ve krokileri',
            service3_feature3: 'Acil durum ekiplerinin oluşturulması',
            service3_feature4: 'Yıllık zorunlu tatbikatların organizasyonu'
          });
        } else {
          setServicesData(data);
        }
      } catch (error) {
        console.error('Services data fetch error:', error);
        // Varsayılan verileri kullan
        setServicesData({
          id: 1,
          badge_text: 'Profesyonel Hizmetler',
          main_title: 'Kapsamlı İSG Çözümleri',
          subtitle: 'İşletmenizin ihtiyaçlarına özel, proaktif ve sonuç odaklı hizmetler sunuyoruz.',
          service1_title: 'Risk Analizi ve Değerlendirme',
          service1_description: 'İşletmenizin faaliyetlerine özel tehlikeleri belirleyip, riskleri analiz ederek önleyici ve düzeltici eylem planları oluşturuyoruz.',
          service1_image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
          service1_feature1: 'Kapsamlı saha denetimleri',
          service1_feature2: 'Yasal mevzuata tam uyumluluk raporu',
          service1_feature3: 'Dijital risk takip platformu',
          service1_feature4: 'Acil durum senaryoları entegrasyonu',
          service2_title: 'İSG Eğitimleri',
          service2_description: 'Çalışanlarınızın bilinç seviyesini artırarak güvenli bir çalışma kültürü oluşturmak için teorik ve pratik eğitimler düzenliyoruz.',
          service2_image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop',
          service2_feature1: 'Temel İSG eğitimleri',
          service2_feature2: 'Yangın ve tahliye tatbikatları',
          service2_feature3: 'Yüksekte çalışma eğitimleri',
          service2_feature4: 'Sektöre özel mesleki eğitimler',
          service3_title: 'Acil Durum Planlaması',
          service3_description: 'Olası acil durumlara karşı hazırlıklı olmanızı sağlayacak, tatbikatlarla test edilmiş, kapsamlı ve uygulanabilir eylem planları hazırlıyoruz.',
          service3_image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop',
          service3_feature1: 'Deprem, yangın, sel senaryoları',
          service3_feature2: 'Tahliye planları ve krokileri',
          service3_feature3: 'Acil durum ekiplerinin oluşturulması',
          service3_feature4: 'Yıllık zorunlu tatbikatların organizasyonu'
        });
      } finally {
        setLoading(false);
      }
    }

    fetchServicesData();
  }, []);

  if (loading) {
    return (
      <section id="services" className="relative bg-gradient-to-br from-gray-50 to-white py-20 md:py-28 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="text-gray-600 text-xl">Yükleniyor...</div>
          </div>
        </div>
      </section>
    );
  }

  if (!servicesData) {
    return null;
  }

  // Hizmetleri array'e çevir
  const services = [
    {
      title: servicesData.service1_title,
      description: servicesData.service1_description,
      imageUrl: servicesData.service1_image,
      features: [
        servicesData.service1_feature1,
        servicesData.service1_feature2,
        servicesData.service1_feature3,
        servicesData.service1_feature4
      ]
    },
    {
      title: servicesData.service2_title,
      description: servicesData.service2_description,
      imageUrl: servicesData.service2_image,
      features: [
        servicesData.service2_feature1,
        servicesData.service2_feature2,
        servicesData.service2_feature3,
        servicesData.service2_feature4
      ]
    },
    {
      title: servicesData.service3_title,
      description: servicesData.service3_description,
      imageUrl: servicesData.service3_image,
      features: [
        servicesData.service3_feature1,
        servicesData.service3_feature2,
        servicesData.service3_feature3,
        servicesData.service3_feature4
      ]
    }
  ];

  // Animation variants for staggered list animations
  const listVariants = {
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2 // This makes each child appear 0.2s after the previous one
      }
    },
    hidden: { opacity: 0 }
  };

  const itemVariants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -20 } // Items will slide in from the left
  };

  return (
    <section id="services" className="relative bg-gradient-to-br from-gray-50 to-white py-20 md:py-28 overflow-hidden">
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
            <span className="text-[#4CAF50] font-medium text-sm">{servicesData.badge_text}</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-[#003366] leading-tight">
            {servicesData.main_title}
          </h2>
          <p className="mt-6 text-lg text-[#003366]/80 text-center max-w-3xl mx-auto leading-relaxed">
            {servicesData.subtitle}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="mt-20">
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Image Column */}
              <motion.div 
                className={`${index % 2 === 1 ? 'md:order-last' : ''}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative group">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-2xl border-4 border-[#003366]/10 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/20 to-transparent rounded-2xl"></div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
                    <span className="text-[#003366] font-semibold text-sm">#{index + 1}</span>
                  </div>
                </div>
              </motion.div>

              {/* Text Content Column */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Service Number Badge */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-[#4CAF50] to-[#4CAF50]/80 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg z-10">
                  {index + 1}
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-[#003366] mb-4 pt-8">
                  {service.title}
                </h3>
                <p className="text-[#003366]/80 mb-8 text-lg leading-relaxed">
                  {service.description}
                </p>
                <motion.ul
                  className="space-y-3"
                  initial="hidden"
                  whileInView="visible"
                  variants={listVariants}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  {service.features.map((feature, featureIndex) => (
                    <motion.li key={featureIndex} className="flex items-start" variants={itemVariants}>
                      <CheckCircle2 className="text-accent w-6 h-6 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-[#003366]/90">{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 