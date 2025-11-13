package com.server.response;

import lombok.Data;

@Data
public class ApiResponse<T> {
	private String Status;
	private String Message;
	private T Data;
	public ApiResponse(String status, String message, T data) {
		super();
		Status = status;
		Message = message;
		Data = data;
	}
	
	public ApiResponse(String status, String message) {
		super();
		Status = status;
		Message = message;
	}
	
	
}
