package com.plantas.registro_plantas.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table("hierbas")
public class Hierba {
    
    @Id
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
    private LocalDateTime fechaRegistro;
    private Long usuarioId; // ID del usuario que registró la hierba
    
    public Hierba(String nombre, String nombreCientifico, String descripcion, 
                  String propiedadesMedicinales, String habitatNatural, 
                  String formaUso, String precauciones, String categoria, 
                  String origen, Long usuarioId) {
        this.nombre = nombre;
        this.nombreCientifico = nombreCientifico;
        this.descripcion = descripcion;
        this.propiedadesMedicinales = propiedadesMedicinales;
        this.habitatNatural = habitatNatural;
        this.formaUso = formaUso;
        this.precauciones = precauciones;
        this.categoria = categoria;
        this.origen = origen;
        this.usuarioId = usuarioId;
        this.fechaRegistro = LocalDateTime.now();
    }
}