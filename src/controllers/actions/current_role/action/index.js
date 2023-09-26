const current_role = async (/* ...data */ actor, /* session */) => {

    return actor.role ?? 'UNAUTHENTICATED'

}

module.exports = current_role