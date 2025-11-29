package com.server.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

import com.server.enumeration.CropSeason;

@Entity
@Data
public class Crop {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String type;
	@Enumerated(EnumType.STRING)
	private CropSeason season;
	private String soilType;
	private String climate;
	private String fertilizerRecommendation;
	private String description;
	private LocalDateTime createdAt;

}
