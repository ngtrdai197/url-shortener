import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof TextField>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Normal: Story = {
  render: args => <TextField {...args} />,
};

export const WithErrorMessage: Story = {
  render: args => <TextField {...args} errorMessage="This field is required" />,
};
