import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AlertType = 'info' | 'success' | 'warning' | 'error';

@Component({
  selector: 'app-alert',
  imports: [CommonModule],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
})
export class Alert {
  @Input() type: AlertType = 'info';
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() dismissible: boolean = false;
  @Output() onDismiss = new EventEmitter<void>();

  dismissed = false;

  dismiss() {
    this.dismissed = true;
    this.onDismiss.emit();
  }

  get icon(): string {
    const icons = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌'
    };
    return icons[this.type];
  }
}
