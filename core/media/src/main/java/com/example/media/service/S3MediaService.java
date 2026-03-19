package com.example.media.service;

import com.example.media.dto.UploadUrlResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.time.Duration;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3MediaService {

    private final S3Presigner s3Presigner;

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    public UploadUrlResponse generateUploadUrl(String fileName, String contentType, String folder) {
        String safeFileName = fileName.replaceAll("[^a-zA-Z0-9.-]", "_");
        String objectKey = folder + "/" + UUID.randomUUID() + "-" + safeFileName;

        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(objectKey)
                .build();

        PutObjectPresignRequest presignRequest = PutObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(5))
                .putObjectRequest(objectRequest)
                .build();

        String presignedUrl = s3Presigner.presignPutObject(presignRequest).url().toString();

        String fileAccessUrl = String.format("https://%s.s3.eu-north-1.amazonaws.com/%s", bucketName, objectKey);

        return new UploadUrlResponse(presignedUrl, fileAccessUrl);
    }
}