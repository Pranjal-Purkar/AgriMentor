package com.server.entity;


import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

import com.server.enumeration.VisitStatus;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Farmvisit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consultation_id")
    private Consultation consultation;

    private LocalDateTime scheduledDate;

    private String remarks;

    @Enumerated(EnumType.STRING)
    private VisitStatus visitStatus;
}
