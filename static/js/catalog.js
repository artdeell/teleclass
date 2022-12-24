buttons_course_open = document.querySelectorAll("button.course-open").forEach(button_course_open =>{
    button_course_open.addEventListener('click', RedirectToCourse)
})
function RedirectToCourse(){
    window.location.href = `${window.location.origin}/catalog/course/${this.id}`
}