import { configureStore } from '@reduxjs/toolkit';
import issuesReducer from './issues';
import headerReducer from './header';

export const store = configureStore({
  reducer: {
    issues: issuesReducer,
    header: headerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
