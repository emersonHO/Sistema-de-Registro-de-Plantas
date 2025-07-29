package com.plantas.registro_plantas.dto;

import lombok.Data;

@Data
public class RegistroRequest {
    private String email;
    private String password;
    private String nombre;
    private String apellido;
}