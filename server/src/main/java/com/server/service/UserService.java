package com.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.entity.Address;
import com.server.entity.Farmer;
import com.server.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	 private UserRepository userRepository;
     public void registerUser() {
    	 userRepository.save(new Farmer("abc","aa","111","ss","pp",new Address(),44.55));
     }
}
