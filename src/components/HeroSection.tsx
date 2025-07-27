'use client';

import Link from 'next/link';
import { ArrowDown, Shield, TrendingUp, Users } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Full-Screen Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop"
          alt="Professional workplace environment"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Enhanced Darkening Layer with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50 z-0"></div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#4CAF50]/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-[#003366]/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-16 h-16 bg-[#4CAF50]/15 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      {/* Slogan and Content Block */}
      <div className="relative z-10 text-center max-w-6xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 md:px-6 md:py-3 mb-6 md:mb-8">
          <Shield className="w-4 h-4 md:w-5 md:h-5 text-[#4CAF50]" />
          <span className="text-white/90 font-medium text-sm md:text-base">Türkiye&apos;nin Öncü OSGB&apos;si</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-100 [text-shadow:_0_4px_12px_rgb(0_0_0_/_60%)] leading-tight">
          GÜVENLİK KÜLTÜRÜ, <span className="text-[#4CAF50]">BAŞARI</span> DEMEKTİR.
        </h1>
        
        <p className="mt-4 md:mt-6 text-base md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed px-2">
          İşletmenizin güvenliğini en üst seviyede tutarak, çalışanlarınızın refahını ve işletmenizin verimliliğini artırıyoruz.
        </p>
        
        {/* Stats */}
        <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-4 md:gap-8 text-white/90">
          <div className="flex items-center gap-2 md:gap-3">
            <Users className="w-5 h-5 md:w-6 md:h-6 text-[#4CAF50]" />
            <span className="font-semibold text-sm md:text-base">500+ Müşteri</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Shield className="w-5 h-5 md:w-6 md:h-6 text-[#4CAF50]" />
            <span className="font-semibold text-sm md:text-base">%100 Güvenlik</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-[#4CAF50]" />
            <span className="font-semibold text-sm md:text-base">10+ Yıl Deneyim</span>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="mt-8 md:mt-12 flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
          <Link
            href="#contact"
            className="group bg-gradient-to-r from-[#4CAF50] to-[#4CAF50]/90 text-white font-bold py-3 md:py-4 px-6 md:px-10 rounded-xl text-base md:text-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-[#4CAF50]/25 flex items-center justify-center gap-2 md:gap-3"
          >
            <span>Teklif Al</span>
            <ArrowDown className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-y-1 transition-transform" />
          </Link>
          
          <Link
            href="#services"
            className="group bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white font-bold py-3 md:py-4 px-6 md:px-10 rounded-xl text-base md:text-lg transition-all duration-300 ease-in-out hover:bg-white/20 hover:scale-105 hover:border-white/40 flex items-center justify-center gap-2 md:gap-3"
          >
            <span>Hizmetler</span>
            <ArrowDown className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Enhanced Scroll Down Indicator */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/70 text-xs md:text-sm font-medium">Keşfet</span>
          <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 md:h-3 bg-white/50 rounded-full mt-1 md:mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
}