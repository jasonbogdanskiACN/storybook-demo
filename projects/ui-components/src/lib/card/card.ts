import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'lib-card',
  standalone: true,
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  /** Card title text */
  readonly title = input<string>('');

  /** Card subtitle text */
  readonly subtitle = input<string>('');

  /** URL for the card image */
  readonly imageUrl = input<string>('');

  /** Whether the card should have an elevated appearance */
  readonly elevated = input<boolean>(false);
}
