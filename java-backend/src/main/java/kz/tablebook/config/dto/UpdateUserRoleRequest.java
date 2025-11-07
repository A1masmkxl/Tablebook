package kz.tablebook.config.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateUserRoleRequest {
    @NotBlank(message = "Role is required")
    private String role;
    
    private String status; // for booking status update
}