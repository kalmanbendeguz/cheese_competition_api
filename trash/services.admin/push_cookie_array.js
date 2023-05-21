const push_cookie_array = function(req, res, cookie_array_key, value) {

    console.log('push_cookie_array')

    let cookie_array

    if(typeof req.cookies === 'undefined' || typeof req.cookies.hasOwnProperty !== 'function') return

    if(req.cookies.hasOwnProperty(cookie_array_key)) {
        cookie_array = JSON.parse(req.cookies[cookie_array_key])
    } else {
        cookie_array = []
    }

    if(!Array.isArray(cookie_array)) return

    cookie_array.push(value)

    res.cookie(cookie_array_key, JSON.stringify(cookie_array), {httpOnly: true})
    
}

module.exports = push_cookie_array