const layer = require('../layer')

const save_document = require('./save_document')
const save_document_error = require('./save_document_error')
const empty_call = require('../empty_call')
const empty_process = require('../empty_process')
const empty_process_error = require('../empty_process_error')

// a controller gets from the middleware: data, actor.
const save = layer(save_document, empty_call, empty_process, save_document_error, empty_process_error)
// it will get: document, session

module.exports = save