<#import "template.ftl" as layout>
<@layout.registrationLayout; section>
    <#if section = "header">
    <#elseif section = "form">
        <div class="threado-layout">
            <div class="threado-form-col">
                <div class="threado-form-content">
                    
                    <div class="threado-logo-container">
                        <img src="${url.resourcesPath}/img/threado-full-logo.png" alt="Threado Logo" class="threado-logo-img">
                    </div>

                    <div class="threado-headings">
                        <h1>Session expired.</h1>
                        <p style="color: var(--theme-muted); margin-top: 8px;">For your security, this login session has timed out.</p>
                    </div>

                    <div class="threado-actions" style="margin-top: 32px;">
                        <p style="color: var(--theme-text); font-size: 14px; margin-bottom: 16px;">
                            To continue where you left off:
                        </p>
                        <a href="${url.loginAction}" class="threado-btn threado-btn-primary">
                            Continue Login
                        </a>

                        <p style="color: var(--theme-text); font-size: 14px; margin-top: 24px; margin-bottom: 16px;">
                            Or start a completely new session:
                        </p>
                        <a href="${url.loginRestartFlowUrl}" class="threado-btn threado-btn-secondary">
                            Restart Login
                        </a>
                    </div>

                    <div class="threado-footer">
                        <p>Need help? Contact our support or try logging in again from the app.</p>
                    </div>
                </div>
            </div>
        </div>
    </#if>
</@layout.registrationLayout>