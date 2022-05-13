import { connect } from "react-redux";
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

function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => {
        return <li>{todo.text}</li>;
      })}
    </ul>
  );
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
// connect 함수를 실행한 결과가 함수이기에 뒤에 ()
// connect 함수를 실행한 결과가 함수고 그 함수를 실행한 결과가 컨테이너
const TodoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default TodoListContainer;
