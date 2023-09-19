const layer = (produce, call, process, produce_error, process_error) => async (...p) => {
    let produced
    try { produced = await produce(...p) } catch (error) { return produce_error(error, ...p) } // az összeset megkapja, spreadelve.
    // tehát számít a sorrend
    // produced = {produced: ..., rest: [...]} // előállít EGY darab újat, és eldönti, hogy emellett 
    // az eredetiekből hányat ad vissza.

    const result = await call(produced)
    // result = {result: ..., rest: [...]}

    let processed
    try { processed = await process(result) } catch (error) { return process_error(error, produced, result, ...p) }
    // processed should be only one value. 
    // egy dolognak szabad visszatérnie.
    //processed = {...}
    return processed
}

module.exports = layer