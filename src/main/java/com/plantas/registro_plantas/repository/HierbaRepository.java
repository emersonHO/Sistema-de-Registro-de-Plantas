package com.plantas.registro_plantas.repository;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;

import com.plantas.registro_plantas.model.Hierba;

public interface HierbaRepository extends ReactiveCrudRepository<Hierba, Long> {
}
