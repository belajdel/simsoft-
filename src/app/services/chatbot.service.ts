import { Injectable, signal, inject, effect } from '@angular/core';
import { LanguageService } from './language.service';

export interface ChatMessage {
    text: string;
    isUser: boolean;
    timestamp: Date;
}

@Injectable({
    providedIn: 'root'
})
export class ChatbotService {
    private languageService = inject(LanguageService);

    private messagesSignal = signal<ChatMessage[]>([]);

    private isOpenSignal = signal<boolean>(false);

    readonly messages = this.messagesSignal.asReadonly();
    readonly isOpen = this.isOpenSignal.asReadonly();

    constructor() {
        // Initialize with welcome message in current language
        effect(() => {
            if (this.messagesSignal().length === 0) {
                this.messagesSignal.set([
                    {
                        text: this.languageService.translate('chatbot_welcome'),
                        isUser: false,
                        timestamp: new Date()
                    }
                ]);
            }
        }, { allowSignalWrites: true });
    }

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
        const lang = this.languageService.language();
        const lowerText = userText.toLowerCase();
        let responseText = "";

        if (lang === 'fr') {
            responseText = this.generateFrenchResponse(lowerText);
        } else {
            responseText = this.generateEnglishResponse(lowerText);
        }

        this.messagesSignal.update(msgs => [...msgs, { text: responseText, isUser: false, timestamp: new Date() }]);
    }

    private generateFrenchResponse(lowerText: string): string {
        if (lowerText.includes('bonjour') || lowerText.includes('salut') || lowerText.includes('hello')) {
            return "Bonjour ! 👋 Je suis l'assistant virtuel de SimSoft. Comment puis-je vous aider ?";
        }
        if (lowerText.includes('prix') || lowerText.includes('tarif') || lowerText.includes('devis')) {
            return "Nos tarifs varient selon la solution. ERP (Divalto) à partir de 1 500€/mois, GMAO (FirstParc) dès 800€/mois. Souhaitez-vous un devis ?";
        }
        if (lowerText.includes('divalto') || lowerText.includes('erp')) {
            return "Divalto est notre ERP phare pour PME. Il gère ventes, stocks, compta et production.";
        }
        if (lowerText.includes('contact') || lowerText.includes('téléphone')) {
            return "Vous pouvez nous joindre au +216 73 21 36 88 ou par email à commercial@simsoft.com.tn";
        }
        return "Je ne suis pas sûr de comprendre. Pouvez-vous reformuler ? Vous pouvez m'interroger sur nos produits ou services.";
    }

    private generateEnglishResponse(lowerText: string): string {
        if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
            return "Hello! 👋 I am SimSoft's virtual assistant. How can I help you today?";
        }
        if (lowerText.includes('price') || lowerText.includes('cost') || lowerText.includes('quote')) {
            return "Our prices vary by solution. ERP (Divalto) starts at €1,500/month, CMMS (FirstParc) from €800/month. Would you like a quote?";
        }
        if (lowerText.includes('divalto') || lowerText.includes('erp')) {
            return "Divalto is our flagship ERP for SMEs. It manages sales, stocks, accounting and production.";
        }
        if (lowerText.includes('contact') || lowerText.includes('phone') || lowerText.includes('call')) {
            return "You can reach us at +216 73 21 36 88 or by email at commercial@simsoft.com.tn";
        }
        return "I'm not sure I understand. Could you please rephrase? You can ask about our products or services.";
    }
}
