package com.server.entity;


import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

import com.server.enumeration.VisitStatus;

@Entity
@Data
public class Farmvisit {
	   @Id
	   @GeneratedValue(strategy = GenerationType.IDENTITY)
	   private Long id;
//	   private Consultation consultation;
//	   private Consultant consultant;
//	   private User farmer;
//	   private Crop crop;
	   private LocalDateTime scheduledDate;
	   private String remarks;
	   @Enumerated(EnumType.STRING)
	    private VisitStatus visitStatus;
}
