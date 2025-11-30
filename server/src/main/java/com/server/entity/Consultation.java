package com.server.entity;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.server.enumeration.ConsultationRequestStatus;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Consultation {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String topic;
    private String description;
    @Enumerated(EnumType.STRING)
    private ConsultationRequestStatus consultationRequestStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id")
    @JsonManagedReference(value = "consultation-farmer")
    private Farmer farmer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consultant_id")
    @JsonManagedReference(value = "consultation-consultant")
    private Consultant consultant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id")
    @JsonBackReference(value = "consultation-crop")
    private Crop crop;

    @OneToMany(mappedBy = "consultation", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Farmvisit> farmVisits = new ArrayList<>();

    @OneToMany(mappedBy = "consultation", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<ConsultationReport> consultationReports = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "farm_address_id")
    @JsonManagedReference
    private Address farmAddress;


    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime closedAt;
}
