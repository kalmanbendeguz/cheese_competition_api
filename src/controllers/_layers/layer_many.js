const layer_many = (produce, call, process, produce_error, process_error) => async (...p) => {
    let produceds
    try { produceds = await produce(...p) } catch (error) { return produce_error(error) }
    // a produceds ebben az esetben egy tömb lesz, like that:
    // produceds = [{produced: ..., rest: [...]}, {produced: ..., rest: [...]}, ... ] 

    const results = await Promise.all(produceds.map(produced => call(produced)))
    // results = [{result: ..., rest: [...]}, {result: ..., rest: [...]}, ... ]
    
    let processeds
    try { processeds = await Promise.all(results.map(result => process(result))) } catch (error) { return process_error(error) }
    return processeds
    // processeds = [{...}, {...}, ...]
    // im not sure if this should return an array, or the array should only be a property of the returned object.
}

module.exports = layer_many