package com.example.thread.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;

public record CreateThreadRequest(

        @NotBlank(message = "Content cannot be empty")
        @Size(max = 3000, message = "Content must be at most 280 characters")
        String content,

        @Size(max = 1, message = "You can attach up to 1 media items")
        List<String> mediaUrls
) {}
