package com.server.entity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

public class ConsultationReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consultation_id")
    @JsonBackReference
    private Consultation consultation;

    @Column(columnDefinition = "TEXT")
    private String reportText;

    private String recommendations;
    private String identifiedIssue;
    private LocalDateTime followUpDate;

    @OneToMany(mappedBy = "consultationReport", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<ReportAttachment> attachments = new ArrayList<>();


    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
	 
}
