'use client';

import { motion } from 'framer-motion';
import { Linkedin, Mail, Phone, MapPin, Award, Users, Clock, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  experience: string;
  specialization: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  description: string;
}

interface TeamData {
  id: number;
  badge_text: string;
  main_title: string;
  subtitle: string;
  stat1_number: number;
  stat1_label: string;
  stat1_icon: string;
  stat2_number: number;
  stat2_label: string;
  stat2_icon: string;
  stat3_number: number;
  stat3_label: string;
  stat3_icon: string;
  stat4_number: number;
  stat4_label: string;
  stat4_icon: string;
  cta_title: string;
  cta_description: string;
  cta_primary_text: string;
  cta_secondary_text: string;
}

const iconMap = {
  Users,
  Clock,
  Award,
  Star
};

const TeamMemberCard = ({ member, index }: { member: TeamMember; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.3 }}
      className="group relative"
    >
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden group-hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          
          {/* Experience Badge */}
          <div className="absolute top-4 right-4 bg-[#4CAF50] text-white px-3 py-1 rounded-full text-sm font-medium">
            {member.experience}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Name and Role */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-[#003366] mb-1">{member.name}</h3>
            <p className="text-[#4CAF50] font-semibold">{member.role}</p>
          </div>

          {/* Specialization */}
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-4 h-4 text-[#4CAF50]" />
            <span className="text-sm text-gray-600">{member.specialization}</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {member.description}
          </p>

          {/* Contact Info */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="w-4 h-4 text-[#4CAF50]" />
              <span>{member.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="w-4 h-4 text-[#4CAF50]" />
              <span>{member.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-[#4CAF50]" />
              <span>{member.location}</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={member.linkedin}
              className="w-10 h-10 bg-gradient-to-r from-[#4CAF50] to-[#4CAF50]/90 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${member.email}`}
              className="w-10 h-10 bg-gradient-to-r from-[#003366] to-[#003366]/90 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function TeamSection() {
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeamData() {
      try {
        // Team section data'yı yükle
        const { data: teamData, error: teamError } = await supabase
          .from('team')
          .select('*')
          .limit(1)
          .single();

        if (teamError) {
          console.error('Team data fetch error:', teamError);
          // Varsayılan verileri kullan
          setTeamData({
            id: 1,
            badge_text: 'Uzman Ekibimiz',
            main_title: 'Deneyimli Uzman Ekibimiz',
            subtitle: 'İş Sağlığı ve Güvenliği alanında uzmanlaşmış, deneyimli ekibimizle işletmenizin güvenliğini en üst seviyede tutuyoruz.',
            stat1_number: 15,
            stat1_label: 'Uzman Ekip',
            stat1_icon: 'Users',
            stat2_number: 500,
            stat2_label: 'Tamamlanan Proje',
            stat2_icon: 'Clock',
            stat3_number: 50,
            stat3_label: 'Sertifika',
            stat3_icon: 'Award',
            stat4_number: 98,
            stat4_label: 'Müşteri Memnuniyeti',
            stat4_icon: 'Star',
            cta_title: 'Ekibimizle Tanışın',
            cta_description: 'Uzman ekibimizle iletişime geçin ve işletmenizin İSG ihtiyaçları için profesyonel çözümler alın.',
            cta_primary_text: 'İletişime Geçin',
            cta_secondary_text: 'Hizmetlerimiz'
          });
        } else {
          setTeamData(teamData);
        }

        // Team members data'yı yükle
        const { data: membersData, error: membersError } = await supabase
          .from('team_members')
          .select('*')
          .order('id', { ascending: true });

        if (membersError) {
          console.error('Team members fetch error:', membersError);
          // Varsayılan verileri kullan
          setTeamMembers([
            {
              id: 1,
              name: "Ahmet Yılmaz",
              role: "Genel Müdür & İSG Uzmanı",
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop",
              experience: "15+ Yıl Deneyim",
              specialization: "İSG Yönetim Sistemleri",
              email: "ahmet.yilmaz@isg.com",
              phone: "+90 532 123 45 67",
              location: "İstanbul, Türkiye",
              linkedin: "#",
              description: "İş Sağlığı ve Güvenliği alanında 15 yılı aşkın deneyime sahip, ISO 45001 ve OHSAS 18001 sertifikalarına sahip uzman."
            },
            {
              id: 2,
              name: "Ayşe Demir",
              role: "İSG Danışmanı",
              image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2076&auto=format&fit=crop",
              experience: "12+ Yıl Deneyim",
              specialization: "Risk Değerlendirmesi",
              email: "ayse.demir@isg.com",
              phone: "+90 533 234 56 78",
              location: "Ankara, Türkiye",
              linkedin: "#",
              description: "Risk değerlendirmesi ve iş kazası önleme konularında uzmanlaşmış, 500+ işletmede danışmanlık hizmeti vermiş."
            },
            {
              id: 3,
              name: "Mehmet Kaya",
              role: "Teknik İSG Uzmanı",
              image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
              experience: "10+ Yıl Deneyim",
              specialization: "Endüstriyel Güvenlik",
              email: "mehmet.kaya@isg.com",
              phone: "+90 534 345 67 89",
              location: "İzmir, Türkiye",
              linkedin: "#",
              description: "Endüstriyel güvenlik ve makine güvenliği konularında uzman, CE belgelendirme süreçlerinde deneyimli."
            },
            {
              id: 4,
              name: "Fatma Özkan",
              role: "İSG Eğitmeni",
              image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
              experience: "8+ Yıl Deneyim",
              specialization: "Eğitim ve Gelişim",
              email: "fatma.ozkan@isg.com",
              phone: "+90 535 456 78 90",
              location: "Bursa, Türkiye",
              linkedin: "#",
              description: "İSG eğitimleri ve farkındalık programları konusunda uzman, 10.000+ çalışana eğitim vermiş."
            }
          ]);
        } else {
          setTeamMembers(membersData);
        }
      } catch (error) {
        console.error('Team data fetch error:', error);
        // Varsayılan verileri kullan
        setTeamData({
          id: 1,
          badge_text: 'Uzman Ekibimiz',
          main_title: 'Deneyimli Uzman Ekibimiz',
          subtitle: 'İş Sağlığı ve Güvenliği alanında uzmanlaşmış, deneyimli ekibimizle işletmenizin güvenliğini en üst seviyede tutuyoruz.',
          stat1_number: 15,
          stat1_label: 'Uzman Ekip',
          stat1_icon: 'Users',
          stat2_number: 500,
          stat2_label: 'Tamamlanan Proje',
          stat2_icon: 'Clock',
          stat3_number: 50,
          stat3_label: 'Sertifika',
          stat3_icon: 'Award',
          stat4_number: 98,
          stat4_label: 'Müşteri Memnuniyeti',
          stat4_icon: 'Star',
          cta_title: 'Ekibimizle Tanışın',
          cta_description: 'Uzman ekibimizle iletişime geçin ve işletmenizin İSG ihtiyaçları için profesyonel çözümler alın.',
          cta_primary_text: 'İletişime Geçin',
          cta_secondary_text: 'Hizmetlerimiz'
        });
        setTeamMembers([
          {
            id: 1,
            name: "Ahmet Yılmaz",
            role: "Genel Müdür & İSG Uzmanı",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop",
            experience: "15+ Yıl Deneyim",
            specialization: "İSG Yönetim Sistemleri",
            email: "ahmet.yilmaz@isg.com",
            phone: "+90 532 123 45 67",
            location: "İstanbul, Türkiye",
            linkedin: "#",
            description: "İş Sağlığı ve Güvenliği alanında 15 yılı aşkın deneyime sahip, ISO 45001 ve OHSAS 18001 sertifikalarına sahip uzman."
          },
          {
            id: 2,
            name: "Ayşe Demir",
            role: "İSG Danışmanı",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2076&auto=format&fit=crop",
            experience: "12+ Yıl Deneyim",
            specialization: "Risk Değerlendirmesi",
            email: "ayse.demir@isg.com",
            phone: "+90 533 234 56 78",
            location: "Ankara, Türkiye",
            linkedin: "#",
            description: "Risk değerlendirmesi ve iş kazası önleme konularında uzmanlaşmış, 500+ işletmede danışmanlık hizmeti vermiş."
          },
          {
            id: 3,
            name: "Mehmet Kaya",
            role: "Teknik İSG Uzmanı",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
            experience: "10+ Yıl Deneyim",
            specialization: "Endüstriyel Güvenlik",
            email: "mehmet.kaya@isg.com",
            phone: "+90 534 345 67 89",
            location: "İzmir, Türkiye",
            linkedin: "#",
            description: "Endüstriyel güvenlik ve makine güvenliği konularında uzman, CE belgelendirme süreçlerinde deneyimli."
          },
          {
            id: 4,
            name: "Fatma Özkan",
            role: "İSG Eğitmeni",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
            experience: "8+ Yıl Deneyim",
            specialization: "Eğitim ve Gelişim",
            email: "fatma.ozkan@isg.com",
            phone: "+90 535 456 78 90",
            location: "Bursa, Türkiye",
            linkedin: "#",
            description: "İSG eğitimleri ve farkındalık programları konusunda uzman, 10.000+ çalışana eğitim vermiş."
          }
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchTeamData();
  }, []);

  if (loading) {
    return (
      <section id="team" className="relative bg-gradient-to-br from-gray-50 to-white py-24 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="text-gray-600 text-xl">Yükleniyor...</div>
          </div>
        </div>
      </section>
    );
  }

  if (!teamData) {
    return null;
  }

  // Stats data'yı array'e çevir
  const statsData = [
    {
      id: 1,
      number: teamData.stat1_number,
      label: teamData.stat1_label,
      icon: iconMap[teamData.stat1_icon as keyof typeof iconMap] || Users
    },
    {
      id: 2,
      number: teamData.stat2_number,
      label: teamData.stat2_label,
      icon: iconMap[teamData.stat2_icon as keyof typeof iconMap] || Clock
    },
    {
      id: 3,
      number: teamData.stat3_number,
      label: teamData.stat3_label,
      icon: iconMap[teamData.stat3_icon as keyof typeof iconMap] || Award
    },
    {
      id: 4,
      number: teamData.stat4_number,
      label: teamData.stat4_label,
      icon: iconMap[teamData.stat4_icon as keyof typeof iconMap] || Star
    }
  ];

  return (
    <section id="team" className="relative bg-gradient-to-br from-gray-50 to-white py-24 md:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#003366]/5 to-[#4CAF50]/5"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#4CAF50]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#003366]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#4CAF50]/10 border border-[#4CAF50]/20 rounded-full px-6 py-3 mb-6">
            <Users className="w-5 h-5 text-[#4CAF50]" />
            <span className="text-[#4CAF50] font-medium text-sm">{teamData.badge_text}</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-[#003366] leading-tight mb-6">
            {teamData.main_title.split(' ').map((word, index) => 
              word === 'Uzman' ? (
                <span key={index} className="text-[#4CAF50]"> {word}</span>
              ) : (
                <span key={index}>{index === 0 ? word : ` ${word}`}</span>
              )
            )}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {teamData.subtitle}
          </p>
        </motion.div>

        {/* Team Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {statsData.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.id} className="text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${index % 2 === 0 ? 'from-[#4CAF50] to-[#4CAF50]/90' : 'from-[#003366] to-[#003366]/90'} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#003366] mb-1">{stat.number}{stat.label.includes('%') ? '' : '+'}</h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-[#003366] to-[#003366]/90 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {teamData.cta_title}
            </h3>
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              {teamData.cta_description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-[#4CAF50] hover:bg-[#4CAF50]/90 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 hover:scale-105"
              >
                {teamData.cta_primary_text}
              </a>
              <a
                href="#services"
                className="bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 hover:bg-white/20"
              >
                {teamData.cta_secondary_text}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 