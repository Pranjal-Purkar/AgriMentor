package com.server.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	
	@GetMapping("/me")
	public ResponseEntity<?> getFarmer(Authentication authentication) {
		log.info("Received request to get farmer with authentication : {}",authentication);
		if(authentication == null || !authentication.isAuthenticated()) {
			log.warn("Unauthorized access attempt to get farmer ");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(new ApiResponse<String>(HttpStatus.UNAUTHORIZED, "Unauthorized"));
		}	
		Long id = 52L;
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

}
