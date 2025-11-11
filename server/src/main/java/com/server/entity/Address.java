package com.server.entity;

import jakarta.persistence.*;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Address {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	@Column(nullable = false)
    private String street;
	@Column(nullable = false)
    private String city;
	@Column(nullable = false)
    private String state;
	@Column(nullable = false)
    private String pinCode;
	@Column(nullable = false)
    private String country;
	@Column(nullable = true)
    private String latitude;
	@Column(nullable = true)
    private String longitude;
	@OneToOne(mappedBy = "address")
	private User user;
}
