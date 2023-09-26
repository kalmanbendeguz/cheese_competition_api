const rating_satisfies_sheet = (rating_aspects, rating_sheet_aspects) => {
    try {
        // aspects array length should be correct.
        if (rating_aspects.length !== rating_sheet_aspects.length) {
            return false
        }

        // aspect titles should be correct and in the correct order.
        for (let i = 0; i < rating_aspects.length; ++i) {
            if (rating_aspects[i].title !== rating_sheet_aspects[i].title) {
                return false
            }
        }

        // aspect scores should be in the specified range.
        for (let i = 0; i < rating_aspects.length; ++i) {
            if (rating_aspects[i].score > rating_sheet_aspects[i].score) {
                return false
            }
        }

        // each aspect's attributes length should be correct
        for (let i = 0; i < rating_aspects.length; ++i) {
            if (rating_aspects[i].attributes.length !== rating_sheet_aspects[i].attributes.length) {
                return false
            }
        }

        // each aspect's attributes can only contain a subset of the original aspect's attributes
        for (let i = 0; i < rating_aspects.length; ++i) {

            // each attribute should be present in the original attributes
            for (let j = 0; j < rating_aspects[i].attributes.length; ++j) {
                if (!rating_sheet_aspects[i].attributes.includes(rating_aspects[i].attributes[j])) {
                    return false
                }
            }

            // we need to check if the order is correct
            const provided_elements_in_original_order = rating_sheet_aspects[i].attributes
                .filter(attribute => rating_aspects[i].attributes.includes(attribute))
            for (let j = 0; j < rating_aspects[i].attributes.length; ++j) {
                if (rating_aspects[i].attributes[j] !== provided_elements_in_original_order[j]) {
                    return false
                }
            }
        }

        return true
    } catch (error) {
        throw {
            type: 'rating_satisfies_sheet_error',
            error: error
        }
    }
}

module.exports = rating_satisfies_sheet