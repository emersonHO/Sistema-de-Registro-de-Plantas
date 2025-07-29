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
@Table("usuarios")
public class Usuario {
    
    @Id
    private Long id;
    
    private String email;
    private String password;
    private String nombre;
    private String apellido;
    private LocalDateTime fechaRegistro;
    private boolean activo;
    
    public Usuario(String email, String password, String nombre, String apellido) {
        this.email = email;
        this.password = password;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaRegistro = LocalDateTime.now();
        this.activo = true;
    }
}