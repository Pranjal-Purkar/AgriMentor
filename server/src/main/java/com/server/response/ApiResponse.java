package com.server.response;

import org.springframework.http.HttpStatus;

import lombok.Data;

@Data
public class ApiResponse<T> {
	private HttpStatus Status;
	private String Message;
	private T Data;
	public ApiResponse(HttpStatus status, String message, T data) {
		super();
		Status = status;
		Message = message;
		Data = data;
	}
	
	public ApiResponse(HttpStatus status, String message) {
		super();
		Status = status;
		Message = message;
	}
	
	
}
