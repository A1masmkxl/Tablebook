package kz.tablebook.config;

import kz.tablebook.config.model.Restaurant;
import kz.tablebook.config.model.User;
import kz.tablebook.config.repository.RestaurantRepository;
import kz.tablebook.config.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Create admin user if not exists
        if (!userRepository.existsByEmail("admin@tablebook.kz")) {
            User admin = new User();
            admin.setName("Admin User");
            admin.setEmail("admin@tablebook.kz");
            admin.setPhone("+77001234567");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole("admin");
            userRepository.save(admin);
            System.out.println("Admin user created: admin@tablebook.kz / admin123");
        }

        // Create test user if not exists
        if (!userRepository.existsByEmail("user@test.kz")) {
            User user = new User();
            user.setName("Test User");
            user.setEmail("user@test.kz");
            user.setPhone("+77007654321");
            user.setPassword(passwordEncoder.encode("user123"));
            user.setRole("user");
            userRepository.save(user);
            System.out.println("Test user created: user@test.kz / user123");
        }

        // Create sample restaurants if database is empty
        if (restaurantRepository.count() == 0) {
            createSampleRestaurants();
            System.out.println("Sample restaurants created");
        }
    }

    private void createSampleRestaurants() {
        Restaurant[] restaurants = {
            createRestaurant("Gakku", "Almaty", "пр. Абая, 150", "Казахская", "$$$",
                    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
                    "Ресторан казахской кухни с современным подходом", "+77272123456", "info@gakku.kz"),
            
            createRestaurant("Line Brew", "Almaty", "ул. Розыбакиева, 247", "Европейская", "$$",
                    "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800",
                    "Пивной ресторан с авторской кухней", "+77272234567", "info@linebrew.kz"),
            
            createRestaurant("Navat", "Astana", "пр. Кабанбай батыра, 11", "Восточная", "$$$",
                    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
                    "Изысканная восточная кухня", "+77172345678", "info@navat.kz"),
            
            createRestaurant("Selfie", "Almaty", "пр. Аль-Фараби, 77/8", "Паназиатская", "$$",
                    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
                    "Паназиатская кухня и суши-бар", "+77272345678", "info@selfie.kz"),
            
            createRestaurant("Burger Heroes", "Almaty", "ул. Жандосова, 98", "Американская", "$",
                    "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800",
                    "Лучшие бургеры в городе", "+77272456789", "info@burgerheroes.kz"),
            
            createRestaurant("Del Papa", "Astana", "ул. Достык, 13", "Итальянская", "$$$",
                    "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800",
                    "Authentic итальянская кухня", "+77172456789", "info@delpapa.kz"),
            
            createRestaurant("Daredzhani", "Almaty", "пр. Абая, 68", "Грузинская", "$$",
                    "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800",
                    "Грузинская кухня и вино", "+77272567890", "info@daredzhani.kz"),
            
            createRestaurant("Silk Road", "Shymkent", "пр. Тауке хана, 1", "Узбекская", "$$",
                    "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800",
                    "Узбекская кухня и плов", "+77252678901", "info@silkroad.kz"),
            
            createRestaurant("Sushi Master", "Astana", "ул. Кунаева, 12", "Японская", "$$",
                    "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800",
                    "Японская кухня и суши", "+77172567890", "info@sushimaster.kz"),
            
            createRestaurant("Meat Point", "Almaty", "ул. Тимирязева, 42", "Стейкхаус", "$$$",
                    "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
                    "Стейки из мраморной говядины", "+77272678901", "info@meatpoint.kz")
        };

        for (Restaurant restaurant : restaurants) {
            restaurantRepository.save(restaurant);
        }
    }

    private Restaurant createRestaurant(String name, String city, String address, 
                                       String cuisine, String priceRange, String image,
                                       String description, String phone, String email) {
        Restaurant restaurant = new Restaurant();
        restaurant.setName(name);
        restaurant.setCity(city);
        restaurant.setAddress(address);
        restaurant.setCuisine(cuisine);
        restaurant.setPriceRange(priceRange);
        restaurant.setImage(image);
        restaurant.setDescription(description);
        restaurant.setPhone(phone);
        restaurant.setEmail(email);
        restaurant.setWorkingHours("10:00 - 23:00");
        restaurant.setRating(4.5 + Math.random() * 0.5); // Random rating between 4.5-5.0
        return restaurant;
    }
}