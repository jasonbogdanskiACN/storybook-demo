import type { Meta, StoryObj } from '@storybook/angular';
import { CardComponent } from './card';

const meta: Meta<CardComponent> = {
  title: 'Components/Card',
  component: CardComponent,
  tags: ['autodocs'],
  argTypes: {
    elevated: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<CardComponent>;

export const Basic: Story = {
  args: {
    title: 'Card Title',
    subtitle: 'This is a subtitle',
    elevated: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <app-card [title]="title" [subtitle]="subtitle" [elevated]="elevated">
        <p>This is the card content. You can put any content here.</p>
      </app-card>
    `,
  }),
};

export const WithImage: Story = {
  args: {
    title: 'Beautiful Landscape',
    subtitle: 'A stunning view',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    elevated: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <app-card [title]="title" [subtitle]="subtitle" [imageUrl]="imageUrl" [elevated]="elevated">
        <p>This card includes a beautiful header image.</p>
      </app-card>
    `,
  }),
};

export const Elevated: Story = {
  args: {
    title: 'Elevated Card',
    subtitle: 'With shadow and hover effect',
    elevated: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <app-card [title]="title" [subtitle]="subtitle" [elevated]="elevated">
        <p>This card has an elevated style with shadow and hover effects.</p>
        <p>Try hovering over it!</p>
      </app-card>
    `,
  }),
};

export const NoTitle: Story = {
  args: {
    elevated: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <app-card [elevated]="elevated">
        <h3>Custom Content</h3>
        <p>You can use a card without a title and create your own layout.</p>
        <button style="padding: 0.5rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 0.25rem; cursor: pointer;">
          Action
        </button>
      </app-card>
    `,
  }),
};
