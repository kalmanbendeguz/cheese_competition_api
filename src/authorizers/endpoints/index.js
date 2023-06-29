const rules = {
    api: {
        POST: ['competitor', 'judge', 'organizer', 'SERVER', 'UNAUTHENTICATED'],
        GET: ['competitor', 'judge', 'organizer', 'receiver', 'SERVER', 'ROLELESS'],
        PUT: ['competitor', 'judge', 'organizer', 'receiver', 'SERVER'],
        DELETE: ['competitor', 'judge', 'organizer', 'SERVER'],

        active_password_reset: {
            POST: ['SERVER'],
            GET: ['SERVER'],
            PUT: ['SERVER'],
            DELETE: ['SERVER'],
        },
        allowed_role: {
            POST: ['organizer', 'SERVER'],
            GET: ['competitor', 'judge', 'organizer', 'receiver', 'SERVER'],
            PUT: ['organizer', 'SERVER'],
            DELETE: ['organizer', 'SERVER'],
        },
        competition: {
            POST: ['organizer', 'SERVER'],
            GET: ['competitor', 'judge', 'organizer', 'receiver', 'SERVER'],
            PUT: ['organizer', 'SERVER'],
            DELETE: ['organizer', 'SERVER'],
        },
        entry_fee_payment: {
            POST: ['SERVER'],
            GET: ['organizer', 'SERVER'],
            PUT: ['SERVER'],
            DELETE: ['SERVER'],
        },
        product: {
            POST: ['competitor', 'SERVER'],
            GET: ['competitor', 'judge', 'organizer', 'receiver', 'SERVER'],
            PUT: ['competitor', 'organizer', 'receiver', 'SERVER'],
            DELETE: ['competitor', 'organizer', 'SERVER'],
        },
        rating_picture: {
            POST: ['judge', 'SERVER'],
            GET: ['judge', 'organizer', 'SERVER'],
            PUT: ['judge', 'organizer', 'SERVER'],
            DELETE: ['judge', 'organizer', 'SERVER'],
        },
        rating: {
            POST: ['SERVER'],
            GET: ['judge', 'organizer', 'SERVER'],
            PUT: ['judge', 'organizer', 'SERVER'],
            DELETE: ['organizer', 'SERVER'],
        },
        user: {
            POST: ['SERVER'],
            GET: ['competitor', 'judge', 'organizer', 'receiver', 'SERVER'],
            PUT: ['competitor', 'judge', 'organizer', 'receiver', 'SERVER'],
            DELETE: ['SERVER'],
        },
        registration: {
            POST: ['UNAUTHENTICATED'],
        },
        login: {
            POST: ['UNAUTHENTICATED'],
        },
        logout: {
            POST: ['competitor', 'judge', 'organizer', 'receiver', 'ROLELESS'],
        },
    },
}

module.exports = rules