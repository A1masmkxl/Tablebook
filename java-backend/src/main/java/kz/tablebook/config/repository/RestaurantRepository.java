package kz.tablebook.config.repository;

import kz.tablebook.config.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    List<Restaurant> findByCity(String city);
    List<Restaurant> findByCuisine(String cuisine);
    List<Restaurant> findByPriceRange(String priceRange);
    
    @Query("SELECT r FROM Restaurant r WHERE " +
           "LOWER(r.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(r.city) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(r.cuisine) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Restaurant> searchRestaurants(@Param("keyword") String keyword);
}