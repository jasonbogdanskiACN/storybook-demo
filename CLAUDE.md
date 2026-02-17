# Claude Development Instructions

This file contains instructions for Claude (AI assistant) when working with this Angular + Storybook + PrimeNG codebase.

## Project Overview

This is an Angular 21 workspace (monorepo) using:
- **Angular 21.1.0** - Latest Angular with signals and modern features
- **PrimeNG 21.1.1** - UI component library with Aura theme (used in demo app)
- **Storybook 10.2.8** - Component documentation and development environment
- **TypeScript 5.9.2** - Strict mode enabled

## Workspace Structure

This is a single Angular application with shared UI components:

### Demo Application (`projects/demo-app/`)

Main application containing:
- **`src/app/`** - Application code
- **`src/shared/ui-components/`** - Reusable shared components:
  - **Button Component** - Customizable button with variants (primary, secondary, danger, success) and sizes
  - **Alert Component** - Alert messages with types (info, success, warning, error) and dismissible option
  - **Card Component** - Card container with title, subtitle, and optional image

All shared components follow Angular best practices:
- Signal-based architecture (input(), output(), signal(), computed())
- OnPush change detection for optimal performance
- Modern control flow syntax (@if, @for)
- Standalone components
- Full TypeScript type safety
- Accessibility attributes (ARIA labels)
- Comprehensive JSDoc documentation

**Component Selectors**: All shared components use the `lib-` prefix (e.g., `<lib-button>`, `<lib-alert>`, `<lib-card>`)

### Storybook

Interactive documentation for shared components located at `.storybook/`. Provides isolated component development and auto-generated documentation.

## Development Workflows

### Component Development (Storybook)

Use Storybook for isolated component development and documentation:

```bash
npm run storybook
# Opens Storybook at http://localhost:6006
# Shows all shared components with interactive controls
# Auto-reloads when you edit component files
```

**When to use**:
- Developing or modifying shared components
- Testing component variations and edge cases
- Viewing auto-generated documentation from JSDoc comments

### Application Development

Use the demo app to test components in context:

```bash
npm run start:demo
# Serves demo app at http://localhost:4200
# Hot-reloads when components or app code changes
```

**When to use**:
- Testing how components work in a real application
- Verifying component composition and layouts
- End-to-end testing of component interactions

### Building for Production

```bash
# Build demo app
npm run build:demo
# Output: dist/demo-app/
```

### Running Tests

```bash
# Test demo app
npm run test:demo

# Test everything
npm run test:all
```

## Importing Library Components

In any Angular application (including the demo app), import components from `ui-components`:

```typescript
import { ButtonComponent, AlertComponent, CardComponent } from 'ui-components';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [ButtonComponent, AlertComponent, CardComponent],
  template: `
    <lib-button label="Click me" variant="primary" />
    <lib-alert type="success" message="It works!" />
    <lib-card title="My Card" subtitle="With content">
      <p>Card body content here</p>
    </lib-card>
  `
})
export class MyComponent {}
```

**TypeScript Path Mapping**: The `ui-components` import is resolved via TypeScript path mapping configured in `tsconfig.json`, which points directly to the shared component files in `projects/demo-app/src/shared/ui-components/`.

## Angular MCP Integration

This project has the Angular CLI MCP server configured in `.claude/mcp.json`. The MCP provides tools for:
- **Code Generation**: `ng generate component`, `ng generate service`, etc.
- **Project Management**: Build, serve, test commands
- **Schematics**: Run Angular schematics and custom generators

### Using Angular MCP Commands

When generating new code, **always use the Angular MCP tools** instead of manual file creation:

#### Generate a Component
```
Use the Angular MCP to generate a new component called "user-profile"
```

#### Generate a Service
```
Use the Angular MCP to generate a new service called "auth"
```

#### Generate a Module (if needed)
```
Use the Angular MCP to generate a new module called "dashboard"
```

## Mandatory Angular Best Practices

### 1. Signal-Based Architecture (CRITICAL)

**ALWAYS use signals for all inputs, outputs, and state management.**

#### Component Inputs
```typescript
// ✅ CORRECT - Use input() signals
readonly name = input<string>('');
readonly isActive = input<boolean>(false);
readonly items = input<string[]>([]);

// ❌ WRONG - Don't use @Input() decorators
@Input() name = '';
@Input() isActive = false;
```

#### Component Outputs
```typescript
// ✅ CORRECT - Use output() signals
readonly onClick = output<void>();
readonly valueChange = output<string>();

// ❌ WRONG - Don't use @Output() EventEmitters
@Output() onClick = new EventEmitter<void>();
@Output() valueChange = new EventEmitter<string>();
```

#### Component State
```typescript
// ✅ CORRECT - Use signal() for state
protected readonly user = signal<User | null>(null);
protected readonly isLoading = signal<boolean>(false);

// ❌ WRONG - Don't use plain properties
user: User | null = null;
isLoading = false;
```

#### Computed Values
```typescript
// ✅ CORRECT - Use computed() for derived state
protected readonly fullName = computed(() =>
  `${this.firstName()} ${this.lastName()}`
);

// ❌ WRONG - Don't use getters
get fullName() {
  return `${this.firstName} ${this.lastName}`;
}
```

### 2. OnPush Change Detection (REQUIRED)

**ALWAYS add OnPush change detection to every component.**

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-my-component',
  changeDetection: ChangeDetectionStrategy.OnPush, // ✅ ALWAYS ADD THIS
  // ...
})
```

### 3. Modern Control Flow (REQUIRED)

**ALWAYS use modern control flow syntax, never structural directives.**

```typescript
// ✅ CORRECT - Use @if/@else
template: `
  @if (user()) {
    <div>Welcome {{ user()!.name }}</div>
  } @else {
    <div>Please log in</div>
  }
`

// ❌ WRONG - Don't use *ngIf
template: `
  <div *ngIf="user">Welcome {{ user.name }}</div>
  <div *ngIf="!user">Please log in</div>
`
```

```typescript
// ✅ CORRECT - Use @for
template: `
  @for (item of items(); track item.id) {
    <div>{{ item.name }}</div>
  }
`

// ❌ WRONG - Don't use *ngFor
template: `
  <div *ngFor="let item of items">{{ item.name }}</div>
`
```

### 4. TypeScript Type Safety (REQUIRED)

**ALWAYS use explicit types and type unions.**

```typescript
// ✅ CORRECT - Define type unions
type UserRole = 'admin' | 'user' | 'guest';
type ButtonSize = 'small' | 'medium' | 'large';

// ✅ CORRECT - Use explicit types
readonly role = input<UserRole>('guest');
protected readonly count = signal<number>(0);

// ❌ WRONG - Don't use 'any' or implicit types
readonly role = input<any>('guest');
protected count = 0;
```

### 5. Access Modifiers (REQUIRED)

**ALWAYS use appropriate access modifiers.**

```typescript
export class MyComponent {
  // ✅ Public API - readonly for immutability
  readonly title = input<string>('');
  readonly onClick = output<void>();

  // ✅ Protected - for template use
  protected readonly items = signal<Item[]>([]);

  protected handleClick(): void {
    // method implementation
  }

  // ✅ Private - for internal logic
  private calculateValue(): number {
    return 42;
  }
}
```

### 6. Accessibility (REQUIRED)

**ALWAYS add accessibility attributes.**

```typescript
template: `
  <button
    [attr.aria-label]="buttonLabel()"
    [attr.aria-pressed]="isPressed()"
  >
    {{ label() }}
  </button>

  <nav aria-label="Main navigation">
    <!-- nav content -->
  </nav>

  <svg aria-hidden="true">
    <!-- decorative icon -->
  </svg>

  <img
    [src]="imageUrl()"
    [alt]="imageDescription()"
  >
`
```

### 7. Component Documentation (REQUIRED)

**ALWAYS add JSDoc comments to public APIs.**

```typescript
export class ButtonComponent {
  /** The text displayed on the button */
  readonly label = input<string>('Click me');

  /** Whether the button is in a loading state */
  readonly loading = input<boolean>(false);

  /** Emitted when the button is clicked */
  readonly onClick = output<void>();

  /**
   * Handle button click event
   * @internal
   */
  protected handleClick(): void {
    if (!this.loading()) {
      this.onClick.emit();
    }
  }
}
```

### 8. Standalone Components (REQUIRED)

**ALWAYS create standalone components.**

```typescript
// ✅ CORRECT
@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  // ...
})
```

### 9. PrimeNG Integration

**When adding UI components, use PrimeNG components.**

```typescript
// ✅ CORRECT - Use PrimeNG components
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

@Component({
  imports: [ButtonModule, DialogModule, TableModule],
  template: `
    <p-button label="Click me" />
    <p-dialog [(visible)]="showDialog()">
      <p-table [value]="data()"></p-table>
    </p-dialog>
  `
})
```

Available PrimeNG components:
- Button, InputText, Dropdown, MultiSelect
- Table, DataView, Tree
- Dialog, Sidebar, Toast
- Chart, ProgressBar, ProgressSpinner
- [Full list](https://primeng.org/components)

### 10. Template Syntax

**Follow these template conventions:**

```typescript
// ✅ Self-closing tags for components without children
<app-header [user]="user()" />
<p-button label="Click" />

// ✅ Call signal functions in templates
<div>{{ username() }}</div>
<button (click)="count.set(count() + 1)">

// ✅ Use non-null assertion when type narrowing
@if (user()) {
  <div>{{ user()!.name }}</div>
}
```

## Project Structure

```
src/
├── app/
│   ├── components/     # Reusable components
│   ├── services/       # Shared services
│   ├── models/         # TypeScript interfaces/types
│   └── app.config.ts   # Application configuration
├── stories/            # Storybook stories and demo components
└── styles.scss         # Global styles
```

## Component Generation Workflow

### When Creating a New Component:

1. **Generate with Angular MCP**
   ```
   Generate a component called "user-card" using the Angular MCP
   ```

2. **Convert to Best Practices**
   - Replace `@Input()` with `input()`
   - Replace `@Output()` with `output()`
   - Add `ChangeDetectionStrategy.OnPush`
   - Use modern control flow (`@if`, `@for`)
   - Add accessibility attributes
   - Add JSDoc comments

3. **Add PrimeNG Components**
   - Import needed PrimeNG modules
   - Use PrimeNG components in template

4. **Create Storybook Story**
   - Create `.stories.ts` file
   - Document component usage
   - Add interactive controls

### Example: Complete Component

```typescript
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

/** User card display options */
type CardVariant = 'compact' | 'detailed';

/** User data interface */
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [ButtonModule, CardModule],
  template: `
    <p-card>
      <ng-template pTemplate="header">
        @if (user().avatar) {
          <img
            [src]="user().avatar"
            [alt]="user().name + ' avatar'"
            class="avatar"
          >
        }
      </ng-template>

      <h3>{{ user().name }}</h3>

      @if (variant() === 'detailed') {
        <p>{{ user().email }}</p>
      }

      <ng-template pTemplate="footer">
        <p-button
          label="View Profile"
          (onClick)="onViewProfile.emit(user())"
          [attr.aria-label]="'View profile for ' + user().name"
        />
      </ng-template>
    </p-card>
  `,
  styleUrl: './user-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  /** User data to display */
  readonly user = input.required<User>();

  /** Display variant for the card */
  readonly variant = input<CardVariant>('compact');

  /** Emitted when user clicks view profile */
  readonly onViewProfile = output<User>();

  /** Computed display name with fallback */
  protected readonly displayName = computed(() =>
    this.user().name || 'Anonymous User'
  );
}
```

## Testing Requirements

When writing tests:
- Use signal testing utilities
- Test computed values
- Test signal updates
- Mock services with signals

## Code Review Checklist

Before considering code complete, verify:

- [ ] All inputs use `input()` signals
- [ ] All outputs use `output()` signals
- [ ] All state uses `signal()` or `computed()`
- [ ] Component has `OnPush` change detection
- [ ] Uses modern control flow (`@if`, `@for`)
- [ ] No `CommonModule` import unless required for pipes
- [ ] Explicit TypeScript types on all signals
- [ ] JSDoc comments on public API
- [ ] Accessibility attributes present
- [ ] PrimeNG components used where appropriate
- [ ] Self-closing tags for childless components
- [ ] Protected/private modifiers used appropriately

## Common Patterns

### Form Handling
```typescript
protected readonly formValue = signal<FormData>({});
protected readonly isValid = computed(() => this.validateForm(this.formValue()));
```

### API Calls
```typescript
protected readonly data = signal<Data[]>([]);
protected readonly loading = signal<boolean>(false);
protected readonly error = signal<string | null>(null);

async loadData(): Promise<void> {
  this.loading.set(true);
  try {
    const result = await this.api.getData();
    this.data.set(result);
  } catch (err) {
    this.error.set('Failed to load data');
  } finally {
    this.loading.set(false);
  }
}
```

### Conditional Actions
```typescript
protected handleAction(): void {
  if (this.canPerformAction()) {
    this.performAction();
  }
}

private canPerformAction = computed(() =>
  !this.loading() && this.isValid()
);
```

## What NOT to Do

❌ **Never** use `@Input()` or `@Output()` decorators
❌ **Never** use `*ngIf`, `*ngFor`, or `*ngSwitch`
❌ **Never** use plain properties for component state
❌ **Never** omit `ChangeDetectionStrategy.OnPush`
❌ **Never** use `any` type
❌ **Never** skip accessibility attributes
❌ **Never** create components without JSDoc
❌ **Never** use `CommonModule` unnecessarily
❌ **Never** use mutable properties with signals

## Resources

- [Angular Signals](https://angular.dev/guide/signals)
- [Modern Control Flow](https://angular.dev/guide/templates/control-flow)
- [PrimeNG Components](https://primeng.org/)
- [Angular Style Guide](https://angular.dev/style-guide)
- [Accessibility Guide](https://angular.dev/best-practices/a11y)

## Summary

**Golden Rules:**
1. 🎯 **Always use signals** - input(), output(), signal(), computed()
2. 🚀 **Always use OnPush** - Maximum performance
3. 🎨 **Always use PrimeNG** - Consistent UI
4. ♿ **Always add ARIA** - Accessibility first
5. 📖 **Always document** - JSDoc on public APIs
6. 🔒 **Always type** - Explicit TypeScript types
7. 🏗️ **Always use MCP** - Angular CLI for generation

Following these practices ensures:
- ⚡ Maximum performance
- 🔒 Type safety
- ♿ Accessibility
- 📖 Maintainability
- 🎨 Consistent UI
- 🚀 Modern architecture
