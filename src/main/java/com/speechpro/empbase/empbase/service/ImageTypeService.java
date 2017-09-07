package com.speechpro.empbase.empbase.service;

import com.speechpro.empbase.empbase.model.entities.ImageType;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ImageTypeService {
    List<ImageType> getAll();
    ImageType getById(Long id);
    ImageType create(ImageType imageType);
    ImageType update(ImageType imageType);
    void delete(ImageType imageType);
}
