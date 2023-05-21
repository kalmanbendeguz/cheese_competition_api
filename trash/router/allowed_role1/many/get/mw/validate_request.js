module.exports = async function (req, res, next) {
    try {
        console.log('mw:validate(product/many/get/mw/validate)')

        // success if req is valid for this request role-independently
        // fail if invalid
        const Joi = require('joi')

        // todo: exact, vagy partial keresés lehetőségének megadása, search by range lehetőségének megadása,
        // egyéb
        const req_validator = Joi.object({
            query: Joi.object({
                _id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
                email: Joi.string().email().optional(),

                // sorting
                sort_by: Joi.array().items(
                    Joi.object({
                        key: Joi.string().trim().required().valid('email').prefs({ convert: false }),
                        order: Joi.string().trim().required().valid('asc', 'desc').prefs({ convert: false }),
                    }).unknown(false)
                ).unique().min(1).optional(), 
                // todo: sort by maturation time (külön metódus/logika kell hozzá)
                // todo: nyelvfüggő sorting. (máshogy nem lehet? backenden van egyáltalán nyelv? nem kéne!!! ha a frontend 
                // paginationt csinál akkor ez mégis hogy lesz megoldva? tiltsuk le a nyelvfüggő sortingot hiszen ez valójában
                // egy csoportosítás/szűrés művelet?) szívem szerint letiltanám.

                // pagination
                page: Joi.number().integer().positive().optional(),
                page_size: Joi.number().integer().positive().optional(),

                // projection
                projection: Joi.array().items(
                    Joi.string().trim().min(1).required().prefs({ convert: false }),
                ).unique().min(1).optional(),

            }).required()
        }).unknown(true)

        try {
            await req_validator.validateAsync(req)
        } catch (err) {
            return res.status(400).json(err.details)
        }

        return next()
    } catch (err) {
        return next(err)
    }
}