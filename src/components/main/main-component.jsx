import './main-component.css'
import { useState } from 'react';

import Category from "../category/category";
import Popup from "../popup/popup";
import Expenses from '../expenses/expenses';

import { FaCreditCard } from "react-icons/fa6";
import { BiSolidAddToQueue } from "react-icons/bi";

function MainComponent() {

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  return (
    <div className='main-component-container'>
      <FaCreditCard size={43} />

      <div className='main-component-expense-tracker'>
        <h2>Expense Tracker</h2>
        <BiSolidAddToQueue size={23} onClick={() => setIsPopupVisible(!isPopupVisible)}/>
      </div>


      <h5>Categories</h5>
      <Category />

      <h5>Expenses</h5>
      <Expenses />

      {isPopupVisible && <Popup onClose={() => setIsPopupVisible(!isPopupVisible)} />}
    </div>
  )
}

export default MainComponent