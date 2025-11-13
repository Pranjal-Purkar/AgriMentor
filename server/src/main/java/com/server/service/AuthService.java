package com.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.server.dto.FarmerRegistrationResponse;
import com.server.dto.RegisterRequest;
import com.server.entity.Farmer;
import com.server.entity.User;
import com.server.enumeration.Role;
import com.server.repository.FarmerRepository;
import com.server.repository.UserRepository;

@Service
public class AuthService {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private FarmerRepository farmerRepository;

	public User register(RegisterRequest request) {
		System.out.println("Auth Service Test" + request.toString());
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

	public FarmerRegistrationResponse registerFarmer(RegisterRequest request) {
		System.out.println("Auth Service Test" + request.toString());

		try {
			if (!request.getRole().equals(Role.FARMER)) {
				throw new RuntimeException("Invalid User, Only Farmer allows to Register");
			}
			Farmer farmer = farmerRepository.findByEmail(request.getEmail());
			if (farmer != null) {
				throw new RuntimeException("Email Already Registered");
			}
			farmer.setFirstName(request.getFirstName());
			farmer.setLastName(request.getLastName());
			farmer.setEmail(request.getEmail());
			farmer.setPhone(request.getPhone());
			farmer.setPassword(request.getPassword());
			farmer.setRole(request.getRole());
			farmerRepository.save(farmer);

			return new FarmerRegistrationResponse(farmer.getId(), farmer.getFirstName(), farmer.getLastName(),
					farmer.getEmail(), farmer.getPhone(), farmer.getRole());

		} catch (Exception e) {
			throw new RuntimeException("Farmer Registration Failed: " + e.getMessage());
		}
	}
}
