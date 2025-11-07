# Быстрое решение проблемы ERR_CONNECTION_REFUSED

## Проблема
Фронтенд не может подключиться к бэкенду на порту 8081.

## Решение

### Шаг 1: Проверьте, запущен ли бэкенд

Откройте окно, где запущен бэкенд (или запустите заново):

```bash
cd java-backend
mvn spring-boot:run
```

**Или используйте:** `java-backend\START_SIMPLE.bat`

### Шаг 2: Проверьте логи бэкенда

В окне бэкенда должны быть сообщения:
- ✅ `Started TableBookApplication` - всё ОК
- ❌ `Connection refused` или `password authentication failed` - проблема с БД

### Шаг 3: Если ошибка подключения к БД

1. **Убедитесь, что PostgreSQL запущен**
2. **Проверьте пароль в `application.properties` (строка 8)**
3. **Выполните SQL скрипт в pgAdmin:**
   - Откройте pgAdmin
   - База данных `tablebook` → Query Tool
   - Выполните `database_schema.sql`

### Шаг 4: Проверка работы

Откройте в браузере: http://localhost:8081/api/restaurants

Должен вернуться JSON с ресторанами.

### Шаг 5: Если всё ОК, но фронтенд не работает

Проверьте URL в `my-react-app/src/utils/constants.js`:
```javascript
export const API_URL = 'http://localhost:8081/api';
```

## Быстрый тест

В новом терминале:
```bash
curl http://localhost:8081/api/restaurants
```

Если вернулся JSON - бэкенд работает!


