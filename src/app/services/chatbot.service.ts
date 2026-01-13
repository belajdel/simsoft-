import { Injectable, signal } from '@angular/core';

export interface ChatMessage {
    text: string;
    isUser: boolean;
    timestamp: Date;
}

@Injectable({
    providedIn: 'root'
})
export class ChatbotService {
    private messagesSignal = signal<ChatMessage[]>([
        { text: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?', isUser: false, timestamp: new Date() }
    ]);

    private isOpenSignal = signal<boolean>(false);

    readonly messages = this.messagesSignal.asReadonly();
    readonly isOpen = this.isOpenSignal.asReadonly();

    toggleChat() {
        this.isOpenSignal.update(v => !v);
    }

    sendMessage(text: string) {
        this.messagesSignal.update(msgs => [...msgs, { text, isUser: true, timestamp: new Date() }]);

        // Simulate bot response
        setTimeout(() => {
            this.generateResponse(text);
        }, 1000);
    }

    private generateResponse(userText: string) {
        let responseText = "Je ne suis pas sûr de comprendre. Pouvez-vous reformuler ? Vous pouvez me poser des questions sur nos produits, nos services, ou visiter notre section FAQ.";
        const lowerText = userText.toLowerCase();

        // Greetings
        if (lowerText.includes('bonjour') || lowerText.includes('salut') || lowerText.includes('hello') || lowerText.includes('bonsoir')) {
            responseText = "Bonjour ! 👋 Je suis l'assistant virtuel de SimSoft. Je peux vous renseigner sur nos produits (Divalto ERP, FirstParc GMAO, WaveSoft, Sophos), nos services cloud, développement, cybersécurité, et vous aider avec vos questions. Comment puis-je vous aider ?";
        }

        // Pricing and quotes
        else if (lowerText.includes('prix') || lowerText.includes('tarif') || lowerText.includes('coût') || lowerText.includes('devis')) {
            if (lowerText.includes('divalto') || lowerText.includes('erp')) {
                responseText = "Pour Divalto ERP, nos tarifs commencent à 1 500€/mois pour la version Starter, 3 500€/mois pour Professional, et sur devis pour Enterprise. Le ROI est généralement atteint en 18-24 mois. Voulez-vous que je vous envoie un devis personnalisé ?";
            } else if (lowerText.includes('firstparc') || lowerText.includes('gmao')) {
                responseText = "FirstParc GMAO est proposé à partir de 800€/mois pour la formule Starter et 1 800€/mois pour Professional. L'investissement se rentabilise généralement en 8-12 mois grâce aux économies de maintenance. Intéressé par une démonstration ?";
            } else if (lowerText.includes('sophos') || lowerText.includes('sécurité')) {
                responseText = "Sophos débute à 300€/an pour la protection endpoint de base, avec des formules évolutives selon vos besoins. La cybersécurité n'est plus un coût mais un investissement rentable. Souhaitez-vous un audit de sécurité gratuit ?";
            } else {
                responseText = "Nos tarifs varient selon la solution et la taille de votre entreprise. Je peux vous donner des fourchettes approximatives :\n• ERP (Divalto) : 1 500€ - 10 000€/mois\n• GMAO (FirstParc) : 800€ - 3 000€/mois\n• Cybersécurité (Sophos) : 300€ - 2 000€/an\n• Développement : Sur devis (15 000€+)\n\nPour un devis précis, remplissez notre formulaire de contact ou appelez-nous au +216 73 21 36 88.";
            }
        }

        // Products - Divalto ERP
        else if (lowerText.includes('divalto') || (lowerText.includes('erp') && !lowerText.includes('prix'))) {
            if (lowerText.includes('fonction') || lowerText.includes('feature') || lowerText.includes('capacité')) {
                responseText = "Divalto ERP offre : ✅ Gestion commerciale complète (ventes, achats, stocks)\n✅ Comptabilité intégrée avec écritures automatiques\n✅ Business Intelligence et tableaux de bord\n✅ Gestion de production et qualité\n✅ CRM intégré\n✅ E-commerce connecté\n✅ Multi-entreprises et multi-sites\n✅ API pour intégrations tierces\n\nC'est la solution idéale pour centraliser tous vos processus métier.";
            } else if (lowerText.includes('démo') || lowerText.includes('demo') || lowerText.includes('présentation')) {
                responseText = "Excellente idée ! Une démonstration de Divalto vous permettra de découvrir l'interface et les fonctionnalités en conditions réelles. Nous proposons des démos personnalisées selon votre secteur d'activité. Combien de temps dure votre projet d'implémentation ERP ? Cela nous aidera à préparer la meilleure démo.";
            } else {
                responseText = "Divalto est notre solution ERP de référence pour les PME et ETI, utilisée par plus de 15 000 entreprises. Elle centralise tous vos processus métier : ventes, achats, comptabilité, stocks, production, et bien plus. L'interface intuitive et les 200+ modules disponibles en font un ERP évolutif. Avez-vous déjà un ERP ? Quel est votre secteur d'activité ?";
            }
        }

        // Products - FirstParc GMAO
        else if (lowerText.includes('firstparc') || lowerText.includes('gmao') || lowerText.includes('maintenance')) {
            if (lowerText.includes('fonction') || lowerText.includes('feature')) {
                responseText = "FirstParc GMAO révolutionne la maintenance :\n🔧 Ordonnancement intelligent des interventions\n📊 Suivi prédictif avec IA\n💰 Gestion optimisée des coûts\n📱 Application mobile pour techniciens\n📈 Tableaux de bord temps réel\n🔄 Intégration IoT et capteurs\n📋 Gestion des pièces détachées\n⏰ Planning et calendriers automatisés\n\nRésultats typiques : -65% pannes, -40% coûts pièces, +25% productivité.";
            } else if (lowerText.includes('iot') || lowerText.includes('capteur')) {
                responseText = "L'IoT est au cœur de FirstParc ! Nos capteurs connectés surveillent :\n🌡️ Température et vibrations des équipements\n⚡ Consommation électrique\n🔊 Bruits anormaux\n💧 Niveau des fluides\n📍 Géolocalisation des véhicules\n\nL'IA analyse ces données pour prédire les pannes avant qu'elles n'arrivent. C'est la maintenance 4.0 !";
            } else {
                responseText = "FirstParc est notre solution GMAO intelligente qui transforme la maintenance réactive en prédictive. Grâce à l'IoT et l'IA, nous anticipons les pannes et optimisons vos coûts de maintenance. Idéal pour l'industrie, les transports, et la gestion de flottes. Avez-vous beaucoup d'équipements à maintenir ? Quel est votre secteur ?";
            }
        }

        // Products - WaveSoft
        else if (lowerText.includes('wavesoft') || lowerText.includes('suite') || lowerText.includes('modulaire')) {
            responseText = "WaveSoft est notre suite logicielle modulaire qui centralise tous vos processus métier sur une seule base de données. Contrairement aux ERP traditionnels, WaveSoft s'adapte à votre croissance :\n\n🏗️ Architecture modulaire (ajoutez des modules selon vos besoins)\n🔗 Base de données unifiée (pas de ressaisies)\n📊 BI et tableaux de bord intégrés\n🌐 E-commerce connecté\n👥 CRM complet\n🏭 Gestion de production\n💼 Comptabilité avancée\n\nParfait pour les entreprises en forte croissance qui veulent éviter les changements d'ERP coûteux.";
        }

        // Products - Sophos Cybersecurity
        else if (lowerText.includes('sophos') || lowerText.includes('sécurité') || lowerText.includes('cyber') || lowerText.includes('firewall')) {
            if (lowerText.includes('ransomware') || lowerText.includes('virus') || lowerText.includes('malware')) {
                responseText = "Sophos XG Firewall est la référence contre les ransomware :\n🛡️ Protection avancée contre les menaces zero-day\n🔄 Security Heartbeat™ (communication intelligente entre composants)\n🚫 Blocage automatique des ransomwares\n🕵️ Détection comportementale des attaques\n☁️ Synchronisation cloud en temps réel\n📊 Rapports détaillés d'incidents\n\nRésultats : 450 attaques bloquées/mois en moyenne chez nos clients.";
            } else if (lowerText.includes('zero trust') || lowerText.includes('confiance')) {
                responseText = "Le Zero Trust est notre approche par défaut :\n🔐 Vérification continue des identités\n🎯 Contrôle d'accès granulaire (RBAC)\n🌐 Micro-segmentation du réseau\n📱 Authentification multi-facteurs\n📊 Monitoring et analytics temps réel\n🔄 Politiques adaptatives\n\n'Never trust, always verify' - c'est notre mantra !";
            } else {
                responseText = "Sophos est notre partenaire cybersécurité depuis 15 ans. Le XG Firewall offre une protection nouvelle génération avec :\n🔒 Pare-feu next-gen\n🛡️ Protection anti-ransomware\n🌐 Filtrage web applicatif\n🔑 VPN sécurisé\n💓 Security Heartbeat\n📱 Gestion centralisée\n\nProtège contre les menaces modernes : phishing, ransomware, attaques zero-day. Avez-vous déjà été victime d'une cyberattaque ?";
            }
        }

        // Cloud services
        else if (lowerText.includes('cloud') || lowerText.includes('azure') || lowerText.includes('migration')) {
            if (lowerText.includes('azure')) {
                responseText = "Microsoft Azure est notre plateforme cloud de prédilection :\n☁️ Intégration parfaite avec Office 365\n🔒 Conformité RGPD et HDS\n🤖 IA intégrée (Azure AI, Cognitive Services)\n💰 Azure Hybrid Benefit (-40% sur vos licences)\n🛡️ Security Center intégré\n📊 Monitor et analytics avancés\n\nIdéal pour les entreprises Microsoft. Avez-vous déjà des licences Windows Server ou SQL Server ?";
            } else if (lowerText.includes('migration') || lowerText.includes('migrer')) {
                responseText = "Notre méthodologie de migration cloud en 6 phases :\n1️⃣ Assessment : Audit complet de votre infrastructure\n2️⃣ Architecture : Conception de la cible cloud\n3️⃣ Migration : Déploiement progressif des workloads\n4️⃣ Optimisation : Ajustement performances et coûts\n5️⃣ Sécurité : Implémentation des bonnes pratiques\n6️⃣ Exploitation : Formation et support opérationnel\n\nDurée typique : 3-6 mois selon la complexité. Résultats : -35% coûts, +40% performance.";
            } else {
                responseText = "Notre expertise cloud couvre Azure, AWS, et Google Cloud. Nous accompagnons votre migration avec :\n🏗️ Architecture cloud optimisée\n💰 Optimisation des coûts (réservations, auto-scaling)\n🔒 Sécurité cloud native\n📊 Monitoring et gouvernance\n🎯 DevOps et CI/CD\n🤖 IA/ML dans le cloud\n\nLe cloud n'est plus une option mais une nécessité stratégique. Quel est votre objectif principal : réduction coûts, innovation, ou scalabilité ?";
            }
        }

        // Development services
        else if (lowerText.includes('développement') || lowerText.includes('application') || lowerText.includes('mobile') || lowerText.includes('web')) {
            if (lowerText.includes('mobile') || lowerText.includes('app')) {
                responseText = "Nous développons des apps mobiles natives et cross-platform :\n📱 iOS (Swift) et Android (Kotlin) natif\n🔄 React Native / Flutter pour cross-platform\n🎨 UI/UX design centré utilisateur\n🔗 API et intégrations back-end\n📊 Analytics et push notifications\n💳 In-app purchases et monétisation\n🏪 Publication App Store / Play Store\n\nCas d'usage : apps métier, e-commerce, IoT, productivité. Quel type d'application vous intéresse ?";
            } else if (lowerText.includes('web')) {
                responseText = "Notre stack web moderne :\n⚛️ React, Angular, Vue.js pour le front-end\n🚀 Node.js, Python (Django/Flask), PHP pour le back-end\n☁️ Cloud-native avec containers (Docker/K8s)\n🗄️ Bases de données : PostgreSQL, MongoDB, Redis\n🔒 Sécurité et performance optimisées\n📱 Responsive design\n🤖 PWA et apps web progressives\n\nDe la landing page au système complexe, nous maîtrisons toutes les technologies.";
            } else {
                responseText = "Notre équipe de développement compte 25 ingénieurs expérimentés :\n💻 Full-stack : Front-end et back-end\n🎨 UI/UX design intégré\n🧪 Tests automatisés (TDD, CI/CD)\n📋 Méthodologies agiles (Scrum, Kanban)\n🔧 Maintenance et évolution\n📚 Documentation et formation\n🎯 Architecture scalable et sécurisée\n\nTechnologies : React, Angular, Node.js, Python, .NET, Java, Flutter, Swift, Kotlin. Quel est votre projet ?";
            }
        }

        // Contact information
        else if (lowerText.includes('contact') || lowerText.includes('téléphone') || lowerText.includes('email') || lowerText.includes('adresse')) {
            responseText = "Plusieurs façons de nous contacter :\n\n📧 Email commercial : commercial@simsoft.com.tn\n📞 Téléphone fixe : +216 73 21 36 88\n📱 Mobile : +216 50 52 08 05\n🏢 Adresse : 5 Avenue Léopold Senghor, Espace Ayechi, 4000 Sousse, Tunisie\n💼 LinkedIn : SimSoft Technologies\n🌐 Site web : www.simsoft.com.tn\n\n💡 Conseil : Pour une réponse rapide, utilisez notre formulaire de contact en ligne avec vos coordonnées et le sujet de votre demande.";
        }

        // Services
        else if (lowerText.includes('service') || lowerText.includes('support') || lowerText.includes('formation') || lowerText.includes('consulting')) {
            responseText = "Notre offre de services complète :\n\n🔧 Implémentation et paramétrage de solutions\n📚 Formation utilisateurs et administrateurs\n🛠️ Support technique (Hotline, Télémaintenance, Intervention)\n📊 Consulting et audit (ERP, cybersécurité, cloud)\n🔄 Migration de données sécurisée\n⚡ Optimisation des performances\n🔒 Audit de sécurité et conformité\n🌐 Migration et modernisation cloud\n\nTous nos services sont garantis avec SLA et accompagnement personnalisé.";
        }

        // FAQ related
        else if (lowerText.includes('faq') || lowerText.includes('question') || lowerText.includes('fréquent')) {
            responseText = "Voici nos questions les plus fréquentes :\n\n❓ 'Quel est le délai d'implémentation d'un ERP ?'\n➡️ 3-12 mois selon la complexité et votre secteur\n\n❓ 'Proposez-vous un contrat de maintenance ?'\n➡️ Oui, 3 niveaux : Hotline, Télémaintenance, Intervention sur site\n\n❓ 'Assurez-vous la migration de nos données ?'\n➡️ Absolument, nos experts migrent vos données sans perte\n\n❓ 'Quel est le ROI typique de vos solutions ?'\n➡️ 18-24 mois pour ERP, 8-12 mois pour GMAO, immédiat pour cybersécurité\n\nConsultez notre section FAQ complète sur la page Contact pour plus de détails !";
        }

        // Demo requests
        else if (lowerText.includes('démo') || lowerText.includes('demo') || lowerText.includes('présentation') || lowerText.includes('voir')) {
            responseText = "Excellente initiative ! Les démos sont le meilleur moyen de découvrir nos solutions. Nous proposons :\n\n🎯 Demos personnalisées selon votre secteur\n⏰ Sessions de 45-60 minutes en ligne\n📊 Présentation adaptée à votre niveau technique\n💬 Échange direct avec nos experts\n📝 Compte-rendu et proposition commerciale\n\nQuelle solution vous intéresse le plus : Divalto ERP, FirstParc GMAO, Sophos, ou nos services cloud/développement ?";
        }

        // About company
        else if (lowerText.includes('qui') || lowerText.includes('simsoft') || lowerText.includes('entreprise') || lowerText.includes('histoire')) {
            responseText = "SimSoft Technologies, votre partenaire digital depuis 2008 :\n\n🏆 15+ ans d'expertise en solutions d'entreprise\n👥 50+ collaborateurs qualifiés\n🏢 Siège à Sousse, présence nationale\n🤝 500+ clients satisfaits\n🌟 Partenaires : Microsoft Gold, Sophos Platinum, Divalto Elite\n🎖️ Certifications ISO 9001 et ISO 27001\n💡 Spécialisés : ERP, GMAO, Cybersécurité, Cloud, Développement\n\nNotre mission : Accompagner votre transformation digitale avec des solutions performantes et un service personnalisé.";
        }

        // Goodbye
        else if (lowerText.includes('au revoir') || lowerText.includes('bye') || lowerText.includes('merci') || lowerText.includes('à bientôt')) {
            responseText = "Ce fut un plaisir de discuter avec vous ! 😊 N'hésitez pas à revenir si vous avez d'autres questions. Vous pouvez aussi nous contacter directement :\n\n📞 +216 73 21 36 88\n📧 commercial@simsoft.com.tn\n🌐 www.simsoft.com.tn\n\nÀ bientôt pour concrétiser votre projet !";
        }

        // Industry specific
        else if (lowerText.includes('industrie') || lowerText.includes('manufacturing') || lowerText.includes('usine')) {
            responseText = "Pour l'industrie manufacturière, nous recommandons :\n\n🏭 Divalto ERP : Gestion de production, qualité, stocks\n🔧 FirstParc GMAO : Maintenance prédictive des équipements\n📊 BI intégrée : KPIs production et performance\n🌐 MES connecté : Supervision temps réel\n🔒 Sophos : Protection des systèmes industriels\n☁️ Azure : Infrastructure scalable\n\nCas concret : Chez notre client INDUSTRY Corp, nous avons réduit les temps d'arrêt de 65% et augmenté la productivité de 25%. Quel est votre défi principal ?";
        }

        else if (lowerText.includes('transport') || lowerText.includes('logistique') || lowerText.includes('flotte')) {
            responseText = "Pour le secteur transport et logistique :\n\n🚛 FirstParc GMAO : Gestion flotte et maintenance prédictive\n📍 Géolocalisation temps réel des véhicules\n⛽ Suivi consommation carburant et coûts\n📋 Gestion des interventions et pièces\n📱 App mobile pour conducteurs\n📊 Tableaux de bord performance\n🔗 Intégration TMS (Transport Management System)\n\nRésultats typiques : -30% coûts maintenance, +20% disponibilité flotte, optimisation des tournées.";
        }

        // AI and innovation
        else if (lowerText.includes('ia') || lowerText.includes('intelligence') || lowerText.includes('artificielle') || lowerText.includes('ai')) {
            responseText = "L'IA transforme nos solutions :\n\n🤖 Prédiction des pannes (FirstParc)\n📊 Analyse prédictive des ventes (ERP)\n🛡️ Détection avancée des menaces (Sophos)\n💬 Chatbots intelligents (comme moi !)\n🔍 OCR et reconnaissance de documents\n📈 Optimisation automatique des processus\n🎯 Recommandations personnalisées\n\nNous intégrons l'IA de façon éthique : transparence, explicabilité, et contrôle humain. L'IA amplifie vos équipes plutôt que les remplacer.";
        }

        this.messagesSignal.update(msgs => [...msgs, { text: responseText, isUser: false, timestamp: new Date() }]);
    }
}
