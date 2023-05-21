const create_rating_object = function (req, res, next) {
    try {
        //console.log('create_rating_object')

        const anonymous_rating = typeof req.body.anonymous_rating !== 'undefined' ? true : false

        res.locals.rating_sheet.forEach((aspect, i) => {
            aspect.score = req.body[`score_${aspect.title}`]
            aspect.comment = req.body[`comment_${aspect.title}`]
            aspect.blocks.forEach((block, j) => {
                block.forEach((property) => {
                    if (!(`property_checkbox-${aspect.title}-${j + 1}-${property}` in req.body)) {
                        res.locals.rating_sheet[i].blocks[j] = res.locals.rating_sheet[i].blocks[j].filter(e => e !== property)
                    }
                })
            })
        })

        res.locals.rating = new req.app.models.rating({
            secret_id: req.body.secret_id,
            judge_email: req.user.email,
            anonymous: anonymous_rating,
            aspects: res.locals.rating_sheet,
            overall_impression: req.body.overall_impression,
            table_leader: req.user.table_leader
        })

        return next()
    } catch (err) {
        return next(err)
    }
}


module.exports = create_rating_object