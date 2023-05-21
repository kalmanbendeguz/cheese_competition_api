const remove_cheese_forms = document.querySelectorAll('form[class=remove_cheese_form]')

for(let remove_cheese_form of remove_cheese_forms) {
    remove_cheese_form.addEventListener('submit', on_remove_cheese_form_submit)
}

async function on_remove_cheese_form_submit(e){
    if(!confirm(document.querySelector('meta[data-name="confirm_remove_cheese_text"]').content)) e.preventDefault()
}