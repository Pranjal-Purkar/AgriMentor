package com.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.server.dto.RegisterRequest;
import com.server.entity.User;
import com.server.repository.UserRepository;

@Service
public class AuthService {
    @Autowired
	private UserRepository userRepository;
    
    public User register(RegisterRequest request) {
    	System.out.println("Auth Service Test" + request.toString());
		// Registration logic here
    	try {
    		User user = new User();
   		 user.setFirstName(request.getFirstName());
   		 user.setLastName(request.getLastName());
   		 user.setEmail(request.getEmail());
   		 user.setPhone(request.getPhone());
   		 user.setPassword(request.getPassword());
   		 user.setRole(request.getRole());
   		 
   		 userRepository.save(user);
   		 return user;
		} catch (Exception e) {
			return null;
		}
	    	
	}
}
