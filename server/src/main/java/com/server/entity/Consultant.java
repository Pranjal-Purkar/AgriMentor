package com.server.entity;

import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Value;
import com.server.enumeration.VerificationStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Consultant extends User {
	public Consultant(String firstName, String lastName, String phone, String email, String password, Address address,
			String expertiseArea, int experienceYears, String qualifications, VerificationStatus verificationStatus) {
		super(firstName, lastName, phone, email, password, address);
		this.expertiseArea = expertiseArea;
		this.experienceYears = experienceYears;
		this.qualifications = qualifications;
		this.verificationStatus = verificationStatus;

	}

	private String expertiseArea;
	private int experienceYears;
	private String qualifications;
	@Enumerated(EnumType.STRING)
	private VerificationStatus verificationStatus;
	private LocalDateTime verifiedAt;
	@Value("false")
	private Boolean isActive;
	private LocalDateTime createdAt;
}
