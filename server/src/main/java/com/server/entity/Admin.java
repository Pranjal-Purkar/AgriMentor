package com.server.entity;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
@Entity
public class Admin extends User {
	 public Admin(String firstName, String lastName, String phone, String email, String password, Address address,
		 String assignedRegio) {
		super(firstName, lastName, phone, email, password, address);
		
		this.assignedRegion = assignedRegion;
		
	}
	
	    private String assignedRegion;
	    private LocalDateTime createdAt;
}
