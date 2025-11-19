package com.example.BriGaDo.profiles.user.model;

import com.example.BriGaDo.profiles.BaseProfile;

import java.time.LocalDate;

public class User extends BaseProfile {

    private Long id;
    private String phoneNumber;
    private String sex;
    private LocalDate birthday;
    private String linkedinLink;
    private String cvFilePath;

    public User() {
        super();
    }

    public User(String firstName,
                String lastName,
                String username,
                String passwordHash,
                String phoneNumber,
                String sex,
                LocalDate birthday,
                String linkedinLink,
                String cvFilePath) {

        super(firstName, lastName, username, passwordHash);
        this.phoneNumber = phoneNumber;
        this.sex = sex;
        this.birthday = birthday;
        this.linkedinLink = linkedinLink;
        this.cvFilePath = cvFilePath;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public String getLinkedinLink() {
        return linkedinLink;
    }

    public void setLinkedinLink(String linkedinLink) {
        this.linkedinLink = linkedinLink;
    }

    public String getCvFilePath() {
        return cvFilePath;
    }

    public void setCvFilePath(String cvFilePath) {
        this.cvFilePath = cvFilePath;
    }
}
