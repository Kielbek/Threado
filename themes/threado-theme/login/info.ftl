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
                        <h1>Take note.</h1>
                        
                        <p style="color: #aaaaaa; font-size: 16px; line-height: 1.5; margin-top: 16px; font-weight: normal;">
                            ${message.summary?no_esc}
                        </p>
                    </div>

                    <div class="threado-actions" style="margin-top: 30px;">
                        <#if skipLink??>
                            <#else>
                            <#if pageRedirectUri?has_content>
                                <a href="${pageRedirectUri}" class="threado-btn threado-btn-primary">${kcSanitize(msg("backToApplication"))?no_esc}</a>
                            <#elseif actionUri?has_content>
                                <a href="${actionUri}" class="threado-btn threado-btn-primary">${kcSanitize(msg("proceedWithAction"))?no_esc}</a>
                            <#elseif (client.baseUrl)?has_content>
                                <a href="${client.baseUrl}" class="threado-btn threado-btn-primary">${kcSanitize(msg("backToApplication"))?no_esc}</a>
                            </#if>
                        </#if>
                    </div>

                </div>
            </div>

        </div>
    </#if>
</@layout.registrationLayout>