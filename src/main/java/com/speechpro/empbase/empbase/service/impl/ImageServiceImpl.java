package com.speechpro.empbase.empbase.service.impl;

import com.speechpro.empbase.empbase.model.entities.Image;
import com.speechpro.empbase.empbase.repository.ImageRepository;
import com.speechpro.empbase.empbase.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ImageServiceImpl implements ImageService{

    @Autowired
    private ImageRepository imageRepository;

    @Override
    public List<Image> getAll() {
        return imageRepository.findAll();
    }

    @Override
    public Image getById(Long id) {
        return imageRepository.findOne(id);
    }

    @Override
    public Image create(Image image) {
        return imageRepository.save(image);
    }

    @Override
    public Image update(Image image) {
        return imageRepository.save(image);
    }

    @Override
    public void delete(Image image) {
        imageRepository.delete(image);
    }
}
