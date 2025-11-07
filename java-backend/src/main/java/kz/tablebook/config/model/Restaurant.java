package kz.tablebook.config.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "restaurants", indexes = {
    @Index(name = "idx_name", columnList = "name"),
    @Index(name = "idx_city", columnList = "city"),
    @Index(name = "idx_cuisine", columnList = "cuisine")
})
@EntityListeners(AuditingEntityListener.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Restaurant {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String city;
    
    private String address;
    
    @Column(nullable = false)
    private String cuisine;
    
    private String priceRange; // $, $$, $$$
    
    private String image;
    
    @Column(length = 2000)
    private String description;
    
    private String phone;
    
    private String email;
    
    private String workingHours;
    
    @Column(nullable = false)
    private Double rating = 4.5;
    
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}