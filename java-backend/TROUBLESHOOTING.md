# Решение проблем TableBook Backend

## Проблема: ERR_CONNECTION_REFUSED на порту 8081

### Причина 1: Бэкенд не запущен

**Решение:**
1. Запустите бэкенд:
   ```bash
   cd java-backend
   mvn spring-boot:run
   ```
2. Или используйте `START_SIMPLE.bat`

### Причина 2: Ошибка подключения к базе данных

**Симптомы в логах:**
- `Connection refused`
- `FATAL: password authentication failed`
- `database "tablebook" does not exist`

**Решение:**

1. **Проверьте PostgreSQL:**
   - Убедитесь, что PostgreSQL запущен
   - Проверьте в pgAdmin, что сервер доступен

2. **Проверьте базу данных:**
   ```sql
   -- В pgAdmin выполните:
   SELECT datname FROM pg_database WHERE datname = 'tablebook';
   ```
   Если базы нет - создайте:
   ```sql
   CREATE DATABASE tablebook;
   ```

3. **Проверьте пароль:**
   - Откройте `application.properties`
   - Убедитесь, что пароль правильный (строка 8)

4. **Выполните SQL скрипт:**
   - Откройте `database_schema.sql` в pgAdmin
   - Выполните весь скрипт

### Причина 3: Порт 8081 занят

**Решение:**
1. Проверьте, что порт свободен:
   ```bash
   netstat -ano | findstr :8081
   ```
2. Если занят, измените порт в `application.properties`:
   ```properties
   server.port=8082
   ```
3. Обновите URL во фронтенде в `constants.js`

## Проверка работы

1. **Проверьте порт:**
   ```bash
   netstat -ano | findstr :8081
   ```

2. **Проверьте API:**
   Откройте в браузере: http://localhost:8081/api/restaurants
   
   Должен вернуться JSON массив с ресторанами.

3. **Проверьте логи:**
   В окне где запущен бэкенд должны быть сообщения:
   ```
   Started TableBookApplication in X.XXX seconds
   ```

## Быстрая диагностика

Выполните по порядку:

```bash
# 1. Проверка PostgreSQL
netstat -ano | findstr :5432

# 2. Проверка порта бэкенда
netstat -ano | findstr :8081

# 3. Тест API
curl http://localhost:8081/api/restaurants
```

## Частые ошибки

### "HikariPool - Connection is not available"

**Решение:** PostgreSQL не запущен или неправильный пароль.

### "Table 'users' doesn't exist"

**Решение:** Выполните SQL скрипт `database_schema.sql` в pgAdmin.

### "Port 8081 already in use"

**Решение:** Измените порт или остановите процесс на этом порту.


