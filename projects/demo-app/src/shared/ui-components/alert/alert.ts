import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { MessageModule } from 'primeng/message';

export type AlertType = 'info' | 'success' | 'warning' | 'error';

@Component({
  selector: 'lib-alert',
  standalone: true,
  imports: [MessageModule],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  /** Alert type determines the color and icon */
  readonly type = input<AlertType>('info');

  /** Alert title text */
  readonly title = input<string>('');

  /** Alert message text */
  readonly message = input<string>('');

  /** Whether the alert can be dismissed by the user */
  readonly dismissible = input<boolean>(false);

  /** Emitted when the alert is dismissed */
  readonly onDismiss = output<void>();

  /** Internal state tracking if alert has been dismissed */
  protected readonly dismissed = signal<boolean>(false);

  /**
   * Map alert type to PrimeNG severity
   * @internal
   */
  protected readonly severity = computed<'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast'>(() => {
    const typeMap: Record<AlertType, 'success' | 'info' | 'warn' | 'error'> = {
      info: 'info',
      success: 'success',
      warning: 'warn',
      error: 'error'
    };
    return typeMap[this.type()];
  });

  /**
   * Computed message summary (combines title and message)
   * @internal
   */
  protected readonly summary = computed<string>(() => this.title() || this.type().charAt(0).toUpperCase() + this.type().slice(1));

  /**
   * Computed message detail
   * @internal
   */
  protected readonly detail = computed<string>(() => this.message());

  /**
   * Dismiss the alert
   * @internal
   */
  protected dismiss(): void {
    this.dismissed.set(true);
    this.onDismiss.emit();
  }
}
