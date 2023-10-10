const action = (req) => {
    return req?.user?.role ?? 'UNAUTHENTICATED'
}

module.exports = action