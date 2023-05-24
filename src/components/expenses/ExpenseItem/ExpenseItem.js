import React from 'react'
import PropTypes from 'prop-types'
import './ExpenseItem.css'
import ExpenseDate from '../ExpenseDate/ExpenseDate'

const ExpenseItem = ({title, amount, date}) => {
  

  return (
    <div className='expense-item'>
      <ExpenseDate date={date} />
      <div className='expense-item__description'>
        <h2>{title}</h2>
        <div className='expense-item__price'>{amount}</div>
      </div>
    </div>
  )
}

ExpenseItem.prototypes = {
  title: PropTypes.string,
  amount: PropTypes.number,
  date: PropTypes.string
}

export default ExpenseItem