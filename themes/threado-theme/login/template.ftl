<#macro registrationLayout displayInfo=false displayMessage=true displayRequiredFields=false>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${msg("loginTitle",(realm.displayName!''))}</title>
    <link rel="icon" href="${url.resourcesPath}/img/threado-logo.png" type="image/png" />
    <#if properties.styles?has_content>
        <#list properties.styles?split(' ') as style>
            <link href="${url.resourcesPath}/${style}" rel="stylesheet" />
        </#list>
    </#if>
</head>

<body class="threado-body">
    <div class="threado-main-wrapper">
        
        <#if displayMessage && message?has_content && (message.type != 'warning' || !isAppInitiatedAction??)>
            <div class="toast-container">
                <div class="threado-toast toast-enter">
                    <div class="toast-progress toast-progress-${message.type}"></div>
                    <div class="toast-content">
                        <div class="toast-text-container">
                            <span class="toast-title">
                                <#if message.type = 'error'>Error<#elseif message.type = 'success'>Success<#else>Notification</#if>
                            </span>
                            <span class="toast-message">${kcSanitize(message.summary)?no_esc}</span>
                        </div>
                        <button class="toast-close" onclick="this.closest('.threado-toast').remove()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                </div>
            </div>
        </#if>

        <#nested "form">

    </div>

    <script>
        (function() {
            const urlParams = new URLSearchParams(window.location.search);
            const themeParam = urlParams.get('theme');
            
            const getCookie = (name) => {
                const value = "; " + document.cookie;
                const parts = value.split("; " + name + "=");
                if (parts.length === 2) return parts.pop().split(';').shift();
            };
            const themeCookie = getCookie('app_theme');
            
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            if (themeParam === 'dark' || themeCookie === 'dark' || (!themeParam && !themeCookie && prefersDark)) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        })();

        function togglePassword(inputId, button) {
            const input = document.getElementById(inputId);
            if (input.type === "password") {
                input.type = "text";
                button.style.color = "var(--theme-accent)";
            } else {
                input.type = "password";
                button.style.color = "var(--theme-muted)";
            }
        }
    </script>
</body>
</html>
</#macro>