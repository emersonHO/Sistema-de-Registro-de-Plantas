package com.plantas.registro_plantas.service;

import org.springframework.stereotype.Service;

import com.plantas.registro_plantas.model.Hierba;
import com.plantas.registro_plantas.repository.HierbaRepository;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class HierbaService {

    private final HierbaRepository repo;

    public Flux<Hierba> listar() {
        return repo.findAll();
    }

    public Mono<Hierba> registrar(Hierba h) {
        return repo.save(h);
    }

    public Mono<Void> eliminar(Long id) {
        return repo.deleteById(id);
    }

    public Mono<Hierba> obtenerPorId(Long id) {
        return repo.findById(id);
    }
}
