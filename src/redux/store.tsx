import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './todoSlice';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['payload.dateTime'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
