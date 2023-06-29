import { createSlice } from '@reduxjs/toolkit';

interface LoadingSpinnerState {
  count: number;
  isLoading?: boolean;
}

const initialState: LoadingSpinnerState = {
  count: 0,
  isLoading: false,
};

const loadingSpinnerSlice = createSlice({
  name: 'buildingSite',
  initialState,
  reducers: {
    launchSpinner: state => {
      if (state.count === 0) state.isLoading = true;

      state.count += 1;
    },
    stopSpinner: state => {
      state.count -= 1;
      if (state.count <= 0) state.isLoading = false;
    },
  },
});

export const { launchSpinner, stopSpinner } = loadingSpinnerSlice.actions;

export default loadingSpinnerSlice.reducer;
