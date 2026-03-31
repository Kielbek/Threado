package com.example.thread.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "author_cache")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthorCache {

    @Id
    private UUID id;
    private String name;
    private String username;
    private String avatarUrl;
    private boolean verified;
}