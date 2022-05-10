// state
// ['coding', 'lunch'];
import { ADD_TODO } from "./actions";
// 초기값 설정
const initialState = [];
export function todoApp(previousState = initialState, action) {
  if (action.type === ADD_TODO) {
    return [...previousState, action.todo];
  }
  return previousState;
}
