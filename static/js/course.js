button_back_to_catalog = document.querySelector("button.back-to-catalog").addEventListener('click', RedirectToCatalog)
function RedirectToCatalog(){
    window.location.href = `${window.location.origin}/catalog`
}
// берётся стартовое время задаваемое преподавателем прогресс расчитываются по формуле
document.querySelector("end-course").addEventListener('click', ()=>{
    data = {}
    document.querySelectorAll(".answer-option-row").forEach(line=>{
        
    })
})