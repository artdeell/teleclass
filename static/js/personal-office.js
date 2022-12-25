buttons_course_create_step = document.querySelectorAll("button.create-course-step")
buttons_course_create_step.forEach(button_course_create_step =>{
    if (button_course_create_step.id != "add-step" && button_course_create_step.id != "remove-step") {
        button_course_create_step.addEventListener('click', SetActiveStep);
    }
})

function SetActiveStep(){
    buttons_course_create_step.forEach(course_create_step =>{
        if (this != course_create_step) {
            course_create_step.style.borderColor = "rgb(31 34 41)";
            course_create_step.style.flex = "0 0 45px";
        }
    })
    this.style.borderColor = "rgb(240 241 242)";
    this.style.flex = "0 0 90px";
}