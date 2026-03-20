package com.example.gateway.client;

import com.example.gateway.dto.common.PageResponse;
import com.example.gateway.dto.thread.ThreadResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ThreadServiceClient {

    private final WebClient.Builder webClientBuilder;

    public Mono<PageResponse<ThreadResponse>> fetchTimeline(int page, int size, String authHeader) {
        return webClientBuilder.build().get()
                .uri("http://thread-service/api/threads/timeline?page={page}&size={size}", page, size)
                .header("Authorization", authHeader)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<PageResponse<ThreadResponse>>() {});
    }

    public Mono<PageResponse<ThreadResponse>> fetchByAuthor(String authorId, int page, int size, String authHeader) {
        return webClientBuilder.build().get()
                .uri("http://thread-service/api/threads/public/user/{authorId}?page={page}&size={size}", authorId, page, size)
                .header("Authorization", authHeader)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<PageResponse<ThreadResponse>>() {});
    }

    public Mono<List<ThreadResponse>> fetchBulk(List<UUID> ids, String authHeader) {
        return webClientBuilder.build().post()
                .uri("http://thread-service/api/threads/bulk")
                .header("Authorization", authHeader)
                .bodyValue(ids)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<ThreadResponse>>() {})
                .onErrorReturn(List.of());
    }
}