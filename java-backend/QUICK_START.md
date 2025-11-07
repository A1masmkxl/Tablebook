# Быстрый старт - TableBook Backend

## Шаг 1: Проверка PostgreSQL

Убедитесь, что PostgreSQL запущен и база данных создана:

1. Откройте pgAdmin 4
2. Подключитесь к серверу PostgreSQL
3. Создайте базу данных (если еще не создана):
   ```sql
   CREATE DATABASE tablebook;
   ```

## Шаг 2: Настройка пароля

Откройте файл `src/main/resources/application.properties` и измените пароль на строке 8:
```properties
spring.datasource.password=ВАШ_ПАРОЛЬ_ПОСТГРЕС
```

## Шаг 3: Запуск приложения

```bash
cd java-backend
mvn spring-boot:run
```

## Шаг 4: Проверка работы

После запуска приложение будет доступно на:
- **URL:** http://localhost:8081/api
- **Порт:** 8081

### Проверка через браузер:
Откройте: http://localhost:8081/api/restaurants

Должен вернуться JSON массив с ресторанами.

### Проверка через PowerShell:
```powershell
Invoke-RestMethod -Uri "http://localhost:8081/api/restaurants" -Method GET
```

## Что должно произойти при запуске:

1. ✅ Приложение подключается к PostgreSQL
2. ✅ Автоматически создаются таблицы (users, restaurants, bookings)
3. ✅ Создаются тестовые данные:
   - Админ: `admin@tablebook.kz` / `admin123`
   - Пользователь: `user@test.kz` / `user123`
   - 10 примерных ресторанов

## Возможные проблемы:

### Ошибка подключения к БД:
- Проверьте, что PostgreSQL запущен
- Проверьте, что база данных `tablebook` существует
- Проверьте пароль в `application.properties`

### Порт занят:
- Приложение использует порт **8081**
- Если занят, измените в `application.properties`: `server.port=8082`

### Таблицы не создаются:
- Проверьте логи приложения
- Убедитесь, что `spring.jpa.hibernate.ddl-auto=update` в `application.properties`

## API Endpoints:

### Публичные (без авторизации):
- `GET /api/restaurants` - список ресторанов
- `GET /api/restaurants/{id}` - информация о ресторане
- `POST /api/auth/register` - регистрация
- `POST /api/auth/login` - вход

### Требуют авторизации:
- `POST /api/bookings` - создать бронирование
- `GET /api/bookings/my-bookings` - мои бронирования
- `GET /api/auth/me` - текущий пользователь

## Логи приложения:

При запуске вы должны увидеть:
```
Started TableBookApplication in X.XXX seconds
Hibernate: create table users...
Hibernate: create table restaurants...
Hibernate: create table bookings...
Admin user created: admin@tablebook.kz / admin123
```

Если видите ошибки - проверьте подключение к базе данных.


