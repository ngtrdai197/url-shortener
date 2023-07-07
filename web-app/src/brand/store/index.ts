import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { authAPI } from '../services/auth.service';
import { usersAPI } from '../services/users.service';
import loadingSpinnerReducer from './slices/loadingSpinner';

export const store = configureStore({
  reducer: {
    loadingSpinner: loadingSpinnerReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [usersAPI.reducerPath]: usersAPI.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authAPI.middleware, usersAPI.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
