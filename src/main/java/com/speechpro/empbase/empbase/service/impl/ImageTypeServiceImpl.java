package com.speechpro.empbase.empbase.service.impl;

import com.speechpro.empbase.empbase.model.entities.ImageType;
import com.speechpro.empbase.empbase.repository.ImageTypeRepository;
import com.speechpro.empbase.empbase.service.ImageTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ImageTypeServiceImpl implements ImageTypeService{

    @Autowired
    private ImageTypeRepository imageTypeRepository;

    @Override
    public List<ImageType> getAll() {
        return imageTypeRepository.findAll();
    }

    @Override
    public ImageType getById(Long id) {
        return imageTypeRepository.findOne(id);
    }

    @Override
    public ImageType create(ImageType imageType) {
        return imageTypeRepository.save(imageType);
    }

    @Override
    public ImageType update(ImageType imageType) {
        return imageTypeRepository.save(imageType);
    }

    @Override
    public void delete(ImageType imageType) {
        imageTypeRepository.delete(imageType);
    }
}
