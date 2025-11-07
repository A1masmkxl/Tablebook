# Настройка PostgreSQL для TableBook Backend

## Установка PostgreSQL

### Windows:
1. Скачайте PostgreSQL с официального сайта: https://www.postgresql.org/download/windows/
2. Установите PostgreSQL, запомните пароль для пользователя `postgres`
3. Убедитесь, что PostgreSQL запущен как служба

### Альтернативно через Docker:
```bash
docker run --name postgres-tablebook -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=tablebook -p 5432:5432 -d postgres
```

## Создание базы данных

После установки PostgreSQL:

1. Откройте pgAdmin или psql
2. Создайте базу данных:
```sql
CREATE DATABASE tablebook;
```

Или используйте psql:
```bash
psql -U postgres
CREATE DATABASE tablebook;
\q
```

## Настройка приложения

Отредактируйте файл `src/main/resources/application.properties`:

```properties
# PostgreSQL Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/tablebook
spring.datasource.username=postgres
spring.datasource.password=ВАШ_ПАРОЛЬ_ПОСТГРЕС
```

Замените `ВАШ_ПАРОЛЬ_ПОСТГРЕС` на ваш пароль PostgreSQL.

## Запуск приложения

1. Убедитесь, что PostgreSQL запущен
2. Запустите приложение:
```bash
mvn spring-boot:run
```

Приложение автоматически создаст таблицы при первом запуске благодаря настройке `spring.jpa.hibernate.ddl-auto=update`.

## Проверка работы

После запуска приложения таблицы будут созданы автоматически:
- `users` - пользователи
- `restaurants` - рестораны
- `bookings` - бронирования

Вы можете проверить это в pgAdmin, подключившись к базе данных `tablebook`.

## Данные для тестирования

При первом запуске автоматически создаются:
- Админ пользователь: `admin@tablebook.kz` / `admin123`
- Тестовый пользователь: `user@test.kz` / `user123`
- 10 примерных ресторанов

