import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonSeverity = 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'danger' | 'help' | 'contrast' | null;

@Component({
  selector: 'storybook-button',
  standalone: true,
  imports: [ButtonModule],
  template: `<p-button
    [label]="label()"
    [severity]="severity()"
    [size]="buttonSize()"
    [rounded]="true"
    [styleClass]="customClass()"
    [attr.aria-label]="label()"
    (onClick)="onClick.emit($event)"
  />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  /** Is this the principal call to action on the page? */
  readonly primary = input<boolean>(false);

  /** What background color to use */
  readonly backgroundColor = input<string>();

  /** How large should the button be? */
  readonly size = input<ButtonSize>('medium');

  /**
   * Button contents
   *
   * @required
   */
  readonly label = input<string>('Button');

  /** Optional click handler */
  readonly onClick = output<Event>();

  /** Computed severity based on primary flag */
  protected readonly severity = computed<ButtonSeverity>(() =>
    this.primary() ? null : 'secondary'
  );

  /** Computed button size mapped to PrimeNG values */
  protected readonly buttonSize = computed<'small' | 'large' | undefined>(() => {
    const currentSize = this.size();
    if (currentSize === 'small') return 'small';
    if (currentSize === 'large') return 'large';
    return undefined;
  });

  /** Computed custom class for background color */
  protected readonly customClass = computed<string>(() =>
    this.backgroundColor() ? 'custom-bg' : ''
  );
}
