import { Injectable, signal, computed } from '@angular/core';

export interface Product {
  id: string;
  iconSvg: 'chart' | 'car' | 'platform' | 'shield' | 'cloud' | 'code' | 'database' | 'network' | 'mobile' | 'analytics';
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  images: string[];
  category: string;
  testimonials?: Array<{
    text: string;
    author: string;
    company: string;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Signal for the list of products
  private productsSignal = signal<Product[]>([
    // ERP Solutions
    {
      id: 'divalto',
      iconSvg: 'chart',
      title: 'Divalto ERP',
      description: 'Solution ERP complète pour PME et ETI avec gestion intégrée de tous vos processus métier.',
      longDescription: 'Divalto est la solution ERP de référence pour les entreprises en croissance. Cette suite logicielle complète intègre la gestion commerciale, la comptabilité, le stock, la production et les finances. Grâce à notre expertise de plus de 20 ans, nous vous accompagnons dans le cadrage, le paramétrage, la migration et la formation. L\'interface intuitive et la modularité de Divalto en font un choix privilégié pour les PME qui veulent gagner en efficacité sans complexité excessive.',
      features: ['Gestion commerciale avancée', 'Comptabilité intégrée', 'Stock & logistique temps réel', 'Reporting & BI', 'Gestion de production', 'CRM intégré', 'E-commerce connecté', 'Interface multi-entreprises'],
      images: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80'
      ],
      category: 'ERP',
      testimonials: [
       
      ]
    },
    {
      id: 'wavesoft',
      iconSvg: 'platform',
      title: 'WaveSoft',
      description: 'Suite logicielle modulaire unifiant tous vos processus métier sur une seule plateforme.',
      longDescription: 'WaveSoft révolutionne la gestion d\'entreprise en centralisant tous vos processus sur une seule base de données. Fini les ressaisies, les erreurs et les silos d\'information ! Du devis à la facture, en passant par la gestion des stocks, la CRM et la comptabilité, tout est interconnecté. Notre approche modulaire vous permet de commencer petit et de grandir avec la solution.',
      features: ['Base de données unifiée', 'CRM intégré', 'Gestion de production', 'E-commerce intégré', 'Business Intelligence', 'API ouvertes', 'Multi-sites', 'Workflows personnalisables'],
      images: [
        'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
      ],
      category: 'ERP'
    },

    // GMAO Solutions
    {
      id: 'firstparc',
      iconSvg: 'car',
      title: 'FirstParc GMAO',
      description: 'Gestion de Maintenance Assistée par Ordinateur pour optimiser votre parc automobile.',
      longDescription: 'FirstParc est la solution GMAO (Gestion de Maintenance Assistée par Ordinateur) de référence pour la gestion complète de votre parc véhicule. De l\'ordonnancement des tâches au suivi des interventions, en passant par la maintenance préventive et la gestion des coûts, FirstParc optimise la disponibilité de votre flotte et réduit drastiquement vos coûts d\'exploitation. Notre approche prédictive basée sur l\'IA anticipe les pannes et maximise la productivité.',
      features: ['Ordonnancement intelligent', 'Maintenance prédictive', 'Gestion des coûts détaillée', 'Suivi temps réel', 'Historique complet', 'Rapports automatisés', 'Mobile app', 'Intégration GPS'],
      images: [
        'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80'
      ],
      category: 'GMAO'
    },

    // Cybersecurity
    {
      id: 'sophos',
      iconSvg: 'shield',
      title: 'Sophos XG Firewall',
      description: 'Protection cybersécurité avancée avec pare-feu nouvelle génération et détection des menaces.',
      longDescription: 'Sophos XG Firewall révolutionne la cybersécurité en offrant une protection de nouvelle génération contre toutes les menaces modernes. Grâce à la technologie Security Heartbeat™, votre pare-feu communique avec vos endpoints pour une réponse automatisée aux incidents. Filtrage applicatif intelligent, protection anti-ransomware, et visibilité complète sur votre trafic réseau font de Sophos la référence en matière de sécurité réseau.',
      features: ['Pare-feu nouvelle génération', 'Protection anti-ransomware', 'Filtrage applicatif', 'VPN sécurisé', 'Security Heartbeat', 'Rapports détaillés', 'Zero-touch deployment', 'Cloud management'],
      images: [
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80'
      ],
      category: 'Sécurité'
    },
    {
      id: 'endpoint-protection',
      iconSvg: 'shield',
      title: 'Sophos Endpoint Protection',
      description: 'Protection complète des postes de travail, serveurs et appareils mobiles.',
      longDescription: 'Protégez tous vos endpoints avec Sophos Endpoint Protection, la solution de sécurité unifiée pour postes de travail, serveurs et appareils mobiles. Détection et réponse aux menaces avancées, protection contre les ransomware, contrôle applicatif granulaire et synchronisation parfaite avec votre pare-feu XG pour une sécurité Zero Trust complète.',
      features: ['Protection anti-malware', 'Détection comportementale', 'Contrôle applicatif', 'Device Encryption', 'Web filtering', 'Remote lockdown', 'Endpoint detection', 'Zero Trust Network Access'],
      images: [
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'
      ],
      category: 'Sécurité'
    },

    // Cloud Solutions
    {
      id: 'cloud-migration',
      iconSvg: 'cloud',
      title: 'Migration Cloud',
      description: 'Accompagnement complet pour votre migration vers le cloud avec optimisation des coûts.',
      longDescription: 'Notre service de migration cloud vous accompagne de A à Z dans votre transition vers le cloud. De l\'audit initial à la mise en production, nous optimisons votre infrastructure pour réduire vos coûts tout en améliorant les performances. Migration de bases de données, applications legacy, et optimisation des workloads cloud-native.',
      features: ['Audit infrastructure', 'Migration sécurisée', 'Optimisation coûts', 'HA/DR planning', 'Monitoring 24/7', 'Formation équipes', 'Support technique', 'SLA garanti'],
      images: [
        'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
      ],
      category: 'Cloud'
    },
    {
      id: 'azure-services',
      iconSvg: 'cloud',
      title: 'Services Microsoft Azure',
      description: 'Expertise complète sur la plateforme Azure pour moderniser votre infrastructure.',
      longDescription: 'Tirez parti de toute la puissance de Microsoft Azure avec notre expertise certifiée. De la migration de vos applications existantes aux services cloud-native, nous vous accompagnons dans la transformation digitale de votre infrastructure. Optimisation des coûts, sécurité renforcée, et innovation continue grâce aux dernières technologies Azure.',
      features: ['Azure Migration', 'Azure Kubernetes Service', 'Azure Functions', 'Azure SQL Database', 'Azure Active Directory', 'Azure Monitor', 'Azure Backup', 'Azure Security Center'],
      images: [
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80'
      ],
      category: 'Cloud'
    },

    // Development Services
    {
      id: 'custom-development',
      iconSvg: 'code',
      title: 'Développement Sur Mesure',
      description: 'Création d\'applications métier personnalisées répondant exactement à vos besoins.',
      longDescription: 'Notre équipe d\'ingénieurs développe des solutions logicielles sur mesure qui s\'intègrent parfaitement à votre écosystème existant. De l\'application mobile à la plateforme web complexe, nous maîtrisons toutes les technologies modernes. Notre approche agile et notre expertise fonctionnelle garantissent des solutions performantes et évolutives.',
      features: ['Analyse fonctionnelle', 'Architecture technique', 'Développement agile', 'Tests automatisés', 'Documentation complète', 'Formation utilisateurs', 'Maintenance évolutive', 'Support technique'],
      images: [
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80'
      ],
      category: 'Développement'
    },
    {
      id: 'mobile-apps',
      iconSvg: 'mobile',
      title: 'Applications Mobiles',
      description: 'Développement d\'applications iOS et Android natives et cross-platform.',
      longDescription: 'Créez l\'expérience mobile parfaite pour vos utilisateurs avec nos applications natives et cross-platform. De l\'application B2B connectée à vos systèmes ERP à l\'app B2C pour vos clients, nous développons des solutions mobiles performantes, sécurisées et intuitives. Notre expertise couvre iOS (Swift), Android (Kotlin), React Native et Flutter.',
      features: ['iOS & Android natif', 'React Native / Flutter', 'API Integration', 'Offline mode', 'Push notifications', 'In-app purchases', 'Analytics intégré', 'Store optimization'],
      images: [
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=800&q=80'
      ],
      category: 'Développement'
    },

    // Data & Analytics
    {
      id: 'business-intelligence',
      iconSvg: 'analytics',
      title: 'Business Intelligence',
      description: 'Tableaux de bord et analyses prédictives pour une prise de décision éclairée.',
      longDescription: 'Transformez vos données en insights stratégiques avec nos solutions Business Intelligence. De l\'ETL automatisé aux tableaux de bord interactifs, nous vous donnons les outils pour analyser vos performances en temps réel. Notre expertise en data visualization et en analytics prédictifs vous aide à anticiper les tendances et optimiser vos décisions stratégiques.',
      features: ['ETL automatisé', 'Data warehouse', 'Tableaux de bord', 'Analytics prédictif', 'Machine Learning', 'Real-time reporting', 'Data visualization', 'Mobile dashboards'],
      images: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80'
      ],
      category: 'Analytics'
    },

    // Network Solutions
    {
      id: 'network-infrastructure',
      iconSvg: 'network',
      title: 'Infrastructure Réseau',
      description: 'Conception et déploiement d\'infrastructures réseau performantes et sécurisées.',
      longDescription: 'Concevez une infrastructure réseau moderne et évolutive avec notre expertise en networking. De la conception à la mise en production, nous déployons des solutions LAN/WAN, WiFi entreprise, SD-WAN, et sécurité réseau. Notre approche Zero Trust et nos certifications Cisco, Juniper et Aruba garantissent des réseaux fiables, performants et sécurisés.',
      features: ['Conception réseau', 'SD-WAN deployment', 'WiFi entreprise', 'Sécurité réseau', 'Monitoring 24/7', 'Load balancing', 'VPN entreprise', 'Cloud networking'],
      images: [
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'
      ],
      category: 'Réseau'
    },

    // Database Solutions
    {
      id: 'database-optimization',
      iconSvg: 'database',
      title: 'Optimisation Base de Données',
      description: 'Audit, optimisation et migration de bases de données pour des performances optimales.',
      longDescription: 'Maximisez les performances de vos bases de données avec notre expertise en optimisation et migration. De l\'audit initial à la mise en production, nous optimisons vos requêtes, refactorisons vos schémas, et migrons vers des solutions modernes (PostgreSQL, SQL Server, Oracle, MongoDB). Notre approche méthodique garantit des performances accrues et une scalabilité future.',
      features: ['Audit performance', 'Query optimization', 'Schema refactoring', 'Migration sécurisée', 'High availability', 'Backup & recovery', 'Monitoring avancé', 'Clustering'],
      images: [
        'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
      ],
      category: 'Base de données'
    }
  ]);

  // Read-only signal for consumers
  readonly products = this.productsSignal.asReadonly();

  getProducts(): Product[] {
    return this.productsSignal();
  }

  getProductById(id: string): Product | undefined {
    return this.productsSignal().find(p => p.id === id);
  }

  getRelatedProducts(currentId: string): Product[] {
    return this.productsSignal().filter(p => p.id !== currentId).slice(0, 3);
  }
}
