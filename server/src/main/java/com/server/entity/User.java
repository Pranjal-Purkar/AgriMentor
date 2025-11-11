package com.server.entity;

import java.time.LocalDateTime;

import com.server.enumeration.Role;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
public class User {
   @Id
   @GeneratedValue(strategy=GenerationType.AUTO)
   private Integer Id;
   private String firstName;
   private String lastName;
    private String phone;
   private String email;
   private String password;
   @OneToOne
   @JoinColumn(nullable = true)
   private Address address;
//   @Enumerated(EnumType.STRING)
//   private Role role;
   private Boolean isActive;
   private Boolean isVerified;
   private LocalDateTime createdAt ;
   private LocalDateTime updatedAt;
   
}


