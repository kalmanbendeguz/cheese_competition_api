window.onbeforeunload = function() {
    return true
}

const send_feedback_form = document.querySelector('form[id=send_feedback_form]')

send_feedback_form.addEventListener('submit', on_send_feedback_form_submit)

function on_send_feedback_form_submit(e){
    window.onbeforeunload = null
}