import { configureStore } from '@reduxjs/toolkit';
import propertiesReducer from '../features/properties/propertiesSlice';

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
  },
});
