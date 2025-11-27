package com.server.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.server.entity.EmailOtp;

public interface EmailOtpRepository extends JpaRepository<EmailOtp, Long> {
	Optional<EmailOtp> findTopByEmailOrderByCreatedAtDesc(String email);//find latest otp record for that email
	void deleteByEmail(String email);//delete all otp records for that email

}
