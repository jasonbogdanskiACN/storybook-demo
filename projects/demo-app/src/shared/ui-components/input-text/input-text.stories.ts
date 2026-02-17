import type { Meta, StoryObj } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextComponent } from './input-text';

const meta: Meta<InputTextComponent> = {
  title: 'Components/InputText',
  component: InputTextComponent,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'tel', 'url', 'number'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<InputTextComponent>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    type: 'text',
    size: 'medium',
    disabled: false,
    required: false,
  },
};

export const WithValue: Story = {
  render: () => ({
    props: {
      textControl: new FormControl('Sample text'),
    },
    template: `
      <lib-input-text
        [formControl]="textControl"
        placeholder="Enter text..."
        type="text"
      />
    `,
    moduleMetadata: {
      imports: [InputTextComponent, ReactiveFormsModule],
    },
  }),
};

export const Password: Story = {
  args: {
    placeholder: 'Enter password...',
    type: 'password',
    size: 'medium',
    disabled: false,
    required: false,
  },
};

export const Email: Story = {
  args: {
    placeholder: 'Enter email...',
    type: 'email',
    size: 'medium',
    disabled: false,
    required: false,
  },
};

export const Small: Story = {
  args: {
    placeholder: 'Small input',
    type: 'text',
    size: 'small',
    disabled: false,
    required: false,
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Large input',
    type: 'text',
    size: 'large',
    disabled: false,
    required: false,
  },
};

export const Disabled: Story = {
  render: () => ({
    props: {
      disabledControl: new FormControl({ value: 'Disabled input', disabled: true }),
    },
    template: `
      <lib-input-text
        [formControl]="disabledControl"
        placeholder="This is disabled"
        type="text"
      />
    `,
    moduleMetadata: {
      imports: [InputTextComponent, ReactiveFormsModule],
    },
  }),
};

export const Required: Story = {
  args: {
    placeholder: 'Required field',
    type: 'text',
    size: 'medium',
    disabled: false,
    required: true,
  },
};

export const WithReactiveForms: Story = {
  render: () => ({
    props: {
      emailControl: new FormControl('', [Validators.required, Validators.email]),
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <label style="font-weight: 500;">Email (Reactive Forms)</label>
        <lib-input-text
          [formControl]="emailControl"
          placeholder="Enter email with validation"
          type="email"
        />
        @if (emailControl.valid && emailControl.value) {
          <small style="color: #667eea;">
            ✓ Valid email: {{ emailControl.value }}
          </small>
        }
        @if (emailControl.invalid && emailControl.touched) {
          <small style="color: #dc2626;">
            ✗ Please enter a valid email address
          </small>
        }
      </div>
    `,
    moduleMetadata: {
      imports: [InputTextComponent, ReactiveFormsModule],
    },
  }),
};
