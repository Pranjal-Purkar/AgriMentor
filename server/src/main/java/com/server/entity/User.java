package com.server.entity;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

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
   @Value("true")
   private Boolean isActive;
   @Value("true")
   private Boolean isVerified;
   @CreatedDate
   private LocalDateTime createdAt ;
   @LastModifiedDate
   private LocalDateTime updatedAt;
   public User(String firstName, String lastName, String phone, String email, String password, Address address) {
	super();
	this.firstName = firstName;
	this.lastName = lastName;
	this.phone = phone;
	this.email = email;
	this.password = password;
	this.address = address;
   }
   
   
   
}


