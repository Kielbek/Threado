package com.example.thread.mapper;

import com.example.thread.dto.response.*;
import com.example.thread.entity.AuthorCache;
import com.example.thread.entity.Hashtag;
import com.example.thread.entity.Thread;
import com.example.thread.entity.UrlEntity;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ThreadMapper {

    public ThreadResponse toResponse(Thread thread) {
        if (thread == null) return null;

        return new ThreadResponse(
                thread.getId(),
                thread.getText(),
                thread.getCreatedAt(),
                thread.getReplySettings(),
                thread.getLang(),
                mapPublicMetrics(thread),
                mapHashtags(thread.getHashtags()),
                mapUrls(thread.getUrls()),
                mapAuthor(thread.getAuthor())
        );
    }

    private PublicMetricsResponse mapPublicMetrics(Thread thread) {
        if (thread.getPublicMetrics() == null) {
            return new PublicMetricsResponse(0, 0, 0, 0, 0, 0);
        }
        var metrics = thread.getPublicMetrics();
        return new PublicMetricsResponse(
                metrics.getRetweetCount(),
                metrics.getReplyCount(),
                metrics.getLikeCount(),
                metrics.getQuoteCount(),
                metrics.getBookmarkCount(),
                metrics.getImpressionCount()
        );
    }

    private List<HashtagResponse> mapHashtags(List<Hashtag> hashtags) {
        if (hashtags == null) return Collections.emptyList();
        return hashtags.stream()
                .map(h -> new HashtagResponse(h.getStartIdx(), h.getEndIdx(), h.getTag()))
                .collect(Collectors.toList());
    }

    private List<UrlEntityResponse> mapUrls(List<UrlEntity> urls) {
        if (urls == null) return Collections.emptyList();
        return urls.stream()
                .map(u -> new UrlEntityResponse(
                        u.getStartIdx(),
                        u.getEndIdx(),
                        u.getUrl(),
                        u.getExpandedUrl(),
                        u.getDisplayUrl()
                ))
                .collect(Collectors.toList());
    }

    private UserResponse mapAuthor(AuthorCache author) {
        if (author == null) {
            return new UserResponse("", "Guest", "unknown", false);
        }
        return new UserResponse(
                author.getId(),
                author.getName(),
                author.getUsername(),
                author.isVerified()
        );
    }
}