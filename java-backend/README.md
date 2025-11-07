# TableBook Backend

Spring Boot бэкенд для системы бронирования столиков в ресторанах.

## Технологии

- Java 17
- Spring Boot 3.2.0
- PostgreSQL (база данных)
- JWT (аутентификация)
- Spring Security
- JPA/Hibernate

## Требования

- Java 17 или выше
- Maven 3.6+
- PostgreSQL 12+

## Настройка базы данных

1. Установите PostgreSQL (если еще не установлен)
2. Создайте базу данных:
```sql
CREATE DATABASE tablebook;
```

3. Настройте подключение в `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/tablebook
spring.datasource.username=postgres
spring.datasource.password=ВАШ_ПАРОЛЬ
```

## Запуск приложения

```bash
mvn spring-boot:run
```

Приложение запустится на порту 8080.

## API Endpoints

- `POST /api/auth/register` - Регистрация
- `POST /api/auth/login` - Вход
- `GET /api/restaurants` - Список ресторанов
- `POST /api/bookings` - Создать бронирование
- `GET /api/bookings/my-bookings` - Мои бронирования
- `GET /api/admin/stats` - Статистика (только для админов)

## Тестовые пользователи

После первого запуска автоматически создаются:
- Админ: `admin@tablebook.kz` / `admin123`
- Пользователь: `user@test.kz` / `user123`

## База данных

Приложение использует PostgreSQL. Таблицы создаются автоматически при первом запуске.

Для подключения через pgAdmin:
- Host: localhost
- Port: 5432
- Database: tablebook
- Username: postgres
- Password: ваш пароль PostgreSQL


