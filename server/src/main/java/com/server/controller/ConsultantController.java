package com.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.response.ApiResponse;
import com.server.service.ConsultantService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/consultants")
@Slf4j
public class ConsultantController {
	@Autowired
	private ConsultantService consultantService;
	
	@GetMapping("/all")
	public ResponseEntity<?> getAllConsultants() {
		log.info("Fetching all consultants");
		try {
			log.info("Consultants fetched successfully");
			return ResponseEntity.ok().body(
					new ApiResponse<>(HttpStatus.OK, "Consultants retrieved successfully", consultantService.getAllConsultants())
					);
		} catch (Exception e) {
			log.error("Error fetching consultants", e);
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<String>(HttpStatus.NOT_FOUND, e.getLocalizedMessage()));
			
		}
	}
	
	
	
	
}
