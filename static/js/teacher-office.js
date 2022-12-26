document.querySelector("button.end-course-create").addEventListener('click', end)

function end(){
    tasks = {}
    document.querySelectorAll(".create-course-task").forEach(task=>{
        variants = {}
        task.querySelectorAll(".create-course-task-answer-option").forEach(element=>{
            variant = {}
            variant['is_right'] = element.querySelector("input").checked
            variant['text'] = element.querySelector("textarea").value
            variants[element.id] = variant
        }
        )
        tasks[task.id] = variants
    })
    console.log(tasks)
}