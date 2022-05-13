import { connect, useSelector } from "react-redux";
import TodoList from "../components/TodoList";

// const mapStateToProps = (state) => {
//   return {
//     todos: state.todos,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {};
// };
// // connect 함수를 실행한 결과가 함수이기에 뒤에 ()
// // connect 함수를 실행한 결과가 함수고 그 함수를 실행한 결과가 컨테이너
// const TodoListContainer = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(TodoList);

function TodoListContainer() {
  const todos = useSelector((state) => state.todos);

  return <TodoList todos={todos} />;
}

export default TodoListContainer;
