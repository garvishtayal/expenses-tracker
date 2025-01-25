import { configureStore } from '@reduxjs/toolkit';
import dateReducer from './slices/dateSlice';
import expenseReducer from './slices/expenseSlice';

const store = configureStore({
  reducer: {
    date: dateReducer,
    expenses: expenseReducer,
  },
});

export default store;
