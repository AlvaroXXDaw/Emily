package com.alvar.emily.common.error;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiErrorResponse> handleValidation(
      MethodArgumentNotValidException ex,
      HttpServletRequest request
  ) {
    List<String> details = ex.getBindingResult().getFieldErrors().stream()
        .map(this::formatFieldError)
        .collect(Collectors.toList());

    ApiErrorResponse body = ApiErrorResponse.builder()
        .timestamp(LocalDateTime.now())
        .status(HttpStatus.BAD_REQUEST.value())
        .error(HttpStatus.BAD_REQUEST.getReasonPhrase())
        .message("Validation failed")
        .path(request.getRequestURI())
        .details(details)
        .build();

    return ResponseEntity.badRequest().body(body);
  }

  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<ApiErrorResponse> handleConstraint(
      ConstraintViolationException ex,
      HttpServletRequest request
  ) {
    List<String> details = ex.getConstraintViolations().stream()
        .map(v -> v.getPropertyPath() + ": " + v.getMessage())
        .collect(Collectors.toList());

    ApiErrorResponse body = ApiErrorResponse.builder()
        .timestamp(LocalDateTime.now())
        .status(HttpStatus.BAD_REQUEST.value())
        .error(HttpStatus.BAD_REQUEST.getReasonPhrase())
        .message("Constraint violation")
        .path(request.getRequestURI())
        .details(details)
        .build();

    return ResponseEntity.badRequest().body(body);
  }

  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<ApiErrorResponse> handleNotFound(
      ResourceNotFoundException ex,
      HttpServletRequest request
  ) {
    ApiErrorResponse body = ApiErrorResponse.builder()
        .timestamp(LocalDateTime.now())
        .status(HttpStatus.NOT_FOUND.value())
        .error(HttpStatus.NOT_FOUND.getReasonPhrase())
        .message(ex.getMessage())
        .path(request.getRequestURI())
        .details(List.of())
        .build();

    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
  }

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<ApiErrorResponse> handleIllegalArgument(
      IllegalArgumentException ex,
      HttpServletRequest request
  ) {
    ApiErrorResponse body = ApiErrorResponse.builder()
        .timestamp(LocalDateTime.now())
        .status(HttpStatus.BAD_REQUEST.value())
        .error(HttpStatus.BAD_REQUEST.getReasonPhrase())
        .message(ex.getMessage())
        .path(request.getRequestURI())
        .details(List.of())
        .build();

    return ResponseEntity.badRequest().body(body);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiErrorResponse> handleGeneric(
      Exception ex,
      HttpServletRequest request
  ) {
    ApiErrorResponse body = ApiErrorResponse.builder()
        .timestamp(LocalDateTime.now())
        .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
        .error(HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase())
        .message("Unexpected error")
        .path(request.getRequestURI())
        .details(List.of(ex.getMessage()))
        .build();

    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(body);
  }

  private String formatFieldError(FieldError error) {
    return error.getField() + ": " + error.getDefaultMessage();
  }
}

