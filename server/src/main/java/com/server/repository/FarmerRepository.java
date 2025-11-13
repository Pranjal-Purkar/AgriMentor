package com.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.entity.Farmer;

@Repository
public interface FarmerRepository extends JpaRepository<Farmer, Long> {

	

	Farmer findByEmail(String email);
	

}
