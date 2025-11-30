package com.server.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

import com.server.enumeration.VisitStatus;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Farmvisit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Each visit belongs to ONE consultation
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consultation_id")
    @JsonBackReference
    private Consultation consultation;

    private LocalDateTime scheduledDate;

    private String visitNotes;

    @Enumerated(EnumType.STRING)
    private VisitStatus visitStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farm_address_id")
    @JsonBackReference
    private Address farmAddress;


    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
