package com.server.entity;

import java.util.UUID;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class VerificationDocument {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;

	private String documentType; // e.g., "ID Proof", "Qualification Certificate"

	private String documentUrl; // URL or path to the stored document

	@Lob
	private byte[] fileContent;

	@OneToOne
	@JoinColumn(name = "consultant_id")
	private Consultant consultant;
}
