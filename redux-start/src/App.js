import "./App.css";
// import TodoList from "./components/TodoList";
// import TodoForm from "./components/TodoForm";
// import TodoListContainer from "./containers/TodoListContainer";
// import TodoFormContainer from "./containers/TodoFormContainer";
// import UserListContainer from "./containers/UserListContainer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Todos from "./pages/Todos";
import Users from "./pages/Users";

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
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
