package com.plantas.registro_plantas.dto;

import lombok.Data;

@Data
public class UsuarioDTO {
    private Long id;
    private String email;
    private String nombre;
    private String apellido;
    private String fechaRegistro;
    private boolean activo;
}