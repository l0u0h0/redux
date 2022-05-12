import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <TodoList />
        <TodoForm />
      </header>
    </div>
  );
}

export default App;
