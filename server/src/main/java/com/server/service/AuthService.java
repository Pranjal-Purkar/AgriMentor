package com.server.service;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.server.controller.AuthController;
import com.server.dto.ConsultantRegisterResponce;
import com.server.dto.CunsultantRegisterRequest;
import com.server.dto.FarmerRegistrationRequest;
import com.server.dto.FarmerRegistrationResponse;
import com.server.dto.LoginRequest;
import com.server.dto.LoginResponce;
import com.server.dto.RegisterRequest;
import com.server.entity.Consultant;
import com.server.entity.Farmer;
import com.server.entity.User;
import com.server.entity.VerificationDocument;
import com.server.enumeration.Role;
import com.server.enumeration.VerificationStatus;
import com.server.repository.ConsultantRepository;
import com.server.repository.FarmerRepository;
import com.server.repository.UserRepository;
import com.server.repository.VerificationDocumentRepository;
import com.server.util.JwtUtil;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AuthService {

//    private final AuthController authController;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private FarmerRepository farmerRepository;
	@Autowired
	private VerificationDocumentRepository verificationDocumentRepository;

	@Autowired
	private ConsultantRepository consultantRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired 
	private JwtUtil jwtUtil;

//    AuthService(AuthController authController) {
//        this.authController = authController;
//    }

	public User register(RegisterRequest request) {
		System.out.println("Auth Service Test" + request.toString());
		try {
			User user = new User();
			user.setFirstName(request.getFirstName());
			user.setLastName(request.getLastName());
			user.setEmail(request.getEmail());
			user.setPhone(request.getPhone());
			user.setPassword(passwordEncoder.encode(request.getPassword()));
			user.setRole(request.getRole());

			userRepository.save(user);
			return user;
		} catch (Exception e) {
			return null;
		}
	}

	public FarmerRegistrationResponse registerFarmer(FarmerRegistrationRequest request) {
		System.out.println("Auth Service Test" + request.toString());

		try {
			if (!request.getRole().equals(Role.FARMER)) {
				throw new RuntimeException("Invalid User, Only Farmer allows to Register");
			}
			Farmer farmer = farmerRepository.findByEmail(request.getEmail());
			if (farmer != null) {
				throw new RuntimeException("Email Already Registered");
			}
			farmer = new Farmer();
			farmer.setFirstName(request.getFirstName());
			farmer.setLastName(request.getLastName());
			farmer.setEmail(request.getEmail());
			farmer.setPhone(request.getPhone());
			farmer.setPassword(passwordEncoder.encode(request.getPassword()));
			farmer.setRole(request.getRole());
			farmerRepository.save(farmer);

			return new FarmerRegistrationResponse(farmer.getId(), farmer.getFirstName(), farmer.getLastName(),
					farmer.getEmail(), farmer.getPhone(), farmer.getRole());

		} catch (Exception e) {
			throw new RuntimeException("Farmer Registration Failed: " + e.getMessage());
		}
	}

	

	@Transactional
	public ConsultantRegisterResponce registerConsultant(CunsultantRegisterRequest request) {

		// 1. Check if email exists
		Consultant consultant = consultantRepository.findByEmail(request.getEmail());
		if (consultant != null) {
			throw new RuntimeException("Email Already Registered");
		}

		try {
			// 2. Create Consultant Entity
			consultant = new Consultant();
			consultant.setFirstName(request.getFirstName());
			consultant.setLastName(request.getLastName());
			consultant.setEmail(request.getEmail());
			consultant.setPhone(request.getPhone());
			consultant.setPassword(passwordEncoder.encode(request.getPassword()));
			consultant.setRole(Role.CONSULTANT);
			consultant.setExpertiseArea(request.getExpertiseArea());
			consultant.setExperienceYears(Integer.parseInt(request.getExperienceYears()));
			consultant.setQualifications(request.getQualifications());
			consultant.setVerificationStatus(VerificationStatus.PENDING);
			consultant.setIsActive(false);

			consultantRepository.save(consultant);

			// 3. Handle File Upload
			MultipartFile file = request.getVerificationDocument();
			log.info("Multipart File: {}", file);

			if (file == null || file.isEmpty()) {
				throw new RuntimeException("Verification document is required");
			}

			// Absolute upload path (WORKS in JAR too)
			String projectRoot = System.getProperty("user.dir");
			String uploadDir = projectRoot + "/uploads/consultants/";

			File directory = new File(uploadDir);
			if (!directory.exists()) {
				directory.mkdirs();
			}

			String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
			String uploadPath = uploadDir + fileName;

			File dest = new File(uploadPath);
			file.transferTo(dest);

			log.info("File uploaded to: {}", uploadPath);

			// 4. Create VerificationDocument Entity
			VerificationDocument document = new VerificationDocument();
			document.setDocumentType(file.getContentType());
			document.setDocumentUrl(uploadPath);
			document.setFileContent(file.getBytes());
			document.setConsultant(consultant);

			verificationDocumentRepository.save(document);

			// 5. Update Consultant with Document
			consultant.setVerificationDocument(document);
			consultantRepository.save(consultant);

			log.info("Consultant updated with document");

			// 6. Return Response
			return new ConsultantRegisterResponce(consultant.getId(), consultant.getFirstName(),
					consultant.getLastName(), consultant.getEmail(), consultant.getPhone(), consultant.getRole(),
					consultant.getExpertiseArea(), consultant.getExperienceYears(), consultant.getQualifications(),
					consultant.getVerificationStatus());

		} catch (Exception e) {
			log.error("Error during consultant registration: {}", e.getMessage());
			throw new RuntimeException("Consultant Registration Failed: " + e.getMessage());
		}
	}

	public LoginResponce login(LoginRequest loginRequest) {
		log.info("Login attempt for user: {}", loginRequest.getUsername());
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
				);
		log.info("Authentication successful for user: {}", loginRequest.getUsername());
		User user = (User) authentication.getPrincipal();
		log.info("User details retrieved: {}", user);
		if(user.getRole() != loginRequest.getRole()) {
			throw new RuntimeException("Invalid Role for the user");
		}
		
		String token = jwtUtil.generatAccessToken(user);
		log.info("JWT Token {}", token);
		return new LoginResponce(user.getEmail(),token);
		
	}

}
