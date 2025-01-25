import React, { useState } from 'react';
import './popup.css';
import { IoMdCloseCircle } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { addExpense } from '../../redux/slices/expenseSlice';


function Popup({ onClose }) {
  const [form, setForm] = useState({
    name: '',
    amount: '',
    date: '',
    category: '',
  });

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

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.amount && form.date && form.category) {
      console.log(form);
      dispatch(addExpense(form)); // Dispatch the action
      setForm({ name: '', amount: '', date: '', category: '' }); 
      onClose(); // Close the popup
    }
    else {
      console.log("Enter required fields")
    }
  };

  return (
    <div className="popup-container">
      <div className="popup-box">
        <IoMdCloseCircle className="popup-box-cross-icon" size={26} onClick={onClose} />

        <h3 className="popup-title">Add Expense</h3>

        <form className="popup-form" onSubmit={handleSubmit}>
          <label className="popup-label">Where did it Spend on?</label>
          <input
            className="popup-input"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="expense name"
            required
          />

          <label className="popup-label">How much?</label>
          <input
            className="popup-input"
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="amount"
            required
          />

          <label className="popup-label">Date</label>
          <input
            className="popup-input"
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />

          <label className="popup-label">Category</label>
          <select
            className="popup-select"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
          <option value="">Select Category</option>
          {expenseCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
          </select>

          <button className="popup-button" type="submit">
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}

export default Popup;
