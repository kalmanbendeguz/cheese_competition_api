window.onbeforeunload = function() {
    return true
}

const milkTypeRadioButtons = document.querySelectorAll('input[name=milk_type][type=radio]')

for (let radioButton of milkTypeRadioButtons) { radioButton.addEventListener("change", onMilkTypeRadioButtonChange) }

function onMilkTypeRadioButtonChange(e){
    const selectCategories = document.querySelectorAll('select.product_category_list')
    for(let selectCategory of selectCategories){
        selectCategory.removeAttribute('required')
        selectCategory.disabled = {}
    }

    const activeCategory = document.querySelector(`#product_category_list_${e.target.id}`)
    activeCategory.required = {}
    activeCategory.removeAttribute('disabled')

    const selectGroups = document.querySelectorAll('div.select_category')

    for(let selectGroup of selectGroups) {
        const allOptions = selectGroup.querySelectorAll(`option`)
        for(let currentOption of allOptions){
                currentOption.removeAttribute('selected')
        }
        const firstSelected = selectGroup.querySelector(`option[value='']`)
        firstSelected.selected = {}
        selectGroup.hidden = {}
    }

    const activeGroup = document.querySelector(`div[id=select_category_${e.target.id}]`)
    const firstSelected = activeGroup.querySelector(`option[value='']`)
    firstSelected.selected = {}
    activeGroup.removeAttribute('hidden')
}

const maturationTimeRadioButtons = document.querySelectorAll('input[name=maturation_time_type][type=radio]')

for(let radioButton of maturationTimeRadioButtons) {radioButton.addEventListener("change", onMaturationTimeRadioButtonChange)}

function onMaturationTimeRadioButtonChange(e){
    const maturationTimeSelectBlock = document.querySelector('div[id=maturation_time_matured_block]')
    const maturationTimeQuantityInput = document.querySelector('input[id=maturation_time_quantity]')
    const selectMaturationTimeUnit = document.querySelector('select[id=maturation_time_unit]')

    if(e.target.value === 'fresh') {
        maturationTimeSelectBlock.hidden = {}
        maturationTimeQuantityInput.removeAttribute('required')
        selectMaturationTimeUnit.removeAttribute('required')

        maturationTimeQuantityInput.disabled = {}
        selectMaturationTimeUnit.disabled = {}
    }
    if(e.target.value === 'matured') {
        maturationTimeSelectBlock.removeAttribute('hidden')
        maturationTimeQuantityInput.required = {}
        selectMaturationTimeUnit.required = {}

        maturationTimeQuantityInput.value = ''
        const firstSelected = selectMaturationTimeUnit.querySelector(`option[value='']`)
        firstSelected.selected = {}

        maturationTimeQuantityInput.removeAttribute('disabled')
        selectMaturationTimeUnit.removeAttribute('disabled')
    }
}

/////////////////////////////////////////////////////

const milkTypeSelects = document.querySelectorAll('select.product_category_list')

for(let milkTypeSelect of milkTypeSelects){ milkTypeSelect.addEventListener('focus', onMilkTypeSelectFocus)}
for(let milkTypeSelect of milkTypeSelects){ milkTypeSelect.addEventListener('focusout', onMilkTypeSelectFocusOut)}

function onMilkTypeSelectFocus(e) {
    const space = '&nbsp;'
    for (let milkTypeSelect of milkTypeSelects) {
        const depth = milkTypeSelect.options[milkTypeSelect.selectedIndex].getAttribute('depth') ?? 0
        if(milkTypeSelect.selectedIndex === 0) return
        milkTypeSelect.options[milkTypeSelect.selectedIndex].innerHTML = space.repeat(depth*3+1) + milkTypeSelect.options[milkTypeSelect.selectedIndex].text.trim()
    }
}

function onMilkTypeSelectFocusOut(e) {
    e.target.options[e.target.selectedIndex].text = e.target.options[e.target.selectedIndex].text.trim()
}

const newCheeseForm = document.querySelector('form[id=new_cheese_form]')

newCheeseForm.addEventListener('submit', onNewCheeseFormSubmit)

function onNewCheeseFormSubmit(e){
    window.onbeforeunload = null
}