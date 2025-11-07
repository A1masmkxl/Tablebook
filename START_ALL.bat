@echo off
echo ========================================
echo Запуск TableBook (Backend + Frontend)
echo ========================================
echo.

echo Запуск бэкенда в отдельном окне...
start "TableBook Backend" cmd /k "cd java-backend && mvn spring-boot:run"

echo Ожидание запуска бэкенда (30 секунд)...
timeout /t 30 /nobreak >nul

echo.
echo Запуск фронтенда...
cd my-react-app
call npm start


