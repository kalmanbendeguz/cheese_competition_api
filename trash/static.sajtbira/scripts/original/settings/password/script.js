window.onbeforeunload = function() {
    return true
}

const password_settings_form = document.querySelector('form[id=password_settings_form]')

password_settings_form.addEventListener('submit', on_password_settings_form_submit)

function on_password_settings_form_submit(e){
    window.onbeforeunload = null
}

function onPasswordChange() {
    const new_password = document.querySelector('input[id=new_password]')
    const confirm_new_password = document.querySelector('input[id=confirm_new_password]')

    if (confirm_new_password.value === new_password.value) {
        confirm_new_password.setCustomValidity('')
    } else {
        confirm_new_password.setCustomValidity(document.querySelector('meta[data-name="passwords_not_match_text"]').content)
    }
}

const new_password = document.querySelector('input[id=new_password]')
const confirm_new_password = document.querySelector('input[id=confirm_new_password]')

new_password.addEventListener("change", onPasswordChange)
confirm_new_password.addEventListener("change", onPasswordChange)