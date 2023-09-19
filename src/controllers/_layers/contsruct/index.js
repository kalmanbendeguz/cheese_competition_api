const layer = require('../layer')

const construct_document = require('./construct_document')
const construct_document_error = require('./construct_document_error')
const insert = require('../insert')
const empty_process = require('../empty_process')
const empty_process_error = require('../empty_process_error')


// an construct gets from the generator: ??
const construct = (model) => layer(construct_document(model), insert, empty_process, construct_document_error, empty_process_error)

module.exports = construct

//const construct = (model, insert) => async (document_to_construct, session) => {