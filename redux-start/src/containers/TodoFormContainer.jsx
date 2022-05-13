import { useCallback } from "react";
import { connect, useDispatch } from "react-redux";
import TodoForm from "../components/TodoForm";
import { addTodo } from "../redux/actions";

// const TodoFormContainer = connect(
//   (state) => ({}),
//   (dispatch) => ({
//     add: (text) => {
//       dispatch(addTodo(text));
//     },
//   })
// )(TodoForm);

// export default TodoFormContainer;

export default function TodoFormContainer() {
  const dispatch = useDispatch();
  // [dispatch]에서 변화가 있을 때 함수가 새로 만들어짐
  const add = useCallback(
    (text) => {
      dispatch(addTodo(text));
    },
    [dispatch]
  );
  return <TodoForm add={add} />;
}
