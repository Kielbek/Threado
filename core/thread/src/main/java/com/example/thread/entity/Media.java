package com.example.thread.entity;

import com.example.thread.enusm.MediaType;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

@Embeddable
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Media {
    private String url;

    @Enumerated(EnumType.STRING)
    private MediaType type;

    private Integer width;
    private Integer height;
    private String altText;
}