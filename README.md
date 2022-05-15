# Шаблон для сборки статических страниц

[Опубликованная версия](https://efiand.github.io/gulp-template).

---


## Используемые инструменты

* gulp - объединение задач и слежение за изменением файлов.
* twig + posthtml - сборка из компонентов и тестирование HTML.
* postcss - сборка из компонентов и тестирование CSS.
* webpack + eslint - сборка из компонентов и тестирование JS.
* svgo, pngquant, mozjpeg, gulp-svg-sprite - оптимизация графики.
* [pineglade-pp](https://www.npmjs.com/package/pineglade-pp) - оптимизация достижения pixel perfect.
* [pineglade-w3c](https://www.npmjs.com/package/pineglade-w3c) - онлайн-валидатор W3C с резервным оффлайн-валидатором.


## Особенности реализации

* Компонентный подход. Для организации разметки и стилей использована методология БЭМ. Компоненты переиспользуются с разным набором данных, получаемых по API. Каждый экземпляр БЭМ-блока при необходимости оживления связан с экземплятом соотв. JS-класса.
* Адаптивная вёрстка "mobile first" - дефолтной является мобильная версия, на которую нет макета, но она представляет собой в основном просто одноколоночный поток данных с чуть меньшими расстояниями и размерами текстов. Медиазапросы строятся от меньшего к большему - таким образом сделана планшетная версия (только часть стилей добавляется для максимального десктопного разрешения).
* Поддержка webp- и retina-изображений через подключение одного универсального компонента.


## Структура

* `api` - сервер для получения данных по API.
* `build` - каталог для сборки. Не коммитится.
* `source` - каталог исходников.


## Установка

* Выполните команду `npm ci`.


## Команды

* `npm run build` - сборка стилей, скриптов, спрайта. Оптимизация изображений.
* `npm run dev` - сборка и запуск в режиме раработки.
* `npm run lint` - запуск линтеров.
* `npm start` - запуск API-сервера.


## Pixelperfect

Доступен в режиме разработки по нажатию клавиши P. Используется плагин [pineglade-pp](https://efiand.github.io/pineglade-pp/).