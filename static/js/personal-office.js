document.querySelector("a.nav-menu#logout").addEventListener('click', ()=>{
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    window.location.href = window.location.origin
})



buttons_course_create_step = document.querySelectorAll("button.create-course-step")
buttons_course_create_step.forEach(button_course_create_step => {
    if (button_course_create_step.id != "add-step" && button_course_create_step.id != "remove-step") {
        button_course_create_step.addEventListener('click', SetActiveStep);
    }
})

create_course_steps = document.querySelector(".create-course-steps")
create_course_steps_row = document.querySelector(".create-course-steps-row")
buton_create_step = document.querySelector("button.create-course-step#add-step")
buton_create_step.addEventListener('click', AddStep)
buton_remove_step = document.querySelector("button.create-course-step#remove-step")
buton_remove_step.addEventListener('click', RemoveStep)

buttons_add_answer_option = document.querySelectorAll("button.add-answer-option")
buttons_add_answer_option.forEach(button_add_answer_option =>{
    button_add_answer_option.addEventListener('click', AddAnswerOption)
})


steps_quantity = 0

function SetActiveStep() {
    buttons_course_create_step.forEach(course_create_step => {
        if (this != course_create_step) {
            course_create_step.style.borderColor = "rgb(31 34 41)";
            course_create_step.style.flex = "0 0 45px";
        }
    })
    this.style.borderColor = "rgb(240 241 242)";
    this.style.flex = "0 0 90px";
    if (this.id != "theory") {
        document.querySelectorAll(".create-course-task").forEach(task =>{
            if (task.id == this.id) {
                task.style.display = "flex"
            }else{
                task.style.display = "none"
            }
        })
        document.querySelector(".create-course-theory").style.display = "none"
    } else if (this.id == "theory") {
        document.querySelectorAll(".create-course-task").forEach(task =>{
            task.style.display = "none"
        })
        document.querySelector(".create-course-theory").style.display = "flex"
    }
}

function AddStep() {
    if (steps_quantity < 5) {
        create_course_steps_row.innerHTML += `<button class="create-course-step" id = "${++steps_quantity}">
            <div class="create-course-step-title">
                ${steps_quantity}
            </div>
        </button>`
        buttons_course_create_step = document.querySelectorAll("button.create-course-step")
        buttons_course_create_step.forEach(button_course_create_step => {
            if (button_course_create_step.id != "add-step" && button_course_create_step.id != "remove-step") {
                button_course_create_step.addEventListener('click', SetActiveStep);
            }
        })
    }
}

function RemoveStep() {
    if (create_course_steps_row.lastChild.id != "theory" && steps_quantity > 0) {
        create_course_steps_row.lastChild.remove();
        steps_quantity--
    }
}

function AddAnswerOption(){
    document.querySelector(".create-course-task-answers-options-row").innerHTML += `<div class="create-course-task-answer-option" id="${++this.id}">
            <input type="checkbox" id="${this.id}">
            <textarea class="answer-option-text"
                placeholder="Пишите здесь текст варианта ответа"></textarea>
        </div>`
}

AddStep()
