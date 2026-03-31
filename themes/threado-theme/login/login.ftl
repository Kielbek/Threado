<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=false; section>
    <#if section = "header">
    <#elseif section = "form">
        <div class="threado-layout">
            
            <div class="threado-form-col">
                <div class="threado-form-content">
                    
                    <div class="threado-logo-container">
                        <img src="${url.resourcesPath}/img/threado-full-logo.png" alt="Threado Logo" class="threado-logo-img">
                    </div>

                    <div class="threado-headings">
                        <h1>Your words.</h1>
                        <h1>Your rules.</h1>
                    </div>

                    <form id="kc-form-login" class="threado-form" onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="post">
                        
                        <div class="threado-input-group">
                            <input tabindex="1" id="username" class="threado-input" name="username" value="${(login.username!'')}" type="text" autofocus autocomplete="off" placeholder="Email or Username" />
                        </div>

                        <div class="threado-input-group password-wrapper">
                            <input tabindex="2" id="password" class="threado-input" name="password" type="password" autocomplete="off" placeholder="Password" />
                            <button type="button" class="password-toggle" onclick="togglePassword('password', this)">
                                <svg class="eye-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            </button>
                        </div>

                        <#if captchaEnabled??>
                            <div class="threado-input-group captcha-container">
                                <div class="g-recaptcha" 
                                     data-size="normal" 
                                     data-theme="dark" 
                                     data-sitekey="${captchaSiteKey}">
                                </div>
                            </div>
                        </#if>

                        <div class="threado-actions">
                            <input type="hidden" id="id-hidden-input" name="credentialId" <#if auth.selectedCredential?has_content>value="${auth.selectedCredential}"</#if>/>
                            
                            <input tabindex="4" class="threado-btn threado-btn-primary" name="login" id="kc-login" type="submit" value="Sign In" />
                            
                            <#if realm.password && realm.registrationAllowed && !registrationDisabled??>
                                <a tabindex="6" href="${url.registrationUrl}" class="threado-btn threado-btn-secondary">Create Account</a>
                            </#if>
                        </div>
                    </form>

                    <div class="threado-footer">
                        <p>By continuing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</p>
                        <#if realm.resetPasswordAllowed>
                            <a tabindex="5" href="${url.loginResetCredentialsUrl}" class="threado-forgot-password">Forgot password?</a>
                        </#if>
                    </div>
                </div>
            </div>

        </div>
    </#if>
</@layout.registrationLayout>