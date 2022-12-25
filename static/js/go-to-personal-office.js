document.querySelector("a.nav-menu").addEventListener('click', ()=>{
    var obj = {};
    var cookies = document.cookie.split(/; /);
    for (var i = 0, len = cookies.length; i < len; i++) {
        var cookie = cookies[i].split(/=/);
        obj[cookie[0]] = cookie[1];
    }
    if (obj != {} && obj['is_login'] == 'True'){
        window.location.href = `${window.location.origin}/${obj['type']}/${obj['id']}`
    } else {
        window.location.href = window.location.origin
    }
})