const rules = {
    api: {

        // HTTP verb rules
        POST: ['organizer', 'UNAUTHENTICATED',],
        GET: ['organizer', 'UNAUTHENTICATED'],
        PUT: [],
        DELETE: [],

        // Entity endpoint rules
        active_password_reset: {
            POST: [],
            GET: [],
            PUT: [],
            DELETE: [],
        },
        allowed_role: {
            POST: [],
            GET: [],
            PUT: [],
            DELETE: [],
        },
        competition: {
            POST: [],
            GET: [],
            PUT: [],
            DELETE: [],
        },
        entry_fee_payment: {
            POST: [],
            GET: [],
            PUT: [],
            DELETE: [],
        },
        product: {
            POST: [],
            GET: ['organizer'],
            PUT: [],
            DELETE: [],
        },
        rating_picture: {
            POST: [],
            GET: [],
            PUT: [],
            DELETE: [],
        },
        rating: {
            POST: [],
            GET: [],
            PUT: [],
            DELETE: [],
        },
        user: {
            POST: [],
            GET: [],
            PUT: [],
            DELETE: [],
        },

        // Action endpoint rules
        confirm_registration: {
            GET: ['UNAUTHENTICATED'],
        },
        login: {
            POST: ['UNAUTHENTICATED'],
        },
        logout: {
            POST: ['organizer'],
        },
        registration: {
            POST: ['UNAUTHENTICATED'],
        },
    },
}

module.exports = rules