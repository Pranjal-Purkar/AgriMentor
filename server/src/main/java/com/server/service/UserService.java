package com.server.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.dto.RegisterRequest;
import com.server.entity.Address;
import com.server.entity.Farmer;
import com.server.entity.User;
import com.server.repository.AddressRepository;
import com.server.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	 private UserRepository userRepository;
//	
//	@Autowired
//	private AddressRepository addressRepository;
	
     public void registerUser(RegisterRequest request) {
//    	 Address address = new Address("NashikRoad", "Nashik", "Mah", "422215", "India");
//    	 addressRepository.save(address);
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
