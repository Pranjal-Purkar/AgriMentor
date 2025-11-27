package com.server.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.server.dto.FarmerDTO;
import com.server.entity.Address;
import com.server.entity.Farmer;
import com.server.repository.FarmerRepository;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class FarmerService {
	
	@Autowired
	private FarmerRepository farmerRepository;
	
	public Optional<?> findById(Long id) {
		log.info("Fetching farmer with id: {}", id);
		Farmer farmer = farmerRepository.findById(id).orElseThrow(() -> {
			throw new RuntimeException("Farmer not found with id: " + id);
		});
		log.info("Farmer found: {}", farmer);
		FarmerDTO farmerDTO = new FarmerDTO();
		farmerDTO.setId(farmer.getId());
		farmerDTO.setFirstName(farmer.getFirstName());
			farmerDTO.setLastName(farmer.getLastName());
			farmerDTO.setEmail(farmer.getEmail());
			farmerDTO.setPhone(farmer.getPhone());
			farmerDTO.setRole(farmer.getRole());
			farmerDTO.setAddress(farmer.getAddress());
			farmerDTO.setFarmAreaHectares(farmer.getFarmAreaHectares());
			log.info("Converted Farmer to FarmerDTO: {}", farmerDTO);
			return Optional.of(farmerDTO);
	}
	public Optional<?> findByEmail(String email) {
		log.info("Fetching farmer with email: {}", email);
		Farmer farmer = farmerRepository.findByEmail(email).orElseThrow(() -> {
			throw new RuntimeException("Farmer not found with username: " + email);
		});
		log.info("Farmer found: {}", farmer);
		FarmerDTO farmerDTO = new FarmerDTO();
		farmerDTO.setId(farmer.getId());
		farmerDTO.setFirstName(farmer.getFirstName());
			farmerDTO.setLastName(farmer.getLastName());
			farmerDTO.setEmail(farmer.getEmail());
			farmerDTO.setPhone(farmer.getPhone());
			farmerDTO.setRole(farmer.getRole());
			farmerDTO.setAddress(farmer.getAddress());
			farmerDTO.setFarmAreaHectares(farmer.getFarmAreaHectares());
			log.info("Converted Farmer to FarmerDTO: {}", farmerDTO);
			return Optional.of(farmerDTO);
	}
	
	@Transactional
	public Optional<?> update(String username, Object farmerUpdate) {
	    log.info("Updating farmer for username: {}", username);

	    try {
	        // Convert incoming payload into DTO
	        ObjectMapper mapper = new ObjectMapper();
	        FarmerDTO updateDto = mapper.convertValue(farmerUpdate, FarmerDTO.class);

	        // Find existing farmer by email/username
	        Farmer farmer = farmerRepository.findByEmail(username)
	                .orElseThrow(() -> new RuntimeException("Farmer not found with username: " + username));

	        // -----------------------------
	        // UPDATE BASIC USER FIELDS
	        // -----------------------------
	        if (updateDto.getFirstName() != null)
	            farmer.setFirstName(updateDto.getFirstName());

	        if (updateDto.getLastName() != null)
	            farmer.setLastName(updateDto.getLastName());

	        if (updateDto.getPhone() != null)
	            farmer.setPhone(updateDto.getPhone());

	        if (updateDto.getEmail() != null)
	            farmer.setEmail(updateDto.getEmail()); // optional

	        if (updateDto.getFarmAreaHectares() != null)
	            farmer.setFarmAreaHectares(updateDto.getFarmAreaHectares());


	        // -----------------------------
	        // UPDATE ADDRESS FIELDS SAFELY
	        // -----------------------------
	        if (updateDto.getAddress() != null) {

	            Address incoming = updateDto.getAddress();
	            Address existing = farmer.getAddress();

	            // If farmer has no address yet → create new
	            if (existing == null) {
	                existing = new Address();
	                farmer.setAddress(existing);
	            }

	            // Merge incoming fields into existing Address
	            if (incoming.getStreet() != null) existing.setStreet(incoming.getStreet());
	            if (incoming.getCity() != null) existing.setCity(incoming.getCity());
	            if (incoming.getState() != null) existing.setState(incoming.getState());
	            if (incoming.getPinCode() != null) existing.setPinCode(incoming.getPinCode());
	            if (incoming.getCountry() != null) existing.setCountry(incoming.getCountry());
	            if (incoming.getLatitude() != null) existing.setLatitude(incoming.getLatitude());
	            if (incoming.getLongitude() != null) existing.setLongitude(incoming.getLongitude());
	        }

	        // -----------------------------
	        // SAVE UPDATED FARMER
	        // -----------------------------
	        Farmer saved = farmerRepository.save(farmer);
	        log.info("Farmer updated successfully: {}", saved);

	        // -----------------------------
	        // PREPARE RESPONSE DTO
	        // -----------------------------
	        FarmerDTO result = new FarmerDTO();
	        result.setId(saved.getId());
	        result.setFirstName(saved.getFirstName());
	        result.setLastName(saved.getLastName());
	        result.setEmail(saved.getEmail());
	        result.setPhone(saved.getPhone());
	        result.setRole(saved.getRole());
	        result.setAddress(saved.getAddress());
	        result.setFarmAreaHectares(saved.getFarmAreaHectares());

	        return Optional.of(result);

	    } catch (Exception e) {
	        log.error("Failed to update farmer for username {}: {}", username, e.getMessage(), e);
	        throw new RuntimeException("Failed to update farmer: " + e.getMessage(), e);
	    }
	}


}
