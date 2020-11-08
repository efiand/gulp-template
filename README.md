# gulp-template

Стартовый шаблон сборки проекта с помощью Gulp 4, less, webpack.

## Установка

* Выполните команду `npm i`

## Использование

* `npm run build` - сборка статической версии в каталог `build`, который перед сборкой очищается. Включено предварительное тестирование.
* `npm run deploy` - публикация каталога `build` на хостинге Github Pages.
* `npm start` - режим разработки: сборка в каталог `build`, который при запуске очищается. Слежение за изменением файлов. Тестирование при запуске и на ходу.
* `npm run proxy` - режим разработки без сборки HTML-файлов (в соседнем терминале надо выполнить `npm run app`). Остальное собирается в каталог `build`, который при запуске очищается. Слежение за изменением файлов. Тестирование при запуске и на ходу.
* `npm run app` - запуск сервера, отвечающего за ренденинг HTML (чтобы не пересобирать крупные статические проекты).
* `npm test` - Однократное тестирование исходников линтерами со слежением за тестируемыми файлами и перезапуском тестов при правках.
