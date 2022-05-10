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
