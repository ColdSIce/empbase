package com.speechpro.empbase.empbase.service;

import com.speechpro.empbase.empbase.model.entities.Position;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PositionService {
    List<Position> getAll();
    Position getById(Long id);
    Position create(Position position);
    Position update(Position position);
    void delete(Position position);

    Position getByName(String positionName);
}
