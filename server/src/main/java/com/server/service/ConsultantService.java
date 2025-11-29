package com.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.repository.ConsultantRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ConsultantService {
	@Autowired
	private ConsultantRepository consultantRepository;
}
