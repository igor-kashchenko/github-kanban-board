import { createSlice } from '@reduxjs/toolkit';

type HeaderState = {
  URL: string;
};

const initialState: HeaderState = {
  URL: '',
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setURL(state, action) {
      state.URL = action.payload;
    },
  },
});

export const { setURL } = headerSlice.actions;

export default headerSlice.reducer;
