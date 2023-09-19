module.exports = (produce, call, process) => async (p) => {
    const produced = await produce(p) // try catch this
    const result = await call(produced) // Don't try catch this
    const processed = await process(result) //try catch this
    return processed
}

module.exports = (produce, call, process, produce_error, process_error) => async (p) => {
    let produced
    try { produced = await produce(p) } catch (error) { return produce_error(error) }

    const result = await call(produced)

    let processed
    try { processed = await process(result) } catch (error) { return process_error(error) }
    return processed
}

const authorizer = (produce_functions, call_functions, process_functions, produce_error, process_error) => async (p) => {
    let produceds = []
    try {
        // Alternative 1
        for (const produce_function of produce_functions) {
            produceds.push(produce_function(p))
        }
        await Promise.all(produceds)
        // Alternative 2
        const produce_promises = produce_functions.map(produce_function => produce_function(p))
        produceds = await Promise.all(produce_promises)
    } catch (error) { produce_error(error) }

    const result = await call(authorized)

    let processeds = []
    try { /** ... the same as above */ } catch (error) { process_error(error) }
    return processeds
}

