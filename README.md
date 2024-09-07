# Структура проекту та керівництво для розробки

## Сторінки

Всі сторінки знаходиться у файлі `src/app[locale]`. Цей файл містить файли сторінок
Назва папки визначає шлях до сторінки
locale - визначає мову сторінки (доступні ua, en, pl)

## messages

Містить json-файли зі статичним контентом сайту різними мовами.

## API

Містить функції та налаштування запитів на сервер

## Компоненти

Компоненти розташовані у директорії `/src/components`. Кожен компонент має знаходитися в окремій папці, щоб поруч з ним можна було зберігати `component.module.scss`. Компоненти в папці `components` будуть згруповані за їх типами, наприклад: `buttons`, `links`, `cards` тощо.

## lib

Містить допоміжні функції, 'форматери', 'валідатори' тощо.

## state

Глобальний стан проєкту (доступний в будь якій частині проєкту)

## i18n.js

Містить налаштування для перемикання мови сайту

## Додавання до проекту

Для додавання змін до проекту виконуйте наступні кроки:

1. **Клонування репозиторію**:

   ```bash
   git clone https://github.com/baza-trainee/baza-2-front.git

   ```

2. **Створення та переключення на нову гілку**:
   ```bash
   cd repository-name
   git checkout -b <імя-вашої-гілки>
   ```
3. **Додавання змін**:
   ```bash
   git add .
   git commit -m "ваше повідомлення коміту"
   git push origin імя-вашої-гілки
   ```

## Запуск сайту локально

Додайте в корень проєкту файл: .env який містить змінні оточення для роботи запитів 

(Файл .env запитати у Team Lead)

Для локального запуску сайту використовуйте команду:

```
npm run dev
```

## Статичні елементи

Всі статичні елементи, такі як зображення, зберігаємо в директорії /public.

## Додаткові бібліотеки

"next-intl" - Відповідає за переклад сторінок різними мовами.

"swiper" - Слайдери, каруселі

"react-pdf" - Для відображення pdf документів на сторінці

"react-hook-form" - Керування формами

"zod" - Валідація форм

"zustand" - Керування глобальним станом

"tanstack/react-query", "axios" - Запити на сервер

"js-cookie" - Курування cookies
