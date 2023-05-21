const render_not_found = function (req, res, next) {
    try {
        //console.log('render_not_found')

        return res.status(404).render('error')

    } catch (err) {
        return next(err)
    }
}

module.exports = render_not_found