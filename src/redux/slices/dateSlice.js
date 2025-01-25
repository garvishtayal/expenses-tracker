import { createSlice } from '@reduxjs/toolkit';

// Get current month and year
const date = new Date();
const currentMonth = date.toLocaleString('default', { month: 'long' });
const currentYear = date.getFullYear(); 

const dateSlice = createSlice({
  name: 'date',
  initialState: {
    currentMonth: currentMonth, 
    currentYear: currentYear,   
  },
  reducers: {
    // Reducer to update the month
    setCurrentMonth: (state, action) => {
      state.currentMonth = action.payload;
    },
    // Reducer to update the year
    setCurrentYear: (state, action) => {
      state.currentYear = action.payload;
    },
  },
});

export const { setCurrentMonth, setCurrentYear } = dateSlice.actions;

export const selectCurrentMonth = (state) => state.date.currentMonth;
export const selectCurrentYear = (state) => state.date.currentYear;

export default dateSlice.reducer;
