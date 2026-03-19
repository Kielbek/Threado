package com.example.thread.service;

import com.example.thread.dto.request.CreateThreadRequest;
import com.example.thread.dto.response.PageResponse;
import com.example.thread.dto.response.ThreadResponse;

public interface ThreadService {

    ThreadResponse createThread(CreateThreadRequest request, String authorId);

    ThreadResponse getThreadById(String threadId);

    void deleteThread(String threadId, String authorId);

    PageResponse<ThreadResponse> getGlobalTimeline(int page, int size);

    PageResponse<ThreadResponse> getThreadsByAuthor(String authorId, int page, int size);

    void likeThread(String threadId, String userId);

    void unlikeThread(String threadId, String userId);
}