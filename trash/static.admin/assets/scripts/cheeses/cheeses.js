const delete_cheese_forms = document.querySelectorAll('form[class=delete_cheese_form]')

delete_cheese_forms.forEach(delete_cheese_form => {
    delete_cheese_form.addEventListener('submit', on_delete_cheese_form_submit)
})

async function on_delete_cheese_form_submit(e){
    if(!confirm('Biztosan törölni akarod?')) e.preventDefault()
}

const take_cheese_forms = document.querySelectorAll('form[class=take_cheese_form]')

take_cheese_forms.forEach(take_cheese_form => {
    take_cheese_form.addEventListener('submit', on_take_cheese_form_submit)
})

async function on_take_cheese_form_submit(e){
    if(!confirm('Biztosan átveszed?')) e.preventDefault()
}