import type { Meta, StoryObj } from '@storybook/react';
import { SideBar, SideBarItem } from './';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/SideBar',
  component: SideBar,
  tags: ['autodocs'],
  argTypes: {
    // open: { defaultValue: false },
  },
} satisfies Meta<typeof SideBar>;

export default meta;
type Story = StoryObj<typeof SideBar>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Normal: Story = {
  render: args => <SideBar {...args} />,
  decorators: [
    Story => (
      <div style={{ minHeight: '600px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    children: (
      <>
        <SideBarItem icon="check" href="#" isActivated>
          Home
        </SideBarItem>
        <SideBarItem icon="moon" href="#">
          Settings
        </SideBarItem>
        <SideBarItem icon="notification" href="#">
          Contact
        </SideBarItem>
        <SideBarItem icon="sun" href="#">
          Logout
        </SideBarItem>
      </>
    ),
  },
};
