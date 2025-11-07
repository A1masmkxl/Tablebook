# Полный гайд по работе с pgAdmin 4 для TableBook

## Шаг 1: Установка PostgreSQL и pgAdmin 4

### Вариант 1: Установка через официальный установщик (Windows)

1. **Скачайте PostgreSQL с pgAdmin:**
   - Перейдите на https://www.postgresql.org/download/windows/
   - Скачайте установщик PostgreSQL (включает pgAdmin 4)
   - Или напрямую: https://www.postgresql.org/download/

2. **Запустите установщик:**
   - Выберите все компоненты (PostgreSQL Server, pgAdmin 4, Command Line Tools)
   - Выберите директорию установки (по умолчанию: `C:\Program Files\PostgreSQL\<версия>`)
   - **ВАЖНО:** Запомните пароль для пользователя `postgres` - он понадобится!

3. **Завершите установку:**
   - Оставьте порт по умолчанию: `5432`
   - Выберите локаль (можно оставить по умолчанию)
   - Дождитесь завершения установки

### Вариант 2: Установка через Docker (альтернатива)

```bash
docker run --name postgres-tablebook -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=tablebook -p 5432:5432 -d postgres
```

## Шаг 2: Первый запуск pgAdmin 4

1. **Откройте pgAdmin 4:**
   - Нажмите `Win + S` и введите "pgAdmin 4"
   - Или найдите в меню Пуск: `PostgreSQL 15 → pgAdmin 4`

2. **Установите мастер-пароль:**
   - При первом запуске pgAdmin попросит установить мастер-пароль
   - Это пароль для защиты сохраненных паролей в pgAdmin
   - Запомните его или используйте простой (например: `admin`)

## Шаг 3: Подключение к PostgreSQL серверу

1. **В левой панели найдите "Servers":**
   - Разверните группу "Servers"
   - Если сервер уже добавлен - он будет отображаться там
   - Если нет - нужно добавить

2. **Добавление нового сервера (если его нет):**
   - Правой кнопкой мыши на "Servers" → "Register" → "Server..."
   - Или нажмите на "Servers" и выберите "Add New Server"

3. **Вкладка "General":**
   ```
   Name: PostgreSQL (или любое имя, например "TableBook Server")
   ```

4. **Вкладка "Connection":**
   ```
   Host name/address: localhost
   Port: 5432
   Maintenance database: postgres
   Username: postgres
   Password: [ваш пароль, который вы указали при установке]
   ```
   - ✅ Поставьте галочку "Save password" (чтобы не вводить каждый раз)

5. **Нажмите "Save"**

6. **Подключение:**
   - Сервер появится в левой панели
   - Нажмите на него, чтобы подключиться
   - Если пароль правильный - подключение успешно
   - В левой панели развернется дерево базы данных

## Шаг 4: Создание базы данных для TableBook

### Способ 1: Через графический интерфейс pgAdmin

1. **Разверните сервер:**
   - Нажмите на стрелку слева от имени сервера
   - Разверните "Databases"

2. **Создайте новую базу данных:**
   - Правой кнопкой мыши на "Databases" → "Create" → "Database..."

3. **Заполните форму:**
   ```
   Database: tablebook
   Owner: postgres
   Encoding: UTF8
   Template: template0
   ```
   - Остальные настройки оставьте по умолчанию

4. **Нажмите "Save"**

5. **Проверка:**
   - В списке "Databases" должна появиться база данных `tablebook`

### Способ 2: Через SQL Query Tool

1. **Откройте Query Tool:**
   - Правой кнопкой на сервере → "Tools" → "Query Tool"
   - Или выберите сервер и нажмите `Alt+Shift+Q`

2. **Введите SQL команду:**
   ```sql
   CREATE DATABASE tablebook;
   ```

3. **Выполните запрос:**
   - Нажмите кнопку "Execute" (▶) или `F5`
   - Или нажмите `Ctrl+Enter`

4. **Проверка:**
   - Должно появиться сообщение "Query returned successfully"
   - Обновите список баз данных (правой кнопкой на "Databases" → "Refresh")

## Шаг 5: Настройка пароля в application.properties

1. **Откройте файл:**
   ```
   java-backend/src/main/resources/application.properties
   ```

2. **Найдите строку с паролем:**
   ```properties
   spring.datasource.password=postgres
   ```

3. **Замените на ваш пароль PostgreSQL:**
   ```properties
   spring.datasource.password=ВАШ_ПАРОЛЬ_ПОСТГРЕС
   ```

4. **Сохраните файл**

## Шаг 6: Запуск приложения и проверка таблиц

1. **Запустите бэкенд:**
   ```bash
   cd java-backend
   mvn spring-boot:run
   ```

2. **Приложение автоматически создаст таблицы:**
   - При первом запуске Spring Boot создаст все необходимые таблицы
   - Это происходит благодаря настройке `spring.jpa.hibernate.ddl-auto=update`

3. **Проверка в pgAdmin:**
   - В pgAdmin разверните базу данных `tablebook`
   - Разверните "Schemas" → "public" → "Tables"
   - Вы должны увидеть таблицы:
     - `users` - пользователи
     - `restaurants` - рестораны
     - `bookings` - бронирования

## Шаг 7: Просмотр данных в таблицах

1. **Откройте таблицу:**
   - Разверните "Tables" в базе данных `tablebook`
   - Правой кнопкой на таблице (например, `users`) → "View/Edit Data" → "All Rows"

2. **Просмотр данных:**
   - Откроется вкладка с данными таблицы
   - Вы увидите все записи в таблице

3. **Выполнение SQL запросов:**
   - Правой кнопкой на базе данных `tablebook` → "Tools" → "Query Tool"
   - Введите SQL запрос:
   ```sql
   SELECT * FROM users;
   SELECT * FROM restaurants;
   SELECT * FROM bookings;
   ```
   - Нажмите `F5` или кнопку "Execute" для выполнения

## Шаг 8: Полезные SQL запросы

### Просмотр всех пользователей:
```sql
SELECT id, name, email, role, created_at FROM users;
```

### Просмотр всех ресторанов:
```sql
SELECT id, name, city, cuisine, price_range, rating FROM restaurants;
```

### Просмотр всех бронирований:
```sql
SELECT 
    b.id,
    r.name AS restaurant_name,
    u.name AS user_name,
    b.date,
    b.time,
    b.guests,
    b.status
FROM bookings b
JOIN restaurants r ON b.restaurant_id = r.id
JOIN users u ON b.user_id = u.id
ORDER BY b.created_at DESC;
```

### Подсчет статистики:
```sql
-- Количество пользователей
SELECT COUNT(*) FROM users;

-- Количество ресторанов
SELECT COUNT(*) FROM restaurants;

-- Количество бронирований
SELECT COUNT(*) FROM bookings;

-- Бронирования по статусу
SELECT status, COUNT(*) FROM bookings GROUP BY status;
```

## Шаг 9: Сброс базы данных (если нужно)

Если нужно начать заново:

1. **Удалить базу данных:**
   - Правой кнопкой на `tablebook` → "Delete/Drop"
   - Подтвердите удаление

2. **Создать заново:**
   - Следуйте инструкциям из Шага 4

3. **Запустить приложение:**
   - Приложение автоматически создаст таблицы заново

## Шаг 10: Изменение пароля PostgreSQL (если забыли)

Если вы забыли пароль PostgreSQL:

### Windows:
1. Откройте командную строку от имени администратора
2. Перейдите в директорию PostgreSQL:
   ```cmd
   cd "C:\Program Files\PostgreSQL\<версия>\bin"
   ```
3. Остановите службу PostgreSQL:
   ```cmd
   net stop postgresql-x64-15
   ```
   (замените на вашу версию)
4. Создайте файл `pg_hba.conf` с настройками для локального подключения
5. Запустите PostgreSQL в режиме без аутентификации
6. Измените пароль через SQL

**Или проще:**
- Переустановите PostgreSQL с новым паролем
- Или используйте стандартный пароль, который вы указали при установке

## Частые проблемы и решения

### Проблема: "password authentication failed"
**Решение:** Проверьте пароль в pgAdmin и в `application.properties`

### Проблема: "Connection refused"
**Решение:** 
- Убедитесь, что PostgreSQL запущен (Services → PostgreSQL)
- Проверьте порт (должен быть 5432)

### Проблема: "database does not exist"
**Решение:** Создайте базу данных `tablebook` (см. Шаг 4)

### Проблема: Таблицы не создаются
**Решение:**
- Проверьте логи приложения
- Убедитесь, что `spring.jpa.hibernate.ddl-auto=update` в `application.properties`
- Проверьте подключение к базе данных

## Проверка подключения из приложения

После запуска приложения проверьте логи:
- Должно быть: `HikariPool-1 - Starting...`
- Должно быть: `Hibernate: create table users...`
- Не должно быть ошибок подключения

## Дополнительные возможности pgAdmin 4

1. **Backup базы данных:**
   - Правой кнопкой на базе данных → "Backup..."
   - Выберите файл для сохранения
   - Нажмите "Backup"

2. **Restore базы данных:**
   - Правой кнопкой на базе данных → "Restore..."
   - Выберите файл backup
   - Нажмите "Restore"

3. **Просмотр структуры таблицы:**
   - Разверните таблицу → "Columns"
   - Увидите все колонки с типами данных

4. **Просмотр индексов:**
   - Разверните таблицу → "Indexes"
   - Увидите все индексы таблицы

## Готово!

Теперь у вас настроена база данных PostgreSQL и вы можете работать с ней через pgAdmin 4. После запуска приложения все таблицы будут созданы автоматически, и вы сможете видеть данные в pgAdmin.

