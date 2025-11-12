package com.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.dto.RegisterRequest;
import com.server.service.UserService;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
	@Autowired
    private UserService userService;
	
	@GetMapping("/test")
	public void Test() {
			 	 System.out.println("User Controller Test");
	}
	
	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@RequestBody RegisterRequest request) {
	 	String message= userService.registerUser(request);
	 	if(message.contains("already")) {
	 		return ResponseEntity.badRequest().body(message);
	 	}
	 	return ResponseEntity.ok(message);
	  }
}
