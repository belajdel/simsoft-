import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-faq',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './faq.html',
    styleUrls: ['./faq.css']
})
export class Faq {
    faqs = signal([
        {
            question: 'Comment obtenir un devis personnalisé ?',
            answer: 'Vous pouvez obtenir un devis en remplissant notre formulaire de contact ou en nous appelant directement. Nos commerciaux analyseront vos besoins pour vous proposer la meilleure offre.',
            isOpen: false
        },
        {
            question: 'Vos solutions ERP (Divalto) sont-elles adaptées aux petites entreprises ?',
            answer: 'Oui, Divalto est une solution modulaire. Nous pouvons déployer uniquement les modules nécessaires à votre activité et faire évoluer la solution avec votre croissance.',
            isOpen: false
        },
        {
            question: 'Assurez-vous la migration de nos anciennes données ?',
            answer: 'Absolument. Nos ingénieurs sont experts en reprise de données. Nous assurons la migration sécurisée de votre ancien système vers nos solutions.',
            isOpen: false
        },
        {
            question: 'Quel est le délai de mise en place d\'un projet ?',
            answer: 'Le délai varie selon la complexité du projet (de quelques semaines pour une installation standard à plusieurs mois pour un ERP complet avec développements spécifiques). Un planning détaillé est fourni au début du projet.',
            isOpen: false
        },
        {
            question: 'Proposez-vous un contrat de maintenance ?',
            answer: 'Oui, nous proposons différents niveaux de contrats de maintenance (Hotline, Télémaintenance, Intervention sur site) pour garantir la continuité de votre activité.',
            isOpen: false
        }
    ]);

    toggle(index: number) {
        this.faqs.update(items => {
            const newItems = [...items];
            newItems[index].isOpen = !newItems[index].isOpen;
            return newItems;
        });
    }
}
