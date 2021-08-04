window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    
    gtag('config', 'AW-869476933');

    var uriPath = window.location.pathname.split('/');

    if(uriPath[1] === "thailand"){
        gtag('event', 'conversion', {
        'send_to': 'AW-869476933/lz8RCIHI-XEQxdTMngM',
        'aw_remarketing_only': true
        });
    }else{
        gtag('event', 'conversion', {
        'send_to': 'AW-869476933/8SCxCPSH_WwQxdTMngM',
        'aw_remarketing_only': true
        });
    }