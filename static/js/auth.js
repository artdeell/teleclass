have_account = document.querySelector("button#have-account")
not_have_account = document.querySelector("button#not-have-account")
login_form = document.querySelector(".login-form")
registration_form = document.querySelector(".registration-form")

registration_form.style.display = "none"
login_form.style.display = "flex"
login_form.style.flexDirection = "column"

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


child_btn = document.querySelector("button.small#user-type-child")
parent_btn = document.querySelector("button.small#user-type-parent")
teacher_btn = document.querySelector("button.small#user-type-teacher")

child_btn.style.borderColor = "white"
child_btn.style.background = "rgb(31 34 41)"
child_btn.style.color = "white"
parent_btn.style.borderColor = "rgb(31 34 41)"
parent_btn.style.background = "white"
parent_btn.style.color = "rgb(31 34 41)"
teacher_btn.style.borderColor = "rgb(31 34 41)"
teacher_btn.style.background = "white"
teacher_btn.style.color = "rgb(31 34 41)"

child_btn.addEventListener('click', function(){
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