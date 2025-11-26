package com.server.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.dto.FarmerDTO;
import com.server.entity.Farmer;
import com.server.repository.FarmerRepository;

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
			farmerDTO.setIsActive(farmer.getIsActive());
			farmerDTO.setFarmAreaHectares(farmer.getFarmAreaHectares());
			log.info("Converted Farmer to FarmerDTO: {}", farmerDTO);
			return Optional.of(farmerDTO);
	}

}
