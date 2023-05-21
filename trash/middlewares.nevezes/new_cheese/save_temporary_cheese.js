const save_temporary_cheese = async function (req, res, next) {
    try {
        //console.log('save_temporary_cheese')
        const randomstring = require('randomstring')
        const bad_words = require('../../static/json/bad_words')

        let existing_cheese
        let is_bad_word

        let public_id
        do {
            const letters = randomstring.generate({
                length: 3,
                charset: 'alphabetic',
                capitalization: 'uppercase'
            })
            const numbers = randomstring.generate({
                length: 3,
                charset: 'numeric',
            })
            public_id = `${letters}${numbers}`
            existing_cheese = await req.app.models.cheese.exists({ 'public_id': public_id }) || await req.app.models.cheese.exists({ 'secret_id': public_id }) ||
                await req.app.models.temporary_cheese.exists({ 'cheese.public_id': public_id }) || await req.app.models.temporary_cheese.exists({ 'cheese.secret_id': public_id }) ||
                await req.app.models.archived_cheese.exists({ 'public_id': public_id }) || await req.app.models.archived_cheese.exists({ 'secret_id': public_id }) ||
                await req.app.models.unpaid_cheese.exists({ 'product.public_id': public_id }) || await req.app.models.unpaid_cheese.exists({ 'product.secret_id': public_id })

            is_bad_word = bad_words.includes(letters)
        } while (existing_cheese || is_bad_word)

        let secret_id
        do {
            const letters = randomstring.generate({
                length: 3,
                charset: 'alphabetic',
                capitalization: 'uppercase'
            })
            const numbers = randomstring.generate({
                length: 3,
                charset: 'numeric',
            })
            secret_id = `${letters}${numbers}`
            existing_cheese = await req.app.models.cheese.exists({ 'secret_id': secret_id }) || await req.app.models.cheese.exists({ 'public_id': secret_id }) ||
                await req.app.models.temporary_cheese.exists({ 'cheese.secret_id': secret_id }) || await req.app.models.temporary_cheese.exists({ 'cheese.public_id': secret_id }) ||
                await req.app.models.archived_cheese.exists({ 'secret_id': secret_id }) || await req.app.models.archived_cheese.exists({ 'public_id': secret_id }) ||
                await req.app.models.unpaid_cheese.exists({ 'product.secret_id': secret_id }) || await req.app.models.unpaid_cheese.exists({ 'product.public_id': secret_id })

            is_bad_word = bad_words.includes(letters)
        } while (existing_cheese || is_bad_word)

        res.locals.cheese = req.body
        res.locals.cheese.public_id = public_id
        res.locals.cheese.secret_id = secret_id
        res.locals.cheese.product_category_list = res.locals.category_array

        const user = await req.app.models.user.findOne({ 'email': req.user.email })
        res.locals.cheese.manufacturer = user.id

        const cheese = new req.app.models.cheese(
            res.locals.cheese
        )

        await req.app.models.temporary_cheese.create({
            confirm_id: res.locals.confirm_id,
            cheese: cheese
        }
        )

        return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = save_temporary_cheese