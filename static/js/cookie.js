window.onload = ()=>{
    var obj = {};
    var cookies = document.cookie.split(/;/);
    for (var i = 0, len = cookies.length; i < len; i++) {
        var cookie = cookies[i].split(/=/);
        obj[cookie[0]] = cookie[1];
    }
    if (obj == {} || obj['is_login'] == 'False'){
        window.location.href = `http://${window.location.host}/`
    }
}

function exitAccount(){
    document.cookie = ''
    window.location.href = window.location.origin
}
