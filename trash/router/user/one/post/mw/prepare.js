module.exports = async function (req, res, next) {
    try {
        console.log('mw:prepare(product/one/post/mw/prepare)')
        // GOAL: PRODUCE FILTER AND PROJECTION OBJECTS COMPLETELY.
        // NO ERRORS OR DENIALS SHOULD HAPPEN HERE
        // BUT CONDITIONAL LOGIC CAN TAKE PLACE

        const manufacturer_id = req.user._id // we know he is a competitor

        const randomstring = require('randomstring')
        const forbidden_id_parts = require('../../../../../../../static/forbidden_id_parts')
        const Product_Model = require('../../../../../../../models/Product')

        let existing_product
        let is_forbidden_part

        let public_id
        do {
            const letters = randomstring.generate({
                length: 3,
                charset: 'alphabetic',
                capitalization: 'lowercase'
            })
            const numbers = randomstring.generate({
                length: 3,
                charset: 'numeric',
            })
            public_id = `${letters}${numbers}`
            existing_product = await Product_Model.exists({ 'public_id': public_id }) || await Product_Model.exists({ 'secret_id': public_id })

            is_forbidden_part = forbidden_id_parts.includes(letters)
        } while (existing_product || is_forbidden_part)

        let secret_id
        do {
            const letters = randomstring.generate({
                length: 3,
                charset: 'alphabetic',
                capitalization: 'lowercase'
            })
            const numbers = randomstring.generate({
                length: 3,
                charset: 'numeric',
            })
            secret_id = `${letters}${numbers}`
            existing_product = await Product_Model.exists({ 'public_id': secret_id }) || await Product_Model.exists({ 'secret_id': secret_id })

            is_forbidden_part = forbidden_id_parts.includes(letters)
        } while (existing_product || is_forbidden_part)


        res.locals._product = {
            competition_id: req.body.competition_id,
            manufacturer_id: manufacturer_id,
            public_id: public_id,
            secret_id: secret_id,
            product_name: req.body.product_name,
            factory_name: req.body.factory_name,
            maturation_time_type: req.body.maturation_time_type,
            ...(req.body.maturation_time_type === 'matured' && { maturation_time_quantity: req.body.maturation_time_quantity }),
            ...(req.body.maturation_time_type === 'matured' && { maturation_time_unit: req.body.maturation_time_unit }),
            milk_type: req.body.milk_type,
            product_category_list: req.body.product_category_list,
            product_description: req.body.product_description,
        }

        return next()
    } catch (err) {
        return next(err)
    }
}
