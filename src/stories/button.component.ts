import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'storybook-button',
  standalone: true,
  imports: [ButtonModule],
  template: `<p-button
    [label]="label"
    [severity]="severity"
    [size]="buttonSize"
    [rounded]="true"
    [styleClass]="customClass"
    (onClick)="onClick.emit($event)"
  />`,
})
export class ButtonComponent {
  /** Is this the principal call to action on the page? */
  @Input()
  primary = false;

  /** What background color to use */
  @Input()
  backgroundColor?: string;

  /** How large should the button be? */
  @Input()
  size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Button contents
   *
   * @required
   */
  @Input()
  label = 'Button';

  /** Optional click handler */
  @Output()
  onClick = new EventEmitter<Event>();

  public get severity(): 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'danger' | 'help' | 'contrast' | null {
    return this.primary ? null : 'secondary';
  }

  public get buttonSize(): 'small' | 'large' | undefined {
    if (this.size === 'small') return 'small';
    if (this.size === 'large') return 'large';
    return undefined;
  }

  public get customClass(): string {
    return this.backgroundColor ? 'custom-bg' : '';
  }
}
