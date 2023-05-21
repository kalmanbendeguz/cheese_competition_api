const get_association_member_array_from_body = function() {

    return function(req, res, next) {
        //console.log('get_association_member_array_from_body')

        res.locals.association_members = Object.keys(req.body).map(x => x.slice("association_member_".length))
        
        console.log(res.locals.association_members)

        return next()
    }
}

module.exports = get_association_member_array_from_body