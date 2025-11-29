package com.server.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.entity.Consultant;
import com.server.enumeration.VerificationStatus;
import com.server.repository.ConsultantRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ConsultantService {
	@Autowired
	private ConsultantRepository consultantRepository;
	// Get all consultants
	public List<Consultant> getAllConsultants() {
		log.info("Inside ConsultantService.getAllConsultants");
		return consultantRepository.findAll();
	}
	// Get consultant by ID
	public Optional<Consultant> getConsultantById(Long id) {
		log.info("Inside ConsultantService.getConsultantById with id: {}", id);
		return consultantRepository.findById(id);
	}
	// Get consultant by email
	public Optional<Consultant> getConsultantByEmail(String email) {
		log.info("Inside ConsultantService.getConsultantByEmail with email: {}", email);
		return consultantRepository.findByEmail(email);
	}
	// Check if consultant is verified
	public boolean isVerified(String email) {
		log.info("Inside ConsultantService.isVerified with email: {}", email);
		Optional<Consultant> consultantOpt = consultantRepository.findByEmail(email);
		if (consultantOpt.isPresent()) {
			return consultantOpt.get().getIsVerified();
		} else {
			log.warn("Consultant with email {} not found", email);
			return false;
		}
	}
	
	// Check verification status
	public VerificationStatus checkVerificationStatus(String email) {
		log.info("Inside ConsultantService.checkVerificationStatus with email: {}", email);
		Optional<Consultant> consultantOpt = this.getConsultantByEmail(email);
		
		if (consultantOpt.isPresent()) {
			log.info("Consultant with email {} found with verification status: {}", email, consultantOpt.get().getVerificationStatus());
			return consultantOpt.get().getVerificationStatus();
		} else {
			log.warn("Consultant with email {} not found", email);
			return null;
		}
	}
}
