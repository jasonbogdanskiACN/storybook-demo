# UI Components Library

Modern Angular component library built with signals, standalone components, and OnPush change detection.

## Features

- ✅ **Signal-based architecture** - Built with Angular 21's modern signals API
- ✅ **OnPush change detection** - Optimized for maximum performance
- ✅ **Standalone components** - No NgModule dependencies
- ✅ **TypeScript strict mode** - Full type safety
- ✅ **Accessibility first** - WCAG compliant with ARIA labels
- ✅ **Comprehensive documentation** - JSDoc comments on all public APIs
- ✅ **Storybook integration** - Interactive component documentation

## Components

### Button Component

Customizable button with variants and sizes.

**Variants**: `primary` | `secondary` | `danger` | `success`
**Sizes**: `small` | `medium` | `large`

```typescript
import { ButtonComponent } from 'ui-components';

<lib-button
  label="Click me"
  variant="primary"
  size="medium"
  (onClick)="handleClick($event)"
/>
```

**Inputs**:
- `label` (string) - Button text
- `variant` (ButtonVariant) - Visual style
- `size` (ButtonSize) - Button size
- `disabled` (boolean) - Disabled state

**Outputs**:
- `onClick` (Event) - Emitted when button is clicked

### Alert Component

Alert messages with types and optional dismiss functionality.

**Types**: `info` | `success` | `warning` | `error`

```typescript
import { AlertComponent } from 'ui-components';

<lib-alert
  type="success"
  title="Success!"
  message="Operation completed."
  [dismissible]="true"
  (onDismiss)="handleDismiss()"
/>
```

**Inputs**:
- `type` (AlertType) - Alert type determines color and icon
- `title` (string) - Alert title
- `message` (string) - Alert message
- `dismissible` (boolean) - Whether alert can be dismissed

**Outputs**:
- `onDismiss` (void) - Emitted when alert is dismissed

### Card Component

Card container with title, subtitle, and optional image.

```typescript
import { CardComponent } from 'ui-components';

<lib-card
  title="Card Title"
  subtitle="Card subtitle"
  imageUrl="https://example.com/image.jpg"
  [elevated]="true"
>
  <p>Card body content goes here</p>
</lib-card>
```

**Inputs**:
- `title` (string) - Card title
- `subtitle` (string) - Card subtitle
- `imageUrl` (string) - Optional image URL
- `elevated` (boolean) - Elevated appearance with shadow

**Content Projection**:
- Default slot - Card body content via `<ng-content>`

## Installation

This library is currently part of a monorepo workspace. To use it in the same workspace:

```typescript
import { ButtonComponent, AlertComponent, CardComponent } from 'ui-components';
```

### Future: npm Package

When published to npm:

```bash
npm install @myorg/ui-components
```

## Usage Example

```typescript
import { Component } from '@angular/core';
import { ButtonComponent, AlertComponent, CardComponent } from 'ui-components';

@Component({
  selector: 'app-my-page',
  standalone: true,
  imports: [ButtonComponent, AlertComponent, CardComponent],
  template: `
    <lib-card title="Welcome">
      <lib-alert
        type="info"
        message="This is a demo of our component library"
      />

      <lib-button
        label="Get Started"
        variant="primary"
        (onClick)="handleClick()"
      />
    </lib-card>
  `
})
export class MyPageComponent {
  handleClick(): void {
    console.log('Button clicked!');
  }
}
```

## Development

### Running Storybook

View interactive component documentation:

```bash
npm run storybook
```

Opens at http://localhost:6006

### Building the Library

```bash
npm run build:lib
```

Output: `dist/ui-components/`

### Running Tests

```bash
npm run test:lib
```

## Architecture

All components follow these principles:

1. **Signal-based** - Use `input()`, `output()`, `signal()`, `computed()`
2. **OnPush Change Detection** - Optimal performance
3. **Standalone** - No module dependencies
4. **Type Safe** - Explicit TypeScript types
5. **Accessible** - ARIA labels on all interactive elements
6. **Documented** - JSDoc comments on public APIs

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

See the main workspace README for contribution guidelines.

## Documentation

Full documentation with interactive examples available in Storybook:

```bash
npm run storybook
```

## Related Projects

- **Demo App** (`projects/demo-app/`) - Example consumer application
- **Storybook** - Interactive component documentation

## Support

For issues or questions, please open an issue in the main repository.
