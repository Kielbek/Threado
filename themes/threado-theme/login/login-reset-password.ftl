<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=true displayMessage=!messagesPerField.existsError('username'); section>
    <#if section = "header">
    <#elseif section = "form">
        <div class="threado-layout">
            
            <div class="threado-form-col">
                <div class="threado-form-content">
                    
                    <div class="threado-logo-container">
                        <img src="${url.resourcesPath}/img/threado-full-logo.png" alt="Threado Logo" class="threado-logo-img">
                    </div>

                    <div class="threado-headings">
                        <h1>Forgot password?</h1>
                        <h1>Let's fix that.</h1>
                    </div>

                    <form id="kc-reset-password-form" class="threado-form" action="${url.loginAction}" method="post">
                        
                        <div class="threado-input-group">
                            <input type="text" id="username" name="username" class="threado-input" autofocus 
                                   value="${(auth.attemptedUsername!'')}" 
                                   placeholder="<#if !realm.loginWithEmailAllowed>Username<#elseif !realm.registrationEmailAsUsername>Username or email<#else>Email</#if>"/>
                        </div>

                        <div class="threado-actions">
                            <input class="threado-btn threado-btn-primary" type="submit" value="Send Email" />
                            <a href="${url.loginUrl}" class="threado-btn threado-btn-secondary">Back to Login</a>
                        </div>
                    </form>

                </div>
            </div>

        </div>
    </#if>
</@layout.registrationLayout>