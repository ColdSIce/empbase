package com.speechpro.empbase.empbase.controller.rest;

import com.speechpro.empbase.empbase.model.entities.Image;
import com.speechpro.empbase.empbase.model.entities.ImageType;
import com.speechpro.empbase.empbase.service.ImageService;
import com.speechpro.empbase.empbase.service.ImageTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ImageController {
    @Autowired
    private ImageService imageService;

    @Autowired
    private ImageTypeService imageTypeService;

    @RequestMapping(value = "/image/{id}", method = RequestMethod.GET)
    Image getImage(@PathVariable Long id){
        return imageService.getById(id);
    }

    @RequestMapping(value = "/image", method = RequestMethod.POST)
    Image createImage(@RequestBody Image image){
        return imageService.create(image);
    }

    @RequestMapping(value = "/image", method = RequestMethod.PUT)
    Image updateImage(@RequestBody Image image){
        return imageService.update(image);
    }

    @RequestMapping(value = "/image/{id}", method = RequestMethod.DELETE)
    ResponseEntity<Image> deleteImage(@PathVariable Long id){
        Image image = imageService.getById(id);
        if(image != null){
            imageService.delete(image);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);//204
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/image_type/{id}", method = RequestMethod.GET)
    ImageType getImageType(@PathVariable Long id){
        return imageTypeService.getById(id);
    }

    @RequestMapping(value = "/image_type", method = RequestMethod.POST)
    ImageType createImageType(@RequestBody ImageType imageType){
        return imageTypeService.create(imageType);
    }

    @RequestMapping(value = "/image_type", method = RequestMethod.PUT)
    ImageType updateImageType(@RequestBody ImageType imageType){
        return imageTypeService.update(imageType);
    }

    @RequestMapping(value = "/image_type/{id}", method = RequestMethod.DELETE)
    ResponseEntity<ImageType> deleteImageType(@PathVariable Long id){
        ImageType imageType = imageTypeService.getById(id);
        if(imageType != null){
            imageTypeService.delete(imageType);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);//204
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
