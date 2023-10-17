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
export const Check: Story = {
  render: args => <Icon {...args} />,
  args: {
    name: 'check',
  },
};
export const EyeBlack: Story = {
  render: args => <Icon {...args} />,
  args: {
    name: 'eye-black',
  },
};
export const EyeSplashBlack: Story = {
  render: args => <Icon {...args} />,
  args: {
    name: 'eye-splash-black',
  },
};
export const EyeWhite: Story = {
  decorators: [
    Story => (
      <div style={{ background: '#000' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    name: 'eye-white',
  },
  render: args => <Icon {...args} />,
};
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
