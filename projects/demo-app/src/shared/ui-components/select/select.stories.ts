import type { Meta, StoryObj } from '@storybook/angular';
import { SelectComponent, SelectOption } from './select';

const sampleOptions: SelectOption[] = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4 (Disabled)', value: '4', disabled: true },
];

const countryOptions: SelectOption[] = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' },
  { label: 'Australia', value: 'au' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' },
  { label: 'China', value: 'cn' },
];

const meta: Meta<SelectComponent> = {
  title: 'Components/Select',
  component: SelectComponent,
  tags: ['autodocs'],
  argTypes: {
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
    showClear: {
      control: 'boolean',
    },
    filter: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<SelectComponent>;

export const Default: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Select an option',
    size: 'medium',
    disabled: false,
    required: false,
    showClear: false,
    filter: false,
  },
};

export const WithValue: Story = {
  args: {
    options: sampleOptions,
    value: '2',
    placeholder: 'Select an option',
    size: 'medium',
    disabled: false,
    required: false,
    showClear: false,
    filter: false,
  },
};

export const WithClearButton: Story = {
  args: {
    options: sampleOptions,
    value: '1',
    placeholder: 'Select an option',
    size: 'medium',
    disabled: false,
    required: false,
    showClear: true,
    filter: false,
  },
};

export const WithFilter: Story = {
  args: {
    options: countryOptions,
    placeholder: 'Search and select a country',
    size: 'medium',
    disabled: false,
    required: false,
    showClear: true,
    filter: true,
  },
};

export const Small: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Small select',
    size: 'small',
    disabled: false,
    required: false,
    showClear: false,
    filter: false,
  },
};

export const Large: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Large select',
    size: 'large',
    disabled: false,
    required: false,
    showClear: false,
    filter: false,
  },
};

export const Disabled: Story = {
  args: {
    options: sampleOptions,
    value: '1',
    placeholder: 'This is disabled',
    size: 'medium',
    disabled: true,
    required: false,
    showClear: false,
    filter: false,
  },
};

export const Required: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Required field',
    size: 'medium',
    disabled: false,
    required: true,
    showClear: false,
    filter: false,
  },
};
