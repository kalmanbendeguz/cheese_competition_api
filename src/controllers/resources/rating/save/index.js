//const save_rating = async (validated_document, session) => {
//    try 
//    const produced = await validated_document.save({session: session})
//    return produced
//}

const produce = require('./save_document')
const call = (x) => ({result: x, rest: []})
const process = (x) => x
const produce_error = '...'
const process_error = '...'

const save_rating = (produce, call, process, produce_error, process_error) => async (...p) => {
    let produced
    try { produced = await produce(...p) } catch (error) { return produce_error(error) } // az összeset megkapja, spreadelve.
    // tehát számít a sorrend
    // produced = {produced: ..., rest: [...]} // előállít EGY darab újat, és eldönti, hogy emellett 
    // az eredetiekből hányat ad vissza.

    const result = await call(produced)
    // result = {result: ..., rest: [...]}

    let processed
    try { processed = await process(result) } catch (error) { return process_error(error) }
    // processed should be only one value. 
    // egy dolognak szabad visszatérnie.
    //processed = {...}
    return processed
}

module.exports = save_rating

module.exports = layer

const layer = require('../layer')

const start_transaction = require('./start_transaction')
const start_transaction_error = require('./start_transaction_error')
const accessor = require('../accessor')
const end_transaction = require('./end_transaction')
const end_transaction_error = require('./end_transaction_error')

// a controller gets from the middleware: data, actor.
const controller = layer(start_transaction, accessor, end_transaction, start_transaction_error, end_transaction_error)

module.exports = controller