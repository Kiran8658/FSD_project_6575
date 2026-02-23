package com.fedf.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class FedfBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(FedfBackendApplication.class, args);
        System.out.println("\n🚀 FEDF Backend API is running!");
        System.out.println("📍 Server: http://localhost:8989");
        System.out.println("📍 Health: http://localhost:8989/health\n");
    }
}

