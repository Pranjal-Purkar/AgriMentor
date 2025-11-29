package com.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.entity.Consultant;

@Repository

public interface ConsultantRepository extends JpaRepository<Consultant, Long> {
	Consultant findByEmail(String email);

}
