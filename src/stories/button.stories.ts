import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { ButtonComponent } from './button.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ButtonComponent> = {
  title: 'PrimeNG/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    primary: {
      control: 'boolean',
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Secondary Button',
  },
};

export const Large: Story = {
  args: {
    primary: true,
    size: 'large',
    label: 'Large Button',
  },
};

export const Small: Story = {
  args: {
    primary: false,
    size: 'small',
    label: 'Small Button',
  },
};

export const CustomColor: Story = {
  args: {
    primary: true,
    label: 'Custom Color',
    backgroundColor: '#ff6b6b',
  },
};
