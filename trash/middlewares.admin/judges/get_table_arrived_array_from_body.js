const get_table_arrived_array_from_body = function() {

    return function(req, res, next) {
        console.log('get_table_arrived_array_from_body')

        //console.log(req.body)

        res.locals.table_arrived = Object.keys(req.body).filter(x => x.startsWith('table_arrived')).map(x => x.slice("table_arrived_".length))
        
        //console.log(res.locals.table_arrived)

        return next()
    }
}

module.exports = get_table_arrived_array_from_body