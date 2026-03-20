package com.example.thread.service.impl;

import com.example.thread.dto.request.CreateThreadRequest;
import com.example.thread.dto.request.MediaRequest;
import com.example.thread.dto.response.PageResponse;
import com.example.thread.dto.response.ThreadResponse;
import com.example.thread.entity.*;
import com.example.thread.entity.Thread;
import com.example.thread.enusm.MediaType;
import com.example.thread.exeption.BusinessException;
import com.example.thread.exeption.ErrorCode;
import com.example.thread.mapper.ThreadMapper;
import com.example.thread.repository.AuthorCacheRepository;
import com.example.thread.repository.ThreadRepository;
import com.example.thread.service.ThreadService;
import com.example.thread.util.ThreadLanguageDetector;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
@Slf4j
public class ThreadServiceImpl implements ThreadService {

    private final ThreadRepository threadRepository;
    private final AuthorCacheRepository authorCacheRepository;
    private final ThreadMapper threadMapper;
    private final ThreadLanguageDetector languageDetector;

    @Override
    public ThreadResponse createThread(CreateThreadRequest request, UUID authorId) {
        log.info("Initiating creation of a new thread for authorId: {}", authorId);

        List<Hashtag> hashtags = extractHashtags(request.content());
        List<UrlEntity> urls = extractUrls(request.content());
        String lang = languageDetector.detectLanguage(request.content());

        log.debug("Extracted {} hashtags and {} URLs. Detected language: {}",
                hashtags.size(), urls.size(), lang);

        AuthorCache author = authorCacheRepository.findById(authorId)
                .orElseThrow(() -> {
                    log.error("Failed to create thread: Author cache miss for ID {}", authorId);
                    return new BusinessException(
                            ErrorCode.AUTHOR_NOT_FOUND_IN_CACHE,
                            "Author cache miss for ID: " + authorId
                    );
                });

        List<Media> mediaEntities = mapMediaRequestToEntity(request.media());

        Thread thread = Thread.builder()
                .text(request.content())
                .createdAt(Instant.now())
                .replySettings("everyone")
                .lang(lang)
                .publicMetrics(new PublicMetrics(0, 0, 0, 0, 0, 0))
                .author(author)
                .hashtags(hashtags)
                .urls(urls)
                .media(mediaEntities)
                .build();

        Thread savedThread = threadRepository.save(thread);
        log.info("Successfully created and saved thread with ID: {}", savedThread.getId());

        //TODO Powiadomienie innych serwisów przez Kafkę
        log.debug("TODO: Kafka event to be emitted for new thread ID: {}", savedThread.getId());

        return threadMapper.toResponse(savedThread);
    }

    @Override
    public ThreadResponse getThreadById(String threadId) {
        return null;
    }

    @Override
    public void deleteThread(String threadId, String authorId) {

    }

    @Override
    public PageResponse<ThreadResponse> getGlobalTimeline(int page, int size) {
        log.debug("Fetching global timeline: page {}, size {}", page, size);

        Pageable pageable = PageRequest.of(page, size);
        Page<Thread> threadPage = threadRepository.findAllByOrderByCreatedAtDesc(pageable);

        log.info("Retrieved {} threads for global timeline (page {})", threadPage.getNumberOfElements(), page);

        List<ThreadResponse> content = threadPage.getContent().stream()
                .map(threadMapper::toResponse)
                .toList();

        return PageResponse.<ThreadResponse>builder()
                .content(content)
                .pageNumber(threadPage.getNumber())
                .pageSize(threadPage.getSize())
                .totalElements(threadPage.getTotalElements())
                .totalPages(threadPage.getTotalPages())
                .isLast(threadPage.isLast())
                .build();
    }

    @Override
    public PageResponse<ThreadResponse> getThreadsByAuthor(UUID authorId, int page, int size) {
        log.debug("Fetching threads for authorId {}: page {}, size {}", authorId, page, size);

        Pageable pageable = PageRequest.of(page, size);
        Page<Thread> threadPage = threadRepository.findAllByAuthor_IdOrderByCreatedAtDesc(authorId, pageable);

        log.info("Retrieved {} threads for authorId {} (page {})", threadPage.getNumberOfElements(), authorId, page);

        List<ThreadResponse> content = threadPage.getContent().stream()
                .map(threadMapper::toResponse)
                .toList();

        return PageResponse.<ThreadResponse>builder()
                .content(content)
                .pageNumber(threadPage.getNumber())
                .pageSize(threadPage.getSize())
                .totalElements(threadPage.getTotalElements())
                .totalPages(threadPage.getTotalPages())
                .isLast(threadPage.isLast())
                .build();
    }

    @Override
    public List<ThreadResponse> getThreadsByIds(List<UUID> threadIds) {
        if (threadIds == null || threadIds.isEmpty()) {
            log.warn("getThreadsByIds called with an empty or null list of IDs");
            return List.of();
        }

        log.debug("Fetching bulk threads from DB for {} IDs: {}", threadIds.size(), threadIds);

        List<Thread> foundThreads = threadRepository.findAllById(threadIds);

        if (foundThreads.size() != threadIds.size()) {
            log.warn("Bulk fetch mismatch: requested {} threads, but found only {} in DB",
                    threadIds.size(), foundThreads.size());
        } else {
            log.info("Successfully fetched all {} requested threads in bulk", foundThreads.size());
        }

        return foundThreads.stream()
                .map(threadMapper::toResponse)
                .toList();
    }

    @Override
    public void likeThread(String threadId, String userId) {}

    @Override
    public void unlikeThread(String threadId, String userId) {}


    private List<Hashtag> extractHashtags(String text) {
        if (text == null || text.isBlank()) return List.of();

        List<Hashtag> hashtags = new ArrayList<>();
        Pattern pattern = Pattern.compile("#(\\w+)");
        Matcher matcher = pattern.matcher(text);

        while (matcher.find()) {
            hashtags.add(new Hashtag(matcher.start(), matcher.end(), matcher.group(1).toLowerCase()));
        }
        return hashtags;
    }

    private List<UrlEntity> extractUrls(String text) {
        if (text == null || text.isBlank()) return List.of();

        List<UrlEntity> urls = new ArrayList<>();
        Pattern pattern = Pattern.compile("https?://\\S+");
        Matcher matcher = pattern.matcher(text);

        while (matcher.find()) {
            String rawUrl = matcher.group();
            UrlEntity urlEntity = new UrlEntity();
            urlEntity.setStartIdx(matcher.start());
            urlEntity.setEndIdx(matcher.end());
            urlEntity.setUrl(rawUrl);
            urlEntity.setExpandedUrl(rawUrl);
            urlEntity.setDisplayUrl(simplifyUrl(rawUrl));
            urls.add(urlEntity);
        }
        return urls;
    }

    private String simplifyUrl(String url) {
        return url.replaceFirst("https?://", "").replaceAll("\\?.*", "");
    }

    private List<Media> mapMediaRequestToEntity(List<MediaRequest> requests) {
        if (requests == null) return new ArrayList<>();

        return requests.stream()
                .map(req -> Media.builder()
                        .url(req.url())
                        .type(MediaType.valueOf(req.type().toUpperCase()))
                        .width(req.width())
                        .height(req.height())
                        .altText(req.altText())
                        .build())
                .toList();
    }
}