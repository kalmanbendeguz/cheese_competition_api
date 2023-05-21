const max_file_size_in_bytes = 512 * 1024

const add_picture_button = document.querySelector('#add_picture')
const remove_picture_buttons = document.querySelectorAll('.remove_picture_button')
const picture_inputs = document.querySelectorAll('.picture_input')
const picture_previews = document.querySelector('.picture_preview')

add_picture_button.addEventListener('click', on_add_picture_button_click)

for (let remove_picture_button of remove_picture_buttons) {
    remove_picture_button.addEventListener('click', on_remove_picture_button_click)
}

function on_add_picture_button_click(e) {
    const hidden_picture_input_blocks = document.querySelectorAll('div.picture_input_block[style*="display: none;"], div.picture_input_block[style*="display:none;"], div.picture_input_block[style*="display: none"], div.picture_input_block[style*="display:none"]')
    if (hidden_picture_input_blocks.length === 1) {
        e.target.disabled = true
        const max_picture_reached_div = document.querySelector("#max_picture_count_reached")
        max_picture_reached_div.style.display = 'flex'
    }
    const next_picture_input_block = hidden_picture_input_blocks[0]
    const next_picture_input = next_picture_input_block.querySelector('input')
    const next_picture_input_label = next_picture_input_block.querySelector('.picture_input_label')

    next_picture_input.disabled = false
    next_picture_input_block.style.display = 'flex'
    next_picture_input.style.display = 'flex'
    next_picture_input_label.style.display = 'flex'
}

function on_remove_picture_button_click(e) {
    e.target.parentNode.style.display = 'none'
    const max_picture_reached_div = document.querySelector("#max_picture_count_reached")
    max_picture_reached_div.style.display = 'none'
    add_picture_button.disabled = false

    const picture_input = e.target.parentNode.querySelector('input')
    picture_input.disabled = true

    const picture_preview = e.target.parentNode.querySelector('.picture_preview')
    picture_preview.innerHTML = ''

    const progress_bar_div = e.target.parentNode.querySelector('.progress_bar')
    progress_bar_div.style.display = 'none'

    e.target.parentNode.parentNode.appendChild(e.target.parentNode)

    e.target.style.display = 'none'
}

for (let picture_input of picture_inputs) {
    picture_input.style.opacity = 0
    picture_input.addEventListener('change', update_image_display)
}

const compress_options = {
    maxSizeMB: max_file_size_in_bytes / 1024 / 1024,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: 'image/png',
    //onProgress: picture_compress_on_progress
}

async function update_image_display(e) {
    const picture_preview = e.target.parentNode.querySelector('.picture_preview')
    const picture_input = e.target.parentNode.querySelector('.picture_input')
    const progress_bar_div = e.target.parentNode.querySelector('.progress_bar')
    const remove_picture_button = e.target.parentNode.querySelector('.remove_picture_button')
    const picture_input_label = e.target.parentNode.querySelector('.picture_input_label')

    picture_input.style.display = 'none'
    picture_input_label.style.display = 'none'

    if (picture_preview.hasChildNodes()) {
        picture_preview.innerHTML = ''
    }

    if (picture_input.files.length === 0) return

    //console.log('originalFile instanceof Blob', picture_input.files[0] instanceof Blob);
    //console.log(`originalFile size ${picture_input.files[0].size} B`)

    progress_bar_div.style.display = 'flex'

    try {
        const new_blob = await imageCompression(picture_input.files[0], {...compress_options, onProgress: picture_compress_on_progress(progress_bar_div) } )
    
        //console.log('compressedFile instanceof Blob', new_blob instanceof Blob) // true
        //console.log(`compressedFile size ${new_blob.size} B`) // smaller than maxSizeMB

        const new_file = new File([new_blob], new_blob.name, { type: new_blob.type })
        const new_file_list = new DataTransfer()
        new_file_list.items.add(new_file)

        picture_input.files = new_file_list.files
    } catch (error) {
        console.log(error)
    }
    const image = document.createElement('img')
    image.src = URL.createObjectURL(picture_input.files[0])

    console.log(`current_file.size: ${picture_input.files[0].size}`)
    picture_preview.innerHTML = ''
    picture_preview.appendChild(image)

    remove_picture_button.style.display = 'flex'
}

function picture_compress_on_progress(progress_bar){
    return function(p){
        progress_bar.style.setProperty('--width', p)
        if(p === 100) {
            progress_bar.style.display = 'none'
            progress_bar.style.setProperty('--width', 0)
        }
    }
}

const preloaded_picture_blocks = document.querySelectorAll('div.picture_input_block.preloaded')

for (let i=0; i<preloaded_picture_blocks.length; ++i ) {
    const file_input = preloaded_picture_blocks[i].querySelector('.picture_input')
    const data_transfer = new DataTransfer()

    const picture_preview_div = preloaded_picture_blocks[i].querySelector('.picture_preview')
    const picture_preview_img = picture_preview_div.querySelector('img')
    const picture_url = picture_preview_img.src
    fetch(picture_url)
        .then(response => response.blob())
        .then(picture_blob => {
            const picture_file = new File([picture_blob], `picture_${i+1}.png`, {type: picture_blob.type})
            data_transfer.items.add(picture_file)
            file_input.files = data_transfer.files
        })
}

if(preloaded_picture_blocks.length === 5) {
    add_picture_button.disabled = true
    const max_picture_reached_div = document.querySelector("#max_picture_count_reached")
    max_picture_reached_div.style.display = 'flex'
}