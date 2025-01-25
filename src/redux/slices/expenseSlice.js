import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expenses: (() => {
    const existingExpenses = localStorage.getItem('expenses');
    if (!existingExpenses) {
      localStorage.setItem('expenses', JSON.stringify([])); // Initialize with an empty array
      return [];
    }
    return JSON.parse(existingExpenses);
  })(),
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
      localStorage.setItem('expenses', JSON.stringify(state.expenses));
    },
  },
});

export const { addExpense } = expenseSlice.actions;
export default expenseSlice.reducer;