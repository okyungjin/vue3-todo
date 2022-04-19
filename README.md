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
  - [router path를 구성할 때 유의점](#router-path를-구성할-때-유의점)
  - [Toast에 transition 적용하기](#toast에-transition-적용하기)
  - [slot 사용하기](#slot-사용하기)
  - [Custom Component에 v-model 사용하기](#custom-component에-v-model-사용하기)
  - [v-model로 여러 개의 값을 바인딩하기](#v-model로-여러-개의-값을-바인딩하기)
  - [[Deprecated] useContext](#deprecated-usecontext)
    - [1) setup(props, { emit }) 사용](#1-setupprops--emit--사용)
    - [2) getCurrentInstance 사용](#2-getcurrentinstance-사용)
  - [toRefs](#torefs)
    - [사용이 필요한 상황](#사용이-필요한-상황)
    - [위와 같은 현상이 발생하는 원인](#위와-같은-현상이-발생하는-원인)
    - [toRefs 사용](#torefs-사용)
  - [axios baseURL 설정하기](#axios-baseurl-설정하기)
  - [TodoForm과 App의 showToast는 별개의 값](#todoform과-app의-showtoast는-별개의-값)
    - [Toast 컴포넌트를 App으로 이동](#toast-컴포넌트를-app으로-이동)
    - [TodoForm에서 triggerToast 실행](#todoform에서-triggertoast-실행)
    - [원인](#원인)
    - [해결 방법](#해결-방법)
  - [Vue3에서 Vuex 설정하고 사용하기](#vue3에서-vuex-설정하고-사용하기)
    - [Vuex 설정](#vuex-설정)
    - [Vuex 사용](#vuex-사용)
- [Troubleshooting](#troubleshooting)
  - [[Vue warn]: Failed to resolve component](#vue-warn-failed-to-resolve-component)
  - [onUnmounted에서 clearTimeout을 해도 setTimeout이 실행되는 이슈](#onunmounted에서-cleartimeout을-해도-settimeout이-실행되는-이슈)
  - [Error: TypeError: router.push is not a function](#error-typeerror-routerpush-is-not-a-function)


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

## router path를 구성할 때 유의점
router path를 구성할 때 순서에 유의해야 한다.

다음과 같이 path를 구성하면 `/create` 와 `/:id` 모두 접근이 가능하지만
```js
const router = createRouter({
  routes: [
    // .. 중략
    {
      path: '/todos/create',
      name: 'TodoCreate',
      component: TodoCreate,
    },
    {
      path: '/todos/:id',
      name: 'Todo',
      component: Todo,
    },
  ],
});
```

다음 예시처럼 `/:id` 가 상위에 위치할 경우, `/create` 는 `/:id` 페이지로 이동하게 된다.

```js
const router = createRouter({
  routes: [
    // .. 중략
    {
      path: '/todos/:id',
      name: 'Todo',
      component: Todo,
    },
    {
      path: '/todos/create',
      name: 'TodoCreate',
      component: TodoCreate,
    },
  ],
});
```
## Toast에 transition 적용하기
Toast에 fade나 slide 같은 애니메이션을 주고 싶을 때 transition을 사용하면 된다.
```html
<template>
  <transition name="slide">
    <Toast
      v-if="showToast"
      :message="toastMessage"
      :type="toastType"
    ></Toast>
  </transition>
</template>

<script>
// 생략
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
</style>
```

## slot 사용하기
slot을 사용할 때 `v-slot:slotName` 과 `#slotName` 두 가지 방법을 사용할 수 있다.

```html
<Modal v-if="showModal" @close="closeModal" @delete="deleteTodo">
  <template #title>Delete Confirm</template>
  <template v-slot:body>{{ todoToDelete.title }} 항목을 삭제하시겠습니까?</template>
  <template #footer>
    <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
    <button type="button" class="btn btn-danger" @click="deleteTodo">Delete Todo</button>
  </template>
</Modal>

```

## Custom Component에 v-model 사용하기
Custom Component에서도 `v-model` 을 사용할 수 있다.

```html
<!-- CommonInput 사용 -->
<CommonInput
  label="Title"
  required
  v-model="todo.title"
></CommonInput>
```

단, CommonInput.vue에서는 props에 `modelValue` 를 선언해주어야 하며, `update:modelValue` 로 emit 해주어야 한다.
```js
export default {
  props: {
    modelValue: {
      // 생략 
    }
  },
  setup(_, { emit }) {
    const onInputChanged = (value) => {
      emit('update:modelValue, value);
    }
  }
}
```

## v-model로 여러 개의 값을 바인딩하기
Vue 3에서는 v-model로 여러 개의 값을 바인딩 할 수 있다.
`v-model` 과 `v-model:키워드` 로 사용할 수 있다.

```html
<CommonInput
  label="Title"
  required
  v-model="todo.footer"
  v-model:title="todo.title"
  v-model:body="todo.body"
></CommonInput>
```

CommonInput에서 emit 해줄때는 아래와 같이 `update:키워드` 를 해주면 된다.
```js
emit('update:modelValue', 'emit value');
emit('update:title', 'emit value');
emit('update:body', 'emit value');
```

## [Deprecated] useContext
`setup()` 에서 props를 사용하지 않고 emit만 사용할 때 useContext를 쓰곤한다. 

```js
import { useContext } from 'vue';

export default {
  emits: ['sth-event'], // define emits
  setup() {
    const { emit } = useContext();
    emit('sth-event');
  }
}
```
**`useContext` 는 deprecated 되었으므로 아래 두 가지 방법 중 하나를 선택하여 사용하도록 하자.**

### 1) setup(props, { emit }) 사용
예시 코드에서 사용한 `setup(props, { emit })` 을 사용한다.
### 2) getCurrentInstance 사용
```js
import { getCurrentInstance } from 'vue';

export default {
  emits: ['sth-event'], // define emits
  setup() {
    const { emit } = getCurrentInstance();
    emit('sth-event');
  }
}
```

## toRefs

### 사용이 필요한 상황
composable API를 이용하여 `useCount` 함수를 생성했다.
```js
// composables/count.js
import { reactive } from 'vue';

export const useCount = () => {
  const state = reactive({
    count: 0,
  });
  return state;
};
```

`useCount` 를 사용하여 `count` 의 값을 증가시키는 버튼을 만들었다.
하지만 Increment 버튼을 클릭하여도 값은 증가하지 않는다.

```html
<template>
  <div>Home</div>
  <div>{{ count }}</div>
  <button @click="count++">Increment</button>
</template>

<script>
import { useCount } from '../composables/count';

export default {
  setup() {
    const { count } = useCount();

    return {
      count,
    };
  },
};
</script>
```

### 위와 같은 현상이 발생하는 원인
`useCount()` 에서 가져온 `count` 는 primative 타입인 int형이다.
console에 출력해보면 `0` 인 것을 확인할 수 있다.

```js
const { count } = useCount();
console.log(count); // 0
```

### toRefs 사용
`state` 를 `toRefs` 로 감싸서 return해주면 reactivity가 연결되어, 버튼을 클릭할 때마다 `count` 의 값이 증가하는 것을 확인할 수 있다.

```js
// composables/count.js
import { reactive, toRefs } from 'vue';

export const useCount = () => {
  const state = reactive({
    count: 0,
  });
  return toRefs(state); // FIXME
};
```

## axios baseURL 설정하기
`src/axios.js`

```js
import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3000',
});
```

## TodoForm과 App의 showToast는 별개의 값
TodoForm에서 Save하면 TodoList로 이동해주는 기능을 구현하니, Toast 메세지가 정상적으로 표시되지 않는 이슈가 발생하였다.

이를 해결하기 위해 TodoForm 내부에 있던 Toast 컴포넌트를 App으로 이동하였다.

### Toast 컴포넌트를 App으로 이동

**App.vue**
```html
<template>
  <NavigationBar></NavigationBar>
  <div class="container">
    <router-view />
  </div>
  <Toast
    v-if="showToast"
    :message="toastMessage"
    :type="toastType"
  ></Toast>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';
import Toast from '@/components/Toast.vue';
import { useToast } from './composables/toast';

export default {
  setup() {
    const { showToast, toastType, toastMessage } = useToast();

    return {
      showToast,
      toastType,
      toastMessage,
    };
  },
  components: {
    NavigationBar,
    Toast,
  },
};
</script>
```

### TodoForm에서 triggerToast 실행
그 다음 TodoForm에서 `triggerToast()` 를 실행했다.
Toast 메세지가 발생할 것을 기대했으나 표시되지 않았다.

```js
const onSave = () => {
  // 중략
  if (error)
    triggerToast('Error occurred!', 'danger');
}
```

### 원인
Composable 함수를 import 해서 사용할 때 TodoForm에서 사용하는 `useToast()` 와 App에서 사용하는 `useToast()` 는 관련이 없기 때문이다.

TodoForm에서 `showToast` 의 값을 변경하여도, App의 `showToast` 가 변경되는 것이 아니다.

### 해결 방법
TodoForm에서 App으로 이벤트를 전달하려면 emit을 사용하거나 Vuex를 사용하여야 한다.

## Vue3에서 Vuex 설정하고 사용하기 
### Vuex 설정

**store/index.js**
```js
import { createStore } from 'vuex';

export default createStore({
  state: {
    showToast: false,
    toastType: 'success',
    toastMessage: '',
    toastTimer: null,
  },
});
```

**main.js**
```js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';  // Vuex Store
import Toast from './components/Toast.vue';

const app = createApp(App);

app
  .use(router)
  .use(store) // Vuex Store
  .component('Toast', Toast)
  .mount('#app');
```

### Vuex 사용
```html
<template>
  <!-- 생략 -->
</template>

<script>
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore(); // or const { state } = useStore();
    console.log(store.state);
  }
}
</script>
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

## onUnmounted에서 clearTimeout을 해도 setTimeout이 실행되는 이슈

Toast 메세지를 발생시킨 후 해당 컴포넌트가 unmount 되었을 때 clearTimeout을 사용하여 설정된 타이머를 해제하는 기능을 구현하였다.

```js
let toastTimer;
  const triggerToast = (message, type = 'success') => {
    toastMessage.value = message;
    toastType.value = type;
    showToast.value = true;
    toastTimer = setTimeout(() => {
      console.log('timeout');
      toastMessage.value = '';
      toastType.value = '';
      showToast.value = false;
    }, 3000);
  };

  onUnmounted(() => {
    console.log('onUnmounted');
    clearTimeout(toastTimer);
  });
```

콘솔에 다음과 같이 출력되는 것을 확인할 수 있었는데,
```
onUnmounted
timeout
```

**이슈 발생 원인**

원인은 form과 button에서 `onSave()` 를 실행했고, toastTimer의 값이 두 번째 toast의 타이머로 덮어씌워지면서 첫 번째 타이머에 대한 `clearTimeout` 이 실행되지 않는 것이 원인이었다.

```html
<form v-else @submit.prevent="onSave">
  <button
    type="submit"
    class="btn btn-primary ms-2"
    :disabled="!todoUpdated"
    @click.stop="onSave"
  >Save</button>      
</form>
```

form의 `onSave()` 를 삭제하였더니 해당 이슈는 해결되었다.

```html
<form v-else @submit.prevent="onSave">
```

**교훈**

`clearTimeout` 으로 타이머를 삭제해도  `setTimeout` 이 계속 실행된다면, 타이머의 값이 변경되진 않았는지 확인해보자.



## Error: TypeError: router.push is not a function
`useRoute()` 를 사용하여 push 함수를 실행하려고 하니 아래와 같은 오류가 발생했다.
```
Error: TypeError: router.push is not a function
```  

```js
import { useRoute } from 'vue';

export default {
  setup() {
    const router = useRoute();
    const todoId = router.params.id;

    const onClick = () => {
      router.push({ name: 'Todos' });
    };
  }
}
```

**원인**
push할 때는 `router/index.js` 에서 import한 router 객체를 사용해야 한다.

```js
import { useRoute } from 'vue';
import route from '../router';

export default {
  setup() {
    // 중략
    const onClick = () => {
      route.push({ name: 'Todos' }); // router/index.js에서 import한 route 사용
    };
  }
}
```

