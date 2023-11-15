import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './';
import { useEffect, useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    pageSize: { type: 'number', defaultValue: 10 },
    currentPage: { type: 'number', defaultValue: 1 },
    totalCount: { type: 'number', defaultValue: 30 },
    siblingCount: { type: 'number', defaultValue: 3 },
    onPageChange: { type: 'function' },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof Pagination>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Normal: Story = {
  render: args => {
    const [page, setPage] = useState(1);

    useEffect(() => {
      setPage(args.currentPage);
    }, [args.currentPage]);

    return (
      <Pagination
        {...args}
        currentPage={page}
        onPageChange={value => {
          setPage(+value);
        }}
      />
    );
  },
  args: {
    pageSize: 10,
    siblingCount: 1,
    totalCount: 100,
    currentPage: 1,
  },
};
