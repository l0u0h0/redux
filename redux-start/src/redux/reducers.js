// state
// ['coding', 'lunch'];
// --> combinereducer
// state
// [{text: 'coding', done: false}, {text: 'lunch', done: false}]
// {todos: [{text: 'coding', done: false}, {text: 'lunch', done: false}], filter: 'ALL'}
// import { ADD_TODO, COMPLETE_TODO, SHOW_ALL, SHOW_COMPLETE } from "./actions";
// import { combineReducers } from "redux";
// 초기값 설정
// const initialState = { todos: [], filter: "ALL" };
// const todosInitialState = initialState.todos;
// const filterInitialState = initialState.filter;

// const reducer = combineReducers({
//   todos: todosReducer,
//   filter: filterReducer,
// });
// export default reducer;
// export function todoApp(previousState = initialState, action) {
//   if (action.type === ADD_TODO) {
//     return {
//       ...previousState,
//       todos: [...previousState.todos, { text: action.text, done: false }],
//     };
//   }
//   if (action.type === COMPLETE_TODO) {
//     return {
//       ...previousState,
//       todos: previousState.todos.map((todo, index) => {
//         if (index === action.index) {
//           return { ...todo, done: true };
//         }
//         return todo;
//       }),
//     };
//   }
//   if (action.type === SHOW_COMPLETE) {
//     return {
//       ...previousState,
//       filter: "COMPLETE",
//     };
//   }
//   if (action.type === SHOW_ALL) {
//     return {
//       ...previousState,
//       filter: "ALL",
//     };
//   }
//   return previousState;
// }

// [{text: 'coding', done: false}, {text: 'lunch', done: false}]
// function todosReducer(previousState = todosInitialState, action) {
//   if (action.type === ADD_TODO) {
//     return [...previousState, { text: action.text, done: false }];
//   }
//   if (action.type === COMPLETE_TODO) {
//     return previousState.map((todo, index) => {
//       if (index === action.index) {
//         return { ...todo, done: true };
//       }
//       return todo;
//     });
//   }
//   return previousState;
// }

// function filterReducer(previousState = filterInitialState, action) {
//   if (action.type === SHOW_COMPLETE) {
//     return "COMPLETE";
//   }
//   if (action.type === SHOW_ALL) {
//     return "ALL";
//   }
//   return previousState;
// }
