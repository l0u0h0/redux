// import { connect } from "react-redux";
// import useReduxState from "../hooks/useReduxState";

// export default function TodoList() {
//   const state = useReduxState();
//   return (
//     <ul>
//       {state.todos.map((todo) => {
//         return <li>{todo.text}</li>;
//       })}
//     </ul>
//   );
// }

export default function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => {
        return <li>{todo.text}</li>;
      })}
    </ul>
  );
}
