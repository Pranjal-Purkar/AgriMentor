package com.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}
