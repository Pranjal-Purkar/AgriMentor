package com.server.dto;

import com.server.enumeration.Role;

import lombok.Data;

@Data
public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;
    private Role role;
    
	
    
}
