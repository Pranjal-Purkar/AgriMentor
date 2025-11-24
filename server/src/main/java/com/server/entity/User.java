package com.server.entity;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.server.enumeration.Role;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
public class User implements UserDetails{
   @Id
   @GeneratedValue(strategy=GenerationType.AUTO)
   private Long Id;
   private String firstName;
   private String lastName;
   @Column(unique = true, nullable = false)
    private String phone;
    @Column(unique = true, nullable = false)
   private String email;
   private String password;
   @OneToOne
   @JoinColumn(nullable = true)
   private Address address;
   @Enumerated(EnumType.STRING)
   @Column(nullable = false)
   private Role role;
   @Value("true")
   private Boolean isActive;
   @Value("true")
   private Boolean isVerified;
   @CreatedDate
   private LocalDateTime createdAt ;
   @LastModifiedDate
   private LocalDateTime updatedAt;
   
   public User(String firstName, String lastName, String phone, String email, String password, Address address) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.phone = phone;
	this.email = email;
	this.password = password;
	this.address = address;
   }
   
   public User() {
	// TODO Auto-generated constructor stub
   }

   @Override
   public Collection<? extends GrantedAuthority> getAuthorities() {
	   return List.of(new SimpleGrantedAuthority(role.name()));
   }

   @Override
   public String getUsername() {
	return this.email;
   }
   
   
}


