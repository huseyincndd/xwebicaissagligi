'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const servicesData = [
  {
    title: "Risk Analizi ve Değerlendirme",
    description: "İşletmenizin faaliyetlerine özel tehlikeleri belirleyip, riskleri analiz ederek önleyici ve düzeltici eylem planları oluşturuyoruz.",
    features: [
      "Kapsamlı saha denetimleri",
      "Yasal mevzuata tam uyumluluk raporu",
      "Dijital risk takip platformu",
      "Acil durum senaryoları entegrasyonu"
    ],
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "İSG Eğitimleri",
    description: "Çalışanlarınızın bilinç seviyesini artırarak güvenli bir çalışma kültürü oluşturmak için teorik ve pratik eğitimler düzenliyoruz.",
    features: [
      "Temel İSG eğitimleri",
      "Yangın ve tahliye tatbikatları",
      "Yüksekte çalışma eğitimleri",
      "Sektöre özel mesleki eğitimler"
    ],
    imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Acil Durum Planlaması",
    description: "Olası acil durumlara karşı hazırlıklı olmanızı sağlayacak, tatbikatlarla test edilmiş, kapsamlı ve uygulanabilir eylem planları hazırlıyoruz.",
    features: [
      "Deprem, yangın, sel senaryoları",
      "Tahliye planları ve krokileri",
      "Acil durum ekiplerinin oluşturulması",
      "Yıllık zorunlu tatbikatların organizasyonu"
    ],
    imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop"
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

export default function ServicesSection() {
  return (
    <section id="hizmetler" className="relative bg-gradient-to-br from-gray-50 to-white py-20 md:py-28 overflow-hidden">
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
            <span className="text-[#4CAF50] font-medium text-sm">Profesyonel Hizmetler</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-[#003366] leading-tight">
            Kapsamlı <span className="text-[#4CAF50]">İSG Çözümleri</span>
          </h2>
          <p className="mt-6 text-lg text-[#003366]/80 text-center max-w-3xl mx-auto leading-relaxed">
            İşletmenizin ihtiyaçlarına özel, proaktif ve sonuç odaklı hizmetler sunuyoruz.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="mt-20">
          {servicesData.map((service, index) => (
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