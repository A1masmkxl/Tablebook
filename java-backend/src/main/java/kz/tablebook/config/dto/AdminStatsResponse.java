package kz.tablebook.config.dto;

import lombok.Data;

@Data
public class AdminStatsResponse {
    private Long totalRestaurants;
    private Long totalBookings;
    private Long totalUsers;
    private Long todayBookings;
}