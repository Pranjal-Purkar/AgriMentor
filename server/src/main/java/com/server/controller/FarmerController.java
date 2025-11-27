package com.server.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.response.ApiResponse;
import com.server.service.FarmerService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/farmers")
@Slf4j
public class FarmerController {
	
	@Autowired
	private FarmerService farmerService;
	
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getFarmerById(@PathVariable Long id,Authentication authentication) {
		log.info("Received request to get farmer with id: {}", id);
		log.info("Authentication details: {}", authentication);
		if(authentication == null || !authentication.isAuthenticated()) {
			log.info("Unauthorized access attempt to get farmer with id: {}", id);
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(new ApiResponse<String>(HttpStatus.UNAUTHORIZED, "Unauthorized"));
		}	
		Optional<?> farmerDTO = farmerService.findById(id);
		
		if (farmerDTO.isPresent()) {
			log.info("Farmer found with id: {}", id);
			return ResponseEntity.ok().body(
					new ApiResponse<>(HttpStatus.OK, "Farmer retrieved successfully", farmerDTO.get())
					);
		} else {
			log.info("Farmer not found with id: {}", id);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<String>(HttpStatus.NOT_FOUND, "Farmer not found"));
		}
	}
	
	@GetMapping("/profile")
	public ResponseEntity<?> getFarmer(Authentication authentication) {
		log.info("Received request to get farmer with authentication : {}",authentication);
		if(authentication == null || !authentication.isAuthenticated()) {
			log.warn("Unauthorized access attempt to get farmer ");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(new ApiResponse<String>(HttpStatus.UNAUTHORIZED, "Unauthorized"));
		}	
		
		log.info("Extracted farmer user:name {}", authentication.getName());
		Optional<?> farmerDTO = farmerService.findByEmail(authentication.getName());
		
		if (farmerDTO.isPresent()) {
			log.info("Farmer found with email/username: {}", authentication.getName());
			return ResponseEntity.ok().body(
					new ApiResponse<>(HttpStatus.OK, "Farmer retrieved successfully", farmerDTO.get())
					);
		} else {
			log.info("Farmer not found with email/username: {}", authentication.getName());
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<String>(HttpStatus.NOT_FOUND, "Farmer not found"));
		}
	}
	
	@PutMapping("/update")
	public ResponseEntity<?> updateFarmer(@RequestBody Object farmerUpdate, Authentication authentication) {
		log.info("Received request to update farmer. famerUpdate: {}", farmerUpdate);
		if (authentication == null || !authentication.isAuthenticated()) {
			log.warn("Unauthorized access attempt to update farmer");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(new ApiResponse<String>(HttpStatus.UNAUTHORIZED, "Unauthorized"));
		}

		String username = authentication.getName();
		log.info("Attempting to update farmer for user: {}", username);

		// Delegate update to service. Service should handle lookup by username/email and apply updates.
		Optional<?> updated = farmerService.update(username, farmerUpdate);
		
		if (updated.isPresent()) {
			log.info("Farmer updated successfully for user: {}", username);
			return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK, "Farmer updated successfully", updated.get()));
		} else {
			log.info("Farmer not found for update for user: {}", username);
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ApiResponse<String>(HttpStatus.NOT_FOUND, "Farmer not found"));
		}
	}
	

}
