module.exports = async function () {
    const path = require('path')
    const fs = require('fs').promises
    const fs_sync = require('fs')
    const minify = (await import('minify')).minify
    const file = require('file')

    // HTML
    const original_views_directory = path.resolve('./src/views/original')
    const minified_views_directory = path.resolve('./src/views')

    let view_files = []
    file.walkSync(original_views_directory, function (current_directory, directories, files) {
        for (let file of files) {
            view_files.push(path.join(current_directory, file))
        }
    })

    for (let view_file of view_files) {
        const relative_path = path.relative(original_views_directory, view_file)
        const minified_path = path.join(minified_views_directory, relative_path)

        if (!fs_sync.existsSync(path.dirname(minified_path))) { await fs.mkdir(path.dirname(minified_path)) }

        const new_name = path.format({ ...path.parse(view_file), base: '', ext: '.html' })
        await fs.rename(view_file, new_name)
        const minified = await minify(new_name)
        await fs.rename(new_name, view_file)

        await fs.writeFile(path.join(minified_views_directory, relative_path), minified)
    }


    // CSS
    const original_css_directory = path.resolve('./src/static/css/original')
    const minified_css_directory = path.resolve('./src/static/css')

    let css_files = []
    file.walkSync(original_css_directory, function (current_directory, directories, files) {
        for (let file of files) {
            css_files.push(path.join(current_directory, file))
        }
    })

    for (let css_file of css_files) {
        const relative_path = path.relative(original_css_directory, css_file)
        const minified_path = path.join(minified_css_directory, relative_path)

        if (!fs_sync.existsSync(path.dirname(minified_path))) { await fs.mkdir(path.dirname(minified_path)) }
        const minified = await minify(css_file)
        await fs.writeFile(path.join(minified_css_directory, relative_path), minified)
    }


    // JS
    const original_js_directory = path.resolve('./src/static/scripts/original')
    const minified_js_directory = path.resolve('./src/static/scripts')

    let js_files = []
    file.walkSync(original_js_directory, function (current_directory, directories, files) {
        for (let file of files) {
            js_files.push(path.join(current_directory, file))
        }
    })

    for (let js_file of js_files) {
        const relative_path = path.relative(original_js_directory, js_file)
        const minified_path = path.join(minified_js_directory, relative_path)

        if (!fs_sync.existsSync(path.dirname(minified_path))) { await fs.mkdir(path.dirname(minified_path)) }
        const minified = await minify(js_file)
        await fs.writeFile(path.join(minified_js_directory, relative_path), minified)
    }

    console.log('Minifying was successful.')
}