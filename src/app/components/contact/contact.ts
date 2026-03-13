import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Faq } from '../faq/faq';
import { LanguageService } from '../../services/language.service';

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
  private http = inject(HttpClient);

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

  onSubmit() {
    if (!this.formData().name || !this.formData().email || !this.formData().message) {
      this.submitError.set('Name, email, and message are required.');
      return;
    }

    this.isSubmitting.set(true);
    this.submitError.set('');

    const payload = {
      name: this.formData().name,
      email: this.formData().email,
      phone: this.formData().phone,
      company: this.formData().company,
      subject: this.formData().subject,
      message: this.formData().message,
    };

    this.http.post('http://localhost:5000/api/contact', payload).subscribe({
      next: () => {
        this.submitSuccess.set(true);
        this.formData.set({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: ''
        });

        setTimeout(() => {
          this.submitSuccess.set(false);
        }, 5000);
        this.isSubmitting.set(false);
      },
      error: (err) => {
        console.error('Submission error:', err);
        this.submitError.set('There was an error submitting your message. Please try again.');
        this.isSubmitting.set(false);
      }
    });
  }

  updateField(field: keyof ContactForm, value: string) {
    this.formData.update(current => ({
      ...current,
      [field]: value
    }));
  }
}