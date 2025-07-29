package com.plantas.registro_plantas.controller;

import com.plantas.registro_plantas.dto.LoginRequest;
import com.plantas.registro_plantas.dto.RegistroRequest;
import com.plantas.registro_plantas.dto.UsuarioDTO;
import com.plantas.registro_plantas.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@Slf4j
public class UsuarioController {
    
    private final UsuarioService usuarioService;
    
    @PostMapping("/registro")
    public Mono<ResponseEntity<UsuarioDTO>> registrarUsuario(@RequestBody RegistroRequest request) {
        log.info("Solicitud de registro para email: {}", request.getEmail());
        
        return usuarioService.registrarUsuario(request)
                .map(usuario -> ResponseEntity.ok(usuario))
                .onErrorReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).build());
    }
    
    @PostMapping("/login")
    public Mono<ResponseEntity<UsuarioDTO>> login(@RequestBody LoginRequest request) {
        log.info("Solicitud de login para email: {}", request.getEmail());
        
        return usuarioService.login(request)
                .map(usuario -> ResponseEntity.ok(usuario))
                .onErrorReturn(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }
    
    @PostMapping("/login-email")
    public Mono<ResponseEntity<UsuarioDTO>> loginSoloEmail(@RequestParam String email) {
        log.info("Solicitud de login rápido para email: {}", email);
        
        return usuarioService.loginSoloEmail(email)
                .map(usuario -> ResponseEntity.ok(usuario))
                .onErrorReturn(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
    
    @GetMapping("/test")
    public Mono<ResponseEntity<String>> test() {
        return Mono.just(ResponseEntity.ok("API de usuarios funcionando correctamente"));
    }
}