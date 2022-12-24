have_account = document.querySelector("button.auth-big#have-acc")
not_have_account = document.querySelector("button#have-not-acc")

login_form = document.querySelector(".auth-col#auth")
registration_form = document.querySelector(".auth-col#reg")

have_account.addEventListener('click', function(){
    registration_form.style.display = "none"
    login_form.style.display = "flex"
    login_form.style.flexDirection = "column"
})
not_have_account.addEventListener('click', function(){
    registration_form.style.display = "flex"
    registration_form.style.flexDirection = "column"
    login_form.style.display = "none"
})


child_btn = document.querySelector("button.auth-user-type#child")
parent_btn = document.querySelector("button.auth-user-type#parent")
teacher_btn = document.querySelector("button.auth-user-type#teacher")

var status_ = 0

child_btn.addEventListener('click', function(){
    status_ = 0
    child_btn.style.borderColor = "white"
    child_btn.style.background = "rgb(31 34 41)"
    child_btn.style.color = "white"
    parent_btn.style.borderColor = "rgb(31 34 41)"
    parent_btn.style.background = "white"
    parent_btn.style.color = "rgb(31 34 41)"
    teacher_btn.style.borderColor = "rgb(31 34 41)"
    teacher_btn.style.background = "white"
    teacher_btn.style.color = "rgb(31 34 41)"
})
parent_btn.addEventListener('click', function(){
    status_ = 1
    parent_btn.style.borderColor = "white"
    parent_btn.style.background = "rgb(31 34 41)"
    parent_btn.style.color = "white"
    child_btn.style.borderColor = "rgb(31 34 41)"
    child_btn.style.background = "white"
    child_btn.style.color = "rgb(31 34 41)"
    teacher_btn.style.borderColor = "rgb(31 34 41)"
    teacher_btn.style.background = "white"
    teacher_btn.style.color = "rgb(31 34 41)"
})
teacher_btn.addEventListener('click', function(){
    status_ = 2
    teacher_btn.style.borderColor = "white"
    teacher_btn.style.background = "rgb(31 34 41)"
    teacher_btn.style.color = "white"
    parent_btn.style.borderColor = "rgb(31 34 41)"
    parent_btn.style.background = "white"
    parent_btn.style.color = "rgb(31 34 41)"
    child_btn.style.borderColor = "rgb(31 34 41)"
    child_btn.style.background = "white"
    child_btn.style.color = "rgb(31 34 41)"
})

document.querySelector("button.auth-big#create-acc").addEventListener('click', registration())
document.querySelector("button.auth-big#auth").addEventListener('click', auth())

function auth(login = '', password=''){
    if(login=='' || password==''){
        login = document.getElementById('phone').value
        password = document.getElementById('password').value
    }
    const request = new XMLHttpRequest();
    const url = `${window.location.origin}/api/authorizations`;
    request.open('POST', url, true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    var data = {}
    data['login'] = login
    data['password'] = password
    request.send(JSON.stringify(data))
    request.onload = ()=>{
        if(request.status == 200){
            response =  JSON.parse(request.responseText)
            number_user = response['number']
            type_user = response['type']
            window.location.href = 'http://'+window.location.host+'auth/'//указать урл перенаправления
        }
        if(request.status == 400){
            error = JSON.parse(request.responseText)['error']
            console.log(error)
            // отобразить что пользователь с таким логином уже существует (текст ошибки в переменной)
        }
    }
}

function registration(){
    const request = new XMLHttpRequest();
    const url = `${window.location.origin}/api/registrations`;
    request.open('POST', url, true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    var data = {}
    statuses = ['child', 'parent', 'teacher']
    data['name'] = document.getElementById('name').value
    data['surname'] = document.getElementById('surname').value
    data['patronymic'] = document.getElementById('patronymic').value
    data['login'] = document.getElementById('phone').value
    data['password'] = document.getElementById('password').value
    data['user_type'] = statuses[status_]
    if (data['password'] != document.getElementById('password-repeat').value){
        // отобразить что пароли не совпадают
        return
    }
    if (data['user_type'] == ''){
        // отобразить что нужно выбрать статус
        return
    }
    request.send(JSON.stringify(data))
    request.onload = ()=>{
        if(request.status == 200){
            auth()
        }
        if (request.status == 400){
            error = JSON.parse(request.responseText)['error']
            // отобразить что пользователь с таким логином уже существует (текст ошибки в переменной)
        }
    }
}