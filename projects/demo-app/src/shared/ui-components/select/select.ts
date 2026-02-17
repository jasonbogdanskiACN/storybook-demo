import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';

export type SelectSize = 'small' | 'medium' | 'large';

/** Option interface for select dropdown */
export interface SelectOption<T = string> {
  /** Display label for the option */
  label: string;
  /** Value of the option */
  value: T;
  /** Whether the option is disabled */
  disabled?: boolean;
}

@Component({
  selector: 'lib-select',
  standalone: true,
  imports: [SelectModule, FormsModule],
  templateUrl: './select.html',
  styleUrl: './select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent<T = string> {
  /** The selected value (two-way binding) */
  readonly value = model<T | null>(null);

  /** Array of options to display */
  readonly options = input.required<SelectOption<T>[]>();

  /** Placeholder text when no value is selected */
  readonly placeholder = input<string>('Select an option');

  /** Select size */
  readonly size = input<SelectSize>('medium');

  /** Whether select is disabled */
  readonly disabled = input<boolean>(false);

  /** Whether select is required */
  readonly required = input<boolean>(false);

  /** Whether to show a clear button */
  readonly showClear = input<boolean>(false);

  /** Whether to enable filtering/search */
  readonly filter = input<boolean>(false);

  /** Select ARIA label for accessibility */
  readonly ariaLabel = input<string>('');

  /**
   * Map size to PrimeNG size class
   * @internal
   */
  protected readonly sizeClass = computed<string>(() => {
    const size = this.size();
    if (size === 'small') return 'p-select-sm';
    if (size === 'large') return 'p-select-lg';
    return '';
  });

  /**
   * Computed ARIA label with fallback to placeholder
   * @internal
   */
  protected readonly computedAriaLabel = computed<string>(() => {
    return this.ariaLabel() || this.placeholder() || 'Select dropdown';
  });
}
