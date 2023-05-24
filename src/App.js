import {
  BrowserRouter as RouterProvider,
  Route,
  Switch,
} from "react-router-dom";
import Expenses from "./pages/Expenses";

function App() {
  return (
    <RouterProvider>
      <Switch>
        <Route path="/" component={Expenses} />
      </Switch>
    </RouterProvider>
  );
}

export default App;
