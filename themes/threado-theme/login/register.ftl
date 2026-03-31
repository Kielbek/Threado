<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=true; section>
    <#if section = "header">
    <#elseif section = "form">
        <div class="threado-layout">
            <div class="threado-form-col">
                <div class="threado-form-content">
                    
                    <div class="threado-logo-container">
                        <img src="${url.resourcesPath}/img/threado-full-logo.png" alt="Threado Logo" class="threado-logo-img">
                    </div>

                    <div class="threado-headings">
                        <h1>Your journey.</h1>
                        <h1>Starts here.</h1>
                    </div>

                    <form id="kc-register-form" class="threado-form" action="${url.registrationAction}" method="post" oninput="validatePasswords()">
                        
                        <div class="threado-input-group">
                            <input type="text" id="firstName" class="threado-input" name="firstName" value="${(register.formData.firstName!'')}" placeholder="First Name" required />
                            <#if messagesPerField.existsError('firstName')>
                                <span class="input-error-msg">${kcSanitize(messagesPerField.get('firstName'))?no_esc}</span>
                            </#if>
                        </div>

                        <div class="threado-input-group">
                            <input type="text" id="lastName" class="threado-input" name="lastName" value="${(register.formData.lastName!'')}" placeholder="Last Name" required />
                            <#if messagesPerField.existsError('lastName')>
                                <span class="input-error-msg">${kcSanitize(messagesPerField.get('lastName'))?no_esc}</span>
                            </#if>
                        </div>

                        <#if !realm.registrationEmailAsUsername>
                            <div class="threado-input-group">
                                <input type="text" id="username" class="threado-input" name="username" value="${(register.formData.username!'')}" placeholder="Username" required autocomplete="username" />
                                <#if messagesPerField.existsError('username')>
                                    <span class="input-error-msg">${kcSanitize(messagesPerField.get('username'))?no_esc}</span>
                                </#if>
                            </div>
                        </#if>

                        <div class="threado-input-group">
                            <input type="email" id="email" class="threado-input" name="email" value="${(register.formData.email!'')}" placeholder="Email Address" required autocomplete="email" />
                            <#if messagesPerField.existsError('email')>
                                <span class="input-error-msg">${kcSanitize(messagesPerField.get('email'))?no_esc}</span>
                            </#if>
                        </div>

                        <#if passwordRequired??>
                            <div class="threado-input-group password-wrapper">
                                <input type="password" id="password" class="threado-input" name="password" placeholder="Password" required autocomplete="new-password" />
                                <button type="button" class="password-toggle" onclick="togglePassword('password', this)">
                                    <svg class="eye-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                </button>
                            </div>
                            <#if messagesPerField.existsError('password')>
                                <span class="input-error-msg">${kcSanitize(messagesPerField.get('password'))?no_esc}</span>
                            </#if>

                            <div class="threado-input-group password-wrapper">
                                <input type="password" id="password-confirm" class="threado-input" name="password-confirm" placeholder="Confirm Password" required autocomplete="new-password" />
                                <button type="button" class="password-toggle" onclick="togglePassword('password-confirm', this)">
                                    <svg class="eye-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                </button>
                            </div>
                            <span id="password-match-error" class="input-error-msg" style="display:none;">Passwords do not match</span>
                            <#if messagesPerField.existsError('password-confirm')>
                                <span class="input-error-msg">${kcSanitize(messagesPerField.get('password-confirm'))?no_esc}</span>
                            </#if>
                        </#if>

                        <div class="threado-actions">
                            <input id="register-btn" class="threado-btn threado-btn-primary" type="submit" value="Create Account" />
                            <a href="${url.loginUrl}" class="threado-btn threado-btn-secondary">Back to Login</a>
                        </div>
                    </form>

                    <div class="threado-footer">
                        <p>By creating an account, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</p>
                    </div>
                </div>
            </div>
        </div>

        <script>
            function validatePasswords() {
                const pass = document.getElementById('password');
                const conf = document.getElementById('password-confirm');
                const error = document.getElementById('password-match-error');
                const btn = document.getElementById('register-btn');

                if (!pass || !conf) return;

                if (conf.value === "") {
                    error.style.display = 'none';
                    btn.disabled = false;
                    conf.style.borderColor = 'var(--theme-border)';
                    return;
                }

                if (pass.value !== conf.value) {
                    error.style.display = 'block';
                    conf.style.borderColor = '#ff4d4d';
                    btn.style.opacity = '0.5';
                    btn.disabled = true;
                } else {
                    error.style.display = 'none';
                    conf.style.borderColor = 'var(--theme-border)';
                    btn.style.opacity = '1';
                    btn.disabled = false;
                }
            }
        </script>
    </#if>
</@layout.registrationLayout>