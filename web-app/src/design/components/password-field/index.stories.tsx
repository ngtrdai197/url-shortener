import type { Meta, StoryObj } from '@storybook/react';
import { PasswordField } from './';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/PasswordField',
  component: PasswordField,
  tags: ['autodocs'],
} satisfies Meta<typeof PasswordField>;

export default meta;
type Story = StoryObj<typeof PasswordField>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Normal: Story = {
  render: args => <PasswordField {...args} />,
};
