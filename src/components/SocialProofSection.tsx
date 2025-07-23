"use client";

import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

// Premium SVG Icons with enhanced styling
const ExperienceIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 15L19.74 17.74L22.5 18.5L19.74 19.26L19 22L18.26 19.26L15.5 18.5L18.26 17.74L19 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 6L5.74 8.74L8.5 9.5L5.74 10.26L5 13L4.26 10.26L1.5 9.5L4.26 8.74L5 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ProjectsIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 7V5A2 2 0 0 1 5 3H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 3H19A2 2 0 0 1 21 5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 17V19A2 2 0 0 1 19 21H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 21H5A2 2 0 0 1 3 19V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const StaffIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 21V19A4 4 0 0 0 13 15H5A4 4 0 0 0 1 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M23 21V19A4 4 0 0 0 19 15H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 3.13A4 4 0 0 1 16 11.13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 8L16 4L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SatisfactionIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 15L19.74 17.74L22.5 18.5L19.74 19.26L19 22L18.26 19.26L15.5 18.5L18.26 17.74L19 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 6L5.74 8.74L8.5 9.5L5.74 10.26L5 13L4.26 10.26L1.5 9.5L4.26 8.74L5 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

// Statistics data with enhanced styling
const statsData = [
  {
    id: 1,
    icon: ExperienceIcon,
    number: 10,
    suffix: "+",
    label: "Yıllık Tecrübe",
    color: "text-blue-300",
    gradient: "from-blue-400 to-blue-600"
  },
  {
    id: 2,
    icon: ProjectsIcon,
    number: 500,
    suffix: "+",
    label: "Tamamlanan Proje",
    color: "text-emerald-300",
    gradient: "from-emerald-400 to-emerald-600"
  },
  {
    id: 3,
    icon: StaffIcon,
    number: 25,
    suffix: "+",
    label: "Uzman Personel",
    color: "text-purple-300",
    gradient: "from-purple-400 to-purple-600"
  },
  {
    id: 4,
    icon: SatisfactionIcon,
    number: 99,
    suffix: "%",
    label: "Müşteri Memnuniyeti",
    color: "text-orange-300",
    gradient: "from-orange-400 to-orange-600"
  }
];

// Premium Animated Counter Component
const PremiumAnimatedCounter = ({ end, suffix }: { end: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2500; // 2.5 seconds
      const increment = end / (duration / 16); // 60fps
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <motion.div
      ref={ref}
      className="text-6xl lg:text-7xl font-extrabold text-white drop-shadow-lg"
      style={{
        textShadow: '0 4px 8px rgba(0,0,0,0.3)'
      }}
    >
      {count}{suffix}
    </motion.div>
  );
};

// Premium Stat Card Component with Frosted Glass Effect
const PremiumStatCard = ({ stat }: { stat: typeof statsData[0] }) => {
  const IconComponent = stat.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }}
      className="relative group"
    >
      {/* Frosted Glass Card */}
      <div className="
        bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 lg:p-10
        hover:bg-white/15 hover:border-white/30 transition-all duration-500
        shadow-2xl hover:shadow-3xl
      ">
        {/* Icon with gradient background */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`mb-6 ${stat.color} flex justify-center`}
        >
          <div className="
            w-20 h-20 rounded-full bg-gradient-to-br ${stat.gradient} 
            flex items-center justify-center shadow-lg
            group-hover:scale-110 transition-transform duration-300
          ">
            <IconComponent />
          </div>
        </motion.div>
        
        {/* Animated Number */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-4 text-center"
        >
          <PremiumAnimatedCounter end={stat.number} suffix={stat.suffix} />
        </motion.div>
        
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="text-xl font-light text-white/80 tracking-wide">
            {stat.label}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Main Premium Stats Section Component
const PremiumStatsSection = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Parallax Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Enhanced Dark Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/80 z-0" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#4CAF50]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-[#003366]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-[#4CAF50]/15 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8"
          >
            <span className="w-2 h-2 bg-[#4CAF50] rounded-full"></span>
            <span className="text-white/90 font-medium">Başarı Hikayemiz</span>
          </motion.div>
          
          <motion.h2 
            className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Rakamlarla <span className="text-[#4CAF50]">Biz</span>
          </motion.h2>
          <motion.p 
            className="text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            İSG PRO&apos;nun başarı hikayesini sayılarla anlatıyoruz. 
            Her rakam, müşterilerimizin güvenini ve kalitemizi yansıtıyor.
          </motion.p>
        </motion.div>

        {/* Statistics Grid with Stagger Animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {statsData.map((stat) => (
            <PremiumStatCard key={stat.id} stat={stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumStatsSection; 