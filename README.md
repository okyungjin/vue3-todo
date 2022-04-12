# Table of Contents
- [Table of Contents](#table-of-contents)
- [vue3-todo](#vue3-todo)
  - [Project setup](#project-setup)
    - [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
    - [Compiles and minifies for production](#compiles-and-minifies-for-production)
    - [Lints and fixes files](#lints-and-fixes-files)
    - [Customize configuration](#customize-configuration)
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
# vue3-todo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

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
const todos = ref([
  { id: Date.now(), title: 'Sample Todo', done: false }
]);

return {
  todos,
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
  // todos 생략

  const toggleTodo = (index) => todos.value[index].done = !todos.value[index].done;

  return {
    todos,
    toggleTodo,
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