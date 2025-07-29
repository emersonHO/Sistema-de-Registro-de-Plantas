package com.plantas.registro_plantas.service;

import com.plantas.registro_plantas.dto.HierbaDTO;
import com.plantas.registro_plantas.model.Hierba;
import com.plantas.registro_plantas.repository.HierbaRepository;
import com.plantas.registro_plantas.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
@Slf4j
public class HierbaService {
    
    private final HierbaRepository hierbaRepository;
    private final UsuarioRepository usuarioRepository;
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    
    public Mono<HierbaDTO> registrarHierba(HierbaDTO hierbaDTO) {
        log.info("Registrando hierba: {}", hierbaDTO.getNombre());
        
        Hierba hierba = new Hierba(
                hierbaDTO.getNombre(),
                hierbaDTO.getNombreCientifico(),
                hierbaDTO.getDescripcion(),
                hierbaDTO.getPropiedadesMedicinales(),
                hierbaDTO.getHabitatNatural(),
                hierbaDTO.getFormaUso(),
                hierbaDTO.getPrecauciones(),
                hierbaDTO.getCategoria(),
                hierbaDTO.getOrigen(),
                hierbaDTO.getUsuarioId()
        );
        
        return hierbaRepository.save(hierba)
                .flatMap(this::convertirAHierbaDTO);
    }
    
    public Flux<HierbaDTO> listarTodasLasHierbas() {
        log.info("Listando todas las hierbas");
        
        return hierbaRepository.findAll()
                .flatMap(this::convertirAHierbaDTO);
    }
    
    public Flux<HierbaDTO> listarHierbasPorUsuario(Long usuarioId) {
        log.info("Listando hierbas del usuario: {}", usuarioId);
        
        return hierbaRepository.findByUsuarioId(usuarioId)
                .flatMap(this::convertirAHierbaDTO);
    }
    
    public Flux<HierbaDTO> buscarHierbasPorNombre(String nombre) {
        log.info("Buscando hierbas con nombre: {}", nombre);
        
        return hierbaRepository.findByNombreContainingIgnoreCase(nombre)
                .flatMap(this::convertirAHierbaDTO);
    }
    
    public Flux<HierbaDTO> buscarHierbasPorCategoria(String categoria) {
        log.info("Buscando hierbas de categoría: {}", categoria);
        
        return hierbaRepository.findByCategoria(categoria)
                .flatMap(this::convertirAHierbaDTO);
    }
    
    public Mono<HierbaDTO> buscarHierbaPorId(Long id) {
        return hierbaRepository.findById(id)
                .flatMap(this::convertirAHierbaDTO);
    }
    
    public Mono<Void> eliminarHierba(Long id) {
        log.info("Eliminando hierba con ID: {}", id);
        return hierbaRepository.deleteById(id);
    }
    
    private Mono<HierbaDTO> convertirAHierbaDTO(Hierba hierba) {
        return usuarioRepository.findById(hierba.getUsuarioId())
                .map(usuario -> {
                    HierbaDTO dto = new HierbaDTO();
                    dto.setId(hierba.getId());
                    dto.setNombre(hierba.getNombre());
                    dto.setNombreCientifico(hierba.getNombreCientifico());
                    dto.setDescripcion(hierba.getDescripcion());
                    dto.setPropiedadesMedicinales(hierba.getPropiedadesMedicinales());
                    dto.setHabitatNatural(hierba.getHabitatNatural());
                    dto.setFormaUso(hierba.getFormaUso());
                    dto.setPrecauciones(hierba.getPrecauciones());
                    dto.setCategoria(hierba.getCategoria());
                    dto.setOrigen(hierba.getOrigen());
                    dto.setFechaRegistro(hierba.getFechaRegistro().format(formatter));
                    dto.setUsuarioId(hierba.getUsuarioId());
                    dto.setNombreUsuario(usuario.getNombre() + " " + usuario.getApellido());
                    return dto;
                })
                .defaultIfEmpty(createBasicHierbaDTO(hierba));
    }
    
    private HierbaDTO createBasicHierbaDTO(Hierba hierba) {
        HierbaDTO dto = new HierbaDTO();
        dto.setId(hierba.getId());
        dto.setNombre(hierba.getNombre());
        dto.setNombreCientifico(hierba.getNombreCientifico());
        dto.setDescripcion(hierba.getDescripcion());
        dto.setPropiedadesMedicinales(hierba.getPropiedadesMedicinales());
        dto.setHabitatNatural(hierba.getHabitatNatural());
        dto.setFormaUso(hierba.getFormaUso());
        dto.setPrecauciones(hierba.getPrecauciones());
        dto.setCategoria(hierba.getCategoria());
        dto.setOrigen(hierba.getOrigen());
        dto.setFechaRegistro(hierba.getFechaRegistro().format(formatter));
        dto.setUsuarioId(hierba.getUsuarioId());
        dto.setNombreUsuario("Usuario no encontrado");
        return dto;
    }
}