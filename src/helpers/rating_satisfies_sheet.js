const rating_satisfies_sheet = (rating_aspects, rating_sheet_aspects) => {

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

    // each aspects blocks length should be correct
    for (let i = 0; i < rating_aspects.length; ++i) {
        if (rating_aspects[i].blocks.length !== rating_sheet_aspects[i].blocks.length) {
            return false
        }
    }

    // each aspect block can only contain a subset of the original block
    for (let i = 0; i < rating_aspects.length; ++i) {
        for (let j = 0; j < rating_aspects[i].blocks.length; ++j) {
            // each property should be present in the matching original block
            for (let k = 0; k < rating_aspects[i].blocks[j].length; ++k) {
                if (!rating_sheet_aspects[i].blocks[j].includes(rating_aspects[i].blocks[j][k])) {
                    return false
                }
            }
            // we need to check if the order is correct
            const provided_elements_in_original_order = rating_sheet_aspects[i].blocks[j]
                .filter(property => rating_aspects[i].blocks[j].includes(property))
            for (let k = 0; k < rating_aspects[i].blocks[j].length; ++k) {
                if (rating_aspects[i].blocks[j][k] !== provided_elements_in_original_order[k]) {
                    return false
                }
            }
        }
    }

    return true
}

module.exports = rating_satisfies_sheet