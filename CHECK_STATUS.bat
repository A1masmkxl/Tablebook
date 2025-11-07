@echo off
echo ========================================
echo Проверка статуса TableBook
echo ========================================
echo.

echo Проверка бэкенда (порт 8081)...
netstat -ano | findstr ":8081" >nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ Бэкенд запущен на порту 8081
    echo.
    echo Тестирование API...
    curl -s http://localhost:8081/api/restaurants >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        echo ✅ API работает!
    ) else (
        echo ⚠️ API еще запускается...
    )
) else (
    echo ❌ Бэкенд не запущен
)

echo.
echo Проверка фронтенда (порт 3000)...
netstat -ano | findstr ":3000" >nul
if %ERRORLEVEL% EQU 0 (
    echo ✅ Фронтенд запущен на порту 3000
) else (
    echo ❌ Фронтенд не запущен
)

echo.
echo ========================================
echo Ссылки:
echo Бэкенд API: http://localhost:8081/api
echo Фронтенд: http://localhost:3000
echo ========================================
pause


