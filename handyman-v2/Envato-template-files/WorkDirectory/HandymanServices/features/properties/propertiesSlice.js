import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  keyword: '',
  location: '',
  price: { min: 50, max: 200 },
  features: []
};

export const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    addKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    addLocation: (state, action) => {
      state.location = action.payload;
    },
    addPrice: (state, action) => {
      state.price = action.payload;
    },
    addFeatures: (state, action) => {
      state.features = action.payload;
    },
    resetFilters: (state) => {
      state.keyword = '';
      state.location = '';
      state.price = { min: 50, max: 200 };
      state.features = [];
    }
  }
});

export const { addKeyword, addLocation, addPrice, addFeatures, resetFilters } = propertiesSlice.actions;
export default propertiesSlice.reducer;
