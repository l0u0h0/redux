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

- `index.js`에서 기존의 `ReduxContents.Provider` 말고  
  `react-redux`에서 제공하는 `Provider` 컴포넌트로 전체 컴포넌트  
  감싸주기
- 그 후 사용할 컴포넌트 파일에서 connect 함수를 이용해  
  컨테이너를 만들어 준다.
- 커넥트 함수는 실행한 결과가 함수이기에 `connect()();`와 같이  
  함수를 실행한 결과를 실행한 결과를 얻어낼 수 있다.
- 그 결과가 컨테이너이다.
- 커넥터 함수의 인자로는 state와 dispatch가 있고 두 인자 모두  
  함수이다.
- 예시

```jsx
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
```

- `TodoList`는 기존 컴포넌트를 임폴트 해 가져와야함
- `mapStateProps` 함수에서는 연결할 state를 리턴
- `mapDispatchProps` 함수에서는 연결할 액션을 리턴
- 기존 컴포넌트 코드 예시

```jsx
export default function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => {
        return <li>{todo.text}</li>;
      })}
    </ul>
  );
}
```

- 액션을 넘겨주는 예시

```jsx
const TodoFormContainer = connect(
  (state) => ({}),
  (dispatch) => ({
    add: (text) => {
      dispatch(addTodo(text));
    },
  })
)(TodoForm);

export default TodoFormContainer;
```

- 이와 같이 코드를 좀 더 줄여 작성할 수도 있다.

- `conncet` HOC 함수를 사용하지 않고 커스텀 훅을 만들어 사용할 수도 있다.
- ### TodoListContainer.jsx

```jsx
function TodoListContainer() {
  const todos = useSelector((state) => state.todos);

  return <TodoList todos={todos} />;
}

export default TodoListContainer;
```

- `useSelector`는 react-redux에서 제공하는 함수
- 스토어에서 원하는 상태 값을 고를 수 있도록 함.

- ### TodoFormContainer.jsx

```jsx
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
```

- `useDispatch`는 react-redux에서 제공하는 함수
- dispatch를 가져오는 역할을 수행
- `useCallback`은 react에서 제공하는 함수
- 뒤 파라메터로 들어오는 인자에 변경이 생기면 앞 인자로 들어온  
  함수가 실행되는 역할
- 그냥 함수로 만들었다간 액션이 일어나지 않아도 계속 props가  
  변경될 수 있기에 콜백을 사용

## Redux Advanced.1

- ### Async Action with Redux
- ### 리덕스 미들웨어
- ### redux-thunk
- ### redux-promise-middleware

## Async Action with Redux

- 배열 가져오기 위해 `axios` 설치하기

  - `npm i axios`

- api 호출은 보통 컴포넌트디드마운트 시점에 호출
- ### 비동기 작업을 어디서 하느냐? 가 제일 중요

  - 액션을 분리한다.
    - Start
    - Success
    - Fail
  - `dispatch`를 할 때 해준다.
    - 당연히 리듀서는 동기적인 것 => Pure
    - dispatch도 동기적인 것

- 비동기 작업을 컴포넌트 안에 넣는다면 뷰와 관련되지 않은  
  로직이 추가되기 때문에 디버깅이 복잡할 수 있다.
- 테스트도 어려울 수 있다.
- 그렇기에 컴포넌트 말고 컨테이너에 넣ㅇㅓ서 한번에 만들면  
  훨씬 깔끔한 로직을 구성할 ㅅ ㅜ있다.

- `commit -m 'async action'`

## 리덕스 미들웨어

- 미들웨어가 `dispatch` 앞 뒤에 코드를 추가할 수 있게 해주
- 미들웨어가 여러 개면 순차적으로 실행, 설정된 순서대로
- 두 단계
  - 스토어를 만들 때 미들웨어를 설정하는 부분
    - `{createStore, applyMiddleware} from redux`
  - 디스패치가 호출될 때 실제로 미들웨어를 통과하는 부분
- `dispatch` 메서드를 통해 스토어로 가고 있는 액션을 가로채는 코드

- ### store.js

```js
function middleware1(store) {
  console.log("middleware1", 0);
  // 다음 미들웨어를 지칭
  return (next) => {
    console.log("middleware1", 1, next);
    return (action) => {
      console.log("middleware1", 2);
      const returnValue = next(action);
      console.log("middleware1", 3);
      return returnValue;
    };
  };
}

function middleware2(store) {
  console.log("middleware2", 0);
  // 다음 미들웨어를 지칭
  return (next) => {
    console.log("middleware2", 1, next);
    return (action) => {
      console.log("middleware2", 2);
      const returnValue = next(action);
      console.log("middleware2", 3);
      return returnValue;
    };
  };
}

const store = createStore(todoApp, applyMiddleware(middleware1, middleware2));
```

- log 순서

  - middleware1 0
  - middleware2 0
  - middleware2 1
  - middleware1 1
  - middleware1 2
  - middleware2 2
  - middleware2 3
  - middleware1 3

- middleware의 리턴 함수(next를 인자로 받는)  
  함수 안에서는
- 스토어에 getstate, dispatch를 할 수 있다.
- 그래서 의도에 맞춰 스테이트를 얻어다 다른 처리를 한다던가  
  디스패치를 추가로 보낸다던가 할 수 있다.
- 보통은 리덕스에 부가기능을 추가하기 위한  
  미들웨어 라이브러리를 사용한다.

## redux-devtools

- [`redux-devtools`](https://github.com/zalmoxisus/redux-devtools-extension)
- 미들웨어를 설치해 브라우저에 있는 dev-tools에 연결하는 작업이 필요
- `npm i redux-devtools-extension -D`
- `createstore` 할 때

```js
const store = createStore(todoApp, composeWithDevTools(applyMiddleware()));
```

- 추가해주기

## redux-thunk

- [`redux-thunk`](https://github.com/reduxjs/redux-thunk)
- 리덕스 미들웨어
- 리덕스를 만든 사람이 만들었음.(Dan)
- 리덕스에서 비동기 처리를 위한 라이브러리
- 액션 생성자를 활용하여 비동기 처리
- 액션 생성자가 액션을 리턴하지 않고, 함수를 리턴함
- `npm i redux-thunk`

## redux-promise-middleware

- [`redux-promise-middleware`](https://pburtchaell.gitbook.io/redux-promise-middleware)
- 비동기 처리를 위한 리덕스 미들웨어
- `npm i redux-promise-middleware`

```js
// src/actions.js

// redux-promise-middleware

const GET_USERS = "GET_USERS";

// 미들웨어가 자동으로 생성해주는 타입들,
// 스토어의 상태에 따라 상태를 지정해줌.
export const GET_USERS_PENDING = "GET_USERS_PENDING";
export const GET_USERS_FULFILLED = "GET_USERS_FULFILLED";
export const GET_USERS_REJECTED = "GET_USERS_REJECTED";

export function getUsersPromise() {
  return {
    type: GET_USERS,
    // 이 부분에 프로미스 함수 작성
    payload: async () => {
      const res = await axios.get("https://api.github.com/users");
      return res.data;
    },
  };
}
```

- Promise 미들웨어는 어떤 타입으로 디스패치할 때 `payload`에 프로미스 객체가 있으면  
  타입의 뒤에 PENDING, FULFILLED, REJECTED를 붙이고
- 성공한 경우에는 리턴되는 `res.data`를 `action.payload`에 넣어주고 에러가 발생할 경우  
  `action.payload`에 에러 객체를 넣어준다.
- PENDING은 그냥 타입만 들어온다.
- 리덕스 프로미스 미들웨어는 임의로 미들웨어를 통과할 때 타입 뒤에 무언가를 붙여 프로미스를  
  처리하고 보내주는 로직을 담고있다.

---

## Ducks Pattern

- 라이브러리가 아니고 많은 사람들이 사용하는 리덕스의 패턴
- [`Ducks Pattern`](https://github.com/erikras/ducks-modular-redux)
- 아래쪽에 한국어 번역 버전도 있다.
- src/redux
  - create.js
- src/redux/modules

  - module1.js
  - module2.js
  - ...
  - reducer.js(or index.js)

- 장점
  - 기존에는 액션js에 액션이 다 몰려있었고 리듀서만 각각 분리된 상태에서 그 리듀서에서  
    액션의 타입을 받아온다던가 했는데
  - 이렇게 하는 것보다 모듈로 하나의 카테고리로 묶어 사용하는 것이 수월하다.

## react-router-dom & redux

- router와 redux connected
- [`connected-react-router`](https://github.com/supasate/connected-react-router)
