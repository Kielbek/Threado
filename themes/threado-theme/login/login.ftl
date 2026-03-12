<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=social.displayInfo; section>
    <#if section = "form">
        <div class="x-container">
            <div class="x-logo-box">
                <img src="${url.resourcesPath}/img/threado_logo.png" alt="Logo" class="x-custom-logo">
            </div>

            <div class="x-content-box">
                <h1 class="x-title">Najświeższe wieści ze świata</h1>
                <h2 class="x-subtitle">Dołącz już dziś.</h2>

                <div class="x-actions">
                    <#if social.providers??>
                        <div class="x-social-buttons">
                            <#list social.providers as p>
                                <a href="${p.loginUrl}" class="x-btn x-btn-white">
                                    Zaloguj się przez ${p.displayName}
                                </a>
                            </#list>
                        </div>
                        <div class="x-divider"><span>LUB</span></div>
                    </#if>

                    <form id="kc-form-login" action="${url.loginAction}" method="post">
                        <input name="username" type="text" placeholder="E-mail lub użytkownik" class="x-input" autocomplete="off">
                        <input name="password" type="password" placeholder="Hasło" class="x-input" autocomplete="off">
                        
                        <button class="x-btn x-btn-green" name="login" id="kc-login" type="submit">
                            Zaloguj się
                        </button>
                    </form>

                    <div class="x-footer">
                        Nie masz konta? <a href="${url.registrationUrl}">Zarejestruj się</a>
                    </div>
                </div>
            </div>
        </div>
    </#if>
</@layout.registrationLayout>
