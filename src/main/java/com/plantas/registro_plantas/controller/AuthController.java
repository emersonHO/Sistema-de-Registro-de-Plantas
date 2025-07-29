package com.plantas.registro_plantas.controller;

import com.plantas.registro_plantas.model.Usuario;
import com.plantas.registro_plantas.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        Usuario usuario = usuarioService.findByEmail(email).orElse(null);
        Map<String, String> response = new HashMap<>();
        if (usuario != null && usuario.getPassword().equals(password)) {
            // Token simulado, en producción usar JWT
            response.put("token", "fake-jwt-token-" + usuario.getId());
            return response;
        } else {
            throw new RuntimeException("Credenciales inválidas");
        }
    }
}