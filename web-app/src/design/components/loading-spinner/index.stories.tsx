import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { LoadingSpinner } from './index';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
  tags: ['autodocs'],
  argTypes: {
    open: { defaultValue: false },
  },
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Normal: Story = {
  render: () => {
    const [isOpened, setIsOpened] = useState(false);

    return (
      <>
        <button
          onClick={() => {
            setIsOpened(!isOpened);
          }}
        >
          Click me!
        </button>
        <LoadingSpinner open={isOpened} />
      </>
    );
  },
};
