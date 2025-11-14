package com.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.dto.CunsultantRegisterRequest;
import com.server.dto.FarmerRegistrationRequest;
import com.server.dto.FarmerRegistrationResponse;
import com.server.dto.RegisterRequest;
import com.server.entity.User;
import com.server.enumeration.Role;
import com.server.response.ApiResponse;
import com.server.service.AuthService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "*")
@Slf4j
public class AuthController {
	@Autowired
	private AuthService authService;

//	@PostMapping("/register")
//	public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
//		User user = authService.register(request);
//		if (user != null) {
//			return ResponseEntity.ok().body("User registered successfully");
//		} else {
//			return ResponseEntity.status(400).build();
//		}
//	}

	@PostMapping("/register/farmer")
	public ResponseEntity<?> register(@RequestBody FarmerRegistrationRequest request) {
		log.info("Registration Request Received: {}", request.toString());
		if (request.getRole() != Role.FARMER) {
			throw new IllegalArgumentException("Invalid role for farmer registration");
		}
		try {
			log.info("Registering Farmer: {}", request.getEmail());
			return ResponseEntity.ok().body(new ApiResponse(HttpStatus.OK, "User registered successfully",
					authService.registerFarmer(request)));
		} catch (Exception e) {
			return ResponseEntity.status(400).body(new ApiResponse<String>(HttpStatus.BAD_REQUEST, e.getMessage()));
		}

	}

	@PostMapping(value = "/register/consultant", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<?> registerConsultant(@ModelAttribute CunsultantRegisterRequest request) {
		log.info("Registering Consultant: {}", request);
		try {
			return ResponseEntity.ok().body(new ApiResponse(HttpStatus.OK, "User registered successfully",
					authService.registerConsultant(request)));
		} catch (Exception e) {
			return ResponseEntity.status(400).body(new ApiResponse<String>(HttpStatus.BAD_REQUEST, e.getMessage()));
		}
	}

}
