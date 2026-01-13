import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Feature {
  iconSvg: string;
  title: string;
  description: string;
  items: string[];
}

@Component({
  standalone: true,
  selector: 'app-features',
  imports: [CommonModule],
  templateUrl: './features.html',
  styleUrls: ['./features.css'],
})
export class Features {
  constructor(private sanitizer: DomSanitizer) { }
  features: Feature[] = [
    {
      iconSvg: 'chart',
      title: 'ERP Divalto',
      description: 'La rentabilité d\'une entreprise passe par l\'augmentation du chiffre d\'affaires et la maîtrise des coûts de gestion.',
      items: [
        'Contrôle de votre activité à toutes les étapes',
        'Gestion des ventes et achats',
        'Outils de performance intégrant les nouvelles technologies',
        'Solutions dédiées aux PME et ETI'
      ]
    },
    {
      iconSvg: 'tools',
      title: 'GMAO FirstParc',
      description: 'Gestion de Maintenance Assistée par Ordinateur pour maintenir votre patrimoine d\'actifs.',
      items: [
        'Gestion de parc automobile',
        'Suivi des interventions de maintenance',
        'Planification et optimisation',
        'Tâches de gestion complètes et précises'
      ]
    },
    {
      iconSvg: 'support',
      title: 'Assistance Technique',
      description: 'Département qualifié fournissant une assistance technique complète pour vos besoins.',
      items: [
        'Diagnostic et installation',
        'Réparation et maintenance',
        'Support en cas de besoins immédiats',
        'Interventions rapides'
      ]
    },
    {
      iconSvg: 'code',
      title: 'Développement Spécifique',
      description: 'Équipe d\'ingénieurs avec des compétences opérationnelles étendues pour vos projets sur mesure.',
      items: [
        'Logiciels développés sur mesure',
        'Solutions adaptées à vos besoins',
        'Expertise technique approfondie',
        'Accompagnement personnalisé'
      ]
    },
    {
      iconSvg: 'shield',
      title: 'Sécurité Sophos',
      description: 'Sophos XG Firewall renouvelle entièrement la manière dont vous administrez votre pare-feu.',
      items: [
        'Protection contre les menaces',
        'Contrôle de votre réseau',
        'Administration simplifiée',
        'Sécurité de pointe'
      ]
    }
  ];

  getIconSvg(iconName: string): SafeHtml {
    const icons: { [key: string]: string } = {
      chart: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3V21H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7 16L12 11L16 15L21 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M21 10V3H14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      tools: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.7 6.3L9 12L11 14L16.7 8.3C17.09 7.91 17.09 7.28 16.7 6.89L15.11 5.3C14.72 4.91 14.09 4.91 13.7 5.3L14.7 6.3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M20 8L18 6L16 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8 16L6 18L8 20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M18 16L20 18L18 20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      support: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 17H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      code: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 18L22 12L16 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8 6L2 12L8 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      shield: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`
    };
    const svg = icons[iconName] || '';
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}
