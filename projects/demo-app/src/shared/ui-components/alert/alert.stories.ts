import type { Meta, StoryObj } from '@storybook/angular';
import { AlertComponent } from './alert';

const meta: Meta<AlertComponent> = {
  title: 'Components/Alert',
  component: AlertComponent,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    dismissible: {
      control: 'boolean',
    },
    onDismiss: { action: 'dismissed' },
  },
};

export default meta;
type Story = StoryObj<AlertComponent>;

export const Info: Story = {
  args: {
    type: 'info',
    title: 'Information',
    message: 'This is an informational alert message.',
    dismissible: false,
  },
};

export const Success: Story = {
  args: {
    type: 'success',
    title: 'Success!',
    message: 'Your operation completed successfully.',
    dismissible: false,
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    title: 'Warning',
    message: 'Please review this important information.',
    dismissible: false,
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    title: 'Error',
    message: 'Something went wrong. Please try again.',
    dismissible: false,
  },
};

export const Dismissible: Story = {
  args: {
    type: 'info',
    title: 'Dismissible Alert',
    message: 'Click the × button to dismiss this alert.',
    dismissible: true,
  },
};

export const NoTitle: Story = {
  args: {
    type: 'success',
    message: 'This alert has no title, just a message.',
    dismissible: false,
  },
};

export const WithCustomContent: Story = {
  args: {
    type: 'warning',
    title: 'Custom Content',
    message: '',
    dismissible: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <app-alert [type]="type" [title]="title" [dismissible]="dismissible">
        <p style="margin: 0;">This alert contains custom HTML content instead of a simple message.</p>
        <ul style="margin: 0.5rem 0 0 0; padding-left: 1.5rem;">
          <li>You can add lists</li>
          <li>Or any other HTML elements</li>
          <li>Inside the alert</li>
        </ul>
      </app-alert>
    `,
  }),
};
