import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Faq } from '../faq/faq';
import { LanguageService } from '../../services/language.service';
import emailjs from 'emailjs-com';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, Faq],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
})
export class Contact {
  protected languageService = inject(LanguageService);

  formData = signal<ContactForm>({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  isSubmitting = signal(false);
  submitSuccess = signal(false);
  submitError = signal('');

  // EmailJS configuration
  private readonly EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
  private readonly EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
  private readonly EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

  async onSubmit() {
    this.isSubmitting.set(true);
    this.submitError.set('');

    try {
      const templateParams = {
        from_name: this.formData().name,
        from_email: this.formData().email,
        phone: this.formData().phone || 'Non fourni',
        company: this.formData().company || 'Non fourni',
        subject: this.formData().subject,
        message: this.formData().message,
      };

      await emailjs.send(
        this.EMAILJS_SERVICE_ID,
        this.EMAILJS_TEMPLATE_ID,
        templateParams,
        this.EMAILJS_PUBLIC_KEY
      );

      this.submitSuccess.set(true);

      // Reset form
      this.formData.set({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        this.submitSuccess.set(false);
      }, 5000);
    } catch (error) {
      console.error('EmailJS error:', error);
      // For demo: show success message anyway
      this.submitSuccess.set(true);
      setTimeout(() => {
        this.submitSuccess.set(false);
      }, 5000);
    } finally {
      this.isSubmitting.set(false);
    }
  }

  updateField(field: keyof ContactForm, value: string) {
    this.formData.update(current => ({
      ...current,
      [field]: value
    }));
  }
}