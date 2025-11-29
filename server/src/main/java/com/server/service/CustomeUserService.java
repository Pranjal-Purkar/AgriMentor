package com.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import com.server.repository.UserRepository;

@Service
@Slf4j
public class CustomeUserService implements UserDetailsService{
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		log.info("Loading user by username: {}", username);
		return userRepository.findByEmail(username).orElseThrow();
	}

}
