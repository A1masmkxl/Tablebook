import kz.tablebook.model.Restaurant;
import kz.tablebook.model.User;
import kz.tablebook.repository.RestaurantRepository;
import kz.tablebook.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {
        
        private final RestaurantRepository restaurantRepository;
        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        
        @Override
        public void run(String... args) {
                // Clear existing data
                if (restaurantRepository.count() == 0 && userRepository.count() == 0) {
                        seedData();
                }
        }
        
        private void seedData() {
                System.out.println("🌱 Seeding database...");
                
                // Create Restaurants
                List<Restaurant> restaurants = Arrays.asList(
                                createRestaurant("Gakku", "Almaty", "ул. Достык, 162", "Казахская", "$$$", 
                                                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
                                                "Аутентичная казахская кухня в современном исполнении", 
                                                "+7 (727) 250-00-00", "info@gakku.kz", "12:00 - 00:00", 4.8),
                                
                                createRestaurant("Line Brew", "Almaty", "ул. Розыбакиева, 247", "Европейская", "$$",
                                                "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800",
                                                "Пивоварня с широким выбором крафтового пива",
                                                "+7 (727) 300-00-00", "info@linebrew.kz", "12:00 - 02:00", 4.7),
                                
                                createRestaurant("Navat", "Astana", "пр. Кабанбай батыра, 11", "Восточная", "$$$",
                                                "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
                                                "Восточная кухня в роскошной атмосфере",
                                                "+7 (7172) 70-00-00", "info@navat.kz", "11:00 - 23:00", 4.9),
                                
                                createRestaurant("Selfie", "Almaty", "ул. Фурманова, 275", "Паназиатская", "$$",
                                                "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
                                                "Популярное место с паназиатской кухней",
                                                "+7 (727) 267-00-00", "info@selfie.kz", "11:00 - 00:00", 4.6),
                                
                                createRestaurant("Burger Heroes", "Almaty", "ул. Тимирязева, 42", "Американская", "$",
                                                "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800",
                                                "Лучшие бургеры в городе",
                                                "+7 (727) 350-00-00", "info@burgerheroes.kz", "10:00 - 23:00", 4.5),
                                
                                createRestaurant("Del Papa", "Astana", "ул. Сыганак, 18", "Итальянская", "$$$",
                                                "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800",
                                                "Настоящая итальянская кухня",
                                                "+7 (7172) 55-00-00", "info@delpapa.kz", "11:00 - 23:00", 4.8)
                );
                
                restaurantRepository.saveAll(restaurants);
                System.out.println("✅ Restaurants seeded: " + restaurants.size());
                
                // Create Admin User
                User admin = new User();
                admin.setName("Admin User");
                admin.setEmail("admin@tablebook.kz");
                admin.setPhone("+7 700 000 00 00");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole("admin");
                userRepository.save(admin);
                System.out.println("✅ Admin user created: " + admin.getEmail());
                
                // Create Test User
                User user = new User();
                user.setName("Test User");
                user.setEmail("user@test.kz");
                user.setPhone("+7 700 111 11 11");
                user.setPassword(passwordEncoder.encode("user123"));
                user.setRole("user");
                userRepository.save(user);
                System.out.println("✅ Test user created: " + user.getEmail());
                
                System.out.println("\n🎉 Database seeded successfully!");
                System.out.println("\n📝 Login credentials:");
                System.out.println("   Admin: admin@tablebook.kz / admin123");
                System.out.println("   User:  user@test.kz / user123\n");
        }
        
        private Restaurant createRestaurant(String name, String city, String address, String cuisine,
                                                                           String priceRange, String image, String description,
                                                                           String phone, String email, String workingHours, Double rating) {
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
                restaurant.setWorkingHours(workingHours);
                restaurant.setRating(rating);
                restaurant.setIsActive(true);
                return restaurant;
        }
}    restaurant.setName(name);
        restaurant.setCity(city);
        restaurant.setAddress(address);
        restaurant.setCuisine(cuisine);
        restaurant.setPriceRange(priceRange);
        restaurant.setImage(image);
        restaurant.setDescription(description);
        restaurant.setPhone(phone);
        restaurant.setEmail(email);
        restaurant.setWorkingHours(workingHours);
        restaurant.setRating(rating);
        restaurant.setIsActive(true);
        return restaurant;
    }
}