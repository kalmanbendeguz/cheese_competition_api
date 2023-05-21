const set_session_contexts = function(session, object) {

    //console.log('set_session_contexts')

    if(typeof session === 'undefined') return // // if session not exists, nothing to do
    if(typeof session.context === 'undefined') session.context = {}

    if(typeof object === 'undefined' || object === null) return

    for (const [key, value] of Object.entries(object)) {

        // undefined, Array, and "anything else" is distinct and matches our requirements 
        if(typeof session.context[key] === 'undefined') {
            session.context[key] = value
        } else if (Array.isArray(session.context[key])) {
            session.context[key].push(value)
        } else {
            session.context[key] = [session.context[key], value]
        }
    }
    
}

module.exports = set_session_contexts