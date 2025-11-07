-- SQL скрипт для создания таблиц базы данных tablebook
-- Выполните этот скрипт в pgAdmin 4 в базе данных tablebook

-- Создание таблицы users (пользователи)
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(50),
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Создание индекса для email
CREATE INDEX IF NOT EXISTS idx_email ON users(email);

-- Создание таблицы restaurants (рестораны)
CREATE TABLE IF NOT EXISTS restaurants (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    address VARCHAR(500),
    cuisine VARCHAR(255) NOT NULL,
    price_range VARCHAR(10),
    image VARCHAR(1000),
    description TEXT,
    phone VARCHAR(50),
    email VARCHAR(255),
    working_hours VARCHAR(100),
    rating DOUBLE PRECISION NOT NULL DEFAULT 4.5,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Создание индексов для restaurants
CREATE INDEX IF NOT EXISTS idx_name ON restaurants(name);
CREATE INDEX IF NOT EXISTS idx_city ON restaurants(city);
CREATE INDEX IF NOT EXISTS idx_cuisine ON restaurants(cuisine);

-- Создание таблицы bookings (бронирования)
CREATE TABLE IF NOT EXISTS bookings (
    id BIGSERIAL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    date DATE NOT NULL,
    time VARCHAR(10) NOT NULL,
    guests INTEGER NOT NULL,
    special_requests TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_booking_restaurant FOREIGN KEY (restaurant_id) 
        REFERENCES restaurants(id) ON DELETE CASCADE,
    CONSTRAINT fk_booking_user FOREIGN KEY (user_id) 
        REFERENCES users(id) ON DELETE CASCADE
);

-- Создание индексов для bookings
CREATE INDEX IF NOT EXISTS idx_restaurant ON bookings(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_user ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_date ON bookings(date);
CREATE INDEX IF NOT EXISTS idx_status ON bookings(status);

-- Функция для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Триггеры для автоматического обновления updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_restaurants_updated_at BEFORE UPDATE ON restaurants
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Вставка примерных ресторанов
-- ПРИМЕЧАНИЕ: Пользователи будут созданы автоматически при запуске приложения
-- через DataInitializer с правильными BCrypt-хешами паролей
INSERT INTO restaurants (name, city, address, cuisine, price_range, image, description, phone, email, working_hours, rating, created_at, updated_at) VALUES
('Gakku', 'Almaty', 'пр. Абая, 150', 'Казахская', '$$$', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800', 'Ресторан казахской кухни с современным подходом', '+77272123456', 'info@gakku.kz', '10:00 - 23:00', 4.7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Line Brew', 'Almaty', 'ул. Розыбакиева, 247', 'Европейская', '$$', 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800', 'Пивной ресторан с авторской кухней', '+77272234567', 'info@linebrew.kz', '10:00 - 23:00', 4.5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Navat', 'Astana', 'пр. Кабанбай батыра, 11', 'Восточная', '$$$', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800', 'Изысканная восточная кухня', '+77172345678', 'info@navat.kz', '10:00 - 23:00', 4.8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Selfie', 'Almaty', 'пр. Аль-Фараби, 77/8', 'Паназиатская', '$$', 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800', 'Паназиатская кухня и суши-бар', '+77272345678', 'info@selfie.kz', '10:00 - 23:00', 4.6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Burger Heroes', 'Almaty', 'ул. Жандосова, 98', 'Американская', '$', 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800', 'Лучшие бургеры в городе', '+77272456789', 'info@burgerheroes.kz', '10:00 - 23:00', 4.4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Del Papa', 'Astana', 'ул. Достык, 13', 'Итальянская', '$$$', 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800', 'Authentic итальянская кухня', '+77172456789', 'info@delpapa.kz', '10:00 - 23:00', 4.7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Daredzhani', 'Almaty', 'пр. Абая, 68', 'Грузинская', '$$', 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800', 'Грузинская кухня и вино', '+77272567890', 'info@daredzhani.kz', '10:00 - 23:00', 4.6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Silk Road', 'Shymkent', 'пр. Тауке хана, 1', 'Узбекская', '$$', 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800', 'Узбекская кухня и плов', '+77252678901', 'info@silkroad.kz', '10:00 - 23:00', 4.5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Sushi Master', 'Astana', 'ул. Кунаева, 12', 'Японская', '$$', 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800', 'Японская кухня и суши', '+77172567890', 'info@sushimaster.kz', '10:00 - 23:00', 4.7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Meat Point', 'Almaty', 'ул. Тимирязева, 42', 'Стейкхаус', '$$$', 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800', 'Стейки из мраморной говядины', '+77272678901', 'info@meatpoint.kz', '10:00 - 23:00', 4.8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

-- Сообщение об успешном выполнении
DO $$
BEGIN
    RAISE NOTICE 'База данных успешно создана!';
    RAISE NOTICE 'Таблицы: users, restaurants, bookings';
    RAISE NOTICE 'Тестовые данные добавлены';
END $$;

