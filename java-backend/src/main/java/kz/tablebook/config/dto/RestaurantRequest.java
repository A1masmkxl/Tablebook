package kz.tablebook.config.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RestaurantRequest {
    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "Cuisine is required")
    private String cuisine;

    @NotBlank(message = "Price range is required")
    private String priceRange;

    @NotBlank(message = "Image URL is required")
    private String image;

    private String description;
    private String phone;
    private String email;
    private String workingHours;
    private Double rating;
}
