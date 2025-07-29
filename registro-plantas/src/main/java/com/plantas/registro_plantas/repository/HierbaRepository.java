package com.plantas.registro_plantas.repository;

import com.plantas.registro_plantas.model.Hierba;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface HierbaRepository extends ReactiveCrudRepository<Hierba, Long> {
    Flux<Hierba> findByUsuarioId(Long usuarioId);
    Flux<Hierba> findByNombreContainingIgnoreCase(String nombre);
    Flux<Hierba> findByCategoria(String categoria);
}