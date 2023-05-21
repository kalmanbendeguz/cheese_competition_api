const render = function (view) {

    return function (req, res, next) {
        console.log('render')
        return res.render(view)
    }
  
}

module.exports = render