import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableCell, TableContainer, TableHead } from './';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    // open: { defaultValue: false },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof Table>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Normal: Story = {
  render: () => {
    return (
      <TableContainer
        pageSize={10}
        siblingCount={1}
        totalCount={100}
        currentPage={1}
        onPageChange={newPage => {
          // eslint-disable-next-line no-console
          console.log(`Current page: ${newPage}`);
        }}
        onChangeDisplaySetting={e => {
          // eslint-disable-next-line no-console
          console.log(`Display ${e} rows per page`);
        }}
        onFilter={e => {
          // eslint-disable-next-line no-console
          console.log(`Keyword inouted: ${e}`);
        }}
      >
        <Table>
          <thead>
            <tr>
              <TableHead className="w-[40px] py-[5px] border bg-bright-blue text-white">#</TableHead>
              <TableHead className="py-[5px] border bg-bright-blue text-white">Long link</TableHead>
              <TableHead className="py-[5px] border bg-bright-blue text-white">Short link</TableHead>
              <TableHead className="w-[120px] py-[5px] border bg-bright-blue text-white">Actions</TableHead>
            </tr>
          </thead>
          <tbody>
            <tr>
              <TableCell className="text-center border px-[5px]">1</TableCell>
              <TableCell className="px-[5px] border">abcd.com</TableCell>
              <TableCell className="px-[5px] border">bit.com</TableCell>
              <TableCell className="px-[5px] border">Coppy</TableCell>
            </tr>
            <tr>
              <TableCell className="text-center border px-[5px]">2</TableCell>
              <TableCell className="px-[5px] border">abcd.com</TableCell>
              <TableCell className="px-[5px] border">bit.com</TableCell>
              <TableCell className="px-[5px] border">Coppy</TableCell>
            </tr>
            <tr>
              <TableCell className="text-center border px-[5px]">3</TableCell>
              <TableCell className="px-[5px] border">abcd.com</TableCell>
              <TableCell className="px-[5px] border">bit.com</TableCell>
              <TableCell className="px-[5px] border">Coppy</TableCell>
            </tr>
            <tr>
              <TableCell className="text-center border px-[5px]">4</TableCell>
              <TableCell className="px-[5px] border">abcd.com</TableCell>
              <TableCell className="px-[5px] border">bit.com</TableCell>
              <TableCell className="px-[5px] border">Coppy</TableCell>
            </tr>
            <tr>
              <TableCell className="text-center border px-[5px]">5</TableCell>
              <TableCell className="px-[5px] border">abcd.com</TableCell>
              <TableCell className="px-[5px] border">bit.com</TableCell>
              <TableCell className="px-[5px] border">Coppy</TableCell>
            </tr>
            <tr>
              <TableCell className="text-center border px-[5px]">6</TableCell>
              <TableCell className="px-[5px] border">abcd.com</TableCell>
              <TableCell className="px-[5px] border">bit.com</TableCell>
              <TableCell className="px-[5px] border">Coppy</TableCell>
            </tr>
          </tbody>
        </Table>
      </TableContainer>
    );
  },
};
