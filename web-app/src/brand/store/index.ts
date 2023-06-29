import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { authAPI } from '../services/auth.service';
import loadingSpinnerReducer from './slices/loadingSpinner';

export const store = configureStore({
  reducer: {
    loadingSpinner: loadingSpinnerReducer,
    [authAPI.reducerPath]: authAPI.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authAPI.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
