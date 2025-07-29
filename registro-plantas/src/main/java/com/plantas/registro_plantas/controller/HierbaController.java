package com.plantas.registro_plantas.controller;

import com.plantas.registro_plantas.dto.HierbaDTO;
import com.plantas.registro_plantas.service.HierbaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/hierbas")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@Slf4j
public class HierbaController {
    
    private final HierbaService hierbaService;
    
    @PostMapping
    public Mono<ResponseEntity<HierbaDTO>> registrarHierba(@RequestBody HierbaDTO hierbaDTO) {
        log.info("Solicitud de registro de hierba: {}", hierbaDTO.getNombre());
        
        return hierbaService.registrarHierba(hierbaDTO)
                .map(hierba -> ResponseEntity.status(HttpStatus.CREATED).body(hierba))
                .onErrorReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).build());
    }
    
    @GetMapping
    public Flux<HierbaDTO> listarTodasLasHierbas() {
        log.info("Solicitud de listado de todas las hierbas");
        return hierbaService.listarTodasLasHierbas();
    }
    
    @GetMapping("/usuario/{usuarioId}")
    public Flux<HierbaDTO> listarHierbasPorUsuario(@PathVariable Long usuarioId) {
        log.info("Solicitud de listado de hierbas del usuario: {}", usuarioId);
        return hierbaService.listarHierbasPorUsuario(usuarioId);
    }
    
    @GetMapping("/buscar")
    public Flux<HierbaDTO> buscarHierbasPorNombre(@RequestParam String nombre) {
        log.info("Búsqueda de hierbas con nombre: {}", nombre);
        return hierbaService.buscarHierbasPorNombre(nombre);
    }
    
    @GetMapping("/categoria/{categoria}")
    public Flux<HierbaDTO> buscarHierbasPorCategoria(@PathVariable String categoria) {
        log.info("Búsqueda de hierbas por categoría: {}", categoria);
        return hierbaService.buscarHierbasPorCategoria(categoria);
    }
    
    @GetMapping("/{id}")
    public Mono<ResponseEntity<HierbaDTO>> buscarHierbaPorId(@PathVariable Long id) {
        return hierbaService.buscarHierbaPorId(id)
                .map(hierba -> ResponseEntity.ok(hierba))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> eliminarHierba(@PathVariable Long id) {
        log.info("Solicitud de eliminación de hierba con ID: {}", id);
        
        return hierbaService.eliminarHierba(id)
                .then(Mono.just(ResponseEntity.noContent().<Void>build()))
                .onErrorReturn(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }
    
    @GetMapping("/test")
    public Mono<ResponseEntity<String>> test() {
        return Mono.just(ResponseEntity.ok("API de hierbas funcionando correctamente"));
    }
}