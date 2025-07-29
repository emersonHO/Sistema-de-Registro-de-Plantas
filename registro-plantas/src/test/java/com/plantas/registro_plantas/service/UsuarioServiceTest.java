package com.plantas.registro_plantas.service;

import com.plantas.registro_plantas.dto.LoginRequest;
import com.plantas.registro_plantas.dto.RegistroRequest;
import com.plantas.registro_plantas.dto.UsuarioDTO;
import com.plantas.registro_plantas.model.Usuario;
import com.plantas.registro_plantas.repository.UsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UsuarioServiceTest {
    
    @Mock
    private UsuarioRepository usuarioRepository;
    
    @InjectMocks
    private UsuarioService usuarioService;
    
    private Usuario usuarioTest;
    private RegistroRequest registroRequest;
    private LoginRequest loginRequest;
    
    @BeforeEach
    void setUp() {
        usuarioTest = new Usuario();
        usuarioTest.setId(1L);
        usuarioTest.setEmail("test@test.com");
        usuarioTest.setPassword("password123");
        usuarioTest.setNombre("Test");
        usuarioTest.setApellido("User");
        usuarioTest.setFechaRegistro(LocalDateTime.now());
        usuarioTest.setActivo(true);
        
        registroRequest = new RegistroRequest();
        registroRequest.setEmail("test@test.com");
        registroRequest.setPassword("password123");
        registroRequest.setNombre("Test");
        registroRequest.setApellido("User");
        
        loginRequest = new LoginRequest();
        loginRequest.setEmail("test@test.com");
        loginRequest.setPassword("password123");
    }
    
    @Test
    void registrarUsuario_UsuarioNuevo_DeberiaRegistrarExitosamente() {
        // Given
        when(usuarioRepository.existsByEmail(anyString())).thenReturn(Mono.just(false));
        when(usuarioRepository.save(any(Usuario.class))).thenReturn(Mono.just(usuarioTest));
        
        // When & Then
        StepVerifier.create(usuarioService.registrarUsuario(registroRequest))
                .expectNextMatches(dto -> 
                    dto.getEmail().equals("test@test.com") &&
                    dto.getNombre().equals("Test") &&
                    dto.getApellido().equals("User")
                )
                .verifyComplete();
    }
    
    @Test
    void registrarUsuario_EmailYaExiste_DeberiaFallar() {
        // Given
        when(usuarioRepository.existsByEmail(anyString())).thenReturn(Mono.just(true));
        
        // When & Then
        StepVerifier.create(usuarioService.registrarUsuario(registroRequest))
                .expectError(RuntimeException.class)
                .verify();
    }
    
    @Test
    void login_CredencialesCorrectas_DeberiaRetornarUsuario() {
        // Given
        when(usuarioRepository.findByEmail(anyString())).thenReturn(Mono.just(usuarioTest));
        
        // When & Then
        StepVerifier.create(usuarioService.login(loginRequest))
                .expectNextMatches(dto -> 
                    dto.getEmail().equals("test@test.com") &&
                    dto.getId().equals(1L)
                )
                .verifyComplete();
    }
    
    @Test
    void login_CredencialesIncorrectas_DeberiaFallar() {
        // Given
        loginRequest.setPassword("passwordIncorrecto");
        when(usuarioRepository.findByEmail(anyString())).thenReturn(Mono.just(usuarioTest));
        
        // When & Then
        StepVerifier.create(usuarioService.login(loginRequest))
                .expectError(RuntimeException.class)
                .verify();
    }
    
    @Test
    void loginSoloEmail_UsuarioExiste_DeberiaRetornarUsuario() {
        // Given
        when(usuarioRepository.findByEmail(anyString())).thenReturn(Mono.just(usuarioTest));
        
        // When & Then
        StepVerifier.create(usuarioService.loginSoloEmail("test@test.com"))
                .expectNextMatches(dto -> 
                    dto.getEmail().equals("test@test.com") &&
                    dto.isActivo()
                )
                .verifyComplete();
    }
}