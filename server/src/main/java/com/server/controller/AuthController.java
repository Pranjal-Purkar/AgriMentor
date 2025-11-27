package com.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.dto.CunsultantRegisterRequest;
import com.server.dto.FarmerRegistrationRequest;
import com.server.dto.LoginRequest;
import com.server.dto.SendOtpRequest;
import com.server.dto.VerifyOtpRequest;
import com.server.enumeration.Role;
import com.server.response.ApiResponse;
import com.server.service.AuthService;
import com.server.service.OtpService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/auth")
//@CrossOrigin(origins ="*")
@Slf4j
public class AuthController{
	@Autowired
	private AuthService authService;
	 @Autowired
	    private OtpService otpService;


	@PostMapping("/register/farmer")
	public ResponseEntity<?> register(@RequestBody FarmerRegistrationRequest request) {
	    log.info("Registration Request Received: {}", request);

	    if (request.getRole() != Role.FARMER) {
	        throw new IllegalArgumentException("Invalid role for farmer registration");
	    }

	    return ResponseEntity.ok().body(
	        new ApiResponse<>(HttpStatus.OK, "User registered successfully",
	                authService.registerFarmer(request).orElseThrow(() -> new RuntimeException("Registration failed"))
	                )
	    );
	}
	
	@PostMapping(value = "/register/consultant", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<?> registerConsultant(@ModelAttribute CunsultantRegisterRequest request) {
		log.info("Registering Consultant: {}", request);
		try {
			return ResponseEntity.ok().body(new ApiResponse<>(HttpStatus.OK, "User registered successfully",
					authService.registerConsultant(request)));
		} catch (Exception e) {
			return ResponseEntity.status(400).body(new ApiResponse<String>(HttpStatus.BAD_REQUEST, e.getMessage()));
		}
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){
		try {
			log.info("Login attempt for user: {}", loginRequest.toString());
			return ResponseEntity.ok().body(new ApiResponse<>(HttpStatus.OK, "User Login successfully",
					authService.login(loginRequest)));
		} catch (Exception e) {
			log.error("Login failed for user: {}", e.getMessage());
			return ResponseEntity.status(400).body(new ApiResponse<String>(HttpStatus.BAD_REQUEST, e.getMessage()));
		}
	}
	
	
	@PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody SendOtpRequest req){
        otpService.sendOtp(req.getEmail());
        return ResponseEntity.ok("OTP sent");
    }
	
	@PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody VerifyOtpRequest req){
        boolean result = otpService.verifyOtp(req.getEmail(), req.getOtp());
        return result ? ResponseEntity.ok("Verified")
                      : ResponseEntity.badRequest().body("Invalid or expired OTP");
    }

}
