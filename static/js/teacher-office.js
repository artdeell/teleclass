document.querySelector("button.end-course-create").addEventListener('click', end)

function end(){
    data = {}
    data['title'] = document.querySelector("input.create-course-title").value
    data['description'] = document.querySelector("textarea.create-course-description").value
    data['theory'] = document.querySelector("textarea.theory-content").value
    tasks = {}
    document.querySelectorAll(".create-course-task").forEach(task=>{
        task_ = {}
        variants = {}
        task.querySelectorAll(".create-course-task-answer-option").forEach(element=>{
            variant = {}
            variant['is_right'] = element.querySelector("input").checked
            variant['text'] = element.querySelector("textarea").value
            variants[element.id] = variant
        }
        )
        task_['number'] = task.id
        task_['subject_area'] = task.querySelector("select#subject-area").value
        task_['theme'] = task.querySelector("select#theme").value
        task_['point'] = task.querySelector("input.task-points").value
        task_['text'] = task.querySelector("textarea.task-text").value
        task_['variants'] = variants

        tasks[task.id] = task_
    })
    data['tasks'] = tasks
    console.log(data)
    const request = new XMLHttpRequest();
    const url = `${window.location.origin}/api/add-course/`;
    console.log(url)
    request.open('POST', url, true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify(data))
    request.onload = () => {
        alert(request.status)
        if (request.status==200) {
            window.location.href = `${window.location.origin}/${obj['type']}/${obj['id']}`
        }else{
            alert('Ошибка доавления курса')
        }
    }
}