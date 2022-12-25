button_back_to_catalog = document.querySelector("button.back-to-catalog").addEventListener('click', RedirectToCatalog)
function RedirectToCatalog(){
    window.location.href = `${window.location.origin}/catalog`
}