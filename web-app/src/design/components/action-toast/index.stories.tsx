import type { Meta, StoryObj } from '@storybook/react';
import { ActionToast, NotifyToast, Toaster } from './';
import { Button } from '../button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/ActionToast',
  component: ActionToast,
  tags: ['autodocs'],
} satisfies Meta<typeof ActionToast>;

export default meta;
type Story = StoryObj<typeof ActionToast>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  render: () => (
    <Button
      onClick={() => {
        NotifyToast(<Toaster>There isn&apos;t any problem</Toaster>, 'default');
      }}
    >
      Default toaster
    </Button>
  ),
};

export const Information: Story = {
  render: () => (
    <Button
      onClick={() => {
        NotifyToast(<Toaster>This is an information</Toaster>, 'info');
      }}
    >
      Information toaster
    </Button>
  ),
};

export const Warning: Story = {
  render: () => (
    <Button
      onClick={() => {
        NotifyToast(<Toaster>There is an warning</Toaster>, 'warning');
      }}
    >
      Warning toaster
    </Button>
  ),
};

export const Success: Story = {
  render: () => (
    <Button
      onClick={() => {
        NotifyToast(<Toaster>Your request is success</Toaster>, 'success');
      }}
    >
      Success toaster
    </Button>
  ),
};

export const Error: Story = {
  render: () => (
    <Button
      onClick={() => {
        NotifyToast(<Toaster>There is an error occurs</Toaster>, 'error');
      }}
    >
      Error toaster
    </Button>
  ),
};
