const Joi = require('joi')

const rating_map_validator = (convert) => Joi.object().pattern(
    Joi.string()
        .trim()
        .pattern(
            new RegExp(
                `^0(_(0|[1-9][0-9]*))*$`
            )
        )
        .prefs({ convert: convert })
        .required(),
    Joi.number()
        .integer()
        .min(0)
        .prefs({ convert: convert })
        .required()
)
    .min(1)
    .custom((rating_map) => {
        // Only requirement about rating_map: the root (with node_id of 0) should have a matching record.
        if (!('0' in rating_map)) {
            throw new Error('rating_map_does_not_have_a_record_for_root_category')
        }
        return rating_map
    })
    .unknown(true)


module.exports = rating_map_validator
