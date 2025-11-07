package kz.tablebook.config.service;

import kz.tablebook.config.dto.BookingRequest;
import kz.tablebook.exception.ResourceNotFoundException;
import kz.tablebook.exception.UnauthorizedException;
import kz.tablebook.config.model.Booking;
import kz.tablebook.config.model.Restaurant;
import kz.tablebook.config.model.User;
import kz.tablebook.config.repository.BookingRepository;
import kz.tablebook.config.repository.RestaurantRepository;
import kz.tablebook.config.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final RestaurantRepository restaurantRepository;
    private final UserRepository userRepository;

    public Booking createBooking(BookingRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Restaurant restaurant = restaurantRepository.findById(request.getRestaurantId())
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found"));

        Booking booking = new Booking();
        booking.setRestaurant(restaurant);
        booking.setUser(user);
        booking.setDate(request.getDate());
        booking.setTime(request.getTime());
        booking.setGuests(request.getGuests());
        booking.setSpecialRequests(request.getSpecialRequests());
        booking.setStatus("pending");

        return bookingRepository.save(booking);
    }

    public List<Booking> getUserBookings(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return bookingRepository.findByUserOrderByDateDesc(user);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
    }

    public Booking updateBookingStatus(Long id, String status) {
        Booking booking = getBookingById(id);
        booking.setStatus(status);
        return bookingRepository.save(booking);
    }

    public void cancelBooking(Long id, String userEmail) {
        Booking booking = getBookingById(id);
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!booking.getUser().getId().equals(user.getId()) && !user.getRole().equals("admin")) {
            throw new UnauthorizedException("You are not authorized to cancel this booking");
        }

        booking.setStatus("cancelled");
        bookingRepository.save(booking);
    }
}