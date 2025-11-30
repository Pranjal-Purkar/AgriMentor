package com.server.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.server.entity.Address;
import com.server.entity.Consultation;
import com.server.enumeration.VisitStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FarmVisitRequest {
//    private Consultation consultation;

    private LocalDateTime scheduledDate;

    private String visitNotes;

    private VisitStatus visitStatus;

//    private Address farmAddress;

}
