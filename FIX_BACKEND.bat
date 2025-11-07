@echo off
chcp 65001 >nul
echo ========================================
echo   Исправление и запуск бэкенда
echo ========================================
echo.

echo Остановка старых процессов...
taskkill /F /IM java.exe 2>nul
timeout /t 2 /nobreak >nul

echo.
echo Переход в папку бэкенда...
cd /d %~dp0java-backend

echo.
echo Компиляция проекта...
call mvn clean compile -DskipTests -q

if %ERRORLEVEL% NEQ 0 (
    echo ОШИБКА компиляции!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Запуск бэкенда
echo ========================================
echo Порт: 8081
echo URL: http://localhost:8081
echo API: http://localhost:8081/api/restaurants
echo.
echo ВАЖНО: Убедитесь что PostgreSQL запущен!
echo.
pause

echo.
echo Запуск...
call mvn spring-boot:run

pause

