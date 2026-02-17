import { ChangeDetectionStrategy, Component, computed, input, signal, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

export type InputTextType = 'text' | 'password' | 'email' | 'tel' | 'url' | 'number';
export type InputTextSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'lib-input-text',
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule],
  templateUrl: './input-text.html',
  styleUrl: './input-text.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})
export class InputTextComponent implements ControlValueAccessor {
  /** The input value */
  protected readonly value = signal<string>('');

  /** Input placeholder text */
  readonly placeholder = input<string>('');

  /** Input type */
  readonly type = input<InputTextType>('text');

  /** Input size */
  readonly size = input<InputTextSize>('medium');

  /** Whether input is disabled */
  readonly disabled = input<boolean>(false);

  /** Whether input is required */
  readonly required = input<boolean>(false);

  /** Input ARIA label for accessibility */
  readonly ariaLabel = input<string>('');

  /** @internal */
  private onChange: (value: string) => void = () => {};

  /** @internal */
  private onTouched: () => void = () => {};

  /**
   * Map size to PrimeNG size class
   * @internal
   */
  protected readonly sizeClass = computed<string>(() => {
    const size = this.size();
    if (size === 'small') return 'p-inputtext-sm';
    if (size === 'large') return 'p-inputtext-lg';
    return '';
  });

  /**
   * Computed ARIA label with fallback to placeholder
   * @internal
   */
  protected readonly computedAriaLabel = computed<string>(() => {
    return this.ariaLabel() || this.placeholder() || 'Text input';
  });

  /**
   * Handle input change event
   * @param value - The new input value
   * @internal
   */
  protected handleInputChange(value: string): void {
    this.value.set(value);
    this.onChange(value);
  }

  /**
   * Handle input blur event
   * @internal
   */
  protected handleBlur(): void {
    this.onTouched();
  }

  // ControlValueAccessor implementation

  /**
   * Write a new value to the component
   * @param value - The new value
   */
  writeValue(value: string): void {
    this.value.set(value || '');
  }

  /**
   * Register a callback function for value changes
   * @param fn - The callback function
   */
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  /**
   * Register a callback function for touch events
   * @param fn - The callback function
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Set the disabled state
   * @param _isDisabled - Whether the component should be disabled (unused - handled via input signal)
   */
  setDisabledState(_isDisabled: boolean): void {
    // Disabled state is handled via input signal
    // This method is here for ControlValueAccessor compatibility
  }
}
