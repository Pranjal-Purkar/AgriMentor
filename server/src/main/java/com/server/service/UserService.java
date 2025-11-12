package com.server.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.dto.RegisterRequest;
import com.server.entity.*;
import com.server.repository.*;


@Service
public class UserService {
	@Autowired
	 private UserRepository userRepository;

     public void registerUser(RegisterRequest request) {
// 
    	 System.out.println("User Service Test" + request.toString());
    	 User user = new User();
    	 user.setFirstName(request.getFirstName());
    	 user.setLastName(request.getLastName());
    	 user.setEmail(request.getEmail());
    	 user.setPhone(request.getPhone());
    	 user.setPassword(request.getPassword());
    	 user.setRole(request.getRole());
    	 
    	 userRepository.save(user);
    	 
     }
}
