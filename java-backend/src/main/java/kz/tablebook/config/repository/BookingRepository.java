package kz.tablebook.config.repository;

import kz.tablebook.config.model.Booking;
import kz.tablebook.config.model.Restaurant;
import kz.tablebook.config.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUser(User user);
    List<Booking> findByUserOrderByDateDesc(User user);
    List<Booking> findByRestaurant(Restaurant restaurant);
    List<Booking> findByStatus(String status);
    List<Booking> findByDate(LocalDate date);
    List<Booking> findByRestaurantAndDate(Restaurant restaurant, LocalDate date);
    Long countByStatus(String status);
    Long countByDate(LocalDate date);
}