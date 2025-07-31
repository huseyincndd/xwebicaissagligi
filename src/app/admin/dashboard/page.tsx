'use client';

import { useState, useEffect, useRef } from 'react';
import { Save, Eye, Edit, Home, Users, MessageSquare, HelpCircle, Phone, Settings, Menu, FileText, Plus, Trash2 } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface HeroData {
  id: number;
  badge_text: string;
  main_title: string;
  subtitle: string;
  stats_customers: string;
  stats_security: string;
  stats_experience: string;
  cta_primary_text: string;
  cta_secondary_text: string;
  scroll_indicator_text: string;
  background_image: string;
}

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

interface SocialProofData {
  id: number;
  badge_text: string;
  main_title: string;
  subtitle: string;
  stat1_number: number;
  stat1_suffix: string;
  stat1_label: string;
  stat1_icon: string;
  stat2_number: number;
  stat2_suffix: string;
  stat2_label: string;
  stat2_icon: string;
  stat3_number: number;
  stat3_suffix: string;
  stat3_label: string;
  stat3_icon: string;
  stat4_number: number;
  stat4_suffix: string;
  stat4_label: string;
  stat4_icon: string;
  background_image: string;
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

interface ProcessData {
  id: number;
  badge_text: string;
  main_title: string;
  subtitle: string;
}

interface ProcessStep {
  id: number;
  step: string;
  title: string;
  description: string;
  icon: string;
  image_url: string;
}

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

interface NavbarData {
  id: number;
  logo_text: string;
  cta_button_text: string;
}

interface FooterData {
  id: number;
  company_name: string;
  company_tagline: string;
  company_description: string;
  phone: string;
  email: string;
  address: string;
  linkedin_url: string;
  twitter_url: string;
  instagram_url: string;
  newsletter_title: string;
  newsletter_description: string;
  copyright_text: string;
  design_credit: string;
}

interface SectionData {
  title: string;
  content: string;
  description?: string;
}

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('hero');
  const teamMembersEndRef = useRef<HTMLDivElement>(null);
  const faqItemsEndRef = useRef<HTMLDivElement>(null);
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [servicesData, setServicesData] = useState<ServicesData | null>(null);
  const [whyUsData, setWhyUsData] = useState<WhyUsData | null>(null);
  const [socialProofData, setSocialProofData] = useState<SocialProofData | null>(null);
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [processData, setProcessData] = useState<ProcessData | null>(null);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
  const [faqData, setFaqData] = useState<FaqData | null>(null);
  const [faqItems, setFaqItems] = useState<FaqItem[]>([]);
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [navbarData, setNavbarData] = useState<NavbarData | null>(null);
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [sections, setSections] = useState<Record<string, SectionData>>({});

  const [editing, setEditing] = useState<Record<string, boolean>>({});

  const sectionIcons = {
    hero: Home
  };

  // Hero, Services, WhyUs ve SocialProof data'yı yükle
  useEffect(() => {
    async function fetchData() {
      try {
        // Hero data'yı yükle
        const { data: heroData, error: heroError } = await supabase
          .from('herosection')
          .select('*')
          .limit(1)
          .single();

        if (heroError) {
          console.error('Hero data fetch error:', heroError);
        } else {
          setHeroData(heroData);
        }

        // Services data'yı yükle
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('*')
          .limit(1)
          .single();

        if (servicesError) {
          console.error('Services data fetch error:', servicesError);
        } else {
          setServicesData(servicesData);
        }

        // WhyUs data'yı yükle
        const { data: whyUsData, error: whyUsError } = await supabase
          .from('whyus')
          .select('*')
          .limit(1)
          .single();

        if (whyUsError) {
          console.error('WhyUs data fetch error:', whyUsError);
        } else {
          setWhyUsData(whyUsData);
        }

        // SocialProof data'yı yükle
        const { data: socialProofData, error: socialProofError } = await supabase
          .from('socialproof')
          .select('*')
          .limit(1)
          .single();

        if (socialProofError) {
          console.error('SocialProof data fetch error:', socialProofError);
        } else {
          setSocialProofData(socialProofData);
        }

        // Team data'yı yükle
        const { data: teamData, error: teamError } = await supabase
          .from('team')
          .select('*')
          .limit(1)
          .single();

        if (teamError) {
          console.error('Team data fetch error:', teamError);
        } else {
          setTeamData(teamData);
        }

        // Team members data'yı yükle
        const { data: teamMembersData, error: teamMembersError } = await supabase
          .from('team_members')
          .select('*')
          .order('id', { ascending: true });

        if (teamMembersError) {
          console.error('Team members fetch error:', teamMembersError);
        } else {
          setTeamMembers(teamMembersData);
        }

        // Process data'yı yükle
        const { data: processData, error: processError } = await supabase
          .from('process')
          .select('*')
          .limit(1)
          .single();

        if (processError) {
          console.error('Process data fetch error:', processError);
        } else {
          setProcessData(processData);
        }

        // Process steps data'yı yükle
        const { data: processStepsData, error: processStepsError } = await supabase
          .from('process_steps')
          .select('*')
          .order('id', { ascending: true });

        if (processStepsError) {
          console.error('Process steps fetch error:', processStepsError);
        } else {
          setProcessSteps(processStepsData);
        }

        // FAQ data'yı yükle
        const { data: faqData, error: faqError } = await supabase
          .from('faq')
          .select('*')
          .limit(1)
          .single();

        if (faqError) {
          console.error('FAQ data fetch error:', faqError);
        } else {
          setFaqData(faqData);
        }

        // FAQ items data'yı yükle
        const { data: faqItemsData, error: faqItemsError } = await supabase
          .from('faq_items')
          .select('*')
          .order('order_number', { ascending: true });

        if (faqItemsError) {
          console.error('FAQ items fetch error:', faqItemsError);
        } else {
          setFaqItems(faqItemsData);
        }

        // Contact data'yı yükle
        const { data: contactData, error: contactError } = await supabase
          .from('contact')
          .select('*')
          .limit(1)
          .single();

        if (contactError) {
          console.error('Contact data fetch error:', contactError);
        } else {
          setContactData(contactData);
        }

        // Navbar data'yı yükle
        const { data: navbarData, error: navbarError } = await supabase
          .from('navbar')
          .select('*')
          .limit(1)
          .single();

        if (navbarError) {
          console.error('Navbar data fetch error:', navbarError);
        } else {
          setNavbarData(navbarData);
        }

        // Footer data'yı yükle
        const { data: footerData, error: footerError } = await supabase
          .from('footer')
          .select('*')
          .limit(1)
          .single();

        if (footerError) {
          console.error('Footer data fetch error:', footerError);
        } else {
          setFooterData(footerData);
        }
      } catch (error) {
        console.error('Data fetch error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleSave = async (sectionKey: string) => {
    if (sectionKey === 'hero' && heroData) {
      setSaving(true);
      try {
        const { error } = await supabase
          .from('herosection')
          .update(heroData)
          .eq('id', heroData.id);

        if (error) {
          console.error('Hero update error:', error);
          alert('Güncelleme sırasında hata oluştu!');
        } else {
          alert('Hero section başarıyla güncellendi!');
          setEditing(prev => ({ ...prev, [sectionKey]: false }));
        }
      } catch (error) {
        console.error('Hero update error:', error);
        alert('Güncelleme sırasında hata oluştu!');
      } finally {
        setSaving(false);
      }
    } else if (sectionKey === 'services' && servicesData) {
      setSaving(true);
      try {
        const { error } = await supabase
          .from('services')
          .update(servicesData)
          .eq('id', servicesData.id);

        if (error) {
          console.error('Services update error:', error);
          alert('Güncelleme sırasında hata oluştu!');
        } else {
          alert('Services section başarıyla güncellendi!');
          setEditing(prev => ({ ...prev, [sectionKey]: false }));
        }
      } catch (error) {
        console.error('Services update error:', error);
        alert('Güncelleme sırasında hata oluştu!');
      } finally {
        setSaving(false);
      }
    } else if (sectionKey === 'whyus' && whyUsData) {
      setSaving(true);
      try {
        const { error } = await supabase
          .from('whyus')
          .update(whyUsData)
          .eq('id', whyUsData.id);

        if (error) {
          console.error('WhyUs update error:', error);
          alert('Güncelleme sırasında hata oluştu!');
        } else {
          alert('WhyUs section başarıyla güncellendi!');
          setEditing(prev => ({ ...prev, [sectionKey]: false }));
        }
      } catch (error) {
        console.error('WhyUs update error:', error);
        alert('Güncelleme sırasında hata oluştu!');
      } finally {
        setSaving(false);
      }
    } else if (sectionKey === 'socialproof' && socialProofData) {
      setSaving(true);
      try {
        const { error } = await supabase
          .from('socialproof')
          .update(socialProofData)
          .eq('id', socialProofData.id);

        if (error) {
          console.error('SocialProof update error:', error);
          alert('Güncelleme sırasında hata oluştu!');
        } else {
          alert('SocialProof section başarıyla güncellendi!');
          setEditing(prev => ({ ...prev, [sectionKey]: false }));
        }
      } catch (error) {
        console.error('SocialProof update error:', error);
        alert('Güncelleme sırasında hata oluştu!');
      } finally {
        setSaving(false);
      }
    } else if (sectionKey === 'team' && teamData) {
      setSaving(true);
      try {
        // Team data'yı güncelle
        const { error: teamError } = await supabase
          .from('team')
          .update(teamData)
          .eq('id', teamData.id);

        if (teamError) {
          console.error('Team update error:', teamError);
          alert('Team section güncellenirken hata oluştu!');
          return;
        }

        // Önce mevcut tüm team members'ları sil
        const { error: deleteError } = await supabase
          .from('team_members')
          .delete()
          .neq('id', 0); // Tüm kayıtları sil

        if (deleteError) {
          console.error('Team members delete error:', deleteError);
          alert('Mevcut ekip üyeleri silinirken hata oluştu!');
          return;
        }

        // Sonra tüm team members'ları yeniden ekle
        for (const member of teamMembers) {
          // Boş üyeleri atla
          if (!member.name.trim()) {
            continue;
          }

          const { error: memberError } = await supabase
            .from('team_members')
            .insert({
              name: member.name,
              role: member.role,
              image: member.image,
              experience: member.experience,
              specialization: member.specialization,
              email: member.email,
              phone: member.phone,
              location: member.location,
              linkedin: member.linkedin,
              description: member.description
            });

          if (memberError) {
            console.error('Team member insert error:', memberError);
            alert(`Ekip üyesi "${member.name}" eklenirken hata oluştu!`);
            return;
          }
        }

        alert('Team section ve ekip üyeleri başarıyla güncellendi!');
        setEditing(prev => ({ ...prev, [sectionKey]: false }));
      } catch (error) {
        console.error('Team update error:', error);
        alert('Güncelleme sırasında hata oluştu!');
      } finally {
        setSaving(false);
      }
    } else if (sectionKey === 'process' && processData) {
      setSaving(true);
      try {
        // Process data'yı güncelle
        const { error: processError } = await supabase
          .from('process')
          .update(processData)
          .eq('id', processData.id);

        if (processError) {
          console.error('Process update error:', processError);
          alert('Process section güncellenirken hata oluştu!');
          return;
        }

        // Process steps'leri güncelle
        for (const step of processSteps) {
          const { error: stepError } = await supabase
            .from('process_steps')
            .update(step)
            .eq('id', step.id);

          if (stepError) {
            console.error('Process step update error:', stepError);
            alert(`Süreç adımı ${step.step} güncellenirken hata oluştu!`);
            return;
          }
        }

        alert('Process section ve süreç adımları başarıyla güncellendi!');
        setEditing(prev => ({ ...prev, [sectionKey]: false }));
      } catch (error) {
        console.error('Process update error:', error);
        alert('Güncelleme sırasında hata oluştu!');
      } finally {
        setSaving(false);
      }
    } else if (sectionKey === 'faq' && faqData) {
      setSaving(true);
      try {
        // FAQ data'yı güncelle
        const { error: faqError } = await supabase
          .from('faq')
          .update(faqData)
          .eq('id', faqData.id);

        if (faqError) {
          console.error('FAQ update error:', faqError);
          alert('FAQ section güncellenirken hata oluştu!');
          return;
        }

        // Önce mevcut tüm FAQ items'ları sil
        const { error: deleteError } = await supabase
          .from('faq_items')
          .delete()
          .neq('id', 0); // Tüm kayıtları sil

        if (deleteError) {
          console.error('FAQ items delete error:', deleteError);
          alert('Mevcut sorular silinirken hata oluştu!');
          return;
        }

        // Sonra tüm FAQ items'ları yeniden ekle
        for (const item of faqItems) {
          // Boş soruları atla
          if (!item.question.trim() || !item.answer.trim()) {
            continue;
          }

          const { error: itemError } = await supabase
            .from('faq_items')
            .insert({
              question: item.question,
              answer: item.answer,
              icon: item.icon,
              order_number: item.order_number
            });

          if (itemError) {
            console.error('FAQ item insert error:', itemError);
            alert(`FAQ sorusu "${item.question.substring(0, 30)}..." eklenirken hata oluştu!`);
            return;
          }
        }

        alert('FAQ section ve sorular başarıyla güncellendi!');
        setEditing(prev => ({ ...prev, [sectionKey]: false }));
      } catch (error) {
        console.error('FAQ update error:', error);
        alert('Güncelleme sırasında hata oluştu!');
      } finally {
        setSaving(false);
      }
    } else if (sectionKey === 'contact' && contactData) {
      setSaving(true);
      try {
        const { error } = await supabase
          .from('contact')
          .update(contactData)
          .eq('id', contactData.id);

        if (error) {
          console.error('Contact update error:', error);
          alert('Contact section güncellenirken hata oluştu!');
        } else {
          alert('Contact section başarıyla güncellendi!');
          setEditing(prev => ({ ...prev, [sectionKey]: false }));
        }
      } catch (error) {
        console.error('Contact update error:', error);
        alert('Güncelleme sırasında hata oluştu!');
      } finally {
        setSaving(false);
      }
    } else if (sectionKey === 'navbar' && navbarData) {
      setSaving(true);
      try {
        const { error } = await supabase
          .from('navbar')
          .update(navbarData)
          .eq('id', navbarData.id);

        if (error) {
          console.error('Navbar update error:', error);
          alert('Navbar güncellenirken hata oluştu!');
        } else {
          alert('Navbar başarıyla güncellendi!');
          setEditing(prev => ({ ...prev, [sectionKey]: false }));
        }
      } catch (error) {
        console.error('Navbar update error:', error);
        alert('Güncelleme sırasında hata oluştu!');
      } finally {
        setSaving(false);
      }
    } else if (sectionKey === 'footer' && footerData) {
      setSaving(true);
      try {
        const { error } = await supabase
          .from('footer')
          .update(footerData)
          .eq('id', footerData.id);

        if (error) {
          console.error('Footer update error:', error);
          alert('Footer güncellenirken hata oluştu!');
        } else {
          alert('Footer başarıyla güncellendi!');
          setEditing(prev => ({ ...prev, [sectionKey]: false }));
        }
      } catch (error) {
        console.error('Footer update error:', error);
        alert('Güncelleme sırasında hata oluştu!');
      } finally {
        setSaving(false);
      }
    } else {
      setEditing(prev => ({ ...prev, [sectionKey]: false }));
      console.log(`${sectionKey} section güncellendi:`, sections[sectionKey]);
    }
  };

  const handleEdit = (sectionKey: string) => {
    setEditing(prev => ({ ...prev, [sectionKey]: true }));
  };

  const handlePreview = () => {
    window.open('/', '_blank');
  };

  const handleAddFaqItem = () => {
    const newItem: FaqItem = {
      id: Date.now(), // Geçici ID
      question: '',
      answer: '',
      icon: 'HelpCircle',
      order_number: faqItems.length + 1
    };
    setFaqItems([...faqItems, newItem]);
    
    // Yeni soru eklendikten sonra o kısma scroll yap
    setTimeout(() => {
      faqItemsEndRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }, 100);
  };

  const handleDeleteFaqItem = (itemId: number) => {
    if (confirm('Bu soruyu silmek istediğinizden emin misiniz?')) {
      setFaqItems(faqItems.filter(item => item.id !== itemId));
    }
  };

  const handleAddTeamMember = () => {
    const newMember: TeamMember = {
      id: Date.now(), // Geçici ID
      name: '',
      role: '',
      image: '',
      experience: '',
      specialization: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      description: ''
    };
    setTeamMembers([...teamMembers, newMember]);
    
    // Yeni üye eklendikten sonra o kısma scroll yap
    setTimeout(() => {
      teamMembersEndRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }, 100);
  };

  const handleDeleteTeamMember = (memberId: number) => {
    if (confirm('Bu ekip üyesini silmek istediğinizden emin misiniz?')) {
      setTeamMembers(teamMembers.filter(member => member.id !== memberId));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">İçerik Yönetimi</h1>
          <p className="text-gray-600">Ana sayfa bölümlerinin içeriklerini düzenleyin</p>
        </div>
        <button
          onClick={handlePreview}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Eye className="w-4 h-4" />
          <span>Önizleme</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Bölümler</h3>
            <div className="space-y-2">
              {/* Üst Bilgi - Navbar */}
              <button
                onClick={() => setActiveSection('navbar')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === 'navbar'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Menu className="w-4 h-4" />
                <span className="text-sm font-medium">Üst Bilgi</span>
              </button>

              {/* Ana Sayfa - Hero Section */}
              <button
                onClick={() => setActiveSection('hero')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === 'hero'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Home className="w-4 h-4" />
                <span className="text-sm font-medium">Ana Sayfa</span>
              </button>

              {/* Hizmetlerimiz - Services */}
              <button
                onClick={() => setActiveSection('services')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === 'services'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span className="text-sm font-medium">Hizmetlerimiz</span>
              </button>

              {/* Neden Biz - WhyUs Section */}
              <button
                onClick={() => setActiveSection('whyus')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === 'whyus'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">Neden Biz?</span>
              </button>

              {/* Başarı Hikayemiz - SocialProof Section */}
              <button
                onClick={() => setActiveSection('socialproof')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === 'socialproof'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm font-medium">Başarı Hikayemiz</span>
              </button>

              {/* Ekibimiz - Team Section */}
              <button
                onClick={() => setActiveSection('team')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === 'team'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">Ekibimiz</span>
              </button>

              {/* Çalışma Süreci - Process Section */}
              <button
                onClick={() => setActiveSection('process')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === 'process'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span className="text-sm font-medium">Çalışma Süreci</span>
              </button>

              {/* Sık Sorulan Sorular - FAQ Section */}
              <button
                onClick={() => setActiveSection('faq')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === 'faq'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Sık Sorulan Sorular</span>
              </button>

              {/* İletişim - Contact Section */}
              <button
                onClick={() => setActiveSection('contact')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === 'contact'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">İletişim</span>
              </button>

              {/* Alt Bilgi - Footer Section */}
              <button
                onClick={() => setActiveSection('footer')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === 'footer'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span className="text-sm font-medium">Alt Bilgi</span>
              </button>
              
              {/* Other Sections */}
              {Object.entries(sections).map(([key, section]) => {
                const Icon = sectionIcons[key as keyof typeof sectionIcons];
                return (
                  <button
                    key={key}
                    onClick={() => setActiveSection(key)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === key
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{section.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow p-6">
            {activeSection === 'hero' && heroData ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Hero Section</h2>
                  <div className="flex space-x-2">
                    {editing[activeSection] ? (
                      <button
                        onClick={() => handleSave(activeSection)}
                        disabled={saving}
                        className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        <span>{saving ? 'Kaydediliyor...' : 'Kaydet'}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(activeSection)}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Düzenle</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Background Image */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Arka Plan Resmi</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Resim URL'si
                      </label>
                      {editing[activeSection] ? (
                        <input
                          type="url"
                          value={heroData.background_image}
                          onChange={(e) =>
                            setHeroData(prev => prev ? { ...prev, background_image: e.target.value } : null)
                          }
                          placeholder="https://example.com/image.jpg"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="space-y-2">
                          <p className="text-gray-700 text-sm break-all">{heroData.background_image}</p>
                          <div className="w-full h-32 bg-gray-200 rounded-lg overflow-hidden">
                            <img 
                              src={heroData.background_image} 
                              alt="Background preview" 
                              className="w-full h-full object-cover"
                                                           onError={(e) => {
                               const target = e.currentTarget as HTMLElement;
                               target.style.display = 'none';
                               const nextSibling = target.nextElementSibling as HTMLElement;
                               if (nextSibling) {
                                 nextSibling.style.display = 'flex';
                               }
                             }}
                            />
                            <div className="hidden w-full h-full items-center justify-center text-gray-500 text-sm">
                              Resim yüklenemedi
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Ana İçerik</h3>
                    <div className="space-y-4">
                      {/* Badge Text */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Badge Metni
                        </label>
                        {editing[activeSection] ? (
                          <input
                            type="text"
                            value={heroData.badge_text}
                            onChange={(e) =>
                              setHeroData(prev => prev ? { ...prev, badge_text: e.target.value } : null)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{heroData.badge_text}</p>
                        )}
                      </div>

                      {/* Main Title */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ana Başlık
                        </label>
                        {editing[activeSection] ? (
                          <input
                            type="text"
                            value={heroData.main_title}
                            onChange={(e) =>
                              setHeroData(prev => prev ? { ...prev, main_title: e.target.value } : null)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{heroData.main_title}</p>
                        )}
                      </div>

                      {/* Subtitle */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Alt Başlık
                        </label>
                        {editing[activeSection] ? (
                          <textarea
                            value={heroData.subtitle}
                            onChange={(e) =>
                              setHeroData(prev => prev ? { ...prev, subtitle: e.target.value } : null)
                            }
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-700 leading-relaxed">{heroData.subtitle}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">İstatistikler</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Müşteri Sayısı
                        </label>
                        {editing[activeSection] ? (
                          <input
                            type="text"
                            value={heroData.stats_customers}
                            onChange={(e) =>
                              setHeroData(prev => prev ? { ...prev, stats_customers: e.target.value } : null)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-700">{heroData.stats_customers}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Güvenlik Oranı
                        </label>
                        {editing[activeSection] ? (
                          <input
                            type="text"
                            value={heroData.stats_security}
                            onChange={(e) =>
                              setHeroData(prev => prev ? { ...prev, stats_security: e.target.value } : null)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-700">{heroData.stats_security}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Deneyim
                        </label>
                        {editing[activeSection] ? (
                          <input
                            type="text"
                            value={heroData.stats_experience}
                            onChange={(e) =>
                              setHeroData(prev => prev ? { ...prev, stats_experience: e.target.value } : null)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-700">{heroData.stats_experience}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Butonlar</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Birincil Buton Metni
                        </label>
                        {editing[activeSection] ? (
                          <input
                            type="text"
                            value={heroData.cta_primary_text}
                            onChange={(e) =>
                              setHeroData(prev => prev ? { ...prev, cta_primary_text: e.target.value } : null)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-700">{heroData.cta_primary_text}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          İkincil Buton Metni
                        </label>
                        {editing[activeSection] ? (
                          <input
                            type="text"
                            value={heroData.cta_secondary_text}
                            onChange={(e) =>
                              setHeroData(prev => prev ? { ...prev, cta_secondary_text: e.target.value } : null)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-700">{heroData.cta_secondary_text}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Scroll Indicator */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Scroll Indicator</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Scroll Indicator Metni
                      </label>
                      {editing[activeSection] ? (
                        <input
                          type="text"
                          value={heroData.scroll_indicator_text}
                          onChange={(e) =>
                            setHeroData(prev => prev ? { ...prev, scroll_indicator_text: e.target.value } : null)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-700">{heroData.scroll_indicator_text}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : activeSection === 'services' && servicesData ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Services Section</h2>
                  <div className="flex space-x-2">
                    {editing[activeSection] ? (
                      <button
                        onClick={() => handleSave(activeSection)}
                        disabled={saving}
                        className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        <span>{saving ? 'Kaydediliyor...' : 'Kaydet'}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(activeSection)}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Düzenle</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Header Content */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Başlık Bölümü</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Badge Metni
                        </label>
                        {editing[activeSection] ? (
                          <input
                            type="text"
                            value={servicesData.badge_text}
                            onChange={(e) =>
                              setServicesData(prev => prev ? { ...prev, badge_text: e.target.value } : null)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{servicesData.badge_text}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ana Başlık
                        </label>
                        {editing[activeSection] ? (
                          <input
                            type="text"
                            value={servicesData.main_title}
                            onChange={(e) =>
                              setServicesData(prev => prev ? { ...prev, main_title: e.target.value } : null)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{servicesData.main_title}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Alt Başlık
                        </label>
                        {editing[activeSection] ? (
                          <textarea
                            value={servicesData.subtitle}
                            onChange={(e) =>
                              setServicesData(prev => prev ? { ...prev, subtitle: e.target.value } : null)
                            }
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-700 leading-relaxed">{servicesData.subtitle}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Service 1 */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Hizmet 1</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Başlık
                        </label>
                        {editing[activeSection] ? (
                          <input
                            type="text"
                            value={servicesData.service1_title}
                            onChange={(e) =>
                              setServicesData(prev => prev ? { ...prev, service1_title: e.target.value } : null)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{servicesData.service1_title}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Açıklama
                        </label>
                        {editing[activeSection] ? (
                          <textarea
                            value={servicesData.service1_description}
                            onChange={(e) =>
                              setServicesData(prev => prev ? { ...prev, service1_description: e.target.value } : null)
                            }
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-700 leading-relaxed">{servicesData.service1_description}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Resim URL'si
                        </label>
                        {editing[activeSection] ? (
                          <input
                            type="url"
                            value={servicesData.service1_image}
                            onChange={(e) =>
                              setServicesData(prev => prev ? { ...prev, service1_image: e.target.value } : null)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="space-y-2">
                            <p className="text-gray-700 text-sm break-all">{servicesData.service1_image}</p>
                            <div className="w-full h-32 bg-gray-200 rounded-lg overflow-hidden">
                              <img 
                                src={servicesData.service1_image} 
                                alt="Service 1 preview" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((num) => (
                          <div key={num}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Özellik {num}
                            </label>
                            {editing[activeSection] ? (
                              <input
                                type="text"
                                value={servicesData[`service1_feature${num}` as keyof ServicesData] as string}
                                onChange={(e) =>
                                  setServicesData(prev => prev ? { 
                                    ...prev, 
                                    [`service1_feature${num}`]: e.target.value 
                                  } : null)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            ) : (
                              <p className="text-gray-700">{servicesData[`service1_feature${num}` as keyof ServicesData] as string}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Service 2 */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Hizmet 2</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Başlık
                        </label>
                        {editing[activeSection] ? (
                          <input
                            type="text"
                            value={servicesData.service2_title}
                            onChange={(e) =>
                              setServicesData(prev => prev ? { ...prev, service2_title: e.target.value } : null)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{servicesData.service2_title}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Açıklama
                        </label>
                        {editing[activeSection] ? (
                          <textarea
                            value={servicesData.service2_description}
                            onChange={(e) =>
                              setServicesData(prev => prev ? { ...prev, service2_description: e.target.value } : null)
                            }
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-700 leading-relaxed">{servicesData.service2_description}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Resim URL'si
                        </label>
                        {editing[activeSection] ? (
                          <input
                            type="url"
                            value={servicesData.service2_image}
                            onChange={(e) =>
                              setServicesData(prev => prev ? { ...prev, service2_image: e.target.value } : null)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="space-y-2">
                            <p className="text-gray-700 text-sm break-all">{servicesData.service2_image}</p>
                            <div className="w-full h-32 bg-gray-200 rounded-lg overflow-hidden">
                              <img 
                                src={servicesData.service2_image} 
                                alt="Service 2 preview" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((num) => (
                          <div key={num}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Özellik {num}
                            </label>
                            {editing[activeSection] ? (
                              <input
                                type="text"
                                value={servicesData[`service2_feature${num}` as keyof ServicesData] as string}
                                onChange={(e) =>
                                  setServicesData(prev => prev ? { 
                                    ...prev, 
                                    [`service2_feature${num}`]: e.target.value 
                                  } : null)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            ) : (
                              <p className="text-gray-700">{servicesData[`service2_feature${num}` as keyof ServicesData] as string}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Service 3 */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Hizmet 3</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Başlık
                        </label>
                        {editing[activeSection] ? (
                          <input
                            type="text"
                            value={servicesData.service3_title}
                            onChange={(e) =>
                              setServicesData(prev => prev ? { ...prev, service3_title: e.target.value } : null)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{servicesData.service3_title}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Açıklama
                        </label>
                        {editing[activeSection] ? (
                          <textarea
                            value={servicesData.service3_description}
                            onChange={(e) =>
                              setServicesData(prev => prev ? { ...prev, service3_description: e.target.value } : null)
                            }
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-700 leading-relaxed">{servicesData.service3_description}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Resim URL'si
                        </label>
                        {editing[activeSection] ? (
                          <input
                            type="url"
                            value={servicesData.service3_image}
                            onChange={(e) =>
                              setServicesData(prev => prev ? { ...prev, service3_image: e.target.value } : null)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="space-y-2">
                            <p className="text-gray-700 text-sm break-all">{servicesData.service3_image}</p>
                            <div className="w-full h-32 bg-gray-200 rounded-lg overflow-hidden">
                              <img 
                                src={servicesData.service3_image} 
                                alt="Service 3 preview" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((num) => (
                          <div key={num}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Özellik {num}
                            </label>
                            {editing[activeSection] ? (
                              <input
                                type="text"
                                value={servicesData[`service3_feature${num}` as keyof ServicesData] as string}
                                onChange={(e) =>
                                  setServicesData(prev => prev ? { 
                                    ...prev, 
                                    [`service3_feature${num}`]: e.target.value 
                                  } : null)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            ) : (
                              <p className="text-gray-700">{servicesData[`service3_feature${num}` as keyof ServicesData] as string}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                                 </div>
               </div>
             ) : activeSection === 'whyus' && whyUsData ? (
               <div className="space-y-6">
                 <div className="flex justify-between items-center">
                   <h2 className="text-xl font-semibold text-gray-900">WhyUs Section</h2>
                   <div className="flex space-x-2">
                     {editing[activeSection] ? (
                       <button
                         onClick={() => handleSave(activeSection)}
                         disabled={saving}
                         className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                       >
                         <Save className="w-4 h-4" />
                         <span>{saving ? 'Kaydediliyor...' : 'Kaydet'}</span>
                       </button>
                     ) : (
                       <button
                         onClick={() => handleEdit(activeSection)}
                         className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                       >
                         <Edit className="w-4 h-4" />
                         <span>Düzenle</span>
                       </button>
                     )}
                   </div>
                 </div>

                 <div className="space-y-6">
                   {/* Header Content */}
                   <div className="bg-gray-50 p-4 rounded-lg">
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Başlık Bölümü</h3>
                     <div className="space-y-4">
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Badge Metni
                         </label>
                         {editing[activeSection] ? (
                           <input
                             type="text"
                             value={whyUsData.badge_text}
                             onChange={(e) =>
                               setWhyUsData(prev => prev ? { ...prev, badge_text: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-900 font-medium">{whyUsData.badge_text}</p>
                         )}
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Ana Başlık
                         </label>
                         {editing[activeSection] ? (
                           <input
                             type="text"
                             value={whyUsData.main_title}
                             onChange={(e) =>
                               setWhyUsData(prev => prev ? { ...prev, main_title: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-900 font-medium">{whyUsData.main_title}</p>
                         )}
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Alt Başlık
                         </label>
                         {editing[activeSection] ? (
                           <textarea
                             value={whyUsData.subtitle}
                             onChange={(e) =>
                               setWhyUsData(prev => prev ? { ...prev, subtitle: e.target.value } : null)
                             }
                             rows={3}
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-700 leading-relaxed">{whyUsData.subtitle}</p>
                         )}
                       </div>
                     </div>
                   </div>

                   {/* Item 1 */}
                   <div className="bg-gray-50 p-4 rounded-lg">
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Özellik 1</h3>
                     <div className="space-y-4">
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Başlık
                         </label>
                         {editing[activeSection] ? (
                           <input
                             type="text"
                             value={whyUsData.item1_title}
                             onChange={(e) =>
                               setWhyUsData(prev => prev ? { ...prev, item1_title: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-900 font-medium">{whyUsData.item1_title}</p>
                         )}
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Açıklama
                         </label>
                         {editing[activeSection] ? (
                           <textarea
                             value={whyUsData.item1_description}
                             onChange={(e) =>
                               setWhyUsData(prev => prev ? { ...prev, item1_description: e.target.value } : null)
                             }
                             rows={3}
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-700 leading-relaxed">{whyUsData.item1_description}</p>
                         )}
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           İkon
                         </label>
                         {editing[activeSection] ? (
                           <select
                             value={whyUsData.item1_icon}
                             onChange={(e) =>
                               setWhyUsData(prev => prev ? { ...prev, item1_icon: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           >
                             <option value="Users">Users</option>
                             <option value="ShieldCheck">ShieldCheck</option>
                             <option value="Cpu">Cpu</option>
                             <option value="Clock">Clock</option>
                           </select>
                         ) : (
                           <p className="text-gray-700">{whyUsData.item1_icon}</p>
                         )}
                       </div>
                     </div>
                   </div>

                   {/* Item 2 */}
                   <div className="bg-gray-50 p-4 rounded-lg">
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Özellik 2</h3>
                     <div className="space-y-4">
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Başlık
                         </label>
                         {editing[activeSection] ? (
                           <input
                             type="text"
                             value={whyUsData.item2_title}
                             onChange={(e) =>
                               setWhyUsData(prev => prev ? { ...prev, item2_title: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-900 font-medium">{whyUsData.item2_title}</p>
                         )}
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Açıklama
                         </label>
                         {editing[activeSection] ? (
                           <textarea
                             value={whyUsData.item2_description}
                             onChange={(e) =>
                               setWhyUsData(prev => prev ? { ...prev, item2_description: e.target.value } : null)
                             }
                             rows={3}
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-700 leading-relaxed">{whyUsData.item2_description}</p>
                         )}
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           İkon
                         </label>
                         {editing[activeSection] ? (
                           <select
                             value={whyUsData.item2_icon}
                             onChange={(e) =>
                               setWhyUsData(prev => prev ? { ...prev, item2_icon: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           >
                             <option value="Users">Users</option>
                             <option value="ShieldCheck">ShieldCheck</option>
                             <option value="Cpu">Cpu</option>
                             <option value="Clock">Clock</option>
                           </select>
                         ) : (
                           <p className="text-gray-700">{whyUsData.item2_icon}</p>
                         )}
                       </div>
                     </div>
                   </div>

                   {/* Item 3 */}
                   <div className="bg-gray-50 p-4 rounded-lg">
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Özellik 3</h3>
                     <div className="space-y-4">
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Başlık
                         </label>
                         {editing[activeSection] ? (
                           <input
                             type="text"
                             value={whyUsData.item3_title}
                             onChange={(e) =>
                               setWhyUsData(prev => prev ? { ...prev, item3_title: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-900 font-medium">{whyUsData.item3_title}</p>
                         )}
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Açıklama
                         </label>
                         {editing[activeSection] ? (
                           <textarea
                             value={whyUsData.item3_description}
                             onChange={(e) =>
                               setWhyUsData(prev => prev ? { ...prev, item3_description: e.target.value } : null)
                             }
                             rows={3}
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-700 leading-relaxed">{whyUsData.item3_description}</p>
                         )}
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           İkon
                         </label>
                         {editing[activeSection] ? (
                           <select
                             value={whyUsData.item3_icon}
                             onChange={(e) =>
                               setWhyUsData(prev => prev ? { ...prev, item3_icon: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           >
                             <option value="Users">Users</option>
                             <option value="ShieldCheck">ShieldCheck</option>
                             <option value="Cpu">Cpu</option>
                             <option value="Clock">Clock</option>
                           </select>
                         ) : (
                           <p className="text-gray-700">{whyUsData.item3_icon}</p>
                         )}
                       </div>
                     </div>
                   </div>

                   {/* Item 4 */}
                   <div className="bg-gray-50 p-4 rounded-lg">
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Özellik 4</h3>
                     <div className="space-y-4">
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Başlık
                         </label>
                         {editing[activeSection] ? (
                           <input
                             type="text"
                             value={whyUsData.item4_title}
                             onChange={(e) =>
                               setWhyUsData(prev => prev ? { ...prev, item4_title: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-900 font-medium">{whyUsData.item4_title}</p>
                         )}
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Açıklama
                         </label>
                         {editing[activeSection] ? (
                           <textarea
                             value={whyUsData.item4_description}
                             onChange={(e) =>
                               setWhyUsData(prev => prev ? { ...prev, item4_description: e.target.value } : null)
                             }
                             rows={3}
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-700 leading-relaxed">{whyUsData.item4_description}</p>
                         )}
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           İkon
                         </label>
                         {editing[activeSection] ? (
                           <select
                             value={whyUsData.item4_icon}
                             onChange={(e) =>
                               setWhyUsData(prev => prev ? { ...prev, item4_icon: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           >
                             <option value="Users">Users</option>
                             <option value="ShieldCheck">ShieldCheck</option>
                             <option value="Cpu">Cpu</option>
                             <option value="Clock">Clock</option>
                           </select>
                         ) : (
                           <p className="text-gray-700">{whyUsData.item4_icon}</p>
                         )}
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             ) : activeSection === 'socialproof' && socialProofData ? (
               <div className="space-y-6">
                 <div className="flex justify-between items-center">
                   <h2 className="text-xl font-semibold text-gray-900">SocialProof Section</h2>
                   <div className="flex space-x-2">
                     {editing[activeSection] ? (
                       <button
                         onClick={() => handleSave(activeSection)}
                         disabled={saving}
                         className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                       >
                         <Save className="w-4 h-4" />
                         <span>{saving ? 'Kaydediliyor...' : 'Kaydet'}</span>
                       </button>
                     ) : (
                       <button
                         onClick={() => handleEdit(activeSection)}
                         className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                       >
                         <Edit className="w-4 h-4" />
                         <span>Düzenle</span>
                       </button>
                     )}
                   </div>
                 </div>

                 <div className="space-y-6">
                   {/* Background Image */}
                   <div className="bg-gray-50 p-4 rounded-lg">
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Arka Plan Resmi</h3>
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">
                         Resim URL'si
                       </label>
                       {editing[activeSection] ? (
                         <input
                           type="url"
                           value={socialProofData.background_image}
                           onChange={(e) =>
                             setSocialProofData(prev => prev ? { ...prev, background_image: e.target.value } : null)
                           }
                           placeholder="https://example.com/image.jpg"
                           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                         />
                       ) : (
                         <div className="space-y-2">
                           <p className="text-gray-700 text-sm break-all">{socialProofData.background_image}</p>
                           <div className="w-full h-32 bg-gray-200 rounded-lg overflow-hidden">
                             <img
                               src={socialProofData.background_image}
                               alt="Background preview"
                               className="w-full h-full object-cover"
                               onError={(e) => {
                                 e.currentTarget.style.display = 'none';
                                 (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                               }}
                             />
                             <div className="hidden w-full h-full items-center justify-center text-gray-500 text-sm">
                               Resim yüklenemedi
                             </div>
                           </div>
                         </div>
                       )}
                     </div>
                   </div>

                   {/* Header Content */}
                   <div className="bg-gray-50 p-4 rounded-lg">
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Başlık Bölümü</h3>
                     <div className="space-y-4">
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Badge Metni
                         </label>
                         {editing[activeSection] ? (
                           <input
                             type="text"
                             value={socialProofData.badge_text}
                             onChange={(e) =>
                               setSocialProofData(prev => prev ? { ...prev, badge_text: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-900 font-medium">{socialProofData.badge_text}</p>
                         )}
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Ana Başlık
                         </label>
                         {editing[activeSection] ? (
                           <input
                             type="text"
                             value={socialProofData.main_title}
                             onChange={(e) =>
                               setSocialProofData(prev => prev ? { ...prev, main_title: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-900 font-medium">{socialProofData.main_title}</p>
                         )}
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Alt Başlık
                         </label>
                         {editing[activeSection] ? (
                           <textarea
                             value={socialProofData.subtitle}
                             onChange={(e) =>
                               setSocialProofData(prev => prev ? { ...prev, subtitle: e.target.value } : null)
                             }
                             rows={3}
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-700 leading-relaxed">{socialProofData.subtitle}</p>
                         )}
                       </div>
                     </div>
                   </div>

                   {/* Stat 1 */}
                   <div className="bg-gray-50 p-4 rounded-lg">
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">İstatistik 1</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Sayı
                         </label>
                         {editing[activeSection] ? (
                           <input
                             type="number"
                             value={socialProofData.stat1_number}
                             onChange={(e) =>
                               setSocialProofData(prev => prev ? { ...prev, stat1_number: parseInt(e.target.value) } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-700">{socialProofData.stat1_number}</p>
                         )}
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Sonek
                         </label>
                         {editing[activeSection] ? (
                           <input
                             type="text"
                             value={socialProofData.stat1_suffix}
                             onChange={(e) =>
                               setSocialProofData(prev => prev ? { ...prev, stat1_suffix: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-700">{socialProofData.stat1_suffix}</p>
                         )}
                       </div>
                       <div className="md:col-span-2">
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Etiket
                         </label>
                         {editing[activeSection] ? (
                           <input
                             type="text"
                             value={socialProofData.stat1_label}
                             onChange={(e) =>
                               setSocialProofData(prev => prev ? { ...prev, stat1_label: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-700">{socialProofData.stat1_label}</p>
                         )}
                       </div>
                       <div className="md:col-span-2">
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           İkon
                         </label>
                         {editing[activeSection] ? (
                           <select
                             value={socialProofData.stat1_icon}
                             onChange={(e) =>
                               setSocialProofData(prev => prev ? { ...prev, stat1_icon: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           >
                             <option value="ExperienceIcon">ExperienceIcon</option>
                             <option value="ProjectsIcon">ProjectsIcon</option>
                             <option value="StaffIcon">StaffIcon</option>
                             <option value="SatisfactionIcon">SatisfactionIcon</option>
                           </select>
                         ) : (
                           <p className="text-gray-700">{socialProofData.stat1_icon}</p>
                         )}
                       </div>
                     </div>
                   </div>

                   {/* Stat 2 */}
                   <div className="bg-gray-50 p-4 rounded-lg">
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">İstatistik 2</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Sayı
                         </label>
                         {editing[activeSection] ? (
                           <input
                             type="number"
                             value={socialProofData.stat2_number}
                             onChange={(e) =>
                               setSocialProofData(prev => prev ? { ...prev, stat2_number: parseInt(e.target.value) } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-700">{socialProofData.stat2_number}</p>
                         )}
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Sonek
                         </label>
                         {editing[activeSection] ? (
                           <input
                             type="text"
                             value={socialProofData.stat2_suffix}
                             onChange={(e) =>
                               setSocialProofData(prev => prev ? { ...prev, stat2_suffix: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-700">{socialProofData.stat2_suffix}</p>
                         )}
                       </div>
                       <div className="md:col-span-2">
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Etiket
                         </label>
                         {editing[activeSection] ? (
                           <input
                             type="text"
                             value={socialProofData.stat2_label}
                             onChange={(e) =>
                               setSocialProofData(prev => prev ? { ...prev, stat2_label: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-700">{socialProofData.stat2_label}</p>
                         )}
                       </div>
                       <div className="md:col-span-2">
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           İkon
                         </label>
                         {editing[activeSection] ? (
                           <select
                             value={socialProofData.stat2_icon}
                             onChange={(e) =>
                               setSocialProofData(prev => prev ? { ...prev, stat2_icon: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           >
                             <option value="ExperienceIcon">ExperienceIcon</option>
                             <option value="ProjectsIcon">ProjectsIcon</option>
                             <option value="StaffIcon">StaffIcon</option>
                             <option value="SatisfactionIcon">SatisfactionIcon</option>
                           </select>
                         ) : (
                           <p className="text-gray-700">{socialProofData.stat2_icon}</p>
                         )}
                       </div>
                     </div>
                   </div>

                   {/* Stat 3 */}
                   <div className="bg-gray-50 p-4 rounded-lg">
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">İstatistik 3</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Sayı
                         </label>
                         {editing[activeSection] ? (
                           <input
                             type="number"
                             value={socialProofData.stat3_number}
                             onChange={(e) =>
                               setSocialProofData(prev => prev ? { ...prev, stat3_number: parseInt(e.target.value) } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-700">{socialProofData.stat3_number}</p>
                         )}
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Sonek
                         </label>
                         {editing[activeSection] ? (
                           <input
                             type="text"
                             value={socialProofData.stat3_suffix}
                             onChange={(e) =>
                               setSocialProofData(prev => prev ? { ...prev, stat3_suffix: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-700">{socialProofData.stat3_suffix}</p>
                         )}
                       </div>
                       <div className="md:col-span-2">
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Etiket
                         </label>
                         {editing[activeSection] ? (
                           <input
                             type="text"
                             value={socialProofData.stat3_label}
                             onChange={(e) =>
                               setSocialProofData(prev => prev ? { ...prev, stat3_label: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-700">{socialProofData.stat3_label}</p>
                         )}
                       </div>
                       <div className="md:col-span-2">
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           İkon
                         </label>
                         {editing[activeSection] ? (
                           <select
                             value={socialProofData.stat3_icon}
                             onChange={(e) =>
                               setSocialProofData(prev => prev ? { ...prev, stat3_icon: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           >
                             <option value="ExperienceIcon">ExperienceIcon</option>
                             <option value="ProjectsIcon">ProjectsIcon</option>
                             <option value="StaffIcon">StaffIcon</option>
                             <option value="SatisfactionIcon">SatisfactionIcon</option>
                           </select>
                         ) : (
                           <p className="text-gray-700">{socialProofData.stat3_icon}</p>
                         )}
                       </div>
                     </div>
                   </div>

                   {/* Stat 4 */}
                   <div className="bg-gray-50 p-4 rounded-lg">
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">İstatistik 4</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Sayı
                         </label>
                         {editing[activeSection] ? (
                           <input
                             type="number"
                             value={socialProofData.stat4_number}
                             onChange={(e) =>
                               setSocialProofData(prev => prev ? { ...prev, stat4_number: parseInt(e.target.value) } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-700">{socialProofData.stat4_number}</p>
                         )}
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Sonek
                         </label>
                         {editing[activeSection] ? (
                           <input
                             type="text"
                             value={socialProofData.stat4_suffix}
                             onChange={(e) =>
                               setSocialProofData(prev => prev ? { ...prev, stat4_suffix: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-700">{socialProofData.stat4_suffix}</p>
                         )}
                       </div>
                       <div className="md:col-span-2">
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Etiket
                         </label>
                         {editing[activeSection] ? (
                           <input
                             type="text"
                             value={socialProofData.stat4_label}
                             onChange={(e) =>
                               setSocialProofData(prev => prev ? { ...prev, stat4_label: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-700">{socialProofData.stat4_label}</p>
                         )}
                       </div>
                       <div className="md:col-span-2">
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           İkon
                         </label>
                         {editing[activeSection] ? (
                           <select
                             value={socialProofData.stat4_icon}
                             onChange={(e) =>
                               setSocialProofData(prev => prev ? { ...prev, stat4_icon: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           >
                             <option value="ExperienceIcon">ExperienceIcon</option>
                             <option value="ProjectsIcon">ProjectsIcon</option>
                             <option value="StaffIcon">StaffIcon</option>
                             <option value="SatisfactionIcon">SatisfactionIcon</option>
                           </select>
                         ) : (
                           <p className="text-gray-700">{socialProofData.stat4_icon}</p>
                         )}
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             ) : activeSection === 'team' && teamData ? (
               <div className="space-y-6">
                 <div className="flex justify-between items-center">
                   <h2 className="text-xl font-semibold text-gray-900">Team Section</h2>
                   <div className="flex space-x-2">
                     {editing[activeSection] ? (
                       <button
                         onClick={() => handleSave(activeSection)}
                         disabled={saving}
                         className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                       >
                         <Save className="w-4 h-4" />
                         <span>{saving ? 'Kaydediliyor...' : 'Kaydet'}</span>
                       </button>
                     ) : (
                       <button
                         onClick={() => handleEdit(activeSection)}
                         className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                       >
                         <Edit className="w-4 h-4" />
                         <span>Düzenle</span>
                       </button>
                     )}
                   </div>
                 </div>

                 <div className="space-y-6">
                   {/* Header Content */}
                   <div className="bg-gray-50 p-4 rounded-lg">
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Başlık Bölümü</h3>
                     <div className="space-y-4">
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Badge Metni
                         </label>
                         {editing[activeSection] ? (
                           <input
                             type="text"
                             value={teamData.badge_text}
                             onChange={(e) =>
                               setTeamData(prev => prev ? { ...prev, badge_text: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-900 font-medium">{teamData.badge_text}</p>
                         )}
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Ana Başlık
                         </label>
                         {editing[activeSection] ? (
                           <input
                             type="text"
                             value={teamData.main_title}
                             onChange={(e) =>
                               setTeamData(prev => prev ? { ...prev, main_title: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-900 font-medium">{teamData.main_title}</p>
                         )}
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Alt Başlık
                         </label>
                         {editing[activeSection] ? (
                           <textarea
                             value={teamData.subtitle}
                             onChange={(e) =>
                               setTeamData(prev => prev ? { ...prev, subtitle: e.target.value } : null)
                             }
                             rows={3}
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-700 leading-relaxed">{teamData.subtitle}</p>
                         )}
                       </div>
                     </div>
                   </div>

                   {/* Stats */}
                   <div className="bg-gray-50 p-4 rounded-lg">
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">İstatistikler</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {/* Stat 1 */}
                       <div className="space-y-4">
                         <h4 className="font-medium text-gray-900">İstatistik 1</h4>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div>
                             <label className="block text-sm font-medium text-gray-700 mb-2">
                               Sayı
                             </label>
                             {editing[activeSection] ? (
                               <input
                                 type="number"
                                 value={teamData.stat1_number}
                                 onChange={(e) =>
                                   setTeamData(prev => prev ? { ...prev, stat1_number: parseInt(e.target.value) } : null)
                                 }
                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                               />
                             ) : (
                               <p className="text-gray-700">{teamData.stat1_number}</p>
                             )}
                           </div>
                           <div>
                             <label className="block text-sm font-medium text-gray-700 mb-2">
                               Etiket
                             </label>
                             {editing[activeSection] ? (
                               <input
                                 type="text"
                                 value={teamData.stat1_label}
                                 onChange={(e) =>
                                   setTeamData(prev => prev ? { ...prev, stat1_label: e.target.value } : null)
                                 }
                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                               />
                             ) : (
                               <p className="text-gray-700">{teamData.stat1_label}</p>
                             )}
                           </div>
                           <div className="md:col-span-2">
                             <label className="block text-sm font-medium text-gray-700 mb-2">
                               İkon
                             </label>
                             {editing[activeSection] ? (
                               <select
                                 value={teamData.stat1_icon}
                                 onChange={(e) =>
                                   setTeamData(prev => prev ? { ...prev, stat1_icon: e.target.value } : null)
                                 }
                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                               >
                                 <option value="Users">Users</option>
                                 <option value="Clock">Clock</option>
                                 <option value="Award">Award</option>
                                 <option value="Star">Star</option>
                               </select>
                             ) : (
                               <p className="text-gray-700">{teamData.stat1_icon}</p>
                             )}
                           </div>
                         </div>
                       </div>

                       {/* Stat 2 */}
                       <div className="space-y-4">
                         <h4 className="font-medium text-gray-900">İstatistik 2</h4>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div>
                             <label className="block text-sm font-medium text-gray-700 mb-2">
                               Sayı
                             </label>
                             {editing[activeSection] ? (
                               <input
                                 type="number"
                                 value={teamData.stat2_number}
                                 onChange={(e) =>
                                   setTeamData(prev => prev ? { ...prev, stat2_number: parseInt(e.target.value) } : null)
                                 }
                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                               />
                             ) : (
                               <p className="text-gray-700">{teamData.stat2_number}</p>
                             )}
                           </div>
                           <div>
                             <label className="block text-sm font-medium text-gray-700 mb-2">
                               Etiket
                             </label>
                             {editing[activeSection] ? (
                               <input
                                 type="text"
                                 value={teamData.stat2_label}
                                 onChange={(e) =>
                                   setTeamData(prev => prev ? { ...prev, stat2_label: e.target.value } : null)
                                 }
                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                               />
                             ) : (
                               <p className="text-gray-700">{teamData.stat2_label}</p>
                             )}
                           </div>
                           <div className="md:col-span-2">
                             <label className="block text-sm font-medium text-gray-700 mb-2">
                               İkon
                             </label>
                             {editing[activeSection] ? (
                               <select
                                 value={teamData.stat2_icon}
                                 onChange={(e) =>
                                   setTeamData(prev => prev ? { ...prev, stat2_icon: e.target.value } : null)
                                 }
                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                               >
                                 <option value="Users">Users</option>
                                 <option value="Clock">Clock</option>
                                 <option value="Award">Award</option>
                                 <option value="Star">Star</option>
                               </select>
                             ) : (
                               <p className="text-gray-700">{teamData.stat2_icon}</p>
                             )}
                           </div>
                         </div>
                       </div>

                       {/* Stat 3 */}
                       <div className="space-y-4">
                         <h4 className="font-medium text-gray-900">İstatistik 3</h4>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div>
                             <label className="block text-sm font-medium text-gray-700 mb-2">
                               Sayı
                             </label>
                             {editing[activeSection] ? (
                               <input
                                 type="number"
                                 value={teamData.stat3_number}
                                 onChange={(e) =>
                                   setTeamData(prev => prev ? { ...prev, stat3_number: parseInt(e.target.value) } : null)
                                 }
                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                               />
                             ) : (
                               <p className="text-gray-700">{teamData.stat3_number}</p>
                             )}
                           </div>
                           <div>
                             <label className="block text-sm font-medium text-gray-700 mb-2">
                               Etiket
                             </label>
                             {editing[activeSection] ? (
                               <input
                                 type="text"
                                 value={teamData.stat3_label}
                                 onChange={(e) =>
                                   setTeamData(prev => prev ? { ...prev, stat3_label: e.target.value } : null)
                                 }
                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                               />
                             ) : (
                               <p className="text-gray-700">{teamData.stat3_label}</p>
                             )}
                           </div>
                           <div className="md:col-span-2">
                             <label className="block text-sm font-medium text-gray-700 mb-2">
                               İkon
                             </label>
                             {editing[activeSection] ? (
                               <select
                                 value={teamData.stat3_icon}
                                 onChange={(e) =>
                                   setTeamData(prev => prev ? { ...prev, stat3_icon: e.target.value } : null)
                                 }
                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                               >
                                 <option value="Users">Users</option>
                                 <option value="Clock">Clock</option>
                                 <option value="Award">Award</option>
                                 <option value="Star">Star</option>
                               </select>
                             ) : (
                               <p className="text-gray-700">{teamData.stat3_icon}</p>
                             )}
                           </div>
                         </div>
                       </div>

                       {/* Stat 4 */}
                       <div className="space-y-4">
                         <h4 className="font-medium text-gray-900">İstatistik 4</h4>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div>
                             <label className="block text-sm font-medium text-gray-700 mb-2">
                               Sayı
                             </label>
                             {editing[activeSection] ? (
                               <input
                                 type="number"
                                 value={teamData.stat4_number}
                                 onChange={(e) =>
                                   setTeamData(prev => prev ? { ...prev, stat4_number: parseInt(e.target.value) } : null)
                                 }
                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                               />
                             ) : (
                               <p className="text-gray-700">{teamData.stat4_number}</p>
                             )}
                           </div>
                           <div>
                             <label className="block text-sm font-medium text-gray-700 mb-2">
                               Etiket
                             </label>
                             {editing[activeSection] ? (
                               <input
                                 type="text"
                                 value={teamData.stat4_label}
                                 onChange={(e) =>
                                   setTeamData(prev => prev ? { ...prev, stat4_label: e.target.value } : null)
                                 }
                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                               />
                             ) : (
                               <p className="text-gray-700">{teamData.stat4_label}</p>
                             )}
                           </div>
                           <div className="md:col-span-2">
                             <label className="block text-sm font-medium text-gray-700 mb-2">
                               İkon
                             </label>
                             {editing[activeSection] ? (
                               <select
                                 value={teamData.stat4_icon}
                                 onChange={(e) =>
                                   setTeamData(prev => prev ? { ...prev, stat4_icon: e.target.value } : null)
                                 }
                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                               >
                                 <option value="Users">Users</option>
                                 <option value="Clock">Clock</option>
                                 <option value="Award">Award</option>
                                 <option value="Star">Star</option>
                               </select>
                             ) : (
                               <p className="text-gray-700">{teamData.stat4_icon}</p>
                             )}
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>

                   {/* CTA Section */}
                   <div className="bg-gray-50 p-4 rounded-lg">
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">CTA Bölümü</h3>
                     <div className="space-y-4">
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           CTA Başlığı
                         </label>
                         {editing[activeSection] ? (
                           <input
                             type="text"
                             value={teamData.cta_title}
                             onChange={(e) =>
                               setTeamData(prev => prev ? { ...prev, cta_title: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-900 font-medium">{teamData.cta_title}</p>
                         )}
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           CTA Açıklaması
                         </label>
                         {editing[activeSection] ? (
                           <textarea
                             value={teamData.cta_description}
                             onChange={(e) =>
                               setTeamData(prev => prev ? { ...prev, cta_description: e.target.value } : null)
                             }
                             rows={3}
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-700 leading-relaxed">{teamData.cta_description}</p>
                         )}
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                           <label className="block text-sm font-medium text-gray-700 mb-2">
                             Birincil Buton Metni
                           </label>
                           {editing[activeSection] ? (
                             <input
                               type="text"
                               value={teamData.cta_primary_text}
                               onChange={(e) =>
                                 setTeamData(prev => prev ? { ...prev, cta_primary_text: e.target.value } : null)
                               }
                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                             />
                           ) : (
                             <p className="text-gray-700">{teamData.cta_primary_text}</p>
                           )}
                         </div>
                         <div>
                           <label className="block text-sm font-medium text-gray-700 mb-2">
                             İkincil Buton Metni
                           </label>
                           {editing[activeSection] ? (
                             <input
                               type="text"
                               value={teamData.cta_secondary_text}
                               onChange={(e) =>
                                 setTeamData(prev => prev ? { ...prev, cta_secondary_text: e.target.value } : null)
                               }
                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                             />
                           ) : (
                             <p className="text-gray-700">{teamData.cta_secondary_text}</p>
                           )}
                         </div>
                       </div>
                     </div>
                   </div>

                   {/* Team Members */}
                   <div className="bg-gray-50 p-4 rounded-lg">
                     <div className="flex justify-between items-center mb-4">
                       <h3 className="text-lg font-semibold text-gray-900">Ekip Üyeleri</h3>
                       {editing[activeSection] && (
                         <button
                           onClick={handleAddTeamMember}
                           className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors"
                         >
                           <Plus className="w-4 h-4" />
                           <span>Yeni Kişi Ekle</span>
                         </button>
                       )}
                     </div>
                     <div className="space-y-4">
                       {teamMembers.map((member, index) => (
                         <div key={member.id} className={`border rounded-lg p-4 ${
                           member.name === '' ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
                         }`}>
                           <div className="flex justify-between items-center mb-3">
                             <h4 className="font-medium text-gray-900">
                               {member.name === '' ? `Yeni Üye (Henüz doldurulmadı)` : `Üye ${index + 1}: ${member.name}`}
                             </h4>
                             {editing[activeSection] && (
                               <button
                                 onClick={() => handleDeleteTeamMember(member.id)}
                                 className="text-red-600 hover:text-red-800 transition-colors p-1"
                                 title="Bu üyeyi sil"
                               >
                                 <Trash2 className="w-4 h-4" />
                               </button>
                             )}
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                               <label className="block text-sm font-medium text-gray-700 mb-2">
                                 İsim
                               </label>
                               {editing[activeSection] ? (
                                 <input
                                   type="text"
                                   value={member.name}
                                   onChange={(e) => {
                                     const updatedMembers = [...teamMembers];
                                     updatedMembers[index] = { ...member, name: e.target.value };
                                     setTeamMembers(updatedMembers);
                                   }}
                                   placeholder="Üye adı"
                                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                 />
                               ) : (
                                 <p className="text-gray-700">{member.name}</p>
                               )}
                             </div>
                             <div>
                               <label className="block text-sm font-medium text-gray-700 mb-2">
                                 Pozisyon
                               </label>
                               {editing[activeSection] ? (
                                 <input
                                   type="text"
                                   value={member.role}
                                   onChange={(e) => {
                                     const updatedMembers = [...teamMembers];
                                     updatedMembers[index] = { ...member, role: e.target.value };
                                     setTeamMembers(updatedMembers);
                                   }}
                                   placeholder="Pozisyon"
                                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                 />
                               ) : (
                                 <p className="text-gray-700">{member.role}</p>
                               )}
                             </div>
                             <div>
                               <label className="block text-sm font-medium text-gray-700 mb-2">
                                 Deneyim
                               </label>
                               {editing[activeSection] ? (
                                 <input
                                   type="text"
                                   value={member.experience}
                                   onChange={(e) => {
                                     const updatedMembers = [...teamMembers];
                                     updatedMembers[index] = { ...member, experience: e.target.value };
                                     setTeamMembers(updatedMembers);
                                   }}
                                   placeholder="Deneyim (örn: 5 yıl)"
                                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                 />
                               ) : (
                                 <p className="text-gray-700">{member.experience}</p>
                               )}
                             </div>
                             <div>
                               <label className="block text-sm font-medium text-gray-700 mb-2">
                                 Uzmanlık
                               </label>
                               {editing[activeSection] ? (
                                 <input
                                   type="text"
                                   value={member.specialization}
                                   onChange={(e) => {
                                     const updatedMembers = [...teamMembers];
                                     updatedMembers[index] = { ...member, specialization: e.target.value };
                                     setTeamMembers(updatedMembers);
                                   }}
                                   placeholder="Uzmanlık alanı"
                                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                 />
                               ) : (
                                 <p className="text-gray-700">{member.specialization}</p>
                               )}
                             </div>
                             <div>
                               <label className="block text-sm font-medium text-gray-700 mb-2">
                                 E-posta
                               </label>
                               {editing[activeSection] ? (
                                 <input
                                   type="email"
                                   value={member.email}
                                   onChange={(e) => {
                                     const updatedMembers = [...teamMembers];
                                     updatedMembers[index] = { ...member, email: e.target.value };
                                     setTeamMembers(updatedMembers);
                                   }}
                                   placeholder="ornek@email.com"
                                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                 />
                               ) : (
                                 <p className="text-gray-700">{member.email}</p>
                               )}
                             </div>
                             <div>
                               <label className="block text-sm font-medium text-gray-700 mb-2">
                                 Telefon
                               </label>
                               {editing[activeSection] ? (
                                 <input
                                   type="text"
                                   value={member.phone}
                                   onChange={(e) => {
                                     const updatedMembers = [...teamMembers];
                                     updatedMembers[index] = { ...member, phone: e.target.value };
                                     setTeamMembers(updatedMembers);
                                   }}
                                   placeholder="+90 (555) 123 45 67"
                                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                 />
                               ) : (
                                 <p className="text-gray-700">{member.phone}</p>
                               )}
                             </div>
                             <div>
                               <label className="block text-sm font-medium text-gray-700 mb-2">
                                 Konum
                               </label>
                               {editing[activeSection] ? (
                                 <input
                                   type="text"
                                   value={member.location}
                                   onChange={(e) => {
                                     const updatedMembers = [...teamMembers];
                                     updatedMembers[index] = { ...member, location: e.target.value };
                                     setTeamMembers(updatedMembers);
                                   }}
                                   placeholder="İstanbul, Türkiye"
                                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                 />
                               ) : (
                                 <p className="text-gray-700">{member.location}</p>
                               )}
                             </div>
                             <div>
                               <label className="block text-sm font-medium text-gray-700 mb-2">
                                 LinkedIn
                               </label>
                               {editing[activeSection] ? (
                                 <input
                                   type="url"
                                   value={member.linkedin}
                                   onChange={(e) => {
                                     const updatedMembers = [...teamMembers];
                                     updatedMembers[index] = { ...member, linkedin: e.target.value };
                                     setTeamMembers(updatedMembers);
                                   }}
                                   placeholder="https://linkedin.com/in/kullanici-adi"
                                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                 />
                               ) : (
                                 <p className="text-gray-700">{member.linkedin}</p>
                               )}
                             </div>
                             <div className="md:col-span-2">
                               <label className="block text-sm font-medium text-gray-700 mb-2">
                                 Resim URL'si
                               </label>
                               {editing[activeSection] ? (
                                 <input
                                   type="url"
                                   value={member.image}
                                   onChange={(e) => {
                                     const updatedMembers = [...teamMembers];
                                     updatedMembers[index] = { ...member, image: e.target.value };
                                     setTeamMembers(updatedMembers);
                                   }}
                                   placeholder="https://example.com/profil-resmi.jpg"
                                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                 />
                               ) : (
                                 <p className="text-gray-700 text-sm break-all">{member.image}</p>
                               )}
                             </div>
                             <div className="md:col-span-2">
                               <label className="block text-sm font-medium text-gray-700 mb-2">
                                 Açıklama
                               </label>
                               {editing[activeSection] ? (
                                 <textarea
                                   value={member.description}
                                   onChange={(e) => {
                                     const updatedMembers = [...teamMembers];
                                     updatedMembers[index] = { ...member, description: e.target.value };
                                     setTeamMembers(updatedMembers);
                                   }}
                                   placeholder="Üye hakkında kısa açıklama..."
                                   rows={3}
                                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                 />
                               ) : (
                                 <p className="text-gray-700 leading-relaxed">{member.description}</p>
                               )}
                             </div>
                           </div>
                         </div>
                       ))}
                     </div>
                     {/* Scroll target for new team members */}
                     <div ref={teamMembersEndRef} />
                   </div>
                 </div>
               </div>
             ) : activeSection === 'process' && processData ? (
               <div className="space-y-6">
                 <div className="flex justify-between items-center">
                   <h2 className="text-xl font-semibold text-gray-900">Process Section</h2>
                   <div className="flex space-x-2">
                     {editing[activeSection] ? (
                       <button
                         onClick={() => handleSave(activeSection)}
                         disabled={saving}
                         className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                       >
                         <Save className="w-4 h-4" />
                         <span>{saving ? 'Kaydediliyor...' : 'Kaydet'}</span>
                       </button>
                     ) : (
                       <button
                         onClick={() => handleEdit(activeSection)}
                         className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                       >
                         <Edit className="w-4 h-4" />
                         <span>Düzenle</span>
                       </button>
                     )}
                   </div>
                 </div>

                 <div className="space-y-6">
                   {/* Header Content */}
                   <div className="bg-gray-50 p-4 rounded-lg">
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Başlık Bölümü</h3>
                     <div className="space-y-4">
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Badge Metni
                         </label>
                         {editing[activeSection] ? (
                           <input
                             type="text"
                             value={processData.badge_text}
                             onChange={(e) =>
                               setProcessData(prev => prev ? { ...prev, badge_text: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-900 font-medium">{processData.badge_text}</p>
                         )}
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Ana Başlık
                         </label>
                         {editing[activeSection] ? (
                           <input
                             type="text"
                             value={processData.main_title}
                             onChange={(e) =>
                               setProcessData(prev => prev ? { ...prev, main_title: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-900 font-medium">{processData.main_title}</p>
                         )}
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Alt Başlık
                         </label>
                         {editing[activeSection] ? (
                           <textarea
                             value={processData.subtitle}
                             onChange={(e) =>
                               setProcessData(prev => prev ? { ...prev, subtitle: e.target.value } : null)
                             }
                             rows={3}
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-700 leading-relaxed">{processData.subtitle}</p>
                         )}
                       </div>
                     </div>
                   </div>

                   {/* Process Steps */}
                   <div className="bg-gray-50 p-4 rounded-lg">
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Süreç Adımları</h3>
                     <div className="space-y-6">
                       {processSteps.map((step, index) => (
                         <div key={step.id} className="border border-gray-200 rounded-lg p-4">
                           <h4 className="font-medium text-gray-900 mb-3">Adım {index + 1}: {step.title}</h4>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                               <label className="block text-sm font-medium text-gray-700 mb-2">
                                 Adım Numarası
                               </label>
                               {editing[activeSection] ? (
                                 <input
                                   type="text"
                                   value={step.step}
                                   onChange={(e) => {
                                     const updatedSteps = [...processSteps];
                                     updatedSteps[index] = { ...step, step: e.target.value };
                                     setProcessSteps(updatedSteps);
                                   }}
                                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                 />
                               ) : (
                                 <p className="text-gray-700">{step.step}</p>
                               )}
                             </div>
                             <div>
                               <label className="block text-sm font-medium text-gray-700 mb-2">
                                 Başlık
                               </label>
                               {editing[activeSection] ? (
                                 <input
                                   type="text"
                                   value={step.title}
                                   onChange={(e) => {
                                     const updatedSteps = [...processSteps];
                                     updatedSteps[index] = { ...step, title: e.target.value };
                                     setProcessSteps(updatedSteps);
                                   }}
                                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                 />
                               ) : (
                                 <p className="text-gray-700">{step.title}</p>
                               )}
                             </div>
                             <div>
                               <label className="block text-sm font-medium text-gray-700 mb-2">
                                 İkon
                               </label>
                               {editing[activeSection] ? (
                                 <select
                                   value={step.icon}
                                   onChange={(e) => {
                                     const updatedSteps = [...processSteps];
                                     updatedSteps[index] = { ...step, icon: e.target.value };
                                     setProcessSteps(updatedSteps);
                                   }}
                                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                 >
                                   <option value="Search">Search</option>
                                   <option value="FileText">FileText</option>
                                   <option value="ClipboardCheck">ClipboardCheck</option>
                                   <option value="Repeat">Repeat</option>
                                 </select>
                               ) : (
                                 <p className="text-gray-700">{step.icon}</p>
                               )}
                             </div>
                             <div>
                               <label className="block text-sm font-medium text-gray-700 mb-2">
                                 Resim URL'si
                               </label>
                               {editing[activeSection] ? (
                                 <input
                                   type="url"
                                   value={step.image_url}
                                   onChange={(e) => {
                                     const updatedSteps = [...processSteps];
                                     updatedSteps[index] = { ...step, image_url: e.target.value };
                                     setProcessSteps(updatedSteps);
                                   }}
                                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                 />
                               ) : (
                                 <p className="text-gray-700 text-sm break-all">{step.image_url}</p>
                               )}
                             </div>
                             <div className="md:col-span-2">
                               <label className="block text-sm font-medium text-gray-700 mb-2">
                                 Açıklama
                               </label>
                               {editing[activeSection] ? (
                                 <textarea
                                   value={step.description}
                                   onChange={(e) => {
                                     const updatedSteps = [...processSteps];
                                     updatedSteps[index] = { ...step, description: e.target.value };
                                     setProcessSteps(updatedSteps);
                                   }}
                                   rows={3}
                                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                 />
                               ) : (
                                 <p className="text-gray-700 leading-relaxed">{step.description}</p>
                               )}
                             </div>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 </div>
               </div>
             ) : activeSection === 'faq' && faqData ? (
               <div className="space-y-6">
                 <div className="flex justify-between items-center">
                   <h2 className="text-xl font-semibold text-gray-900">FAQ Section</h2>
                   <div className="flex space-x-2">
                     {editing[activeSection] ? (
                       <button
                         onClick={() => handleSave(activeSection)}
                         disabled={saving}
                         className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                       >
                         <Save className="w-4 h-4" />
                         <span>{saving ? 'Kaydediliyor...' : 'Kaydet'}</span>
                       </button>
                     ) : (
                       <button
                         onClick={() => handleEdit(activeSection)}
                         className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                       >
                         <Edit className="w-4 h-4" />
                         <span>Düzenle</span>
                       </button>
                     )}
                   </div>
                 </div>

                 <div className="space-y-6">
                   {/* Header Content */}
                   <div className="bg-gray-50 p-4 rounded-lg">
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Başlık Bölümü</h3>
                     <div className="space-y-4">
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Badge Metni
                         </label>
                         {editing[activeSection] ? (
                           <input
                             type="text"
                             value={faqData.badge_text}
                             onChange={(e) =>
                               setFaqData(prev => prev ? { ...prev, badge_text: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-900 font-medium">{faqData.badge_text}</p>
                         )}
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Ana Başlık
                         </label>
                         {editing[activeSection] ? (
                           <input
                             type="text"
                             value={faqData.main_title}
                             onChange={(e) =>
                               setFaqData(prev => prev ? { ...prev, main_title: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-900 font-medium">{faqData.main_title}</p>
                         )}
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Alt Başlık
                         </label>
                         {editing[activeSection] ? (
                           <textarea
                             value={faqData.subtitle}
                             onChange={(e) =>
                               setFaqData(prev => prev ? { ...prev, subtitle: e.target.value } : null)
                             }
                             rows={3}
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-700 leading-relaxed">{faqData.subtitle}</p>
                         )}
                       </div>
                     </div>
                   </div>

                   {/* FAQ Items */}
                   <div className="bg-gray-50 p-4 rounded-lg">
                     <div className="flex justify-between items-center mb-4">
                       <h3 className="text-lg font-semibold text-gray-900">Sık Sorulan Sorular</h3>
                       {editing[activeSection] && (
                         <button
                           onClick={() => handleAddFaqItem()}
                           className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors"
                         >
                           <span className="text-sm">+ Yeni Soru Ekle</span>
                         </button>
                       )}
                     </div>
                     <div className="space-y-6">
                                                {faqItems.map((item, index) => (
                           <div key={item.id} className={`border rounded-lg p-4 ${
                             !item.question.trim() && !item.answer.trim() 
                               ? 'border-blue-300 bg-blue-50' 
                               : 'border-gray-200'
                           }`}>
                             <div className="flex justify-between items-start mb-3">
                               <h4 className="font-medium text-gray-900">
                                 Soru {index + 1}: {item.question.trim() ? item.question.substring(0, 50) + '...' : 'Yeni Soru (Henüz doldurulmadı)'}
                               </h4>
                               {editing[activeSection] && (
                                 <button
                                   onClick={() => handleDeleteFaqItem(item.id)}
                                   className="text-red-600 hover:text-red-800 transition-colors p-1"
                                   title="Bu soruyu sil"
                                 >
                                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                   </svg>
                                 </button>
                               )}
                             </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                               <label className="block text-sm font-medium text-gray-700 mb-2">
                                 Sıra Numarası
                               </label>
                               {editing[activeSection] ? (
                                 <input
                                   type="number"
                                   value={item.order_number}
                                   onChange={(e) => {
                                     const updatedItems = [...faqItems];
                                     updatedItems[index] = { ...item, order_number: parseInt(e.target.value) };
                                     setFaqItems(updatedItems);
                                   }}
                                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                 />
                               ) : (
                                 <p className="text-gray-700">{item.order_number}</p>
                               )}
                             </div>
                             <div>
                               <label className="block text-sm font-medium text-gray-700 mb-2">
                                 İkon
                               </label>
                               {editing[activeSection] ? (
                                 <select
                                   value={item.icon}
                                   onChange={(e) => {
                                     const updatedItems = [...faqItems];
                                     updatedItems[index] = { ...item, icon: e.target.value };
                                     setFaqItems(updatedItems);
                                   }}
                                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                 >
                                   <option value="HelpCircle">HelpCircle</option>
                                   <option value="FileText">FileText</option>
                                   <option value="BookOpen">BookOpen</option>
                                   <option value="AlertTriangle">AlertTriangle</option>
                                 </select>
                               ) : (
                                 <p className="text-gray-700">{item.icon}</p>
                               )}
                             </div>
                             <div className="md:col-span-2">
                               <label className="block text-sm font-medium text-gray-700 mb-2">
                                 Soru
                               </label>
                               {editing[activeSection] ? (
                                 <textarea
                                   value={item.question}
                                   onChange={(e) => {
                                     const updatedItems = [...faqItems];
                                     updatedItems[index] = { ...item, question: e.target.value };
                                     setFaqItems(updatedItems);
                                   }}
                                   placeholder="Sorunuzu buraya yazın..."
                                   rows={2}
                                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                 />
                               ) : (
                                 <p className="text-gray-700 leading-relaxed">{item.question}</p>
                               )}
                             </div>
                             <div className="md:col-span-2">
                               <label className="block text-sm font-medium text-gray-700 mb-2">
                                 Cevap
                               </label>
                               {editing[activeSection] ? (
                                 <textarea
                                   value={item.answer}
                                   onChange={(e) => {
                                     const updatedItems = [...faqItems];
                                     updatedItems[index] = { ...item, answer: e.target.value };
                                     setFaqItems(updatedItems);
                                   }}
                                   placeholder="Cevabınızı buraya yazın..."
                                   rows={4}
                                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                 />
                               ) : (
                                 <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                               )}
                             </div>
                           </div>
                         </div>
                       ))}
                     </div>
                     {/* Scroll target for new FAQ items */}
                     <div ref={faqItemsEndRef} />
                   </div>
                 </div>
               </div>
             ) : activeSection === 'contact' && contactData ? (
               <div className="space-y-6">
                 <div className="flex justify-between items-center">
                   <h2 className="text-xl font-semibold text-gray-900">Contact Section</h2>
                   <div className="flex space-x-2">
                     {editing[activeSection] ? (
                       <button
                         onClick={() => handleSave(activeSection)}
                         disabled={saving}
                         className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                       >
                         <Save className="w-4 h-4" />
                         <span>{saving ? 'Kaydediliyor...' : 'Kaydet'}</span>
                       </button>
                     ) : (
                       <button
                         onClick={() => handleEdit(activeSection)}
                         className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                       >
                         <Edit className="w-4 h-4" />
                         <span>Düzenle</span>
                       </button>
                     )}
                   </div>
                 </div>

                 <div className="space-y-6">
                   {/* Header Content */}
                   <div className="bg-gray-50 p-4 rounded-lg">
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Başlık Bölümü</h3>
                     <div className="space-y-4">
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Badge Metni
                         </label>
                         {editing[activeSection] ? (
                           <input
                             type="text"
                             value={contactData.badge_text}
                             onChange={(e) =>
                               setContactData(prev => prev ? { ...prev, badge_text: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-900 font-medium">{contactData.badge_text}</p>
                         )}
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Ana Başlık
                         </label>
                         {editing[activeSection] ? (
                           <input
                             type="text"
                             value={contactData.main_title}
                             onChange={(e) =>
                               setContactData(prev => prev ? { ...prev, main_title: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-900 font-medium">{contactData.main_title}</p>
                         )}
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Alt Başlık
                         </label>
                         {editing[activeSection] ? (
                           <textarea
                             value={contactData.subtitle}
                             onChange={(e) =>
                               setContactData(prev => prev ? { ...prev, subtitle: e.target.value } : null)
                             }
                             rows={3}
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-700 leading-relaxed">{contactData.subtitle}</p>
                         )}
                       </div>
                     </div>
                   </div>

                   {/* Contact Information */}
                   <div className="bg-gray-50 p-4 rounded-lg">
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">İletişim Bilgileri</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           E-posta Adresi
                         </label>
                         {editing[activeSection] ? (
                           <input
                             type="email"
                             value={contactData.email}
                             onChange={(e) =>
                               setContactData(prev => prev ? { ...prev, email: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-700">{contactData.email}</p>
                         )}
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Telefon Numarası
                         </label>
                         {editing[activeSection] ? (
                           <input
                             type="tel"
                             value={contactData.phone}
                             onChange={(e) =>
                               setContactData(prev => prev ? { ...prev, phone: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-700">{contactData.phone}</p>
                         )}
                       </div>
                       <div className="md:col-span-2">
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Adres
                         </label>
                         {editing[activeSection] ? (
                           <textarea
                             value={contactData.address}
                             onChange={(e) =>
                               setContactData(prev => prev ? { ...prev, address: e.target.value } : null)
                             }
                             rows={3}
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-700 leading-relaxed">{contactData.address}</p>
                         )}
                       </div>
                     </div>
                   </div>

                   {/* Form Content */}
                   <div className="bg-gray-50 p-4 rounded-lg">
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Form Bölümü</h3>
                     <div className="space-y-4">
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Form Başlığı
                         </label>
                         {editing[activeSection] ? (
                           <input
                             type="text"
                             value={contactData.form_title}
                             onChange={(e) =>
                               setContactData(prev => prev ? { ...prev, form_title: e.target.value } : null)
                             }
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-900 font-medium">{contactData.form_title}</p>
                         )}
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Form Alt Başlığı
                         </label>
                         {editing[activeSection] ? (
                           <textarea
                             value={contactData.form_subtitle}
                             onChange={(e) =>
                               setContactData(prev => prev ? { ...prev, form_subtitle: e.target.value } : null)
                             }
                             rows={2}
                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           />
                         ) : (
                           <p className="text-gray-700 leading-relaxed">{contactData.form_subtitle}</p>
                         )}
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             ) : activeSection && sections[activeSection] ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {sections[activeSection].title}
                  </h2>
                  <div className="flex space-x-2">
                    {editing[activeSection] ? (
                      <button
                        onClick={() => handleSave(activeSection)}
                        className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        <span>Kaydet</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(activeSection)}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Düzenle</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Başlık
                    </label>
                    {editing[activeSection] ? (
                      <input
                        type="text"
                        value={sections[activeSection].title}
                        onChange={(e) =>
                          setSections(prev => ({
                            ...prev,
                            [activeSection]: { ...prev[activeSection], title: e.target.value }
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{sections[activeSection].title}</p>
                    )}
                  </div>

                  {/* Description */}
                  {sections[activeSection].description && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Açıklama
                      </label>
                      {editing[activeSection] ? (
                        <input
                          type="text"
                          value={sections[activeSection].description || ''}
                          onChange={(e) =>
                            setSections(prev => ({
                              ...prev,
                              [activeSection]: { ...prev[activeSection], description: e.target.value }
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-600">{sections[activeSection].description}</p>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      İçerik
                    </label>
                    {editing[activeSection] ? (
                      <textarea
                        value={sections[activeSection].content}
                        onChange={(e) =>
                          setSections(prev => ({
                            ...prev,
                            [activeSection]: { ...prev[activeSection], content: e.target.value }
                          }))
                        }
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-700 leading-relaxed">{sections[activeSection].content}</p>
                    )}
                  </div>
                </div>
              </div>
            ) : activeSection === 'navbar' && navbarData ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Navigasyon</h2>
                  <div className="flex space-x-2">
                    {editing[activeSection] ? (
                      <button
                        onClick={() => handleSave(activeSection)}
                        disabled={saving}
                        className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        <span>{saving ? 'Kaydediliyor...' : 'Kaydet'}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(activeSection)}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Düzenle</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Logo Text */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Logo Metni</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Logo Metni
                      </label>
                      {editing[activeSection] ? (
                        <input
                          type="text"
                          value={navbarData.logo_text}
                          onChange={(e) =>
                            setNavbarData(prev => prev ? { ...prev, logo_text: e.target.value } : null)
                          }
                          placeholder="İSG PRO"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-700">{navbarData.logo_text}</p>
                      )}
                    </div>
                  </div>

                  {/* CTA Button Text */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">CTA Buton Metni</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CTA Buton Metni
                      </label>
                      {editing[activeSection] ? (
                        <input
                          type="text"
                          value={navbarData.cta_button_text}
                          onChange={(e) =>
                            setNavbarData(prev => prev ? { ...prev, cta_button_text: e.target.value } : null)
                          }
                          placeholder="Teklif Al"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-700">{navbarData.cta_button_text}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : activeSection === 'footer' && footerData ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Alt Bilgi</h2>
                  <div className="flex space-x-2">
                    {editing[activeSection] ? (
                      <button
                        onClick={() => handleSave(activeSection)}
                        disabled={saving}
                        className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        <span>{saving ? 'Kaydediliyor...' : 'Kaydet'}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(activeSection)}
                        className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Düzenle</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Company Information */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Şirket Bilgileri</h3>
                    <div className="space-y-4">
                      {/* Company Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Şirket Adı
                        </label>
                        {editing[activeSection] ? (
                          <input
                            type="text"
                            value={footerData.company_name}
                            onChange={(e) =>
                              setFooterData(prev => prev ? { ...prev, company_name: e.target.value } : null)
                            }
                            placeholder="İSG PRO"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-700">{footerData.company_name}</p>
                        )}
                      </div>

                      {/* Company Tagline */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Şirket Sloganı
                        </label>
                        {editing[activeSection] ? (
                          <input
                            type="text"
                            value={footerData.company_tagline}
                            onChange={(e) =>
                              setFooterData(prev => prev ? { ...prev, company_tagline: e.target.value } : null)
                            }
                            placeholder="Güvenli Gelecek"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-700">{footerData.company_tagline}</p>
                        )}
                      </div>

                      {/* Company Description */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Şirket Açıklaması
                        </label>
                        {editing[activeSection] ? (
                          <textarea
                            value={footerData.company_description}
                            onChange={(e) =>
                              setFooterData(prev => prev ? { ...prev, company_description: e.target.value } : null)
                            }
                            placeholder="Şirket açıklaması..."
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-700">{footerData.company_description}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">İletişim Bilgileri</h3>
                    <div className="space-y-4">
                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Telefon
                        </label>
                        {editing[activeSection] ? (
                          <input
                            type="text"
                            value={footerData.phone}
                            onChange={(e) =>
                              setFooterData(prev => prev ? { ...prev, phone: e.target.value } : null)
                            }
                            placeholder="+90 (555) 123 45 67"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-700">{footerData.phone}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          E-posta
                        </label>
                        {editing[activeSection] ? (
                          <input
                            type="email"
                            value={footerData.email}
                            onChange={(e) =>
                              setFooterData(prev => prev ? { ...prev, email: e.target.value } : null)
                            }
                            placeholder="info@isgsirketi.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-700">{footerData.email}</p>
                        )}
                      </div>

                      {/* Address */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Adres
                        </label>
                        {editing[activeSection] ? (
                          <textarea
                            value={footerData.address}
                            onChange={(e) =>
                              setFooterData(prev => prev ? { ...prev, address: e.target.value } : null)
                            }
                            placeholder="Örnek Mah. Atatürk Cad. No:123, İstanbul"
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-700">{footerData.address}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Social Media Links */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Sosyal Medya Linkleri</h3>
                    <div className="space-y-4">
                      {/* LinkedIn */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          LinkedIn URL
                        </label>
                        {editing[activeSection] ? (
                          <input
                            type="url"
                            value={footerData.linkedin_url}
                            onChange={(e) =>
                              setFooterData(prev => prev ? { ...prev, linkedin_url: e.target.value } : null)
                            }
                            placeholder="https://linkedin.com/company/isg-pro"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-700">{footerData.linkedin_url}</p>
                        )}
                      </div>

                      {/* Twitter */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Twitter URL
                        </label>
                        {editing[activeSection] ? (
                          <input
                            type="url"
                            value={footerData.twitter_url}
                            onChange={(e) =>
                              setFooterData(prev => prev ? { ...prev, twitter_url: e.target.value } : null)
                            }
                            placeholder="https://twitter.com/isg_pro"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-700">{footerData.twitter_url}</p>
                        )}
                      </div>

                      {/* Instagram */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Instagram URL
                        </label>
                        {editing[activeSection] ? (
                          <input
                            type="url"
                            value={footerData.instagram_url}
                            onChange={(e) =>
                              setFooterData(prev => prev ? { ...prev, instagram_url: e.target.value } : null)
                            }
                            placeholder="https://instagram.com/isg_pro"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-700">{footerData.instagram_url}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Newsletter */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Bülten</h3>
                    <div className="space-y-4">
                      {/* Newsletter Title */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bülten Başlığı
                        </label>
                        {editing[activeSection] ? (
                          <input
                            type="text"
                            value={footerData.newsletter_title}
                            onChange={(e) =>
                              setFooterData(prev => prev ? { ...prev, newsletter_title: e.target.value } : null)
                            }
                            placeholder="Bülten"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-700">{footerData.newsletter_title}</p>
                        )}
                      </div>

                      {/* Newsletter Description */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bülten Açıklaması
                        </label>
                        {editing[activeSection] ? (
                          <textarea
                            value={footerData.newsletter_description}
                            onChange={(e) =>
                              setFooterData(prev => prev ? { ...prev, newsletter_description: e.target.value } : null)
                            }
                            placeholder="İSG güncellemeleri ve yeni hizmetlerimizden haberdar olun."
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-700">{footerData.newsletter_description}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Copyright */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Telif Hakkı</h3>
                    <div className="space-y-4">
                      {/* Copyright Text */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Telif Hakkı Metni
                        </label>
                        {editing[activeSection] ? (
                          <input
                            type="text"
                            value={footerData.copyright_text}
                            onChange={(e) =>
                              setFooterData(prev => prev ? { ...prev, copyright_text: e.target.value } : null)
                            }
                            placeholder="© 2024 İSG PRO. Tüm Hakları Saklıdır."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-700">{footerData.copyright_text}</p>
                        )}
                      </div>

                      {/* Design Credit */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tasarım Kredisi
                        </label>
                        {editing[activeSection] ? (
                          <input
                            type="text"
                            value={footerData.design_credit}
                            onChange={(e) =>
                              setFooterData(prev => prev ? { ...prev, design_credit: e.target.value } : null)
                            }
                            placeholder="Tasarım & Geliştirme: Modern Web Solutions"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="text-gray-700">{footerData.design_credit}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
} 