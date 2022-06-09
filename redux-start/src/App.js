import "./App.css";
// import TodoList from "./components/TodoList";
// import TodoForm from "./components/TodoForm";
// import TodoListContainer from "./containers/TodoListContainer";
// import TodoFormContainer from "./containers/TodoFormContainer";
// import UserListContainer from "./containers/UserListContainer";
import { Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Todos from "./pages/Todos";
import Users from "./pages/Users";
import history from "./history";

// props 사용
// function App({ store }) {
//   const [state, setState] = useState(store.getState());
//   useEffect(() => {
//     const unsubscribe = store.subscribe(() => {
//       setState(store.getState());
//     });
//     return () => {
//       unsubscribe();
//     };
//   }, [store]);
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         {JSON.stringify(state)}
//         <button onClick={click}>추가</button>
//       </header>
//     </div>
//   );
//   function click() {
//     store.dispatch(addTodo("todo"));
//   }
// }

// context 사용

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <UserListContainer />
    //     <TodoListContainer />
    //     <TodoFormContainer />
    //   </header>
    // </div>
    <Router history={history}>
      <Route path="/" exact component={Home} />
      <Route path="/todos" exact component={Todos} />
      <Route path="/users" exact component={Users} />
    </Router>
  );
}

export default App;
