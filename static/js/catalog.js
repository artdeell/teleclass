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
}