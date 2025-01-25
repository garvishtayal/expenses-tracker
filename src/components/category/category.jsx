import { useEffect, useState } from "react";
import CategoryDate from "./category-date/category-date";
import { useSelector } from 'react-redux';
import { selectCurrentMonth, selectCurrentYear } from '../../redux/slices/dateSlice';
import { FaDumbbell, FaHome, FaUtensils, FaTaxi, FaFilm, FaBolt, FaHeartbeat, FaGraduationCap, FaPlane, FaShoppingCart, FaRegMoneyBillAlt, FaCogs } from 'react-icons/fa';
import './category.css'

function Category() {
  const expenses = useSelector((state) => state.expenses.expenses);
  const currentMonth = useSelector(selectCurrentMonth);
  const currentYear = useSelector(selectCurrentYear);

  const [categoryTotals, setCategoryTotals] = useState({});

  const expenseCategories = [
    'Fitness',
    'Home',
    'Food',
    'Transportation',
    'Entertainment',
    'Utilities',
    'Health',
    'Education',
    'Travel',
    'Shopping',
    'Insurance',
    'Miscellaneous'
  ];

  const categoryIcons = {
    Fitness: <FaDumbbell />,
    Home: <FaHome />,
    Food: <FaUtensils />,
    Transportation: <FaTaxi />,
    Entertainment: <FaFilm />,
    Utilities: <FaBolt />,
    Health: <FaHeartbeat />,
    Education: <FaGraduationCap />,
    Travel: <FaPlane />,
    Shopping: <FaShoppingCart />,
    Insurance: <FaRegMoneyBillAlt />,
    Miscellaneous: <FaCogs />
  };

  // Utility function to get the total amount per category for the given month
  const getTotalPerCategory = (expenses, selectedMonth, selectedYear, allCategories) => {
    // Initialize the accumulator with all categories set to 0
    const categoryTotals = allCategories.reduce((acc, category) => {
      acc[category] = 0;
      return acc;
    }, {});

    // Filter expenses by selected month and year
    expenses
      .filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.toLocaleString('default', { month: 'long' }) === selectedMonth && expenseDate.getFullYear() === Number(selectedYear);
      })
      .forEach(expense => {
        categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + parseFloat(expense.amount);
      });

    return categoryTotals;
  };

  // useEffect to run the function once on mount and whenever expenses, month, or year change
  useEffect(() => {
    const initialTotals = getTotalPerCategory(expenses, currentMonth, currentYear, expenseCategories);
    setCategoryTotals(initialTotals);

  }, [expenses, currentMonth, currentYear]);


  return (
    <div>
      <CategoryDate />

      <div className="category-container">
        {Object.entries(categoryTotals).map(([category, total]) => (
          <div className="category-holder" key={category}>
            <div>
              <div className="category-react-icon">{categoryIcons[category]}</div>
              {category}
            </div>
            <div>₹{total}</div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
