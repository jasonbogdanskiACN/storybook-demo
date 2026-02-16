import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';

export type AlertType = 'info' | 'success' | 'warning' | 'error';

@Component({
  selector: 'lib-alert',
  standalone: true,
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
   * Computed icon based on alert type
   */
  protected readonly icon = computed<string>(() => {
    const icons: Record<AlertType, string> = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌'
    };
    return icons[this.type()];
  });

  /**
   * Dismiss the alert
   * @internal
   */
  protected dismiss(): void {
    this.dismissed.set(true);
    this.onDismiss.emit();
  }
}
