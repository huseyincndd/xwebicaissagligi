"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Search, FileText, ClipboardCheck, Repeat } from 'lucide-react';

const processSteps = [
  {
    step: "01",
    title: "Tanışma ve Keşif",
    description: "İşletmenizi, hedeflerinizi ve mevcut durumunuzu anlamak için sizinle bir araya geliriz. Saha ziyareti ile ilk gözlemleri yaparız.",
    icon: Search,
    imageUrl: "https://images.unsplash.com/photo-1556742212-5b321f3c261b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    step: "02",
    title: "Planlama ve Strateji",
    description: "Topladığımız verilere dayanarak, işletmenize özel, yasalara tam uyumlu ve proaktif bir İSG yol haritası oluştururuz.",
    icon: FileText,
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
  },
  {
    step: "03",
    title: "Uygulama ve Eğitim",
    description: "Oluşturulan planı hayata geçirir, gerekli denetimleri yapar ve çalışanlarınıza yönelik bilinçlendirici eğitimleri düzenleriz.",
    icon: ClipboardCheck,
    imageUrl: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=2071&auto=format&fit=crop"
  },
  {
    step: "04",
    title: "İzleme ve Sürekli İyileştirme",
    description: "Süreci düzenli olarak takip eder, raporlar sunar ve değişen koşullara göre planınızı güncelleyerek sürekli güvenliği sağlarız.",
    icon: Repeat,
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
  }
];

// Individual Process Item Component
const ProcessItem = ({ item, index }: { item: typeof processSteps[0]; index: number }) => {
  const IconComponent = item.icon;
  
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        viewport={{ once: true, amount: 0.5 }}
        className="relative group"
      >
        {/* Step Number Badge */}
        <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-[#4CAF50] to-[#4CAF50]/80 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
          {item.step}
        </div>
        
        {/* Card Content */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 group-hover:shadow-2xl transition-all duration-500">
          {/* Timeline Icon and Step Number */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4CAF50] to-[#4CAF50]/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <IconComponent className="h-7 w-7 text-white" />
            </div>
            <div>
              <p className="font-bold text-[#4CAF50] text-sm uppercase tracking-wider">Adım</p>
              <p className="font-bold text-[#003366] text-lg">{item.step}</p>
            </div>
          </div>
          
          {/* Title and Description */}
          <h3 className="text-2xl md:text-3xl font-bold text-[#003366] mb-4 leading-tight">
            {item.title}
          </h3>
          <p className="text-dark/80 leading-relaxed text-lg">
            {item.description}
          </p>
        </div>
      </motion.div>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: index * 0.2 + 0.1 }}
        viewport={{ once: true, amount: 0.5 }}
        className={`${index % 2 === 1 ? 'md:order-last' : ''}`}
      >
        <div className="relative group">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="rounded-2xl shadow-2xl object-cover w-full h-64 md:h-80 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/20 to-transparent rounded-2xl"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default function ProcessSection() {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white py-24 md:py-32 overflow-hidden">
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
            <span className="text-[#4CAF50] font-medium text-sm">Çalışma Metodolojimiz</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-[#003366] leading-tight">
            4 Adımda <span className="text-[#4CAF50]">Kusursuz</span> Süreç Yönetimi
          </h2>
          <p className="mt-6 text-lg text-dark/80 text-center max-w-3xl mx-auto leading-relaxed">
            Başarıya giden yol, doğru adımlarla başlar. İşte bizim çalışma metodolojimiz.
          </p>
        </motion.div>

        {/* Main Content Wrapper */}
        <div className="mt-20">
          {processSteps.map((item, index) => (
            <ProcessItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
} 