package kz.tablebook.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class TableBookApplication {
    public static void main(String[] args) {
        SpringApplication.run(TableBookApplication.class, args);
    }
}