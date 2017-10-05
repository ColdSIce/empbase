package com.speechpro.empbase.empbase.controller.rest;

import com.speechpro.empbase.empbase.model.entities.Employee;
import com.speechpro.empbase.empbase.model.entities.Image;
import com.speechpro.empbase.empbase.model.entities.ImageType;
import com.speechpro.empbase.empbase.service.EmployeeService;
import com.speechpro.empbase.empbase.service.ImageService;
import com.speechpro.empbase.empbase.service.ImageTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class ImageController {
    @Autowired
    private ImageService imageService;

    @Autowired
    private ImageTypeService imageTypeService;

    @Autowired
    private EmployeeService employeeService;

    @RequestMapping(value = "/image/{id}", method = RequestMethod.GET)
    Image getImage(@PathVariable Long id){
        return imageService.getById(id);
    }

    @RequestMapping(value = "/image/{id}/source", method = RequestMethod.GET)
    byte[] getImageSource(@PathVariable Long id){
        return imageService.getById(id).getBinImage();
    }

    @RequestMapping(value = "/image/{empId}", headers = "content-type=multipart/*", method = RequestMethod.POST)
    ResponseEntity createImage(@PathVariable Long empId,
                               @RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) return new ResponseEntity(HttpStatus.BAD_REQUEST);
        byte[] bytes = file.getBytes();
        Image image = new Image();
        image.setBinImage(bytes);
        Employee employee = employeeService.getById(empId);
        if (employee == null) return new ResponseEntity(HttpStatus.NOT_FOUND);
        if (employee.getImageId() == null) {
            Image saved = imageService.create(image);
            employee.setImageId(saved.getId());
            employeeService.update(employee);
            return new ResponseEntity(HttpStatus.OK);
        } else {
            Image old = imageService.getById(employee.getImageId());
            Image saved = imageService.create(image);
            employee.setImageId(saved.getId());
            employeeService.update(employee);
            if (old != null) imageService.delete(old);
            return new ResponseEntity(HttpStatus.OK);
        }

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
