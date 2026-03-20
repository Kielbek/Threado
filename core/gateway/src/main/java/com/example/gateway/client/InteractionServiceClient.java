package com.example.gateway.client;

import com.example.gateway.dto.interaction.InteractionStatusResponse;
import com.example.gateway.dto.common.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class InteractionServiceClient {

    private final WebClient.Builder webClientBuilder;

    public Mono<PageResponse<UUID>> fetchBookmarks(int page, int size, String authHeader) {
        return webClientBuilder.build().get()
                .uri("http://interactions-service/api/interactions/bookmarks?page={page}&size={size}", page, size)
                .header("Authorization", authHeader)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<PageResponse<UUID>>() {});
    }

    public Mono<List<InteractionStatusResponse>> fetchStatuses(List<UUID> ids, String authHeader) {
        String idsParam = ids.stream().map(UUID::toString).collect(Collectors.joining(","));
        return webClientBuilder.build().get()
                .uri("http://interactions-service/api/interactions/status?threadIds={ids}", idsParam)
                .header("Authorization", authHeader)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<InteractionStatusResponse>>() {})
                .onErrorReturn(List.of()); // Fail-safe
    }
}
