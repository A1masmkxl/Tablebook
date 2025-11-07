package kz.tablebook.config.service;

import kz.tablebook.config.dto.AdminStatsResponse;
import kz.tablebook.exception.ResourceNotFoundException;
import kz.tablebook.config.model.Booking;
import kz.tablebook.config.model.User;
import kz.tablebook.config.repository.BookingRepository;
import kz.tablebook.config.repository.RestaurantRepository;
import kz.tablebook.config.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final RestaurantRepository restaurantRepository;
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;

    public AdminStatsResponse getStats() {
        long totalRestaurants = restaurantRepository.count();
        long totalBookings = bookingRepository.count();
        long totalUsers = userRepository.count();
        long todayBookings = bookingRepository.countByDate(LocalDate.now());

        AdminStatsResponse stats = new AdminStatsResponse();
        stats.setTotalRestaurants(totalRestaurants);
        stats.setTotalBookings(totalBookings);
        stats.setTotalUsers(totalUsers);
        stats.setTodayBookings(todayBookings);

        return stats;
    }

    public List<Booking> getAllBookings(Integer limit) {
        if (limit != null && limit > 0) {
            return bookingRepository.findAll(
                PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "createdAt"))
            ).getContent();
        }
        return bookingRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public Booking updateBookingStatus(Long id, String status) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        
        booking.setStatus(status);
        return bookingRepository.save(booking);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUserRole(Long id, String role) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        user.setRole(role);
        return userRepository.save(user);
    }
}