window.onbeforeunload = function() {
    return true
}

function onPasswordChange() {
    const password = document.querySelector('input[id=password]')
    const confirm_password = document.querySelector('input[id=confirm_password]')

    if (confirm_password.value === password.value) {
        confirm_password.setCustomValidity('')
    } else {
        confirm_password.setCustomValidity(document.querySelector('meta[data-name="passwords_not_match_text"]').content)
    }
}

const password = document.querySelector('input[id=password]')
const confirm_password = document.querySelector('input[id=confirm_password]')

password.addEventListener("change", onPasswordChange)
confirm_password.addEventListener("change", onPasswordChange)
///////
const registration_form = document.querySelector('form[id=registration_form]')

function on_registration_form_submit(e){
    window.onbeforeunload = null
}
registration_form.addEventListener('submit', on_registration_form_submit)