const reset_competition_form = document.querySelector('form[class=reset_competition_form]')

reset_competition_form.addEventListener('submit', on_reset_competition_form_submit)

async function on_reset_competition_form_submit(e){
    if(!confirm('Biztosan alaphelyzetbe állítod?')) e.preventDefault()
}