package com.example.thread.util;

import com.github.pemistahl.lingua.api.Language;
import com.github.pemistahl.lingua.api.LanguageDetector;
import com.github.pemistahl.lingua.api.LanguageDetectorBuilder;
import org.springframework.stereotype.Component;

@Component
public class ThreadLanguageDetector {

    private final LanguageDetector detector = LanguageDetectorBuilder
            .fromLanguages(Language.POLISH, Language.ENGLISH, Language.GERMAN, Language.SPANISH)
            .build();

    public String detectLanguage(String text) {
        if (text == null || text.isBlank()) {
            return "und";
        }

        Language detectedLanguage = detector.detectLanguageOf(text);

        return detectedLanguage.getIsoCode639_1().toString().toLowerCase();
    }
}