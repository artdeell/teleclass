document.querySelector(".end-course").addEventListener('click', () => {
    data = []
    document.querySelectorAll(".practice-col").forEach(col =>{
        col.querySelectorAll(".answer-option-row").forEach(row =>{
            row_ = {}
            if (row.querySelector("input").checked) {
                row_['answer'] = row.querySelector("input").id
                row_['number'] = col.querySelector(".practice-number").firstChild.textContent
                console.log(data)
                data.push(row_)
            }
        })
    })
    console.log(data)
    const request = new XMLHttpRequest();
    const url = `${window.location.origin}/api/save-course-progress/`;
    request.open('POST', url, true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify(data))
    request.onload = ()=> {
        newData = JSON.parse(request.responseText)
        console.log(newData)
        document.querySelectorAll(".practice-number").forEach(practice_number =>{
            if (newData[practice_number.firstChild.textContent]) {
                practice_number.style.color = "rgb(65 166 116)"
            }else{
                practice_number.style.color = "rgb(255 0 42)"
            }
        })
    }
})