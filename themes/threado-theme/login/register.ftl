<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('firstName','lastName','email','username','password','password-confirm'); section>
    <#if section = "form">
        <div class="x-container">
            
            <div class="x-logo-box">
                <img src="${url.resourcesPath}/img/threado_logo.png" alt="Logo" class="x-custom-logo">
            </div>

            <div class="x-content-box">
                <h1 class="x-title">Stwórz konto</h1>
                <h2 class="x-subtitle">Dołącz do nas już dziś.</h2>

                <form id="kc-register-form" action="${url.registrationAction}" method="post">
                    
                    <#-- Imię i Nazwisko (obok siebie dzięki klasie x-input-row) -->
                    <div class="x-input-row">
                        <input type="text" id="firstName" name="firstName" placeholder="Imię" class="x-input" value="${(register.formData.firstName!'')}">
                        <input type="text" id="lastName" name="lastName" placeholder="Nazwisko" class="x-input" value="${(register.formData.lastName!'')}">
                    </div>

                    <#-- E-mail -->
                    <input type="email" id="email" name="email" placeholder="E-mail" class="x-input" value="${(register.formData.email!'')}">
                    
                    <#-- Nazwa użytkownika (wyświetla się tylko, jeśli nie ustawiłeś "Email as username" w opcjach) -->
                    <#if !realm.registrationEmailAsUsername>
                        <input type="text" id="username" name="username" placeholder="Nazwa użytkownika" class="x-input" value="${(register.formData.username!'')}">
                    </#if>

                    <#-- Hasło i potwierdzenie -->
                    <input type="password" id="password" name="password" placeholder="Hasło" class="x-input" autocomplete="new-password">
                    <input type="password" id="password-confirm" name="password-confirm" placeholder="Potwierdź hasło" class="x-input">

                    <#-- Przycisk rejestracji (zielony) -->
                    <button class="x-btn x-btn-green" type="submit">
                        Zarejestruj się
                    </button>
                </form>

                <div class="x-footer">
                    Masz już konto? <a href="${url.loginUrl}">Zaloguj się</a>
                </div>
            </div>
        </div>
    </#if>
</@layout.registrationLayout>
