import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService, Language } from '../../services/language.service';

interface MultiLang {
    fr: string;
    en: string;
}

interface FaqItem {
    question: MultiLang;
    answer: MultiLang;
    isOpen: boolean;
}

@Component({
    selector: 'app-faq',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './faq.html',
    styleUrls: ['./faq.css']
})
export class Faq {
    protected languageService = inject(LanguageService);

    private faqsData = signal<FaqItem[]>([
        {
            question: {
                fr: 'Comment obtenir un devis personnalisé ?',
                en: 'How can I get a custom quote?'
            },
            answer: {
                fr: 'Vous pouvez obtenir un devis en remplissant notre formulaire de contact ou en nous appelant directement. Nos commerciaux analyseront vos besoins pour vous proposer la meilleure offre.',
                en: 'You can get a quote by filling out our contact form or by calling us directly. Our sales team will analyze your needs to offer you the best deal.'
            },
            isOpen: false
        },
        {
            question: {
                fr: 'Vos solutions ERP (Divalto) sont-elles adaptées aux petites entreprises ?',
                en: 'Are your ERP solutions (Divalto) suitable for small businesses?'
            },
            answer: {
                fr: 'Oui, Divalto est une solution modulaire. Nous pouvons déployer uniquement les modules nécessaires à votre activité et faire évoluer la solution avec votre croissance.',
                en: 'Yes, Divalto is a modular solution. We can deploy only the modules necessary for your activity and evolve the solution with your growth.'
            },
            isOpen: false
        },
        {
            question: {
                fr: 'Assurez-vous la migration de nos anciennes données ?',
                en: 'Do you handle the migration of our old data?'
            },
            answer: {
                fr: 'Absolument. Nos ingénieurs sont experts en reprise de données. Nous assurons la migration sécurisée de votre ancien système vers nos solutions.',
                en: 'Absolutely. Our engineers are experts in data recovery. We ensure the secure migration of your old system to our solutions.'
            },
            isOpen: false
        },
        {
            question: {
                fr: 'Quel est le délai de mise en place d\'un projet ?',
                en: 'What is the implementation timeframe for a project?'
            },
            answer: {
                fr: 'Le délai varie selon la complexité du projet (de quelques semaines pour une installation standard à plusieurs mois pour un ERP complet avec développements spécifiques). Un planning détaillé est fourni au début du projet.',
                en: 'The timeframe varies according to the complexity of the project (from a few weeks for a standard installation to several months for a complete ERP with specific developments). A detailed schedule is provided at the start of the project.'
            },
            isOpen: false
        },
        {
            question: {
                fr: 'Proposez-vous un contrat de maintenance ?',
                en: 'Do you offer a maintenance contract?'
            },
            answer: {
                fr: 'Oui, nous proposons différents niveaux de contrats de maintenance (Hotline, Télémaintenance, Intervention sur site) pour garantir la continuité de votre activité.',
                en: 'Yes, we offer different levels of maintenance contracts (Hotline, Remote Maintenance, On-site Intervention) to guarantee the continuity of your activity.'
            },
            isOpen: false
        }
    ]);

    faqs = computed(() => {
        const lang = this.languageService.language();
        return this.faqsData().map(item => ({
            question: item.question[lang],
            answer: item.answer[lang],
            isOpen: item.isOpen
        }));
    });

    toggle(index: number) {
        this.faqsData.update(items => {
            const newItems = [...items];
            newItems[index].isOpen = !newItems[index].isOpen;
            return newItems;
        });
    }
}
