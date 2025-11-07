@echo off
chcp 65001 >nul
echo ========================================
echo   TableBook - Автоматический запуск
echo ========================================
echo.

echo Остановка старых процессов...
taskkill /F /IM java.exe 2>nul
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo.
echo [1/2] Запуск бэкенда...
start "TableBook Backend" cmd /k "cd /d %~dp0java-backend && echo Запуск бэкенда на порту 8081... && mvn spring-boot:run"

echo Ожидание запуска бэкенда (60 секунд)...
timeout /t 60 /nobreak >nul

echo.
echo [2/2] Запуск фронтенда...
start "TableBook Frontend" cmd /k "cd /d %~dp0my-react-app && echo Запуск фронтенда на порту 3000... && npm start"

echo.
echo ========================================
echo   ✅ Запуск завершен!
echo ========================================
echo.
echo Бэкенд:  http://localhost:8081
echo API:     http://localhost:8081/api/restaurants
echo Фронтенд: http://localhost:3000
echo.
echo Откройте браузер: http://localhost:3000
echo.
echo Если есть ошибки - проверьте окна с бэкендом и фронтендом
echo.
pause


