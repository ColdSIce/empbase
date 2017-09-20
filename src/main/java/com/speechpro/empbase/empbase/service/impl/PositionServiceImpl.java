package com.speechpro.empbase.empbase.service.impl;

import com.speechpro.empbase.empbase.model.entities.Position;
import com.speechpro.empbase.empbase.repository.PositionRepository;
import com.speechpro.empbase.empbase.service.PositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PositionServiceImpl implements PositionService{

    @Autowired
    private PositionRepository positionRepository;

    @Override
    public List<Position> getAll() {
        return positionRepository.findAll();
    }

    @Override
    public Position getById(Long id) {
        return positionRepository.findOne(id);
    }

    @Override
    public Position create(Position position) {
        return positionRepository.save(position);
    }

    @Override
    public Position update(Position position) {
        return positionRepository.save(position);
    }

    @Override
    public void delete(Position position) {
        positionRepository.delete(position);
    }

    @Override
    public Position getByName(String positionName) {
        return positionRepository.findOneByPosition(positionName);
    }
}
