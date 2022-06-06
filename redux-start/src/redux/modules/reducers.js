import { combineReducers } from "redux";
import todos from "../modules/todos";
import filter from "../modules/filter";
import users from "../modules/users";

const reducer = combineReducers({
  todos,
  filter,
  users,
});

export default reducer;
