# Table of Contents
- [Table of Contents](#table-of-contents)
- [About Project](#about-project)
- [Build Setup](#build-setup)
- [DEV Notes](#dev-notes)
  - [Fragment](#fragment)
  - [ref, reactive](#ref-reactive)
    - [ref](#ref)
    - [reactive](#reactive)
  - [bindings](#bindings)
    - [style binding](#style-binding)
    - [class binding](#class-binding)
  - [emit: 자식 컴포넌트 -> 부모 컴포넌트](#emit-자식-컴포넌트---부모-컴포넌트)
    - [부모 컴포넌트 (App.vue)](#부모-컴포넌트-appvue)
    - [자식 컴포넌트 (TodoSimpleForm.vue)](#자식-컴포넌트-todosimpleformvue)
  - [props: 부모 컴포넌트 -> 자식 컴포넌트](#props-부모-컴포넌트---자식-컴포넌트)
    - [부모 컴포넌트 (App.vue)](#부모-컴포넌트-appvue-1)
    - [자식 컴포넌트 (TodoList.vue)](#자식-컴포넌트-todolistvue)
    - [props를 사용할 때 주의점](#props를-사용할-때-주의점)
  - [json-server](#json-server)
    - [PUT과 PATCH](#put과-patch)
  - [watchEffect](#watcheffect)
  - [watch](#watch)
    - [ref: 단일 값](#ref-단일-값)
    - [ref: 복수 값](#ref-복수-값)
    - [rective: 단일 값](#rective-단일-값)
    - [reactive: 복수 값](#reactive-복수-값)
  - [router-link](#router-link)
    - [params가 없을 경우](#params가-없을-경우)
    - [params가 있을 경우](#params가-있을-경우)
  - [이벤트 버블링](#이벤트-버블링)
    - [button](#button)
    - [input checkbox](#input-checkbox)
  - [$event](#event)
  - [JavaScript 객체 복사 시 주의점](#javascript-객체-복사-시-주의점)
- [Troubleshooting](#troubleshooting)
  - [[Vue warn]: Failed to resolve component](#vue-warn-failed-to-resolve-component)


# About Project
Todo App with Vue 3

# Build Setup
```bash
# Project setup
$ npm install

# Compiles and hot-reloads for development
$ npm run serve

# Compiles and hot-reloads for development AND start json-server
$ npm run dev

# Compiles and minifies for production
$ npm run build

# Lints and fixes files
$ npm run lint
```

# DEV Notes
## Fragment
기존 Vue 2 버전에서는 template 하위에 하나의 태그만 올 수 있었다.
Vue 3에서는 아래와 같이 template 하위에 여러 개의 태그가 오도록 설정할 수 있다.
```html
<!-- Vue 3 -->
<template>
  <div>{{ name }}</div>
  <div>hi</div>
</template>
```

```html
<!-- Vue 2 -->
<template>
  <div>
    <div>{{ name }}</div>
    <div>hi</div>
  </div>
</template>
```

## ref, reactive
Vue 3의 새로운 문법인 `setup()` 을 사용하면 변수를 선언했을 때 reactivity가 적용되지 않는다.

아래 예시에서 name을 변경하여도 template의 name은 변경되지 않는 것을 확인할 수 있다.

```html
<template>
  {{ name }}
</template>

<script>
export default {
  setup() {
    let name = 'KyungJin Jung';
    const updatName = () => name = 'Kyungjin';

    return {
      name,
      updateName,
    }
  }
}
</script>
```

이를 해결하기 위해서는 Vue 3의 `setup()` 에서는 `ref()`와 `reactive()` 를 사용하여야 한다. 

### ref
ref는 `.value` 로 접근한다.

```html
<template>
   <!-- 사용 시에는 .value 사용하지 않는다 -->
  <div>{{ name }}</div>
  <div>{{ refInfo.job }}</div>
</template>

<script>
export default {
  setup() {
    let name = ref('KyungJin Jung');

    const refInfo = ref({
      job: 'developer',
    });

    const updateName = () => name.value = '정경진';

    const updateRefInfo = () => refInfo.value.job = '(Ref) Frontend Developer';

    return {
      name,
      refInfo,
      updateName,
      updateRefInfo,
    }
  }
}
</script>
```

### reactive
`reactive()` 는 객체나 배열에서 사용하면 내부의 원소까지 reactivity를 제공한다.

```html
<template>
  {{ reactiveInfo.job }}
</template>

<script>
export default {
  setup() {
    const reactiveInfo = reactive({
      job: 'developer',
    });
    
    const updateReactiveInfo = () => reactiveInfo.job = '(Reactive) Frontend Developer';

    return {
      reactiveInfo,
      updateReactiveInfo,
    }
  }
}
</script>
```

## bindings

체크된 todo item의 스타일을 주는 방법에는 2가지가 있다.

### style binding
style object를 만들어 바인딩 해준다.
스타일 key가 `text-decoration` 이라면 `textDecoration` 으로 변경해준다.

```html
<template>
  <!-- 다른 태그 생략 -->
  <label class="form-check-label" :style="todo.done ? todoStyle : {}">{{ todo.title }}</label>
</template>

<script>
const todoStyle = {
  textDecoration: 'line-through', // text-decoration
  color: 'grey',
}
</script>
```
### class binding
```html
<template>
  <label class="form-check-label" :class="{ done: todo.done }">{{ todo.title }}</label>
</template>

<style>
.done {
  text-decoration: line-through;
  color: grey;
}
</style>
```

## emit: 자식 컴포넌트 -> 부모 컴포넌트
자식 컴포넌트에서 부모 컴포넌트로 데이터의 변경을 알리기 위해서는 emit이라는 개념이 사용된다.

`App.vue` 에서 `TodoSimpleForm` 이라는 컴포넌트를 불러오고 있다.

### 부모 컴포넌트 (App.vue)
```html
<template>
  <TodoSimpleForm @add-todo="addTodo"></TodoSimpleForm>
</template>

<script>
export default {
  setup() {
    const addTodo = (todo) => todos.value.push(todo);
    
    return {
      addTodo,
    }
  }
}
</script>

```

### 자식 컴포넌트 (TodoSimpleForm.vue)
- `setup(props, context)` setup에서 param 받아오기
- `context.emit(이벤트명, 전달객체);` 호출하여 emit

```html
<template>
  <form @submit.prevent="onSubmit">
    <!-- 내부 생략 -->
  </form>
</template>

<script>
import { ref } from 'vue';

export default {
  setup(props, context) {
    const todo = ref('');
    const hasError = ref(false);

    const onSubmit = () => {
      if (!todo.value) {
        hasError.value = true;
        return;
      }
      // 부모 컴포넌트로 add-todo 이벤트 발생시키며 object 전달
      context.emit('add-todo', {
        id: Date.now(),
        title: todo.value,
        done: false,
      });
      hasError.value = false;
      todo.value = '';
    }

    return {
      todo,
      onSubmit,
      hasError,
    }
  }
}
</script>
```

## props: 부모 컴포넌트 -> 자식 컴포넌트
부모 컴포넌트에서 자식 컴포넌트로 데이터를 내려줄 때는 props라는 개념이 사용된다.

### 부모 컴포넌트 (App.vue)
```html
<template>
  <TodoList :todoList="todos"></TodoList>
</template>

<script>
export default {
  setup() {
    const todos = ref([
      { id: Date.now(), title: 'Sample Todo', done: false }
    ]);

    return {
      todos,
    }
  }
}
</script>
```

### 자식 컴포넌트 (TodoList.vue)
부모 컴포넌트에서 내려준 props는 다음과 같이 사용할 수 있다.

```html
<template>
  <div v-for="(todo, index) in todoList" :key="todo.id" class="card mt-2">
    <!-- 중략 -->
    <input class="form-check-input" type="checkbox" v-model="todo.done" >
  </div>
</template>

<script>
export default {
  // props: ['todoList'], 도 사용 가능
  props: {
    todoList: {
      type: Array,
      required: true,
    }
  },
}
</script>
```
### props를 사용할 때 주의점
props는 자식 컴포넌트로 데이터를 내려주는 **단방향 바인딩** 기법이다.
**따라서 자식 컴포넌트는 props의 데이터를 변경해서는 안 된다.**

[자식 컴포넌트 (TodoList.vue)](#자식-컴포넌트-todolistvue)의 소스에는 문제점이 있다.

```html
<input class="form-check-input" type="checkbox" v-model="todo.done" >
```

props로 받은 `todo.done` 을 `v-model` 로 양방향 바인딩 해주었는데, 이럴 경우 props의 값이 변하게 된다.

따라서 다음과 같은 구조로 변경해야 한다.

**부모 컴포넌트 (App.vue)** 

```html
<template>
  <TodoList :todos="todos" @toggle-todo="toggleTodo"></TodoList>
</template>

<script>
export default {
  setup() {
    // todos 생략
    const toggleTodo = (index) => todos.value[index].done = !todos.value[index].done;
    
    return {
      todos,
      toggleTodo,
    }
  }
}
</script>
```

**자식 컴포넌트 (TodoList.vue)**

```html
<template>
  <input
    class="form-check-input"
    type="checkbox"
    :value="todo.done"
    @input="toggleTodo(index)" >
</template>

<script>
export default {
  props: {
    todos: {
      type: Array,
      required: true,
    }
  },
  emits: ['toggle-todo'],
  setup(props, context) {
    const toggleTodo = (index) => context.emit('toggle-todo', index);

    return {
      toggleTodo,
    }
  }
}  
</script>
```

## [json-server](https://www.npmjs.com/package/json-server)
빠르게 back-end를 prototyping 하거나 mocking 할 때 사용할 수 있는 fake 서버이며, REST API를 지원한다.

아래 명령어로 json-server를 실행할 수 있다.
```
json-server --watch database/db.json
```

### PUT과 PATCH
**PUT은 데이터 전체를 변경**하는 것이고, **PATCH는 데이터를 부분적으로 변경**한다는 차이점이 있다.

## watchEffect
`watchEffect` 를 사용하면 ref, reactive, props 변수의 변경을 감지할 수 있다.

`vue` 에서 import 하여 사용할 수 있다.
```js
import { watchEffect } from 'vue';
```

```js
setup() {
  const currentPage = ref(1);

  watchEffect(() => {
    console.log(currentPage.value);
  });

  currentPage.value = 2;
}
```

**주의**
단, let 키워드 등으로 선언된 reactive하지 않은 변수는 watchEffect에서 감지할 수 없다.

아래 예시 소스에서 `setup()`이 실행되어도 console에 log가 출력되지 않는다.

```js
setup() {
  let rowsPerPage = 10;

  watchEffect(() => {
    console.log(rowsPerPage); // CAUTION
  });

  rowsPerPage = 5;
}
```

## watch
watchEffect와 유사한 watch는 cur, prev 값을 인자로 받을 수 있다.
`vue` 에서 import 하여 사용할 수 있다.
```js
import { watch } from 'vue';
```


### ref: 단일 값
```js
setup() {
  const currentPage = ref(1);

  watch(currentPage, (cur, prev) => {
    console.log(cur, prev);
  });

  currentPage.value = 10; // 10 1
}
```

### ref: 복수 값
watch의 첫 번째 param에 배열을 사용하여 복수 개의 값에 대한 변경을 감지할 수 있다.

감지하는 변수 중 하나라도 변경이 있으면 함수가 실행된다. **단, `cur` 과 `prev`의 값이 배열 형태인 것에 주의하자.**

```js
setup() {
  const currentPage = ref(1);
  const numOfTodos = ref(0);

  watch([currentPage, numOfTodos], (cur, prev) => {
    console.log(cur, prev);
  });

  currentPage.value = 10; // [10, 0] [1, 0]
  numOfTodos.value = 20; // [10, 20] [10, 0]
}
```

### rective: 단일 값
`reactive` 는 watch의 첫 번째 param에 `() => user.id` 함수를 넣어 변경을 감지할 수 있다.

```js
setup() {
  const user = reactive({ id: '' });

  watch(() => user.id, (cur, prev) => {
    console.log(cur, prev);
  });

  user.id = 'kyungjin'; // 'kyungjin' ''
}
```

### reactive: 복수 값
watch의 첫 번째 param에 `() => [user.id, user.pw]` 와 같이 배열을 사용하여 여러 값을 watch 할 수 있다. 

감지하는 변수 중 하나라도 변경이 있으면 함수가 실행된다. **단, `cur` 과 `prev`의 값이 배열 형태인 것에 주의하자.**

```js
setup() {
  const user = reactive({ id: '', pw: '' });

  watch(() => [user.id, user.pw], (cur, prev) => {
    console.log(cur, prev);
  });

  user.id = 'kyungjin'; // ['kyungjin', ''] ['', '']
  user.pw = '123456'; // ['kyungjin', '123456'] ['kyungjin', '']
}
```

## router-link
### params가 없을 경우
`/todos` 로 이동할 경우

```html
<!-- path로 이동 -->
<router-link class="navbar-brand mx-4" to="/">KyungJin</router-link>

<!-- name으로 이동 -->
<router-link class="navbar-brand mx-4" :to="{ name: 'Home'}">KyungJin</router-link>
```
### params가 있을 경우
`/todos/:id` 로 이동할 경우
```js
// path로 이동
router.push(`/todos/${itemId}`);

// name으로 이동
router.push({
  name: 'Todo',
  params: {
    id: itemId,
  },
});
```
named route를 사용할 경우 router name이 변경되었을 때 대처가 용이하다. **가급적 named route를 사용하도록 하자.**

## 이벤트 버블링
Todo 삭제 버튼을 클릭했을 때 `/todo/:id` 로 라우팅 된다. Todos로 돌아가보면 todo item이 삭제가 잘 되어있긴 하다.

![event bubbling](https://user-images.githubusercontent.com/31913666/163294841-177d7f12-5a97-4c7a-be0b-b9d69483bcd1.gif)

이는 이벤트가 위로 전파되는 **이벤트 버블링**이라는 속성 때문에 발생한다.

위의 사례에서 구조는 다음과 같은데,
```
card body (@click="moveToPage")
  ㄴ delete btn (@click="deleteTodo")
  ㄴ input checkbox (@change="toggleTodo")
```
### button
`deleteTodo` 클릭 이벤트가 발생한 후에 이벤트 버블링에 의해서 이벤트가 상위로 전파되어 `moveToPage` 가 실행되는 것이다.

이벤트 버블링은 `event.stopPropagation()` 으로 막을 수 있다.
Vue에서는 `@click.stop` 처럼 stop 디렉티브를 사용하면 된다.

```html
<button class="btn btn-danger btn-sm" @click.stop="deleteTodo(index)">Delete</button>
```
소스를 위와 같이 수정하면 정상적으로 delete만 동작한다!

### input checkbox
delete를 고쳤더니 input checkbox에서도 체크 박스를 누르면 해당 todo item으로 라우팅 되는 현상이 발생한다.

```html
<input
  class="form-check-input"
  type="checkbox"
  :value="todo.done"
  @change="toggleTodo(index)"
>
```

delete 버튼에서 배운대로 stop 디렉티브를 넣어본다.
체크박스가 동작하지 않고 그냥 라우팅만 된다.

```html
<input
  class="form-check-input"
  type="checkbox"
  :value="todo.done"
  @change.stop="toggleTodo(index)"
>
```

`@change` 의 경우에는 `@change.stop` 이 아닌 `@click.stop` 을 추가해주어야 한다.


```html
<input
  class="form-check-input"
  type="checkbox"
  :value="todo.done"
  @change="toggleTodo(index)"
  @click.stop
>
```
이제 라우팅 되지 않고 toggle만 정상적으로 동작한다.

- [ ] **읽어보기** [이벤트 버블링, 이벤트 캡처 그리고 이벤트 위임까지](https://joshua1988.github.io/web-development/javascript/event-propagation-delegation/)


## $event
Vue template에서 param으로 발생한 이벤트를 넘겨주고 싶을 때는 `$event` 를 전달해주면 된다.

다른 키워드는 사용할 수 없고 반드시 `$event` 로 기재해야 한다.

```html
@change="toggleTodo(index, $event)"
```

대신 인자를 받을 때는 자유롭게 네이밍하면 된다.
```js
const toggleTodo = (index, event) => {
  console.log(event);
};
```

## JavaScript 객체 복사 시 주의점

Todo Page에서 값의 변경이 있을 때만 Save가 가능하도록 하는 기능을 구현하였다.

JavaScript 객체의 복사, 비교에 아주 좋은 예시인 것 같다.

`todo` 와 `originTodo` 를 선언하여 `originTodo` 에는 초기 todo 값을 저장한다.

```js
export default {
  setup() {
    const todo = ref(null);
    const originTodo = ref(null);

    const getTodo = async () => {
      const res = await getTodoItem(todoId);
      todo.value = res.data; // here
      originTodo.value = res.data; // here
      loading.value = false;
    };
  }
}
```

주목할 부분은 아래인데,
```js
todo.value = res.data;
originTodo.value = res.data;
```

`todo.value` 와 `originTodo.value` 에는 `res.data` 객체의 주소 값이 할당되게 된다.

따라서 `===` 연산자로 주소를 비교하면 `true` 가 반환된다.
```js
console.log(todo.value === originTodo.value); // true
```

값은 주소 값을 가리키므로 `todo.value.done = false` 등으로 값을 변경하면 `originTodo.value.done` 의 값이 함께 변경된다.

이를 막기 위해서는 spread operator를 사용하여 `originTodo` 에 새로운 객체를 할당해야 한다.

```js
todo.value = res.data;
originTodo.value =  { ...res.data };
```

# Troubleshooting
## [Vue warn]: Failed to resolve component
```
[Vue warn]: Failed to resolve component: Toast
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement. 
  at <Index onVnodeUnmounted=fn<onVnodeUnmounted> ref=Ref< undefined > > 
  at <RouterView> 
  at <App>
```

![Failed to resolve component](https://user-images.githubusercontent.com/31913666/163354833-9aba26bf-5ca4-42a3-8d7b-5a095241e468.png)

**해결 방법**
`import` 혹은 `components` 에 등록하는 것을 누락했을 때 발생하는 warning이므로, 두 사항을 확인해본다.