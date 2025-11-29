package com.server.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.dto.ConsultantDTO;
import com.server.entity.Consultant;
import com.server.enumeration.VerificationStatus;
import com.server.repository.ConsultantRepository;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ConsultantService {
	@Autowired
	private ConsultantRepository consultantRepository;
	// Get all consultants
	public List<ConsultantDTO> getAllConsultants() {
		log.info("Inside ConsultantService.getAllConsultants");
		List<Consultant> consultants = consultantRepository.findAll();
		ConsultantDTO constantsDTO = new ConsultantDTO();
		List<ConsultantDTO> dtoList = consultants.stream().map(consultant -> {
			constantsDTO.setId(consultant.getId());
			constantsDTO.setFirstName(consultant.getFirstName());
			constantsDTO.setLastName(consultant.getLastName());
			constantsDTO.setEmail(consultant.getEmail());
			constantsDTO.setPhone(consultant.getPhone());
			constantsDTO.setQualifications(consultant.getQualifications());
			constantsDTO.setExperienceYears(consultant.getExperienceYears());
			constantsDTO.setIsVerified(consultant.getIsVerified());
			constantsDTO.setVerificationStatus(consultant.getVerificationStatus());
			constantsDTO.setVerificationDocument(null); //TODO: handle document mapping letter
			return constantsDTO;
		}).toList();
		
		return (List<ConsultantDTO>) dtoList;
		
	}
	// Get consultant by ID
	public Optional<Consultant> getConsultantById(Long id) {
		log.info("Inside ConsultantService.getConsultantById with id: {}", id);
		return consultantRepository.findById(id);
	}
	// Get consultant by email
	public Optional<Consultant> getConsultantByUsername(String username) {
		log.info("Inside ConsultantService.getConsultantByEmail with email: {}", username);
		return consultantRepository.findByEmail(username);
	}
	// Check if consultant is verified
	public boolean isVerified(String email) {
		log.info("Inside ConsultantService.isVerified with email: {}", email);
		Optional<Consultant> consultantOpt = this.getConsultantByUsername(email);
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
		Optional<Consultant> consultantOpt = this.getConsultantByUsername(email);
		
		if (consultantOpt.isPresent()) {
			log.info("Consultant with email {} found with verification status: {}", email, consultantOpt.get().getVerificationStatus());
			return consultantOpt.get().getVerificationStatus();
		} else {
			log.warn("Consultant with email {} not found", email);
			return null;
		}
	}
	
	
	
	//update verification status
	@Transactional
	public void updateVerificationStatus(String email, VerificationStatus status) {
		log.info("Inside ConsultantService.updateVerificationStatus with email: {} and status: {}", email, status);
		Optional<Consultant> consultantOpt = this.getConsultantByUsername(email);
		if (consultantOpt.isPresent()) {
			Consultant consultant = consultantOpt.get();
			consultant.setVerificationStatus(status);
			if (status == VerificationStatus.VERIFIED) {
				consultant.setIsVerified(true);
				consultant.setIsActive(true);
			} else {
				consultant.setIsVerified(false);
				consultant.setIsActive(false);
			}
			consultantRepository.save(consultant);
			log.info("Consultant with email {} updated to verification status: {}", email, status);
		} else {
			log.warn("Consultant with email {} not found. Cannot update verification status.", email);
			throw new RuntimeException("Consultant not found");
		}
	}
	
	//verify consultant
	public boolean verifyConsultant(String email) {
		log.info("Inside ConsultantService.verifyConsultant with email: {}", email);
		try {
			this.updateVerificationStatus(email, VerificationStatus.VERIFIED);
			log.info("Consultant with email {} verified successfully", email);
			return true;
		} catch (Exception e) {
			log.error("Error verifying consultant with email {}: {}", email, e.getMessage());
			return false;
		}
	}
}
