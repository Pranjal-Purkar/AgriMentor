package com.server.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.entity.VerificationDocument;

@Repository
public interface VerificationDocumentRepository extends JpaRepository<VerificationDocument, UUID>{

}
