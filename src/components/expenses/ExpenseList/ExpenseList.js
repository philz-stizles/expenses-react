import React, { useCallback } from "react";
import PropTypes from "prop-types";
import ExpenseItem from "../ExpenseItem/ExpenseItem";
import CardWrapper from "../../ui/CardWrapper/CardWrapper";
import ExpensesFilter from "../ExpensesFilter/ExpensesFilter";
import "./ExpenseList.css";
import ExpenseChart from "../ExpenseChart/ExpenseChart";

const ExpenseList = (props) => {
  const [filteredYear, setFilteredYear] = React.useState("");

  const filteredExpenses = props.items.filter((item) =>
    filteredYear.trim() === ""
      ? item.date.getFullYear().toString() !== filteredYear
      : item.date.getFullYear().toString() === filteredYear
  );

  const filterChangeHandler = useCallback(
    (selectedYear) => {
      setFilteredYear(selectedYear);
    }, []);

  let content =
    filteredExpenses.length <= 0 ? (
      <p>No expenses found.</p>
    ) : (
      filteredExpenses.map(({ id, title, amount, date }, i) => (
        <ExpenseItem key={id} title={title} amount={amount} date={date} />
      ))
    );

  return (
    <CardWrapper className="expenses">
      <ExpensesFilter
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      />
      <ExpenseChart data={filteredExpenses} />
      {/* {filteredExpenses.length <= 0 && <p>No expenses found.</p>} 
       {filteredExpenses.length > 0 &&
        filteredExpenses.map(({ id, title, amount, date }, i) => (
          <ExpenseItem key={id} title={title} amount={amount} date={date} />
        ))} */}
      {content}
    </CardWrapper>
  );
};

ExpenseList.propTypes = {
  items: PropTypes.array,
};

export default ExpenseList;
