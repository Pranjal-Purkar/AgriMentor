package com.server.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class EmailOtp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String otp;
    private LocalDateTime expiryAt;
    private boolean verified;
    private LocalDateTime createdAt = LocalDateTime.now();
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getOtp() {
		return otp;
	}
	public void setOtp(String otp) {
		this.otp = otp;
	}
	public LocalDateTime getExpiryAt() {
		return expiryAt;
	}
	public void setExpiryAt(LocalDateTime expiryAt) {
		this.expiryAt = expiryAt;
	}
	public boolean isVerified() {
		return verified;
	}
	public void setVerified(boolean verified) {
		this.verified = verified;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	public EmailOtp(String email, String otp, LocalDateTime expiryAt, boolean verified, LocalDateTime createdAt) {
		super();
		this.email = email;
		this.otp = otp;
		this.expiryAt = expiryAt;
		this.verified = verified;
		this.createdAt = createdAt;
	}
	public EmailOtp() {
		// TODO Auto-generated constructor stub
	}


}
