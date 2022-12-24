window.onload = function(){
    const request = new XMLHttpRequest();
    const url = `${window.location.origin}/api/courses/${window.location.pathname.replace("/catalog/", "")}list`;
    console.log(url)
    request.open('GET', url, true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send()
    request.onload = ()=>{
        response = JSON.parse(request.responseText)//словарь с турнирами
        console.log(response)
    }
    document.querySelectorAll("button.course-open").forEach(button =>{
        button.addEventListener('click', function(){
            Open(button.id)
        })
    }) 
}



function Open(id){
    const request = new XMLHttpRequest();
    const url = `${window.location.origin}/api/courses/${window.location.pathname.replace("/catalog/", "")}take`;
    console.log(url)
    request.open('POST', url, true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    data = {
        'user_tipe': 'child',
        'id': Number(id)
    }
    console.log(data)
    request.send(JSON.stringify(data))
    request.onload = ()=>{
        response = JSON.parse(request.responseText)
        console.log(response)

    }
}