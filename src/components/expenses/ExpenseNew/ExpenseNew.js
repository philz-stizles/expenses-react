import { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import "./ExpenseNew.css";
import useHttp from "../../../hooks/use-http";

const ExpenseNew = (props) => {
  // USING MULTIPLE STATES
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const { sendRequest: addExpense, isLoading, error, data } = useHttp();

  const titleChangeHandler = useCallback((e) => {
    setTitle(e.currentTarget.value);
  }, []);

  const amountChangeHandler = useCallback((e) => {
    setAmount(e.currentTarget.value);
  }, []);

  const dateChangeHandler = useCallback((e) => {
    setDate(e.currentTarget.value);
  }, []);

  const showFormHandler = useCallback((status) => {
    setShowForm(status);
  }, []);

  const createExpense = (body, response) => {
    props.onAddExpense({ id: response.name, ...body });
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (title === "" || amount === "" || date === "") {
      return;
    }

    // Lifting the state up
    const body = {
      // id: Math.random().toString(),
      title,
      amount,
      date: new Date(date),
    };
    // props.onAddExpense(body);

    addExpense(
      { endpoint: "expenses", method: "POST", body },
      createExpense.bind(null, body)
    );

    clearForm();
  };

  const clearForm = () => {
    setTitle("");
    setAmount("");
    setDate("");
  };

  return (
    <div className="expense-new">
      {!showForm ? (
        <button onClick={() => showFormHandler(true)}>Add New Expense</button>
      ) : (
        <form onSubmit={onSubmitHandler}>
          <div className="expense-new__controls">
            <div className="expense-new__control">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                placeholder="Enter title"
                onChange={titleChangeHandler}
                // Two way binding with input value and state value
                value={title}
              />
            </div>
            <div className="expense-new__control">
              <label htmlFor="amount">Amount</label>
              <input
                id="amount"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="Enter amount"
                onChange={amountChangeHandler}
                // Two way binding with input value and state value
                value={amount}
              />
            </div>
            <div className="expense-new__control">
              <label htmlFor="date">Date</label>
              <input
                id="date"
                type="date"
                min="2019-01-01"
                max="2023-12-30"
                onChange={dateChangeHandler}
                // Two way binding with input value and state value
                value={date}
              />
            </div>
          </div>
          <div className="expense-new__actions">
            <button onClick={() => showFormHandler(false)}>Cancel</button>
            <button type="submit">Add Expense</button>
          </div>
        </form>
      )}
    </div>
  );

  // // USING ONE STATE
  // const [formInputs, setFormInput] = useState({
  //   title: '',
  //   amount: '',
  //   date: ''
  // })

  // // // (a.) Using multiple change handlers.
  // //  const titleChangeHandler = (e) => {
  // //   setFormInput((prev) => {
  // //     return {...prev, title: e.currentTarget.value}
  // //   })
  // // }

  // // const amountChangeHandler = (e) => {
  // //   setFormInput((prev) => {
  // //     return {...prev, amount: e.currentTarget.value}
  // //   })
  // // }

  // // const dateChangeHandler = (e) => {
  // //   setFormInput((prev) => {
  // //     return {...prev, date: e.currentTarget.value}
  // //   })
  // // }

  // // // (b.) Using a single change handler
  // // const onChangeHandler = (e) => {
  // //   const { name, value} = e.currentTarget

  // //   setFormInput((prev) => { // This state update guarantees latest state snapshot. Use this if your update depends on previous state
  // //     return {...prev, [name]: value}
  // //   })
  // // }

  // return (

  //     <form>
  //       <div className="expense-new__controls">
  //         <div className="expense-new__control">
  //           <label htmlFor='title'>Title</label>
  //           <input
  //             id='title' type="text" name="title" placeholder="Enter title"
  //             onChange={onChangeHandler}
  //             value={formInputs.title} />
  //         </div>
  //         <div className="expense-new__control">
  //           <label htmlFor='amount'>Amount</label>
  //           <input id='amount' type="number" min="0.01" step="0.01" name="amount" placeholder="Enter amount"
  //             onChange={onChangeHandler}
  //             value={formInputs.amount} />
  //         </div>
  //         <div className="expense-new__control">
  //           <label htmlFor='date'>Date</label>
  //           <input id='date' type="date" name="date" min="2019-01-01" max="2023-12-30"
  //             onChange={onChangeHandler}
  //             value={formInputs.date}/>
  //         </div>
  //       </div>
  //       <div className='expense-new__actions'>
  //         <button type="submit">Add Expense</button>
  //       </div>
  //     </form>

  // )
};

ExpenseNew.protoTypes = {
  onAddExpense: PropTypes.func,
};

export default memo(ExpenseNew);
