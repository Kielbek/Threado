<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('username','password') displayInfo=realm.password && realm.registrationAllowed && !registrationDisabled; section>
    
    <#if section = "header">
        <#-- Puste - nagłówek robimy własny wewnątrz sekcji form -->
    <#elseif section = "form">
        <div class="split-container">
            
            <#-- LEWA STRONA: FORMULARZ -->
            <div class="form-side">
                <div class="form-content">
                    <div class="brand">
                        <div class="logo-box">T</div>
                        <span class="brand-name">Threado</span>
                    </div>

                    <div class="welcome-text">
                        <h1>Holla,<br>Welcome Back</h1>
                        <p>Hey, welcome back to your special place</p>
                    </div>

                    <form id="kc-form-login" onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="post">
                        <div class="input-group">
                            <input tabindex="1" id="username" name="username" value="${(login.username!'')}" type="text" autofocus autocomplete="off" placeholder="stanley@gmail.com" />
                        </div>

                        <div class="input-group">
                            <input tabindex="2" id="password" name="password" type="password" autocomplete="off" placeholder="••••••••••••" />
                        </div>

                        <div class="form-utils">
                            <label class="remember-me">
                                <input type="checkbox" id="rememberMe" name="rememberMe"> Remember me
                            </label>
                            <#if realm.resetPasswordAllowed>
                                <a href="${url.loginResetCredentialsUrl}" class="forgot-pass">Forgot Password?</a>
                            </#if>
                        </div>

                        <button tabindex="4" class="submit-btn" name="login" id="kc-login" type="submit">Sign In</button>
                    </form>

                    <#if realm.password && realm.registrationAllowed && !registrationDisabled>
                        <div class="signup-link">
                            Don't have an account? <a href="${url.registrationUrl}">Sign Up</a>
                        </div>
                    </#if>
                </div>
            </div>

            <#-- PRAWA STRONA: ILUSTRACJA -->
            <div class="illustration-side">
                <div class="illustration-wrapper">
                    <#-- Tutaj pojawi się obrazek z CSS lub wstaw tag <img> jeśli masz plik -->
                    <div class="mock-illustration"></div>
                </div>
            </div>

        </div>
    </#if>
</@layout.registrationLayout>
