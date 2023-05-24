import { Fragment, useContext, useEffect, useState } from "react";
// import AuthContext from "../store/context/auth-context";
// import Footer from "../components/Layout/Footer";
// import Header from "../components/Layout/Header/Header";
import { ExpenseList, ExpenseNew } from "../components/expenses";
import useHttp from "../hooks/use-http";

const Expenses = () => {
  const { sendRequest: fetchExpenses, isLoading, error, data } = useHttp();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const transform = (response) => {
      const transformedData = Object.keys(response).map((key) => ({
        id: key,
        ...response[key],
        date: new Date(response[key]["date"]),
      }));
      console.log(transformedData);
      setExpenses(transformedData);
    };

    fetchExpenses({ endpoint: "expenses" }, transform);
  }, [fetchExpenses]);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => [expense, ...prevExpenses]);
  };

  return (
    <div className="App">
      <ExpenseNew onAddExpense={addExpenseHandler} />
      <ExpenseList items={expenses} />
    </div>
  );
}



// const Tasks = () => {
//   // const transformData = useCallback((data) => {
//   //   console.log(data);
//   //   const transformedData = data.results;
//   //   // const transformedData = Object.keys(data).map((key) => {
//   //   //   return { id: key, title: data[key].title };
//   //   // });
//   //   setTasks(transformedData);
//   // }, []);

//   const { isLoading, error, sendRequest } = useFetch();
//   // {
//   //   url: "https://swapi.py4e.com/api/films",
//   // },
//   // transformData

//   useEffect(() => {
//     const transformData = (data) => {
//       console.log(data);
//       const transformedData = data.results;
//       // const transformedData = Object.keys(data).map((key) => {
//       //   return { id: key, title: data[key].title };
//       // });
//       setTasks(transformedData);
//     };
//     sendRequest(
//       {
//         url: "https://swapi.py4e.com/api/films",
//       },
//       transformData
//     );
//   }, [sendRequest]);

//   const addTaskHandler = (data) => {
//     sendRequest();
//     // setUsers((prev) => {
//     //   return [data, ...prev];
//     // });
//   };

//   return (
//     <Fragment>
//       <Header />
//       <main>
//         {!authContext.isLoggedIn && <Login />}
//         {isLoading && (
//           <section>
//             <TaskAdd onCreateTask={addTaskHandler} />
//             {!isLoading && tasks.length > 0 && <TaskList data={tasks} />}
//             {!isLoading && tasks.length <= 0 && !error && (
//               <p>Found no tasks.</p>
//             )}
//             {!isLoading && error && <p>{error}</p>}
//             {isLoading && <p>Loading...</p>}
//           </section>
//         )}
//       </main>

//       <Footer />
//     </Fragment>
//   );
// };

export default Expenses;