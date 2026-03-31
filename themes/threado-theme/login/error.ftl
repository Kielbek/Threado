<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=false; section>
    <#if section = "header">
    <#elseif section = "form">
        <div class="threado-layout">
            
            <div class="threado-form-col">
                <div class="threado-form-content">
                    
                    <div class="threado-logo-container">
                        <img src="${url.resourcesPath}/img/threado-full-logo.png" alt="Threado Logo" class="threado-logo-img">
                    </div>

                    <div class="threado-headings">
                        <h1 style="color: #ff4d4d;">Oops!</h1> <h1>Something went wrong.</h1>
                        
                        <p style="color: #aaaaaa; font-size: 16px; line-height: 1.5; margin-top: 16px; font-weight: normal;">
                            ${message.summary?no_esc}
                        </p>
                    </div>

                    <div class="threado-actions" style="margin-top: 30px;">
                        <#if client?? && client.baseUrl?has_content>
                            <a href="${client.baseUrl}" class="threado-btn threado-btn-primary">
                                Back to Application
                            </a>
                        <#else>
                            <a href="${url.loginUrl}" class="threado-btn threado-btn-primary">
                                Back to Login
                            </a>
                        </#if>
                    </div>

                </div>
            </div>

        </div>
    </#if>
</@layout.registrationLayout>