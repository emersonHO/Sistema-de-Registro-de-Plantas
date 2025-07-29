package com.plantas.registro_plantas.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.plantas.registro_plantas.model.Hierba;
import com.plantas.registro_plantas.service.HierbaService;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


@RestController
@RequestMapping("/api/hierbas")
@RequiredArgsConstructor
public class HierbaController {
    
    private final HierbaService service;


    @GetMapping
    public Flux<Hierba> listar() {
        return service.listar();
    }

    @PostMapping
    public Mono<Hierba> registrar(@RequestBody Hierba hierba) {
        return service.registrar(hierba);
    }

    @GetMapping("/{id}")
    public Mono<Hierba> buscar(@PathVariable Long id) {
        return service.obtenerPorId(id);
    }

    @DeleteMapping("/{id}")
    public Mono<Void> eliminar(@PathVariable Long id) {
        return service.eliminar(id);
    }
}
