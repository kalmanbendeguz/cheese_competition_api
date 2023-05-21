window.onbeforeunload = function() {
    return true
}

const modify_rating_form = document.querySelector('form[id=modify_rating_form]')

modify_rating_form.addEventListener('submit', on_modify_rating_form_submit)

function on_modify_rating_form_submit(e){
    window.onbeforeunload = null
}