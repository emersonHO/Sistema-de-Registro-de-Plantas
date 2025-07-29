package com.plantas.registro_plantas.service;

import com.plantas.registro_plantas.dto.LoginRequest;
import com.plantas.registro_plantas.dto.RegistroRequest;
import com.plantas.registro_plantas.dto.UsuarioDTO;
import com.plantas.registro_plantas.model.Usuario;
import com.plantas.registro_plantas.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
@Slf4j
public class UsuarioService {
    
    private final UsuarioRepository usuarioRepository;
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    
    public Mono<UsuarioDTO> registrarUsuario(RegistroRequest request) {
        log.info("Registrando usuario con email: {}", request.getEmail());
        
        return usuarioRepository.existsByEmail(request.getEmail())
                .flatMap(exists -> {
                    if (exists) {
                        return Mono.error(new RuntimeException("El email ya está registrado"));
                    }
                    
                    Usuario usuario = new Usuario(
                            request.getEmail(),
                            request.getPassword(), // En producción debería estar hasheada
                            request.getNombre(),
                            request.getApellido()
                    );
                    
                    return usuarioRepository.save(usuario);
                })
                .map(this::convertirAUsuarioDTO);
    }
    
    public Mono<UsuarioDTO> login(LoginRequest request) {
        log.info("Intentando login para email: {}", request.getEmail());
        
        return usuarioRepository.findByEmail(request.getEmail())
                .filter(usuario -> usuario.getPassword().equals(request.getPassword()))
                .filter(Usuario::isActivo)
                .map(this::convertirAUsuarioDTO)
                .switchIfEmpty(Mono.error(new RuntimeException("Credenciales inválidas")));
    }
    
    public Mono<UsuarioDTO> loginSoloEmail(String email) {
        log.info("Login rápido para email: {}", email);
        
        return usuarioRepository.findByEmail(email)
                .filter(Usuario::isActivo)
                .map(this::convertirAUsuarioDTO)
                .switchIfEmpty(Mono.error(new RuntimeException("Usuario no encontrado")));
    }
    
    public Mono<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }
    
    private UsuarioDTO convertirAUsuarioDTO(Usuario usuario) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(usuario.getId());
        dto.setEmail(usuario.getEmail());
        dto.setNombre(usuario.getNombre());
        dto.setApellido(usuario.getApellido());
        dto.setFechaRegistro(usuario.getFechaRegistro().format(formatter));
        dto.setActivo(usuario.isActivo());
        return dto;
    }
}