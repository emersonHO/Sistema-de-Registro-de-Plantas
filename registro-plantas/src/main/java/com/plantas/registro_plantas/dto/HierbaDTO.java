package com.plantas.registro_plantas.dto;

import lombok.Data;

@Data
public class HierbaDTO {
    private Long id;
    private String nombre;
    private String nombreCientifico;
    private String descripcion;
    private String propiedadesMedicinales;
    private String habitatNatural;
    private String formaUso;
    private String precauciones;
    private String categoria;
    private String origen;
    private String fechaRegistro;
    private Long usuarioId;
    private String nombreUsuario; // Para mostrar quién registró la hierba
}