const render = function (view) {

    return function (req, res, next) {
        try {
            //console.log(`render ${view}`)
            return res.render(view)
        } catch (err) {
            return next(err)
        }
    }
  
}

module.exports = render