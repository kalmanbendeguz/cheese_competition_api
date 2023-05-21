const get_registered_allowed_judges = function() {

    return async function(req, res, next) {
        console.log('get_registered_allowed_judges')
        
        for(let allowed_judge of res.locals.allowed_judges) {

            let existing_judge = res.locals.judges.find((judge) => judge.email === allowed_judge.email)

            if(typeof existing_judge !== 'undefined') {
                allowed_judge.registered = true
                allowed_judge.judge = existing_judge
            } else {
                allowed_judge.registered = false
                allowed_judge.judge = null
            }

        }
        
        return next()

    }
}

module.exports = get_registered_allowed_judges