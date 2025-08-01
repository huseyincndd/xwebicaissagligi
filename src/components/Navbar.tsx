'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Shield } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface NavbarData {
  id: number;
  logo_text: string;
  cta_button_text: string;
}

const defaultNavigationLinks = [
  { name: 'Ana Sayfa', href: '#home' },
  { name: 'Hatay OSGB Hizmetleri', href: '#services' },
  { name: 'Neden Biz', href: '#why-us' },
  { name: 'Hatay İSG Ekibi', href: '#team' },
  { name: 'İSG Süreci', href: '#process' },
  { name: 'SSS', href: '#faq' },
  { name: 'Hatay İletişim', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navbarData, setNavbarData] = useState<NavbarData | null>(null);
  const [navigationLinks, setNavigationLinks] = useState(defaultNavigationLinks);

  useEffect(() => {
    async function fetchNavbarData() {
      try {
        const { data, error } = await supabase
          .from('navbar')
          .select('*')
          .limit(1)
          .single();

        if (error) {
          console.error('Navbar data fetch error:', error);
          // Varsayılan verileri kullan
          setNavbarData({
            id: 1,
            logo_text: 'İSG PRO',
            cta_button_text: 'Teklif Al'
          });
        } else {
          setNavbarData(data);
        }
      } catch (error) {
        console.error('Navbar data fetch error:', error);
        // Varsayılan verileri kullan
        setNavbarData({
          id: 1,
          logo_text: 'İSG PRO',
          cta_button_text: 'Teklif Al'
        });
      }
    }
    fetchNavbarData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.mobile-menu') && !target.closest('.hamburger-button')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link 
          href="/" 
          className={`flex items-center gap-3 font-bold text-2xl transition-all duration-300 hover:scale-105 ${
            isScrolled ? 'text-primary' : 'text-white'
          }`}
        >
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
            isScrolled 
              ? 'bg-gradient-to-br from-[#003366] to-[#4CAF50]' 
              : 'bg-white/20 backdrop-blur-sm'
          }`}>
            <Shield className="w-5 h-5 text-white" />
          </div>
          {navbarData?.logo_text || 'İSG PRO'}
        </Link>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex space-x-8">
          {navigationLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative font-medium transition-all duration-300 hover:scale-105 ${
                isScrolled 
                  ? 'text-dark hover:text-primary' 
                  : 'text-white hover:text-white/80'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4CAF50] transition-all duration-300 group-hover:w-full ${
                isScrolled ? 'bg-[#4CAF50]' : 'bg-white'
              }`}></span>
            </Link>
          ))}
        </nav>

        {/* CTA Button - Desktop */}
        <Link
          href="#contact"
          className={`hidden md:block font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 ${
            isScrolled
              ? 'bg-gradient-to-r from-[#4CAF50] to-[#4CAF50]/90 text-white hover:shadow-lg hover:shadow-[#4CAF50]/25'
              : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white hover:text-primary'
          }`}
        >
          {navbarData?.cta_button_text || 'Teklif Al'}
        </Link>

        {/* Hamburger Menu - Mobile */}
        <button 
          className="md:hidden hamburger-button p-2 rounded-lg transition-all duration-300 hover:bg-white/10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X 
              className={`h-6 w-6 transition-colors duration-300 ${
                isScrolled ? 'text-primary' : 'text-white'
              }`} 
            />
          ) : (
            <Menu 
              className={`h-6 w-6 transition-colors duration-300 ${
                isScrolled ? 'text-primary' : 'text-white'
              }`} 
            />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-xl border-t border-gray-200 overflow-hidden">
          <div className="px-4 py-6">
            <nav className="flex flex-col space-y-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-dark hover:text-primary font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <Link
                  href="#contact"
                  className="block w-full text-center bg-gradient-to-r from-[#4CAF50] to-[#4CAF50]/90 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {navbarData?.cta_button_text || 'Teklif Al'}
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
} 