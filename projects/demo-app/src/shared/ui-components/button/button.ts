import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';
export type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  /** Button text label */
  readonly label = input<string>('Button');

  /** Button visual variant */
  readonly variant = input<ButtonVariant>('primary');

  /** Button size */
  readonly size = input<ButtonSize>('medium');

  /** Whether button is disabled */
  readonly disabled = input<boolean>(false);

  /** Emitted when button is clicked */
  readonly onClick = output<Event>();

  /**
   * Map variant to PrimeNG severity
   * @internal
   */
  protected readonly severity = computed<'success' | 'info' | 'warn' | 'danger' | 'help' | 'secondary' | 'contrast' | undefined>(() => {
    const variantMap: Record<ButtonVariant, 'success' | 'info' | 'danger' | 'secondary'> = {
      primary: 'info',
      secondary: 'secondary',
      danger: 'danger',
      success: 'success'
    };
    return variantMap[this.variant()];
  });

  /**
   * Map size to PrimeNG size (medium maps to undefined/default)
   * @internal
   */
  protected readonly primeSize = computed<'small' | 'large' | undefined>(() => {
    const size = this.size();
    return size === 'medium' ? undefined : size;
  });

  /**
   * Handle button click event
   * @param event - The click event
   * @internal
   */
  protected handleClick(event: Event): void {
    if (!this.disabled()) {
      this.onClick.emit(event);
    }
  }
}
