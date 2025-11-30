package com.server.entity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Admin extends User {
	private String assignedRegion;
    private LocalDateTime createdAt;
//	 public Admin(String firstName, String lastName, String phone, String email, String password, Address address,String assignedRegio) {
//		super(firstName, lastName, phone, email, password, address);
//		this.assignedRegion = assignedRegion;
//	}
	
	    
}
