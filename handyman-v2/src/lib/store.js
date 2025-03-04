/**
 * Redux Store Configuration
 * 
 * This file configures the Redux store for the application.
 * It sets up the reducers and middleware.
 */

import { configureStore } from '@reduxjs/toolkit';

// Create a simple reducer for now
const initialState = {
  isLoggedIn: false,
  user: null,
  darkMode: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    default:
      return state;
  }
}

// Configure the store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});
