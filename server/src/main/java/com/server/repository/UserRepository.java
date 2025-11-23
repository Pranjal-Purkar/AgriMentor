package com.server.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.dto.RegisterRequest;
import com.server.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	void save(RegisterRequest request);
	boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
    Optional<User> findByEmail(String username);
}
