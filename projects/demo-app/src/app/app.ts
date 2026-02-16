import { Component, signal } from '@angular/core';
import { ButtonComponent, AlertComponent, CardComponent } from 'ui-components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent, AlertComponent, CardComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('UI Components Demo');

  protected readonly showSuccessAlert = signal(true);
  protected readonly showErrorAlert = signal(true);

  protected handleButtonClick(variant: string): void {
    console.log(`${variant} button clicked!`);
  }

  protected handleAlertDismiss(type: string): void {
    console.log(`${type} alert dismissed`);
    if (type === 'success') {
      this.showSuccessAlert.set(false);
    } else if (type === 'error') {
      this.showErrorAlert.set(false);
    }
  }
}
