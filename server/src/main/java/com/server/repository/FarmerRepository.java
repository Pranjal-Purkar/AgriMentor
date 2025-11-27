package com.server.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.entity.Farmer;

@Repository
public interface FarmerRepository extends JpaRepository<Farmer, Long> {
	Optional<Farmer> findByEmail(String email);

}
