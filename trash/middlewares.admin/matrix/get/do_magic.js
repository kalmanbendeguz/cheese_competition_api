const do_magic = function() {

    return async function(req, res, next) {
        console.log('do_magic')
        
        res.locals.matrix = []
        res.locals.matrix[0] = res.locals.judges.map(judge => judge.full_name)
        res.locals.matrix[0].unshift("")

       // res.locals.cheeses.sort(function compareFn(a, b) { a. })

        res.locals.cheeses.forEach(cheese => {
            let row = []
            row.push(cheese.product_name)
            res.locals.matrix.push(row)
        })

        res.locals.ratings.forEach(rating => {
            let score_sum = 0
            rating.aspects.forEach(aspect => {
                score_sum += parseInt(aspect.score)
            })
            let column = res.locals.judges.map(judge => judge.email).indexOf(rating.judge_email)
            if(column !== -1) {
                column += 1
                let row = res.locals.cheeses.map(cheese => cheese.secret_id).indexOf(rating.secret_id)
                if(row !== -1) {
                    row +=1
                    res.locals.matrix[row][column] = score_sum
                }
            }
        })

        console.log(res.locals.matrix)
        
        return next()

    }
}

module.exports = do_magic