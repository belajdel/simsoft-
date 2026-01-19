import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Language = 'fr' | 'en';

export interface TranslationKeys {
  // Navigation
  nav_home: string;
  nav_about: string;
  nav_products: string;
  nav_partners: string;
  nav_references: string;
  nav_contact: string;
  nav_blog: string;

  // Hero
  hero_title: string;
  hero_tagline: string;
  hero_description: string;
  hero_discover: string;
  hero_contact: string;

  // Products
  products_title: string;
  products_subtitle: string;
  products_description: string;
  products_all: string;
  products_erp: string;
  products_gmao: string;
  products_security: string;
  products_cloud: string;
  products_development: string;
  products_analytics: string;
  products_discover: string;
  products_end_title: string;
  products_end_desc: string;
  products_end_cta: string;
  products_end_about: string;
  products_empty_title: string;
  products_empty_desc: string;
  products_contact: string;

  // Contact
  contact_title: string;
  contact_subtitle: string;
  contact_description: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  contact_company: string;
  contact_subject: string;
  contact_message: string;
  contact_send: string;
  contact_sending: string;
  contact_success: string;
  contact_error_msg: string;
  contact_placeholder_name: string;
  contact_placeholder_email: string;
  contact_placeholder_phone: string;
  contact_placeholder_company: string;
  contact_placeholder_subject: string;
  contact_placeholder_message: string;
  contact_address_label: string;
  contact_email_label: string;
  contact_phone_label: string;

  // About section
  about_title: string;
  about_subtitle: string;
  about_description1: string;
  about_description2: string;
  about_description3: string;
  about_technology_title: string;
  about_technology_desc: string;
  about_international_title: string;
  about_international_desc: string;
  about_creation_year: string;
  about_filiales: string;
  about_experience: string;

  // Partners section
  partners_title: string;
  partners_subtitle: string;
  partners_description: string;

  // Search
  search_placeholder: string;
  search_no_results: string;
  search_try_different: string;
  search_show_more: string;

  // Feedback
  feedback_title: string;
  feedback_rate_experience: string;
  feedback_very_dissatisfied: string;
  feedback_dissatisfied: string;
  feedback_neutral: string;
  feedback_satisfied: string;
  feedback_very_satisfied: string;
  feedback_additional_comments: string;
  feedback_placeholder: string;
  feedback_submit: string;
  feedback_submitting: string;
  feedback_thank_you: string;
  feedback_appreciated: string;

  // Footer
  footer_tagline: string;
  footer_since: string;
  footer_nav_title: string;
  footer_products_title: string;
  footer_contact_title: string;
  footer_copyright: string;

  // Chatbot
  chatbot_welcome: string;
  chatbot_placeholder: string;

  // FAQ section
  faq_title: string;
  faq_subtitle: string;

  // References section
  references_title: string;
  references_subtitle: string;
  references_description: string;

  // Common
  loading: string;
  error: string;
  success: string;
  more_info: string;
  back: string;
  close: string;
  previous: string;
  next: string;
  menu_open: string;
  menu_close: string;
  all_rights_reserved: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private platformId = inject(PLATFORM_ID);

  private currentLanguage = signal<Language>('fr');

  readonly language = this.currentLanguage.asReadonly();

  // Translation dictionaries
  private translations: Record<Language, TranslationKeys> = {
    fr: {
      // Navigation
      nav_home: 'Accueil',
      nav_about: 'À Propos',
      nav_products: 'Produits',
      nav_partners: 'Partenaires',
      nav_references: 'Références',
      nav_contact: 'Contact',
      nav_blog: 'Blog',

      // Hero
      hero_title: 'Simsoft Technologies',
      hero_tagline: 'Pilotez vos activités en toute sécurité',
      hero_description: 'Solutions technologiques de pointe depuis 2000. Nous transformons vos défis en opportunités avec des systèmes sécurisés, performants et innovants.',
      hero_discover: 'Découvrir nos solutions',
      hero_contact: 'Nous contacter',

      // Products
      products_title: 'Nos Produits',
      products_subtitle: 'Solutions Complètes pour Votre Entreprise',
      products_description: 'Des logiciels performants conçus pour répondre aux besoins spécifiques de votre secteur d\'activité',
      products_all: 'Tous',
      products_erp: 'ERP',
      products_gmao: 'GMAO',
      products_security: 'Sécurité',
      products_cloud: 'Cloud',
      products_development: 'Développement',
      products_analytics: 'Analytics',
      products_discover: 'Découvrir',
      products_end_title: 'Vous avez exploré notre univers !',
      products_end_desc: 'Chaque solution est conçue pour répondre à vos défis uniques. Prêt à transformer votre entreprise ?',
      products_end_cta: 'Commencer le dialogue',
      products_end_about: 'En savoir plus sur nous',
      products_empty_title: 'Aucun produit trouvé',
      products_empty_desc: 'Essayez une autre catégorie ou contactez-nous pour une solution sur mesure.',
      products_contact: 'Contact',

      // Contact
      contact_title: 'Contactez-Nous',
      contact_subtitle: 'Contact',
      contact_description: 'Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans vos projets digitaux.',
      contact_name: 'Nom complet',
      contact_email: 'Email',
      contact_phone: 'Téléphone',
      contact_company: 'Entreprise',
      contact_subject: 'Sujet',
      contact_message: 'Message',
      contact_send: 'Envoyer le message',
      contact_sending: 'Envoi en cours...',
      contact_success: 'Votre message a été envoyé avec succès !',
      contact_error_msg: 'Échec de l\'envoi. Veuillez réessayer plus tard.',
      contact_placeholder_name: 'Votre nom',
      contact_placeholder_email: 'votre@email.com',
      contact_placeholder_phone: '+216 XX XXX XXX',
      contact_placeholder_company: 'Nom de votre entreprise',
      contact_placeholder_subject: 'Sujet de votre message',
      contact_placeholder_message: 'Décrivez votre projet ou vos besoins...',
      contact_address_label: 'Adresse',
      contact_email_label: 'Email',
      contact_phone_label: 'Téléphone',

      // About section
      about_title: 'À Propos',
      about_subtitle: 'Qui Sommes Nous ?',
      about_description1: 'SIMSOFT est un holding de deux entreprises, SIMSOFT TECHNOLOGY et SIMSOFT INTERNATIONALE.',
      about_description2: 'Sa création remonte à l\'an 2000 par son fondateur Monsieur SRIHI HATEM, lui-même ingénieur en développement informatique.',
      about_description3: 'SIMSOFT opère par le biais de ses deux filiales dans le domaine de l\'intégration des systèmes d\'information et du développement de logiciels.',
      about_technology_title: 'SIMSOFT TECHNOLOGY',
      about_technology_desc: 'Intégration des systèmes d\'information',
      about_international_title: 'SIMSOFT INTERNATIONALE',
      about_international_desc: 'Développement de logiciels',
      about_creation_year: 'Année de création',
      about_filiales: 'Filiales',
      about_experience: 'Années d\'expérience',

      // Partners section
      partners_title: 'Nos Partenaires',
      partners_subtitle: 'Ils nous font confiance',
      partners_description: 'Découvrez les entreprises qui nous font confiance pour leurs projets technologiques',

      // FAQ section
      faq_title: 'Questions Fréquentes',
      faq_subtitle: 'Retrouvez ici les réponses aux questions les plus courantes.',

      // References section
      references_title: 'Nos Références',
      references_subtitle: 'Ils Nous Font Confiance',
      references_description: 'Des entreprises de renom qui nous font confiance pour leurs solutions technologiques',

      // Search
      search_placeholder: 'Rechercher des produits, articles...',
      search_no_results: 'Aucun résultat trouvé pour',
      search_try_different: 'Essayez des termes différents ou vérifiez l\'orthographe.',
      search_show_more: 'Voir plus de résultats...',

      // Feedback
      feedback_title: 'Comment évaluez-vous notre site ?',
      feedback_rate_experience: 'Évaluez votre expérience :',
      feedback_very_dissatisfied: 'Très insatisfait',
      feedback_dissatisfied: 'Insatisfait',
      feedback_neutral: 'Neutre',
      feedback_satisfied: 'Satisfait',
      feedback_very_satisfied: 'Très satisfait',
      feedback_additional_comments: 'Commentaires supplémentaires (optionnel) :',
      feedback_placeholder: 'Dites-nous comment nous pouvons nous améliorer...',
      feedback_submit: 'Envoyer les commentaires',
      feedback_submitting: 'Envoi en cours...',
      feedback_thank_you: 'Merci pour vos commentaires !',
      feedback_appreciated: 'Vos commentaires nous aident à nous améliorer.',

      // Footer
      footer_tagline: 'Pilotez vos activités en toute sécurité',
      footer_since: 'Depuis 2000',
      footer_nav_title: 'Navigation',
      footer_products_title: 'Produits',
      footer_contact_title: 'Contact',
      footer_copyright: 'Simsoft Technologies. Tous droits réservés.',

      // Chatbot
      chatbot_welcome: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?',
      chatbot_placeholder: 'Écrivez votre message...',

      // Common
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès',
      more_info: 'En savoir plus',
      back: 'Retour',
      close: 'Fermer',
      previous: 'Précédent',
      next: 'Suivant',
      menu_open: 'Ouvrir le menu',
      menu_close: 'Fermer le menu',
      all_rights_reserved: 'Tous droits réservés.'
    },
    en: {
      // Navigation
      nav_home: 'Home',
      nav_about: 'About',
      nav_products: 'Products',
      nav_partners: 'Partners',
      nav_references: 'References',
      nav_contact: 'Contact',
      nav_blog: 'Blog',

      // Hero
      hero_title: 'Simsoft Technologies',
      hero_tagline: 'Control your activities in complete security',
      hero_description: 'Cutting-edge technological solutions since 2000. We transform your challenges into opportunities with secure, high-performance and innovative systems.',
      hero_discover: 'Discover our solutions',
      hero_contact: 'Contact us',

      // Products
      products_title: 'Our Products',
      products_subtitle: 'Complete Solutions for Your Business',
      products_description: 'High-performance software designed to meet the specific needs of your industry',
      products_all: 'All',
      products_erp: 'ERP',
      products_gmao: 'CMMS',
      products_security: 'Security',
      products_cloud: 'Cloud',
      products_development: 'Development',
      products_analytics: 'Analytics',
      products_discover: 'Discover',
      products_end_title: 'You have explored our universe!',
      products_end_desc: 'Each solution is designed to meet your unique challenges. Ready to transform your business?',
      products_end_cta: 'Start a dialogue',
      products_end_about: 'Learn more about us',
      products_empty_title: 'No products found',
      products_empty_desc: 'Try another category or contact us for a custom solution.',
      products_contact: 'Contact',

      // Contact
      contact_title: 'Contact Us',
      contact_subtitle: 'Contact',
      contact_description: 'Our team is at your disposal to answer all your questions and accompany you in your digital projects.',
      contact_name: 'Full name',
      contact_email: 'Email',
      contact_phone: 'Phone',
      contact_company: 'Company',
      contact_subject: 'Subject',
      contact_message: 'Message',
      contact_send: 'Send message',
      contact_sending: 'Sending...',
      contact_success: 'Your message has been sent successfully!',
      contact_error_msg: 'Sending failed. Please try again later.',
      contact_placeholder_name: 'Your name',
      contact_placeholder_email: 'your@email.com',
      contact_placeholder_phone: '+216 XX XXX XXX',
      contact_placeholder_company: 'Your company name',
      contact_placeholder_subject: 'Subject of your message',
      contact_placeholder_message: 'Describe your project or needs...',
      contact_address_label: 'Address',
      contact_email_label: 'Email',
      contact_phone_label: 'Phone',

      // About section
      about_title: 'About',
      about_subtitle: 'Who Are We?',
      about_description1: 'SIMSOFT is a holding company of two enterprises: SIMSOFT TECHNOLOGY and SIMSOFT INTERNATIONALE.',
      about_description2: 'It was founded in 2000 by its founder Mr. SRIHI HATEM, himself a software development engineer.',
      about_description3: 'SIMSOFT operates through its two subsidiaries in the field of information systems integration and software development.',
      about_technology_title: 'SIMSOFT TECHNOLOGY',
      about_technology_desc: 'Information systems integration',
      about_international_title: 'SIMSOFT INTERNATIONALE',
      about_international_desc: 'Software development',
      about_creation_year: 'Year of creation',
      about_filiales: 'Subsidiaries',
      about_experience: 'Years of experience',

      // Partners section
      partners_title: 'Our Partners',
      partners_subtitle: 'They Trust Us',
      partners_description: 'Discover the companies that trust us for their technological projects',

      // FAQ section
      faq_title: 'Frequently Asked Questions',
      faq_subtitle: 'Find answers to the most common questions here.',

      // References section
      references_title: 'Our References',
      references_subtitle: 'They Trust Us',
      references_description: 'Renowned companies that trust us for their technological solutions',

      // Search
      search_placeholder: 'Search for products, articles...',
      search_no_results: 'No results found for',
      search_try_different: 'Try different terms or check the spelling.',
      search_show_more: 'See more results...',

      // Feedback
      feedback_title: 'How satisfied are you with our website?',
      feedback_rate_experience: 'Rate your experience:',
      feedback_very_dissatisfied: 'Very Dissatisfied',
      feedback_dissatisfied: 'Dissatisfied',
      feedback_neutral: 'Neutral',
      feedback_satisfied: 'Satisfied',
      feedback_very_satisfied: 'Very Satisfied',
      feedback_additional_comments: 'Additional comments (optional):',
      feedback_placeholder: 'Tell us how we can improve...',
      feedback_submit: 'Submit Feedback',
      feedback_submitting: 'Submitting...',
      feedback_thank_you: 'Thank you for your feedback!',
      feedback_appreciated: 'Your feedback helps us improve our services.',

      // Footer
      footer_tagline: 'Control your activities in complete security',
      footer_since: 'Since 2000',
      footer_nav_title: 'Navigation',
      footer_products_title: 'Products',
      footer_contact_title: 'Contact',
      footer_copyright: 'Simsoft Technologies. All rights reserved.',

      // Chatbot
      chatbot_welcome: 'Hello! How can I help you today?',
      chatbot_placeholder: 'Type your message...',

      // Common
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      more_info: 'Learn more',
      back: 'Back',
      close: 'Close',
      previous: 'Previous',
      next: 'Next',
      menu_open: 'Open menu',
      menu_close: 'Close menu',
      all_rights_reserved: 'All rights reserved.'
    },
  };

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // Load language from localStorage or default to French
      const savedLanguage = localStorage.getItem('language') as Language;
      const initialLanguage = savedLanguage || 'fr';
      this.setLanguage(initialLanguage);
    }
  }

  setLanguage(language: Language) {
    this.currentLanguage.set(language);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('language', language);
      document.documentElement.lang = language;
      document.documentElement.dir = 'ltr';
    }
  }

  getTranslation(key: keyof TranslationKeys): string {
    const currentLang = this.currentLanguage();
    return this.translations[currentLang]?.[key] || this.translations.fr[key] || key;
  }

  translate(key: keyof TranslationKeys): string {
    return this.getTranslation(key);
  }
}