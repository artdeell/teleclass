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