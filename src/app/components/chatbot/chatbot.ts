import { Component, inject, viewChild, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../services/chatbot.service';
import { ElementRef } from '@angular/core';

@Component({
    selector: 'app-chatbot',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './chatbot.html',
    styleUrls: ['./chatbot.css']
})
export class Chatbot implements AfterViewChecked {
    private chatbotService = inject(ChatbotService);
    private cdr = inject(ChangeDetectorRef);

    messages = this.chatbotService.messages;
    isOpen = this.chatbotService.isOpen;

    userMessage = '';
    messagesContainer = viewChild<ElementRef>('messagesContainer');
    private lastMessageCount = 0;

    ngAfterViewChecked() {
        // Auto-scroll when new messages arrive
        const currentCount = this.messages().length;
        if (currentCount !== this.lastMessageCount) {
            this.lastMessageCount = currentCount;
            setTimeout(() => this.scrollToBottom(), 50);
        }
    }

    toggleChat() {
        this.chatbotService.toggleChat();
        if (this.isOpen()) {
            setTimeout(() => this.scrollToBottom(), 100);
        }
    }

    sendMessage() {
        if (!this.userMessage.trim()) return;

        this.chatbotService.sendMessage(this.userMessage);
        this.userMessage = '';
    }

    sendQuickMessage(message: string) {
        this.userMessage = message;
        this.sendMessage();
    }

    private scrollToBottom() {
        const container = this.messagesContainer();
        if (container?.nativeElement) {
            const element = container.nativeElement;
            requestAnimationFrame(() => {
                element.scrollTop = element.scrollHeight;
            });
        }
    }
}
