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
      <FaCreditCard size={50} />

      <div className='main-component-expense-tracker'>
        <h1>Expense Tracker</h1>
        <BiSolidAddToQueue size={26} onClick={() => setIsPopupVisible(!isPopupVisible)}/>
      </div>


      <h4>Categories</h4>
      <Category />

      <h4>Expenses</h4>
      <Expenses />

      {isPopupVisible && <Popup onClose={() => setIsPopupVisible(!isPopupVisible)} />}
    </div>
  )
}

export default MainComponent