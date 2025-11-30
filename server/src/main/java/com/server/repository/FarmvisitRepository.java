package com.server.repository;

import com.server.entity.Farmvisit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FarmvisitRepository extends JpaRepository<Farmvisit,Long> {

    Optional<Farmvisit> findByConsultationIdAndConsultationConsultantEmail(Long consultationId, String username);
}
