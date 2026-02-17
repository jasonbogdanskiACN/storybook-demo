import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';
export type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'lib-button',
  standalone: true,
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
