package com.example.thread.controller;

import com.example.thread.dto.request.CreateThreadRequest;
import com.example.thread.dto.response.PageResponse;
import com.example.thread.dto.response.ThreadResponse;
import com.example.thread.service.ThreadService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/threads")
@RequiredArgsConstructor
@Tag(name = "Thread Management", description = "Endpoints for creating and managing micro-blogging posts")
public class ThreadController {

    private final ThreadService threadService;

    @Operation(
            summary = "Create a new thread",
            description = "Analyzes content for hashtags/URLs, detects language, and persists a new thread."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "Thread created successfully",
                    content = @Content(schema = @Schema(implementation = ThreadResponse.class))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Invalid input data or validation failed"
            ),
            @ApiResponse(
                    responseCode = "503",
                    description = "Author cache not synchronized yet"
            )
    })
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<ThreadResponse> createThread(
            @Valid @RequestBody CreateThreadRequest request,
            Principal principal
    ) {
        String currentUserId = principal.getName();

        ThreadResponse response = threadService.createThread(request, currentUserId);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @Operation(
            summary = "Get global timeline",
            description = "Retrieves a paginated list of all threads, sorted by the most recent."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Successfully retrieved timeline",
                    content = @Content(schema = @Schema(implementation = PageResponse.class))
            )
    })
    @GetMapping("/timeline")
    public ResponseEntity<PageResponse<ThreadResponse>> getGlobalTimeline(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        PageResponse<ThreadResponse> response = threadService.getGlobalTimeline(page, size);
        return ResponseEntity.ok(response);
    }
}
