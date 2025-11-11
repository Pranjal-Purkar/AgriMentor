package com.server.entity;

import jakarta.persistence.*; 

import lombok.Data;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.annotation.CreatedDate;

@Entity
@Data 
public class Farmer extends User{
	
	@Value("50.0")
    private Double farmAreaHectares;
	@Value("Unknown")
    private String preferredLanguage;
	@CreatedDate
    private LocalDateTime createdAt;
	
	public Farmer(String firstName, String lastName, String phone, String email, String password, Address address,
		Double farmAreaHectares) {
		super(firstName, lastName, phone, email, password, address);
		this.farmAreaHectares = farmAreaHectares;
	}
	
	
	
	

}
