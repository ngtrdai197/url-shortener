import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { authenAPI } from './../services/authen';
import loadingSpinnerReducer from './slices/loadingSpinner';

export const store = configureStore({
  reducer: {
    loadingSpinner: loadingSpinnerReducer,
    [authenAPI.reducerPath]: authenAPI.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authenAPI.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
