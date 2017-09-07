package com.speechpro.empbase.empbase.service;

import com.speechpro.empbase.empbase.model.entities.Image;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ImageService {
    List<Image> getAll();
    Image getById(Long id);
    Image create(Image image);
    Image update(Image image);
    void delete(Image image);
}
