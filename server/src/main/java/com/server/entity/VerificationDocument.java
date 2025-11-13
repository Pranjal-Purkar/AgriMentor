package com.server.entity;

import java.util.UUID;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VerificationDocument {
		@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;

	private String documentType; // e.g., "ID Proof", "Qualification Certificate"

	private String documentUrl; // URL or path to the stored document

	@OneToOne
	@JoinColumn(name = "consultant_id")
	private Consultant consultant;
}
