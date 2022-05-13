## Redux

- ### Redux
- 컴포넌트 간의 통신
- `store`라 부르는 공간에 상태를 변경되게 하고 변경된 값을  
  모든 컴포넌트가 사용 가능할 수 있게 함
- store의 상태가 변경된다면 상태를 갖고 있는 모든 컴포넌트가  
  자동으로 재렌더링된다.

1. 단일 스토어 만드는 법
2. 리액트에서 스토어 사용하는 법

- 단일 스토어다
- import redux,
- 액션을 정의
- 액션을 사용하는 리듀서를 만들고
- 리듀서들을 합친다
- 최종 합쳐진 리듀서를 인자로 단일 스토어를 만든다

3. 준비한 스토어를 리액트 컴포넌트에서 사용하기

- import react-redux
- connect 함수를 이용해 컴포넌트에 연결

`npm i redux` 로 리덕스 설치

### 리덕스의 액션이란?

- 액션은 사실 그냥 객체이다
- 두 가지 형태의 액션
  - {type: 'TEST'} // payload 없는 액션
  - {type: 'TEST', params: 'hello'} // payload 있는 액션
  - payload ==> 여러 다른 프로퍼티를 의미
- `type`만이 필수 프로퍼티이며 `type`은 문자열이다.
- ### 액션 생성자란?

  - `function 액션생성자(...args) { return 액션; }`
  - 액션을 생성하는 함수를 `액션 생성자(Action Creator)`라 한다.
  - 함수를 통해 액션을 생성해서 액션 객체를 리턴한다.
  - createTest('hello'); // {type: 'TEST', params: 'hello'} 리턴

- 액션은,

  - 액션 생성자를 통해 액션을 만들어 낸다.
  - 만들어낸 액션 객체를 리덕스 스토어에 보낸다.
  - 리덕스 스토어가 액션 객체를 받으면 스토어의 상태 값이 변경된다.
  - 변경된 상태 값에 의해 상태를 이용하고 있는 컴포넌트가 변경된다.
  - 액션은 스토어에 보내는 일종의 `input` 이라 생각할 수 있다.

- 액션을 준비하기 위해서는
  - 액션의 타입을 정의하여 변수로 빼는 단계
    - 강제는 아님
    - 그냥 타입을 문자열로 넣기에는 실수를 유발할 가능성이 크다.
    - 미리 정의한 변수를 사용하면, 스펠링에 주의를 덜 기울여도 된다.
  - 액션 객체를 만들어내는 함수를 만드는 단계
    - 하나의 액션 객체를 만들기 위해 하나의 함수를 만들어낸다.
    - 액션의 타입은 미리 정의한 타입 변수로부터 가져와서 사용한다.(위에서)

### Action Creator

```js
const ADD_TODO = "ADD_TODO";

function addTodo(todo) {
  return {
    type: ADD_TODO,
    todo,
  };
}
```

## 리덕스의 리듀서란?

- 액션을 주면, 그 액션이 적용되어 달라진(안달라질수도잇) 결과를 만들어줌.
- Just Function!
  - `Pure Function`
    - 같은 인풋을 받으면 같은 결과를 도출하는 그런 함수
    - 리듀서 안에 시간에 따라 달라지거나 매번 다른 값을 내거나 하면 안댐.
  - `Immutable`
    - 원래 오리지날 스테이트와 바뀐 스테이트가 별도의 객체로 만들어져야한다.
    - 왜 와이
      - 리듀서를 통해 스테이트가 달라졌음을 리덕스가 인지하는 방식
-

```
function 리듀서(previousState, action) {
  return newState;
}
```

- 액션을 받아서 스테이트를 리턴하는 구조
- 인자로 들어오는 `previousState`와 리턴하는 `newState`는  
  다른 참조를 가지도록 해야한다!!!!!

```js
import { ADD_TODO } from "./actions";
// 초기값 설정
const initialState = [];
function todoApp(previousState = initialState, action) {
  if (action.type === ADD_TODO) {
    return [...previousState, action.todo];
  }
  return previousState;
}
```

## createStore

- 스토어를 만드는 함수
- `const store = createStore(리듀서);`

```js
createStore<S>(
  reducer: Reducer<S>,
  preloadedState: S,
  enhancer?: StoreEnhancer<S>
):Store<S>;
```

- enhancer => 리덕스 어드밴쳐에서 알아보자구

```js
import { createStore } from "redux";
import { todoApp } from "./reducers";
const store = createStore(todoApp);

export default store;
```

- store 객체에는
  - `dispatch(액션)`
    - 액션생성자를 인자로 받아 실행할 수도 잇음
    - 현재 스토어의 상태를 변경시키는 함수
  - `getState()`
    - 스토어의 상태값을 가져올 수 잇음
  - `replaceReducer()`
    - 다른 리듀서를 인자로 받음
    - 원래의 리듀서를 다른 리듀서로 바꾸는 기능
    - 잘 쓰이지 않으니 있다고만 알아두기
  - `subscribe()`
    - 함수를 인자로 받고 스토어의 상태가 변경되면 함수가 호출됨.
    - `const unsubscribe = store.subscribe(() => {});`
    - 리턴이 `unsubscrive` 라는 점!
    - `unsubscribe();` 하면 제거

```js
// 상태가 변경될 때마다 함수 실행
const unsubscribe = store.subscribe(() => {
  // 현재 스토어의 상태 값 가져오기
  console.log(store.getState());
});
// 스토어에 상태 값 추가하기
store.dispatch(addTodo("coding"));
store.dispatch(addTodo("react book"));
store.dispatch(addTodo("eay"));
// subscribe 제거
unsubscribe();
// 제거한 이후에는 콘솔 코드가 실행되지 않음
// 하지만 스토어의 State에는 계속 추가됨.
store.dispatch(addTodo("coding"));
store.dispatch(addTodo("react book"));
store.dispatch(addTodo("eay"));
```

## combineReduces

- `redux`로부터 `import`

- 상태의 정보가 많아질수록 리듀서가 많아지고 복잡해져서 같은 분류끼리  
  묶어놓은 뒤 `combineReducer`함수로 합쳐서 단일 스토어로 사용 가능
- ### index.js

```js
store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(addTodo("할일"));
store.dispatch(completeTodo(0));
store.dispatch(showComplete());
```

- ### actions.js

```js
export const ADD_TODO = "ADD_TODO";
export const COMPLETE_TODO = "COMPLETE_TODO";

// {type: ADD_TODO, text: '할일'}
export function addTodo(text) {
  return {
    type: ADD_TODO,
    text,
  };
}

// {type: COMPLETE_TODO, index: 3}
export function completeTodo(index) {
  return {
    type: COMPLETE_TODO,
    index,
  };
}

export const SHOW_ALL = "SHOW_ALL";
export const SHOW_COMPLETE = "SHOW_COMPLETE";

export function showAll() {
  return { type: SHOW_ALL };
}

export function showComplete() {
  return { type: SHOW_COMPLETE };
}
```

- ### reducers.js

```js
// state
// ['coding', 'lunch'];
// --> combinereducer
// state
// [{text: 'coding', done: false}, {text: 'lunch', done: false}]
// {todos: [{text: 'coding', done: false}, {text: 'lunch', done: false}], filter: 'ALL'}
import { ADD_TODO, COMPLETE_TODO, SHOW_ALL, SHOW_COMPLETE } from "./actions";
import { combineReducers } from "redux";
// 초기값 설정
const initialState = { todos: [], filter: "ALL" };
const todosInitialState = initialState.todos;
const filterInitialState = initialState.filter;

const reducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer,
});
export default reducer;
export function todoApp(previousState = initialState, action) {
  if (action.type === ADD_TODO) {
    return {
      ...previousState,
      todos: [...previousState.todos, { text: action.text, done: false }],
    };
  }
  if (action.type === COMPLETE_TODO) {
    return {
      ...previousState,
      todos: previousState.todos.map((todo, index) => {
        if (index === action.index) {
          return { ...todo, done: true };
        }
        return todo;
      }),
    };
  }
  if (action.type === SHOW_COMPLETE) {
    return {
      ...previousState,
      filter: "COMPLETE",
    };
  }
  if (action.type === SHOW_ALL) {
    return {
      ...previousState,
      filter: "ALL",
    };
  }
  return previousState;
}

// [{text: 'coding', done: false}, {text: 'lunch', done: false}]
function todosReducer(previousState = todosInitialState, action) {
  if (action.type === ADD_TODO) {
    return [...previousState, { text: action.text, done: false }];
  }
  if (action.type === COMPLETE_TODO) {
    return previousState.map((todo, index) => {
      if (index === action.index) {
        return { ...todo, done: true };
      }
      return todo;
    });
  }
  return previousState;
}

function filterReducer(previousState = filterInitialState, action) {
  if (action.type === SHOW_COMPLETE) {
    return "COMPLETE";
  }
  if (action.type === SHOW_ALL) {
    return "ALL";
  }
  return previousState;
}
```

- `reducers` 디렉토리를 만들어 보다 편하게 관리할 수 있음
- ### reducers/todos.js

```js
import { ADD_TODO, COMPLETE_TODO } from "../actions";

const initialState = [];
export default function todos(previousState = initialState, action) {
  if (action.type === ADD_TODO) {
    return [...previousState, { text: action.text, done: false }];
  }
  if (action.type === COMPLETE_TODO) {
    return previousState.map((todo, index) => {
      if (index === action.index) {
        return { ...todo, done: true };
      }
      return todo;
    });
  }
  return previousState;
}
```

- ### reducers/filter.js

```js
import { SHOW_ALL, SHOW_COMPLETE } from "../actions";

const initialState = "ALL";
export default function filter(previousState = initialState, action) {
  if (action.type === SHOW_COMPLETE) {
    return "COMPLETE";
  }
  if (action.type === SHOW_ALL) {
    return "ALL";
  }
  return previousState;
}
```

- ### reducers/reducer.js

```js
import { combineReducers } from "redux";
import todos from "./todos";
import filter from "./filter";

const reducer = combineReducers({
  todos,
  filter,
});

export default reducer;
```

- ### store.js

```js
import { createStore } from "redux";
import todoApp from "./reducers/reducer";
const store = createStore(todoApp);

export default store;
```

디렉토리를 만들어 사용했다면 `todoApp`을 불러오는 경로 바꿔주기

## Redux를 React에 연결

- `react-redux`안쓰고 연결해보기
- 단일 스토어를 만들고
- subscribe와 getState를 이용해 변경되는 state 데이터를 얻어,
- props로 계속 아래로 전달
- `componentDidMount` - `subscribe`
- `componentWillUnmount` - `unsubscribe`

- func component에서는 useEffect()로 사용

- `props`를 사용해 전달
- ### index.js

```js
<App store={store} />
```

- ### App.js

```js
function App({ store }) {
  const [state, setState] = useState(store.getState());
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.getState());
    });
    return () => {
      unsubscribe();
    };
  }, [store]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {JSON.stringify(state)}
        <button onClick={click}>추가</button>
      </header>
    </div>
  );
  function click() {
    store.dispatch(addTodo("todo"));
  }
}
```

- `context`를 사용해 store 이용하기
- ### contexts/ReduxContext.js

```js
import { createContext } from "react";

const ReduxContext = createContext();

export default ReduxContext;
```

- ### index.js

```js
<ReduxContext.Provider value={store}>
  <App />
</ReduxContext.Provider>
```

- ### App.js

```js
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
```

- ### components/TodoList.jsx

```jsx
import useReduxState from "../hooks/useReduxState";

export default function TodoList() {
  const state = useReduxState();
  return (
    <ul>
      {state.todos.map((todo) => {
        return <li>{todo.text}</li>;
      })}
    </ul>
  );
}
```

- ### components/TodoForm.jsx

```jsx
import { useRef } from "react";
import useReduxDispatch from "../hooks/useReduxDispatch";
import { addTodo } from "../redux/actions";

export default function TodoForm() {
  const inputRef = useRef();
  const dispatch = useReduxDispatch();

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={click}>추가</button>
    </div>
  );
  function click() {
    dispatch(addTodo(inputRef.current.value));
  }
}
```

- ### hooks/useReduxState.js

```js
import { useContext, useEffect, useState } from "react";
import ReduxContext from "../contexts/ReduxContext";

export default function useReduxState() {
  const store = useContext(ReduxContext);
  const [state, setState] = useState(store.getState());
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.getState());
    });
    return () => {
      unsubscribe();
    };
  }, [store]);
  return state;
}
```

- ### hooks/useReduxDispatch.js

```js
import { useContext } from "react";
import ReduxContext from "../contexts/ReduxContext";

export default function useReduxDispatch() {
  const store = useContext(ReduxContext);
  return store.dispatch;
}
```

- `store, action.js`는 이전과 동일

- ### react-redux 사용해 연결하기
- `Provider` 컴포넌트를 제공해줌.
- `connect` HOC 함수를 통해 컨테이너를 만들어준다.
  - 컨테이너는 스토어의 state와 dispatch(액션)를 연결한  
    컴포넌트에 props로 넣어주는 역할을 한다.
  - 필요한 것??
    - 어떤 state를 어떤 props에 연결할 것인지에 대한 정의
    - 어떤 dispatch(액션)을 어떤 props에 연결할 것인지에 대한 정의
    - 그 props를 보낼 컴포넌트를 정의
