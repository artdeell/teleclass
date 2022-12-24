window.onload = function () {
    const request = new XMLHttpRequest();
    const url = `${window.location.origin}/api/courses/${window.location.pathname.replace("/catalog/", "")}list`;

    console.log(url)
    request.open('GET', url, true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send()
    request.onload = () => {
        response = JSON.parse(request.responseText)//словарь с турнирами
        console.log(response)

        catalog = document.querySelector(".catalog-row")
        courses_rendered = 0
        if (1 <= response['len'] - courses_rendered) {
            for (let course_number = response['len']; course_number > courses_rendered; course_number--) {
                catalog.innerHTML += `
                <div class="course" id = ${response[course_number - 1]['id']}>
                <div class="course-row-top">
                    <div class="course-col">
                        <div class="course-title">
                            ${response[course_number - 1]['name']}
                        </div>
                        <div class="course-description">
                            ${response[course_number - 1]['description']}
                        </div>
                    </div>
                    <div class="course-icon">
                        <img src="https://i.ibb.co/4TjWN2t/default-course-icon.png" class="course-icon-img">
                    </div>
                </div>
                <div class="course-row-bot">
                    <div class="course-max-point">
                        ${response[course_number - 1]['points']}
                    </div>
                    <button class="course-open" id="${response[course_number - 1]['id']}">
                        Открыть курс
                    </button>
                </div>
            </div>
                `
            }
        }
        // pizdos()
    }
}
// function pizdos() {
//     document.querySelectorAll("button.course-open").forEach(button => {
//         button.addEventListener('click', OpenCourse)
//         console.log(button)
//     })
// }


function OpenCourse(button) {
    const request = new XMLHttpRequest();
    const url = `${window.location.origin}/api/authorizations`;
    request.open('POST', url, true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    data = {
        'id': Number(button.id)
    }
    console.log(data)
    request.send(JSON.stringify(data))
    request.onload = () => {
        console.log(request.response)
    }
}
