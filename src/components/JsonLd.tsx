export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Kılıçoğlu OSGB",
    "alternateName": "Kılıçoğlu İş Sağlığı ve Güvenliği Hatay",
    "url": "https://kilicogluosgb.com",
    "logo": "https://kilicogluosgb.com/logo.png",
    "description": "Hatay'ın lider OSGB'si Kılıçoğlu OSGB. İş sağlığı ve güvenliği, risk değerlendirmesi, İSG eğitimleri, sağlık taramaları. Hatay OSGB hizmetleri, Hatay iş güvenliği danışmanlığı.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hatay",
      "addressRegion": "Hatay",
      "addressCountry": "TR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+90-XXX-XXX-XXXX",
      "contactType": "customer service",
      "areaServed": "TR",
      "availableLanguage": "Turkish"
    },
    "sameAs": [
      "https://www.linkedin.com/company/kilicogluosgb",
      "https://twitter.com/kilicogluosgb",
      "https://www.instagram.com/kilicogluosgb"
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 36.2023,
        "longitude": 36.1613
      },
      "geoRadius": "50000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "İSG Hizmetleri",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Risk Değerlendirmesi",
            "description": "İş yerlerinde risk değerlendirmesi ve analizi hizmetleri"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "İSG Eğitimleri",
            "description": "İş sağlığı ve güvenliği eğitimleri"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Sağlık Taramaları",
            "description": "Çalışan sağlık taramaları ve periyodik muayeneler"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Acil Durum Planlaması",
            "description": "Acil durum planları ve tatbikatları"
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
} 