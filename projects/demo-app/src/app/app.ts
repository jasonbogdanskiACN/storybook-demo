import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ButtonComponent,
  AlertComponent,
  CardComponent,
  InputTextComponent,
  SelectComponent,
  SelectOption
} from 'ui-components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ButtonComponent,
    AlertComponent,
    CardComponent,
    InputTextComponent,
    SelectComponent,
    ReactiveFormsModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly title = signal('UI Components Demo');

  protected readonly showSuccessAlert = signal(true);
  protected readonly showErrorAlert = signal(true);

  // Reactive form
  protected readonly userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  // Select options
  protected readonly countryOptions: SelectOption[] = [
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Canada', value: 'ca' },
    { label: 'Australia', value: 'au' },
    { label: 'Germany', value: 'de' },
    { label: 'France', value: 'fr' },
    { label: 'Japan', value: 'jp' },
    { label: 'China', value: 'cn' },
  ];

  protected readonly roleOptions: SelectOption[] = [
    { label: 'Administrator', value: 'admin' },
    { label: 'Developer', value: 'developer' },
    { label: 'Designer', value: 'designer' },
    { label: 'Manager', value: 'manager' },
    { label: 'User', value: 'user' },
  ];

  protected readonly selectedCountry = signal<string | null>(null);
  protected readonly selectedRole = signal<string | null>(null);

  protected handleButtonClick(variant: string): void {
    console.warn(`${variant} button clicked!`);
  }

  protected handleAlertDismiss(type: string): void {
    console.warn(`${type} alert dismissed`);
    if (type === 'success') {
      this.showSuccessAlert.set(false);
    } else if (type === 'error') {
      this.showErrorAlert.set(false);
    }
  }

  protected handleFormSubmit(): void {
    if (this.userForm.valid) {
      console.warn('Form submitted:', {
        ...this.userForm.value,
        country: this.selectedCountry(),
        role: this.selectedRole(),
      });
    } else {
      console.warn('Form is invalid');
      this.userForm.markAllAsTouched();
    }
  }
}
