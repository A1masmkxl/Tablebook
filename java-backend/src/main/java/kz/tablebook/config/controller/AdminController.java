package kz.tablebook.config.controller;

import kz.tablebook.config.dto.AdminStatsResponse;
import kz.tablebook.config.dto.UpdateUserRoleRequest;
import kz.tablebook.config.model.Booking;
import kz.tablebook.config.model.User;
import kz.tablebook.config.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/stats")
    public ResponseEntity<AdminStatsResponse> getStats() {
        AdminStatsResponse stats = adminService.getStats();
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getAllBookings(
            @RequestParam(required = false) Integer limit
    ) {
        List<Booking> bookings = adminService.getAllBookings(limit);
        return ResponseEntity.ok(bookings);
    }

    @PatchMapping("/bookings/{id}")
    public ResponseEntity<Booking> updateBookingStatus(
            @PathVariable Long id,
            @RequestBody UpdateUserRoleRequest request
    ) {
        Booking booking = adminService.updateBookingStatus(id, request.getStatus());
        return ResponseEntity.ok(booking);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = adminService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PatchMapping("/users/{id}")
    public ResponseEntity<User> updateUserRole(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserRoleRequest request
    ) {
        User user = adminService.updateUserRole(id, request.getRole());
        return ResponseEntity.ok(user);
    }
}