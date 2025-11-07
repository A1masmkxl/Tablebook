@echo off
echo ========================================
echo Запуск TableBook Backend
echo ========================================
echo.

cd /d %~dp0

echo Остановка старых процессов Java...
taskkill /F /IM java.exe 2>nul

echo.
echo Компиляция проекта...
call mvn clean compile -DskipTests

if %ERRORLEVEL% NEQ 0 (
    echo ОШИБКА компиляции!
    pause
    exit /b 1
)

echo.
echo Запуск приложения...
echo Приложение будет доступно на http://localhost:8081
echo.
call mvn spring-boot:run

pause


