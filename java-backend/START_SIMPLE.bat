@echo off
echo ========================================
echo TableBook Backend - Запуск
echo ========================================
echo.
cd /d %~dp0
echo Запуск приложения...
echo Приложение будет доступно на http://localhost:8081
echo.
echo ВАЖНО: Убедитесь что:
echo 1. PostgreSQL запущен
echo 2. База данных tablebook создана
echo 3. Выполнен SQL скрипт database_schema.sql
echo.
pause
mvn spring-boot:run


