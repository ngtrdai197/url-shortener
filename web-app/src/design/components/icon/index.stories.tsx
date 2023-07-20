import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    // open: { defaultValue: false },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof Icon>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Moon: Story = {
  render: args => <Icon {...args} />,
  args: {
    name: 'moon',
  },
};
export const Notification: Story = {
  render: args => <Icon {...args} />,
  args: {
    name: 'notification',
  },
};

export const Sun: Story = {
  render: args => <Icon {...args} />,
  args: {
    name: 'sun',
  },
};


