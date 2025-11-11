package com.server.entity;
import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Data
public class Consultation {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
//	    private User farmer;
//	    private Consultant consultant;
//	    private Crop crop;
	    private LocalDateTime createdAt ;
	    private LocalDateTime updatedAt;
	    private LocalDateTime closedAt;
}
