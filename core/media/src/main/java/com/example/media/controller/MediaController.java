package com.example.media.controller;

import com.example.media.dto.UploadUrlResponse;
import com.example.media.service.S3MediaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/media")
@RequiredArgsConstructor
public class MediaController {

    private final S3MediaService s3MediaService;

    @GetMapping("/upload-url")
    public ResponseEntity<UploadUrlResponse> getUploadUrl(
            @RequestParam String fileName,
            @RequestParam String contentType,
            @RequestParam(defaultValue = "threads") String folder
    ) {
        if (!folder.equals("threads") && !folder.equals("avatars")) {
            return ResponseEntity.badRequest().build();
        }

        UploadUrlResponse response = s3MediaService.generateUploadUrl(fileName, contentType, folder);

        return ResponseEntity.ok(response);
    }
}
