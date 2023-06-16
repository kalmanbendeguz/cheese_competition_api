const Joi = require('joi')

const query_validator = Joi.object({
    filter: Joi.object({
        _id: Joi.any().optional(),
        name: Joi.any().optional(),
        place: Joi.any().optional(),
        creation_date: Joi.any().optional(),
        last_entry_open_date: Joi.any().optional(),
        last_entry_close_date: Joi.any().optional(),
        last_competition_open_date: Joi.any().optional(),
        last_competition_close_date: Joi.any().optional(),
        archival_date: Joi.any().optional(),
        archived: Joi.any().optional(),
        entry_opened: Joi.any().optional(),
        competition_opened: Joi.any().optional(),
        payment_needed: Joi.any().optional(),
        association_members_need_to_pay: Joi.any().optional(),
        entry_fee_amount: Joi.any().optional(),
        entry_fee_currency: Joi.any().optional(),
        product_category_tree: Joi.any().optional(),
        certificate_template: Joi.any().optional(),
        ignore_extreme_values: Joi.any().optional()
    }).optional(),
    projection: Joi.array().items(
        Joi.string().trim().min(1).required().prefs({ convert: false }),
    ).unique().min(1).optional(),
    options: Joi.object({
        //tailable
        //limit
        //skip
        //allowDiskUse
        //batchSize
        //readPreference
        //hint
        //comment
    }).optional(),
}).required()

module.exports = query_validator
/**
 * 
 *         _id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
        competition_id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
        manufacturer_id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
        public_id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
        secret_id: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
        product_name: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
        factory_name: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
        maturation_time_type: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
        maturation_time_quantity: Joi.number().integer().positive().optional(),
        maturation_time_unit: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
        milk_type: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
        product_category_list: Joi.array().items(
            Joi.string().trim().min(1).prefs({ convert: false })
        ).optional().min(1),
        approved: Joi.boolean().optional(),
        approval_type: Joi.string().trim().min(1).prefs({ convert: false }).optional(),
        handed_in: Joi.boolean().optional(),

 *   // fields not belonging to the model // change of plans, i dont need this
        //competition_name: Joi.string().trim().optional().min(1).prefs({ convert: false }),
        //archived: Joi.boolean().optional(),
        //manufacturer_username: Joi.string().trim().optional().min(1).prefs({ convert: false }), // we dont need this

        // sorting
        sort_by: Joi.array().items(
            Joi.object({
                key: Joi.string().trim().required().valid(
                    'createdAt', 'updatedAt', 'public_id', 'secret_id',
                    'product_name', 'factory_name').prefs({ convert: false }),
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
 */