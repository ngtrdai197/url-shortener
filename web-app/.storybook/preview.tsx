import React from 'react';

import type { Preview } from '@storybook/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from '../src/brand/store';
import { ActionToast } from '../src/design/components/action-toast';
import { ThemeModeProvider } from '../src/brand/contexts/theme-mode';
import '../src/design/styles/index.scss';

export const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export const decorators = [
  Story => (
    <React.StrictMode>
      <ActionToast />
      <BrowserRouter>
        <Provider store={store}>
          <ThemeModeProvider>
            <Story />
          </ThemeModeProvider>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  ),
];
