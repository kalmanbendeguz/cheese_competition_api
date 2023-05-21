const redirect_to_view_ratings = function() {

    return function (req, res, next) {
        console.log('redirect_to_view_ratings')
        
        return res.redirect(`/view_ratings?public_id=${res.locals.cheese.public_id}`)
    }
  
}

module.exports = redirect_to_view_ratings