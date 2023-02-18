# gulp-template

Стартовый шаблон для сборки сайта, основанного на HTML-файлах.

## Команды терминала

- Установка зависимостей: `npm ci`
- Сборка проекта в каталог `build`: `npm run build`
- Запуск в режиме разработки: `npm run dev`
- Запуск линтеров и валидаторов: `npm test`
- Запуск автоформатирования: `npm run format`

## Создание изоморфных приложений

### С помощью vue

```js
// source/apps/page.js
import Page from '../blocks/page.vue';
import Vue from 'vue';
export default (data) =>
  new Vue({
    data,
    render: (cb) => cb(Page)
  });

// source/main.js
import createApp from './apps/page.js';
createApp({ appData: window.appData.page }).$mount('.page');
```

### С помощью Svelte

```js
// source/apps/page.js
import Page from '../blocks/page.svelte';
export default Page;

// source/main.js
import App from './apps/page.js';
new App({
  hydrate: true,
  props: { appData: window.appData.page },
  target: document.querySelector('.page')
});
```
