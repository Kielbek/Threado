package com.example.thread.service;

import com.example.thread.dto.request.CreateThreadRequest;
import com.example.thread.dto.response.PageResponse;
import com.example.thread.dto.response.ThreadResponse;

import java.util.List;
import java.util.UUID;

public interface ThreadService {

    ThreadResponse createThread(CreateThreadRequest request, UUID authorId);

    ThreadResponse getThreadById(String threadId);

    void deleteThread(String threadId, String authorId);

    PageResponse<ThreadResponse> getGlobalTimeline(int page, int size);

    PageResponse<ThreadResponse> getThreadsByAuthor(UUID authorId, int page, int size);

    List<ThreadResponse> getThreadsByIds(List<UUID> threadIds);

    void likeThread(String threadId, String userId);

    void unlikeThread(String threadId, String userId);
}