import type { Meta, StoryObj } from '@storybook/react';
import { Steps } from './';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Steps',
  component: Steps,
  tags: ['autodocs'],
  argTypes: {
    // open: { defaultValue: false },
  },
} satisfies Meta<typeof Steps>;

export default meta;
type Story = StoryObj<typeof Steps>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Step1IsActive: Story = {
  render: args => <Steps {...args} />,
  args: {
    stepNames: [
      'Entry',
      <>
        Confirm
        <br />
        Step
      </>,
      'Complete',
    ],
    currentStep: 0,
  },
};

export const Step2IsActive: Story = {
  render: args => <Steps {...args} />,
  args: {
    stepNames: [
      'Entry',
      <>
        Confirm
        <br />
        Step
      </>,
      'Complete',
    ],
    currentStep: 1,
  },
};

export const Step3IsActive: Story = {
  render: args => <Steps {...args} />,
  args: {
    stepNames: [
      'Entry',
      <>
        Confirm
        <br />
        Step
      </>,
      'Complete',
    ],
    currentStep: 2,
  },
};

export const WithLongStepName: Story = {
  render: args => <Steps {...args} />,
  args: {
    stepNames: [
      'Entry',
      <>
        Confirm dsad asd czxcvsddfd fvxcvfasdfad czxczxc
        <br />
        Step
      </>,
      'Complete',
    ],
    currentStep: 2,
  },
};

export const MoreSteps: Story = {
  render: args => <Steps {...args} />,
  args: {
    stepNames: ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'],
    currentStep: 2,
  },
};
