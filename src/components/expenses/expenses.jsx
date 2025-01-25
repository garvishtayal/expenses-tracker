import './expenses.css';
import { SlCalender } from "react-icons/sl";
import { RiChatHistoryFill } from "react-icons/ri";
import { FaDumbbell, FaHome, FaUtensils, FaTaxi, FaFilm, FaBolt, FaHeartbeat, FaGraduationCap, FaPlane, FaShoppingCart, FaRegMoneyBillAlt, FaCogs } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useState } from 'react';

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

function Expenses() {
  const expenses = useSelector((state) => state.expenses.expenses);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [isHistoryActive, setHistoryActive] = useState(false);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const filteredExpenses = expenses.filter(expense => expense.date === selectedDate);

  const expensesHistory = [...expenses].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA; // Descending order (latest first)
  });

  return (
    <div className='expenses-container'>
      <div className='expenses-header'>
        <div onClick={() => setHistoryActive(false)} className={`expenses-header-item ${!isHistoryActive ? 'expenses-header-active' : ''}`}>
          <SlCalender /> Daily
        </div>
        <div onClick={() => setHistoryActive(true)} className={`expenses-header-item ${isHistoryActive ? 'expenses-header-active' : ''}`}>
          <RiChatHistoryFill size={14} /> History
        </div>
      </div>

      {/* Daily */}
      {!isHistoryActive && (
        <div>
          <input
            className="expenses-date-input"
            type="date"
            name="date"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
      )}

      <div className='expenses-table-container'>
        <table className='expenses-table'>
          <tbody>
            {(isHistoryActive ? expensesHistory : filteredExpenses).length > 0 ? (
              (isHistoryActive ? expensesHistory : filteredExpenses).map((expense, index) => (
                <tr key={index} className="expense-item">
                  <td>{expense.name}</td>
                  <td>
                    {categoryIcons[expense.category] && (
                      <span className="expenses-category-icon">{categoryIcons[expense.category]}</span>
                    )}
                    {expense.category}
                  </td>
                  <td>{expense.amount}</td>
                  <td>{expense.date}</td>
                </tr>
              ))
            ) : (
              <p>No expenses for this date</p>
            )}

            {!isHistoryActive && (
              <tr>
                <td></td>
                <td></td>
                <td className='expenses-total'>
                  {filteredExpenses.reduce((total, expense) => total + Number(expense.amount), 0)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Expenses;
