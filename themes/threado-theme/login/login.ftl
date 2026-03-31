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

                    <#if realm.password && social.providers??>
                        <div class="threado-social-container" style="margin-top: 24px;">
                            <div style="display: flex; align-items: center; text-align: center; margin-bottom: 20px;">
                                <div style="flex: 1; border-bottom: 1px solid var(--theme-border, #3f3f46);"></div>
                                <span style="padding: 0 15px; color: var(--theme-muted, #a1a1aa); font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Or</span>
                                <div style="flex: 1; border-bottom: 1px solid var(--theme-border, #3f3f46);"></div>
                            </div>

                            <div class="threado-social-providers" style="display: flex; flex-direction: column; gap: 10px;">
                                <#list social.providers as p>
                                    <a href="${p.loginUrl}" class="threado-btn threado-btn-secondary" style="display: flex; align-items: center; justify-content: center; gap: 12px; text-decoration: none;">
                                        <#if p.alias == "google">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
                                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                                                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                                                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                                                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                                            </svg>
                                        </#if>
                                        <span>Continue with ${p.displayName!}</span>
                                    </a>
                                </#list>
                            </div>
                        </div>
                    </#if>

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