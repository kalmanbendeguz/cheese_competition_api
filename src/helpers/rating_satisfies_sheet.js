const rating_satisfies_sheet = (rating, rating_sheet) => {
    return true
}

module.exports = rating_satisfies_sheet

//(aspects, rating_sheet) => true/false
// is the array of titles the same? it needs to be the same order as well.
// is the array of scores in the range?
// blocks' horizontal length okay?
// for each block: is the array every element included in the sheets blockarray?
 //(!rating_satisfies_sheet(rating, rating_sheet))