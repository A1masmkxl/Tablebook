package kz.tablebook.config.service;

import kz.tablebook.config.dto.RestaurantRequest;
import kz.tablebook.exception.ResourceNotFoundException;
import kz.tablebook.config.model.Restaurant;
import kz.tablebook.config.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;

    public List<Restaurant> getRestaurants(String search, String city, String cuisine, String priceRange) {
        List<Restaurant> restaurants = restaurantRepository.findAll();

        if (search != null && !search.isEmpty()) {
            restaurants = restaurantRepository.searchRestaurants(search);
        }

        if (city != null && !city.isEmpty()) {
            restaurants = restaurants.stream()
                    .filter(r -> r.getCity().equalsIgnoreCase(city))
                    .collect(Collectors.toList());
        }

        if (cuisine != null && !cuisine.isEmpty()) {
            restaurants = restaurants.stream()
                    .filter(r -> r.getCuisine().equalsIgnoreCase(cuisine))
                    .collect(Collectors.toList());
        }

        if (priceRange != null && !priceRange.isEmpty()) {
            restaurants = restaurants.stream()
                    .filter(r -> r.getPriceRange().equals(priceRange))
                    .collect(Collectors.toList());
        }

        return restaurants;
    }

    public Restaurant getRestaurantById(Long id) {
        return restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + id));
    }

    public Restaurant createRestaurant(RestaurantRequest request) {
        Restaurant restaurant = new Restaurant();
        restaurant.setName(request.getName());
        restaurant.setCity(request.getCity());
        restaurant.setAddress(request.getAddress());
        restaurant.setCuisine(request.getCuisine());
        restaurant.setPriceRange(request.getPriceRange());
        restaurant.setImage(request.getImage());
        restaurant.setDescription(request.getDescription());
        restaurant.setPhone(request.getPhone());
        restaurant.setEmail(request.getEmail());
        restaurant.setWorkingHours(request.getWorkingHours());
        restaurant.setRating(request.getRating() != null ? request.getRating() : 4.5);

        return restaurantRepository.save(restaurant);
    }

    public Restaurant updateRestaurant(Long id, RestaurantRequest request) {
        Restaurant restaurant = getRestaurantById(id);

        restaurant.setName(request.getName());
        restaurant.setCity(request.getCity());
        restaurant.setAddress(request.getAddress());
        restaurant.setCuisine(request.getCuisine());
        restaurant.setPriceRange(request.getPriceRange());
        restaurant.setImage(request.getImage());
        restaurant.setDescription(request.getDescription());
        restaurant.setPhone(request.getPhone());
        restaurant.setEmail(request.getEmail());
        restaurant.setWorkingHours(request.getWorkingHours());
        if (request.getRating() != null) {
            restaurant.setRating(request.getRating());
        }

        return restaurantRepository.save(restaurant);
    }

    public void deleteRestaurant(Long id) {
        Restaurant restaurant = getRestaurantById(id);
        restaurantRepository.delete(restaurant);
    }
}