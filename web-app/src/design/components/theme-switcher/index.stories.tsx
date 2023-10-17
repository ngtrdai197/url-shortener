import type { Meta, StoryObj } from '@storybook/react';
import { ThemeModeProvider } from '../../../brand/contexts/theme-mode';
import { ThemeSwitcher } from './';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/ThemeSwitcher',
  component: ThemeSwitcher,
  tags: ['autodocs'],
  argTypes: {
    // open: { defaultValue: false },
  },
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof ThemeSwitcher>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Normal: Story = {
  render: args => (
    <ThemeModeProvider>
      <ThemeSwitcher {...args} />
    </ThemeModeProvider>
  ),
};
