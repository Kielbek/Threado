<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=true; section>
    <#if section = "header">
    <#elseif section = "form">
        <div class="threado-layout">
            
            <div class="threado-form-col">
                <div class="threado-form-content">
                    
                    <div class="threado-logo-container">
                        <img src="${url.resourcesPath}/img/threado-full-logo.png" alt="Threado Logo" class="threado-logo-img">
                    </div>

                    <div class="threado-headings">
                        <h1>Check your inbox.</h1>
                        <p style="color: #aaaaaa; font-size: 16px; line-height: 1.5; margin-top: 16px; font-weight: normal;">
                            ${msg("emailVerifyInstruction1", user.email)}
                        </p>
                    </div>

                    <div class="threado-footer" style="text-align: left; margin-top: 30px;">
                        <p style="color: #888888; margin-bottom: 20px;">
                            ${msg("emailVerifyInstruction2")}
                            <br>
                            <a href="${url.loginAction}" style="color: #32cd32; text-decoration: none; font-weight: bold;">
                                ${msg("doClickHere")}
                            </a> 
                            ${msg("emailVerifyInstruction3")}
                        </p>
                    </div>

                    <div class="threado-actions">
                        <a href="${url.loginUrl}" class="threado-btn threado-btn-secondary">Back to Login</a>
                    </div>

                </div>
            </div>

        </div>
    </#if>
</@layout.registrationLayout>