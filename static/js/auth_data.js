function autorizate(login = '', password=''){
    console.log('auf')
    if(login=='' || password==''){
        login = document.getElementById('phone').value
        password = document.getElementById('password').value
    }
    const request = new XMLHttpRequest();
    const url = `${window.location.origin}/api/authorizations`;
    console.log(url)
    request.open('POST', url, true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    var data = {}
    data['login'] = login
    data['password'] = password
    request.send(data)
    request.onload = ()=>{
        if(request.status == 200){
            response =  JSON.parse(request.responseText)
            number_user = response['number']
            type_user = response['type']
            window.location.href = 'http://google.com'//'http://'+window.location.host+''//указать урл перенаправления
        }
        if(request.status == 400){
            error = JSON.parse(request.responseText)['error']
            // отобразить что пользователь с таким логином уже существует (текст ошибки в переменной)
        }
    }
}

function registrations(){
    const request = new XMLHttpRequest();
    const url = `${window.location.origin}/api/registrations`;
    request.open('POST', url, true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    var data = {}
    data['name'] = document.getElementById('name').value
    data['surname'] = document.getElementById('surname').value
    data['patronymic'] = document.getElementById('patronymic').value
    data['login'] = document.getElementById('phone').value
    data['password'] = document.getElementById('password').value
    if (data['password'] != document.getElementById('pass-repeat').value){
        // отобразить что пароли не совпадают
        return
    }
    request.send(JSON.stringify(data))
    request.onload = ()=>{
        if(request.status == 200){
            autorizate()
        }
        if (request.status == 400){
            error = JSON.parse(request.responseText)['error']
            // отобразить что пользователь с таким логином уже существует (текст ошибки в переменной)
        }
    }
}