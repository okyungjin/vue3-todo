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