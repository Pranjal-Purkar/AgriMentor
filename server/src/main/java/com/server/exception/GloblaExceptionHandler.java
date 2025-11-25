package com.server.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import com.server.response.ApiResponse;

@RestControllerAdvice
public class GloblaExceptionHandler {
	// Handle specific exception (IllegalArgumentException)
	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<?> handleIllegalArgumentException(IllegalArgumentException ex) {
		return ResponseEntity.badRequest()
				.body(new ApiResponse<>(HttpStatus.BAD_REQUEST, ex.getMessage()));
	}

	// Handle runtime exceptions
	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<?> handleRuntimeException(RuntimeException ex) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage()));
	}

	// Handle Validation Errors (@Valid / @ModelAttribute)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleValidationException(MethodArgumentNotValidException ex) {
		String errorMsg = ex.getBindingResult().getFieldError().getDefaultMessage();
		return ResponseEntity.badRequest()
				.body(new ApiResponse<>(HttpStatus.BAD_REQUEST, errorMsg));
	}




	// Handle all other exceptions
	@ExceptionHandler(Exception.class)
	public ResponseEntity<?> handleGlobalException(Exception ex, WebRequest request) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong"));
	}
}
