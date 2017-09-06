package com.speechpro.empbase.empbase.model.entities;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;

@Entity
public class Image {

    public Image() {
    }

    public Image(byte[] binImage) {
        this.binImage = binImage;
    }

    @Id
    @GeneratedValue
    private Long id;

    @Column
    private byte[] binImage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "typeId")
    @Fetch(FetchMode.JOIN)
    private ImageType imageType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getBinImage() {
        return binImage;
    }

    public void setBinImage(byte[] binImage) {
        this.binImage = binImage;
    }

    public ImageType getImageType() {
        return imageType;
    }

    public void setImageType(ImageType imageType) {
        this.imageType = imageType;
    }
}
