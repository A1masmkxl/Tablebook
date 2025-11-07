@echo off
chcp 65001 >nul
echo ========================================
echo Загрузка проекта в GitHub
echo ========================================
echo.

REM Проверка наличия remote репозитория
git remote -v >nul 2>&1
if %errorlevel% neq 0 (
    echo ОШИБКА: Remote репозиторий не настроен!
    echo.
    echo Инструкция:
    echo 1. Создайте новый репозиторий на GitHub (https://github.com/new)
    echo 2. Скопируйте URL репозитория (например: https://github.com/username/CaRest.git)
    echo 3. Выполните команду:
    echo    git remote add origin URL_ВАШЕГО_РЕПОЗИТОРИЯ
    echo 4. Затем запустите этот скрипт снова
    echo.
    pause
    exit /b 1
)

echo Текущая ветка: main
echo.
echo Выберите действие:
echo 1. Настроить новый remote репозиторий
echo 2. Запушить код в существующий репозиторий
echo.
set /p choice="Введите номер (1 или 2): "

if "%choice%"=="1" (
    set /p repo_url="Введите URL вашего GitHub репозитория: "
    git remote add origin %repo_url%
    if %errorlevel% equ 0 (
        echo Remote репозиторий успешно добавлен!
    ) else (
        echo Ошибка при добавлении remote репозитория.
        pause
        exit /b 1
    )
)

echo.
echo Загрузка кода в GitHub...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo УСПЕХ! Код успешно загружен в GitHub!
    echo ========================================
) else (
    echo.
    echo ОШИБКА при загрузке кода.
    echo Возможные причины:
    echo - Неверный URL репозитория
    echo - Проблемы с аутентификацией
    echo - Репозиторий уже содержит коммиты
    echo.
    echo Если репозиторий не пустой, попробуйте:
    echo git push -u origin main --force
    echo (ОСТОРОЖНО: это перезапишет удаленный репозиторий!)
)

echo.
pause

