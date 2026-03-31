<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('password','password-confirm'); section>
    <#if section = "header">
    <#elseif section = "form">
        <div class="threado-layout">
            
            <div class="threado-form-col">
                <div class="threado-form-content">
                    
                    <div class="threado-logo-container">
                        <img src="${url.resourcesPath}/img/threado-full-logo.png" alt="Threado Logo" class="threado-logo-img">
                    </div>

                    <div class="threado-headings">
                        <h1>New password.</h1>
                        <h1>Make it secure.</h1>
                    </div>

                    <form id="kc-passwd-update-form" class="threado-form" action="${url.loginAction}" method="post">
                        
                        <input type="text" id="username" name="username" value="${username}" autocomplete="username" readonly="readonly" style="display:none;"/>
                        <input type="password" id="password" name="password" style="display:none;" autocomplete="current-password"/>

                        <div class="threado-input-group">
                            <input type="password" id="password-new" name="password-new" class="threado-input" autofocus 
                                   autocomplete="new-password" placeholder="New Password" />
                        </div>

                        <div class="threado-input-group">
                            <input type="password" id="password-confirm" name="password-confirm" class="threado-input" 
                                   autocomplete="new-password" placeholder="Confirm Password" />
                        </div>

                        <div class="threado-actions">
                            <input class="threado-btn threado-btn-primary" type="submit" value="Update Password" />
                        </div>
                    </form>

                </div>
            </div>

        </div>
    </#if>
</@layout.registrationLayout>