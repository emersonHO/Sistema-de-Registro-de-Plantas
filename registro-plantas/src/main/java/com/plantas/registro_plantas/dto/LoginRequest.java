package com.plantas.registro_plantas.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}