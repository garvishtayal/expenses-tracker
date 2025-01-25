import { useSelector, useDispatch } from 'react-redux';
import { setCurrentMonth, setCurrentYear, selectCurrentMonth, selectCurrentYear } from '../../../redux/slices/dateSlice';
import './category-date.css';
import { MdDateRange } from "react-icons/md";

function CategoryDate() {

  const dispatch = useDispatch();
  const currentMonth = useSelector(selectCurrentMonth);
  const currentYear = useSelector(selectCurrentYear);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // List of years to populate the year dropdown
  const currentYearList = [];
  const startYear = new Date().getFullYear() - 5; // 5 years ago
  for (let i = startYear; i <= startYear + 10; i++) {
    currentYearList.push(i);
  }


  // Handle month selection
  const handleMonthChange = (event) => {
    dispatch(setCurrentMonth(event.target.value));
  };

  // Handle year selection
  const handleYearChange = (event) => {
    dispatch(setCurrentYear(event.target.value));
  };

  return (
    <div className='category-date-container'>

      <MdDateRange />

      <select value={currentMonth} onChange={handleMonthChange}>
        {months.map((month, index) => (
          <option key={index} value={month}>
            {month}
          </option>
        ))}
      </select>

      <select className='category-date-year' value={currentYear} onChange={handleYearChange}>
        {currentYearList.map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>

    </div>
  )
}

export default CategoryDate