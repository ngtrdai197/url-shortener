---
to: src/design/components/<%= h.changeCase.param(name) %>/index.stories.tsx
sh: prettier --write src/design/components/<%= h.changeCase.param(name) %>/index.stories.tsx
---
import type { Meta, StoryObj } from '@storybook/react';
import { <%= h.changeCase.pascal(name) %> } from './';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/<%= h.changeCase.pascal(name) %>',
  component: <%= h.changeCase.pascal(name) %>,
  tags: ['autodocs'],
  argTypes: {
    // open: { defaultValue: false },
  },
} satisfies Meta<typeof <%= h.changeCase.pascal(name) %>>;

export default meta;
type Story = StoryObj<typeof <%= h.changeCase.pascal(name) %>>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Normal: Story = {
  render: args => <<%= h.changeCase.pascal(name) %> {...args} />,
  args: {
    children: 'Example text',
  },
};

export const WithRedModifier: Story = {
  render: args => <<%= h.changeCase.pascal(name) %> {...args} />,
  args: {
    children: <>Example component with red color</>,
    modifiers: 'red',
  },
};
