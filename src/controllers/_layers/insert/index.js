const layer = require('../layer')

const validate = require('./validate_document')
const validate_error = require('./validate_document_error')
const save = require('../save')
const empty_process = require('../empty_process')
const empty_process_error = require('../empty_process_error')


// an insert gets from the constructer: ??
const insert = (schema_validator) => layer(validate(schema_validator), save, empty_process, validate_error, empty_process_error)

module.exports = insert

/**
 * 
 * const insert_rating = insert
 */