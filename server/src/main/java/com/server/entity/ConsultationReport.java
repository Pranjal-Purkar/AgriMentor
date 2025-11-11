package com.server.entity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
public class ConsultationReport {
	 	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
//	    private Consultation consultation;
//	    private Consultant consultant;
//	    private Crop crop;
	    private String reportText;
	    private LocalDateTime createdAt ;
	 
}
