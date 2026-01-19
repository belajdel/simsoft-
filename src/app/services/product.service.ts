import { Injectable, signal, computed, inject } from '@angular/core';
import { LanguageService, Language } from './language.service';

export interface MultiLang {
  fr: string;
  en: string;
}

export interface MultiLangArray {
  fr: string[];
  en: string[];
}

export interface Product {
  id: string;
  iconSvg: 'chart' | 'car' | 'platform' | 'shield' | 'cloud' | 'code' | 'database' | 'network' | 'mobile' | 'analytics';
  title: MultiLang;
  description: MultiLang;
  longDescription: MultiLang;
  features: MultiLangArray;
  images: string[];
  category: MultiLang;
  testimonials?: Array<{
    text: MultiLang;
    author: string;
    company: MultiLang;
  }>;
}

export interface TranslatedProduct {
  id: string;
  iconSvg: string;
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
  private languageService = inject(LanguageService);

  // Signal for the list of products with both languages
  private productsData = signal<Product[]>([
    // ERP Solutions
    {
      id: 'divalto',
      iconSvg: 'chart',
      title: { fr: 'Divalto ERP', en: 'Divalto ERP' },
      description: {
        fr: 'Solution ERP complète pour PME et ETI avec gestion intégrée de tous vos processus métier.',
        en: 'Complete ERP solution for SMEs and mid-market companies with integrated management of all your business processes.'
      },
      longDescription: {
        fr: 'Divalto est la solution ERP de référence pour les entreprises en croissance. Cette suite logicielle complète intègre la gestion commerciale, la comptabilité, le stock, la production et les finances. Grâce à notre expertise de plus de 20 ans, nous vous accompagnons dans le cadrage, le paramétrage, la migration et la formation. L\'interface intuitive et la modularité de Divalto en font un choix privilégié pour les PME qui veulent gagner en efficacité sans complexité excessive.',
        en: 'Divalto is the reference ERP solution for growing businesses. This complete software suite integrates commercial management, accounting, stock, production and finance. Thanks to our expertise of more than 20 years, we accompany you in scoping, configuration, migration and training. Divalto\'s intuitive interface and modularity make it a preferred choice for SMEs that want to gain efficiency without excessive complexity.'
      },
      features: {
        fr: ['Gestion commerciale avancée', 'Comptabilité intégrée', 'Stock & logistique temps réel', 'Reporting & BI', 'Gestion de production', 'CRM intégré', 'E-commerce connecté', 'Interface multi-entreprises'],
        en: ['Advanced commercial management', 'Integrated accounting', 'Real-time stock & logistics', 'Reporting & BI', 'Production management', 'Integrated CRM', 'Connected E-commerce', 'Multi-company interface']
      },
      images: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80'
      ],
      category: { fr: 'ERP', en: 'ERP' },
      testimonials: []
    },
    {
      id: 'wavesoft',
      iconSvg: 'platform',
      title: { fr: 'WaveSoft', en: 'WaveSoft' },
      description: {
        fr: 'Suite logicielle modulaire unifiant tous vos processus métier sur une seule plateforme.',
        en: 'Modular software suite unifying all your business processes on a single platform.'
      },
      longDescription: {
        fr: 'WaveSoft révolutionne la gestion d\'entreprise en centralisant tous vos processus sur une seule base de données. Fini les ressaisies, les erreurs et les silos d\'information ! Du devis à la facture, en passant par la gestion des stocks, la CRM et la comptabilité, tout est interconnecté. Notre approche modulaire vous permet de commencer petit et de grandir avec la solution.',
        en: 'WaveSoft revolutionizes business management by centralizing all your processes on a single database. No more re-entries, errors and information silos! From quote to invoice, including stock management, CRM and accounting, everything is interconnected. Our modular approach allows you to start small and grow with the solution.'
      },
      features: {
        fr: ['Base de données unifiée', 'CRM intégré', 'Gestion de production', 'E-commerce intégré', 'Business Intelligence', 'API ouvertes', 'Multi-sites', 'Workflows personnalisables'],
        en: ['Unified database', 'Integrated CRM', 'Production management', 'Integrated E-commerce', 'Business Intelligence', 'Open APIs', 'Multi-site', 'Customizable workflows']
      },
      images: [
        'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
      ],
      category: { fr: 'ERP', en: 'ERP' }
    },
    {
      id: 'firstparc',
      iconSvg: 'car',
      title: { fr: 'FirstParc', en: 'FirstParc' },
      description: {
        fr: 'Gestion de Maintenance Assistée par Ordinateur pour optimiser votre parc automobile.',
        en: 'Computerized Maintenance Management System to optimize your vehicle fleet.'
      },
      longDescription: {
        fr: 'FirstParc est la solution GMAO (Gestion de Maintenance Assistée par Ordinateur) de référence pour la gestion complète de votre parc véhicule. De l\'ordonnancement des tâches au suivi des interventions, en passant par la maintenance préventive et la gestion des coûts, FirstParc optimise la disponibilité de votre flotte et réduit drastiquement vos coûts d\'exploitation. Notre approche prédictive basée sur l\'IA anticipe les pannes et maximise la productivité.',
        en: 'FirstParc is the reference CMMS (Computerized Maintenance Management System) solution for the complete management of your vehicle fleet. From task scheduling to intervention tracking, including preventive maintenance and cost management, FirstParc optimizes the availability of your fleet and drastically reduces your operating costs. Our AI-based predictive approach anticipates failures and maximizes productivity.'
      },
      features: {
        fr: ['Ordonnancement intelligent', 'Maintenance prédictive', 'Gestion des coûts détaillée', 'Suivi temps réel', 'Historique complet', 'Rapports automatisés', 'Mobile app', 'Intégration GPS'],
        en: ['Intelligent scheduling', 'Predictive maintenance', 'Detailed cost management', 'Real-time tracking', 'Complete history', 'Automated reports', 'Mobile app', 'GPS integration']
      },
      images: [
        'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80'
      ],
      category: { fr: 'GMAO', en: 'CMMS' }
    },
    {
      id: 'sophos',
      iconSvg: 'network',
      title: { fr: 'Sophos XG Firewall', en: 'Sophos XG Firewall' },
      description: {
        fr: 'Protection cybersécurité avancée avec pare-feu nouvelle génération et détection des menaces.',
        en: 'Advanced cybersecurity protection with next-generation firewall and threat detection.'
      },
      longDescription: {
        fr: 'Sophos XG Firewall révolutionne la cybersécurité en offrant une protection de nouvelle génération contre toutes les menaces modernes. Grâce à la technologie Security Heartbeat™, votre pare-feu communique avec vos endpoints pour une réponse automatisée aux incidents. Filtrage applicatif intelligent, protection anti-ransomware, et visibilité complète sur votre trafic réseau font de Sophos la référence en matière de sécurité réseau.',
        en: 'Sophos XG Firewall revolutionizes cybersecurity by offering next-generation protection against all modern threats. Thanks to Security Heartbeat™ technology, your firewall communicates with your endpoints for an automated response to incidents. Intelligent application filtering, anti-ransomware protection, and complete visibility into your network traffic make Sophos the reference in network security.'
      },
      features: {
        fr: ['Pare-feu nouvelle génération', 'Protection anti-ransomware', 'Filtrage applicatif', 'VPN sécurisé', 'Security Heartbeat', 'Rapports détaillés', 'Zero-touch deployment', 'Cloud management'],
        en: ['Next-generation firewall', 'Anti-ransomware protection', 'Application filtering', 'Secure VPN', 'Security Heartbeat', 'Detailed reports', 'Zero-touch deployment', 'Cloud management']
      },
      images: [
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80'
      ],
      category: { fr: 'Sécurité', en: 'Security' }
    },
    {
      id: 'endpoint-protection',
      iconSvg: 'shield',
      title: { fr: 'Sophos Endpoint Protection', en: 'Sophos Endpoint Protection' },
      description: {
        fr: 'Protection complète des postes de travail, serveurs et appareils mobiles.',
        en: 'Complete protection for workstations, servers and mobile devices.'
      },
      longDescription: {
        fr: 'Protégez tous vos endpoints avec Sophos Endpoint Protection, la solution de sécurité unifiée pour postes de travail, serveurs et appareils mobiles. Détection et réponse aux menaces avancées, protection contre les ransomware, contrôle applicatif granulaire et synchronisation parfaite avec votre pare-feu XG pour une sécurité Zero Trust complète.',
        en: 'Protect all your endpoints with Sophos Endpoint Protection, the unified security solution for workstations, servers and mobile devices. Advanced threat detection and response, ransomware protection, granular application control and perfect synchronization with your XG firewall for complete Zero Trust security.'
      },
      features: {
        fr: ['Protection anti-malware', 'Détection comportementale', 'Contrôle applicatif', 'Device Encryption', 'Web filtering', 'Remote lockdown', 'Endpoint detection', 'Zero Trust Network Access'],
        en: ['Anti-malware protection', 'Behavioral detection', 'Application control', 'Device Encryption', 'Web filtering', 'Remote lockdown', 'Endpoint detection', 'Zero Trust Network Access']
      },
      images: [
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'
      ],
      category: { fr: 'Sécurité', en: 'Security' }
    },
    {
      id: 'cloud-migration',
      iconSvg: 'cloud',
      title: { fr: 'Migration Cloud', en: 'Cloud Migration' },
      description: {
        fr: 'Accompagnement complet pour votre migration vers le cloud avec optimisation des coûts.',
        en: 'Complete support for your migration to the cloud with cost optimization.'
      },
      longDescription: {
        fr: 'Notre service de migration cloud vous accompagne de A à Z dans votre transition vers le cloud. De l\'audit initial à la mise en production, nous optimisons votre infrastructure pour réduire vos coûts tout en améliorant les performances. Migration de bases de données, applications legacy, et optimisation des workloads cloud-native.',
        en: 'Our cloud migration service accompanies you from A to Z in your transition to the cloud. From the initial audit to production, we optimize your infrastructure to reduce your costs while improving performance. Migration of databases, legacy applications, and optimization of cloud-native workloads.'
      },
      features: {
        fr: ['Audit infrastructure', 'Migration sécurisée', 'Optimisation coûts', 'HA/DR planning', 'Monitoring 24/7', 'Formation équipes', 'Support technique', 'SLA garanti'],
        en: ['Infrastructure audit', 'Secure migration', 'Cost optimization', 'HA/DR planning', '24/7 Monitoring', 'Team training', 'Technical support', 'Guaranteed SLA']
      },
      images: [
        'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
      ],
      category: { fr: 'Cloud', en: 'Cloud' }
    },
    {
      id: 'azure-services',
      iconSvg: 'cloud',
      title: { fr: 'Services Microsoft Azure', en: 'Microsoft Azure Services' },
      description: {
        fr: 'Expertise complète sur la plateforme Azure pour moderniser votre infrastructure.',
        en: 'Full expertise on the Azure platform to modernize your infrastructure.'
      },
      longDescription: {
        fr: 'Tirez parti de toute la puissance de Microsoft Azure avec notre expertise certifiée. De la migration de vos applications existantes aux services cloud-native, nous vous accompagnons dans la transformation digitale de votre infrastructure. Optimisation des coûts, sécurité renforcée, et innovation continue grâce aux dernières technologies Azure.',
        en: 'Take advantage of all the power of Microsoft Azure with our certified expertise. From the migration of your existing applications to cloud-native services, we accompany you in the digital transformation of your infrastructure. Cost optimization, reinforced security, and continuous innovation thanks to the latest Azure technologies.'
      },
      features: {
        fr: ['Azure Migration', 'Azure Kubernetes Service', 'Azure Functions', 'Azure SQL Database', 'Azure Active Directory', 'Azure Monitor', 'Azure Backup', 'Azure Security Center'],
        en: ['Azure Migration', 'Azure Kubernetes Service', 'Azure Functions', 'Azure SQL Database', 'Azure Active Directory', 'Azure Monitor', 'Azure Backup', 'Azure Security Center']
      },
      images: [
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80'
      ],
      category: { fr: 'Cloud', en: 'Cloud' }
    },
    {
      id: 'custom-development',
      iconSvg: 'code',
      title: { fr: 'Développement Sur Mesure', en: 'Custom Development' },
      description: {
        fr: 'Création d\'applications métier personnalisées répondant exactement à vos besoins.',
        en: 'Creation of personalized business applications meeting your exact needs.'
      },
      longDescription: {
        fr: 'Notre équipe d\'ingénieurs développe des solutions logicielles sur mesure qui s\'intègrent parfaitement à votre écosystème existant. De l\'application mobile à la plateforme web complexe, nous maîtrisons toutes les technologies modernes. Notre approche agile et notre expertise fonctionnelle garantissent des solutions performantes et évolutives.',
        en: 'Our team of engineers develops custom software solutions that integrate perfectly into your existing ecosystem. From mobile applications to complex web platforms, we master all modern technologies. Our agile approach and functional expertise guarantee performance and scalable solutions.'
      },
      features: {
        fr: ['Analyse fonctionnelle', 'Architecture technique', 'Développement agile', 'Tests automatisés', 'Documentation complète', 'Formation utilisateurs', 'Maintenance évolutive', 'Support technique'],
        en: ['Functional analysis', 'Technical architecture', 'Agile development', 'Automated testing', 'Complete documentation', 'User training', 'Evolutionary maintenance', 'Technical support']
      },
      images: [
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80'
      ],
      category: { fr: 'Développement', en: 'Development' }
    },
    {
      id: 'mobile-apps',
      iconSvg: 'mobile',
      title: { fr: 'Applications Mobiles', en: 'Mobile Applications' },
      description: {
        fr: 'Développement d\'applications iOS et Android natives et cross-platform.',
        en: 'Development of native and cross-platform iOS and Android applications.'
      },
      longDescription: {
        fr: 'Créez l\'expérience mobile parfaite pour vos utilisateurs avec nos applications natives et cross-platform. De l\'application B2B connectée à vos systèmes ERP à l\'app B2C pour vos clients, nous développons des solutions mobiles performantes, sécurisées et intuitives. Notre expertise couvre iOS (Swift), Android (Kotlin), React Native et Flutter.',
        en: 'Create the perfect mobile experience for your users with our native and cross-platform applications. From B2B applications connected to your ERP systems to B2C apps for your customers, we develop high-performance, secure and intuitive mobile solutions. Our expertise covers iOS (Swift), Android (Kotlin), React Native and Flutter.'
      },
      features: {
        fr: ['iOS & Android natif', 'React Native / Flutter', 'API Integration', 'Offline mode', 'Push notifications', 'In-app purchases', 'Analytics intégré', 'Store optimization'],
        en: ['Native iOS & Android', 'React Native / Flutter', 'API Integration', 'Offline mode', 'Push notifications', 'In-app purchases', 'Integrated analytics', 'Store optimization']
      },
      images: [
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=800&q=80'
      ],
      category: { fr: 'Développement', en: 'Development' }
    },
    {
      id: 'business-intelligence',
      iconSvg: 'analytics',
      title: { fr: 'Business Intelligence', en: 'Business Intelligence' },
      description: {
        fr: 'Tableaux de bord et analyses prédictives pour une prise de décision éclairée.',
        en: 'Dashboards and predictive analytics for informed decision making.'
      },
      longDescription: {
        fr: 'Transformez vos données en insights stratégiques avec nos solutions Business Intelligence. De l\'ETL automatisé aux tableaux de bord interactifs, nous vous donnons les outils pour analyser vos performances en temps réel. Notre expertise en data visualization et en analytics prédictifs vous aide à anticiper les tendances et optimiser vos décisions stratégiques.',
        en: 'Transform your data into strategic insights with our Business Intelligence solutions. From automated ETL to interactive dashboards, we give you the tools to analyze your performance in real time. Our expertise in data visualization and predictive analytics helps you anticipate trends and optimize your strategic decisions.'
      },
      features: {
        fr: ['ETL automatisé', 'Data warehouse', 'Tableaux de bord', 'Analytics prédictif', 'Machine Learning', 'Real-time reporting', 'Data visualization', 'Mobile dashboards'],
        en: ['Automated ETL', 'Data warehouse', 'Dashboards', 'Predictive analytics', 'Machine Learning', 'Real-time reporting', 'Data visualization', 'Mobile dashboards']
      },
      images: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80'
      ],
      category: { fr: 'Analytics', en: 'Analytics' }
    },
    {
      id: 'network-infrastructure',
      iconSvg: 'network',
      title: { fr: 'Infrastructure Réseau', en: 'Network Infrastructure' },
      description: {
        fr: 'Conception et déploiement d\'infrastructures réseau performantes et sécurisées.',
        en: 'Design and deployment of high-performance and secure network infrastructures.'
      },
      longDescription: {
        fr: 'Concevez une infrastructure réseau moderne et évolutive avec notre expertise en networking. De la conception à la mise en production, nous déployons des solutions LAN/WAN, WiFi entreprise, SD-WAN, et sécurité réseau. Notre approche Zero Trust et nos certifications Cisco, Juniper et Aruba garantissent des réseaux fiables, performants et sécurisés.',
        en: 'Design a modern and scalable network infrastructure with our networking expertise. From design to production, we deploy LAN/WAN solutions, enterprise WiFi, SD-WAN, and network security. Our Zero Trust approach and our Cisco, Juniper and Aruba certifications guarantee reliable, high-performance and secure networks.'
      },
      features: {
        fr: ['Conception réseau', 'SD-WAN deployment', 'WiFi entreprise', 'Sécurité réseau', 'Monitoring 24/7', 'Load balancing', 'VPN entreprise', 'Cloud networking'],
        en: ['Network design', 'SD-WAN deployment', 'Enterprise WiFi', 'Network security', '24/7 Monitoring', 'Load balancing', 'Enterprise VPN', 'Cloud networking']
      },
      images: [
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'
      ],
      category: { fr: 'Réseau', en: 'Network' }
    },
    {
      id: 'database-optimization',
      iconSvg: 'database',
      title: { fr: 'Optimisation Base de Données', en: 'Database Optimization' },
      description: {
        fr: 'Audit, optimisation et migration de bases de données pour des performances optimales.',
        en: 'Audit, optimization and migration of databases for optimal performance.'
      },
      longDescription: {
        fr: 'Maximisez les performances de vos bases de données avec notre expertise en optimisation et migration. De l\'audit initial à la mise en production, nous optimisons vos requêtes, refactorisons vos schémas, et migrons vers des solutions modernes (PostgreSQL, SQL Server, Oracle, MongoDB). Notre approche méthodique garantit des performances accrues et une scalabilité future.',
        en: 'Maximize the performance of your databases with our expertise in optimization and migration. From the initial audit to production, we optimize your queries, refactor your schemas, and migrate to modern solutions (PostgreSQL, SQL Server, Oracle, MongoDB). Our methodical approach guarantees increased performance and future scalability.'
      },
      features: {
        fr: ['Audit performance', 'Query optimization', 'Schema refactoring', 'Migration sécurisée', 'High availability', 'Backup & recovery', 'Monitoring avancé', 'Clustering'],
        en: ['Performance audit', 'Query optimization', 'Schema refactoring', 'Secure migration', 'High availability', 'Backup & recovery', 'Advanced monitoring', 'Clustering']
      },
      images: [
        'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
      ],
      category: { fr: 'Base de données', en: 'Database' }
    }
  ]);

  // Computed signal for the translated list of products
  readonly products = computed(() => {
    const lang = this.languageService.language();
    return this.productsData().map(product => this.translateProduct(product, lang));
  });

  private translateProduct(product: Product, lang: Language): TranslatedProduct {
    return {
      id: product.id,
      iconSvg: product.iconSvg,
      title: product.title[lang],
      description: product.description[lang],
      longDescription: product.longDescription[lang],
      features: product.features[lang],
      images: product.images,
      category: product.category[lang],
      testimonials: product.testimonials?.map(t => ({
        text: t.text[lang],
        author: t.author,
        company: t.company[lang]
      }))
    };
  }

  getProducts(): TranslatedProduct[] {
    return this.products();
  }

  getProductById(id: string): TranslatedProduct | undefined {
    return this.products().find(p => p.id === id);
  }

  getRelatedProducts(currentId: string): TranslatedProduct[] {
    return this.products().filter(p => p.id !== currentId).slice(0, 3);
  }
}
