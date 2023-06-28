const rules = {
    '/active_password_reset': {
        POST: ['SERVER'],
        GET: ['SERVER'],
        PUT: ['SERVER'],
        DELETE: ['SERVER'],
    },
    '/allowed_role': {
        POST: ['organizer', 'SERVER'],
        GET: ['competitor', 'judge', 'organizer', 'receiver', 'SERVER'],
        PUT: ['organizer', 'SERVER'],
        DELETE: ['organizer', 'SERVER'],
    },
    '/competition': {
        POST: ['organizer', 'SERVER'],
        GET: ['competitor', 'judge', 'organizer', 'receiver', 'SERVER'],
        PUT: ['organizer', 'SERVER'],
        DELETE: ['organizer', 'SERVER'],
    },
    '/entry_fee_payment': {
        POST: ['SERVER'],
        GET: ['organizer', 'SERVER'],
        PUT: ['SERVER'],
        DELETE: ['SERVER'],
    },
    '/product': {
        POST: ['competitor', 'SERVER'],
        GET: ['competitor', 'judge', 'organizer', 'receiver', 'SERVER'],
        PUT: ['competitor', 'organizer', 'receiver', 'SERVER'],
        DELETE: ['competitor', 'organizer', 'SERVER'],
    },
    '/rating_picture': {
        POST: ['judge', 'SERVER'],
        GET: ['judge', 'organizer', 'SERVER'],
        PUT: ['judge', 'organizer', 'SERVER'],
        DELETE: ['judge', 'organizer', 'SERVER'],
    },
    '/rating': {
        POST: ['SERVER'],
        GET: ['judge', 'organizer', 'SERVER'],
        PUT: ['judge', 'organizer', 'SERVER'],
        DELETE: ['organizer', 'SERVER'],
    },
    '/user': {
        POST: ['SERVER'],
        GET: ['competitor', 'judge', 'organizer', 'receiver', 'SERVER'],
        PUT: ['competitor', 'judge', 'organizer', 'receiver', 'SERVER'],
        DELETE: ['SERVER'],
    },
    '/login': {
        POST: ['UNAUTHENTICATED'],
        //GET: ['competitor', 'judge', 'organizer', 'receiver', 'SERVER'],
        //PUT: ['competitor', 'judge', 'organizer', 'receiver', 'SERVER'],
        //DELETE: ['SERVER'],
    },
    '/registration': {
        POST: ['UNAUTHENTICATED'],
        //GET: ['competitor', 'judge', 'organizer', 'receiver', 'SERVER'],
        //PUT: ['competitor', 'judge', 'organizer', 'receiver', 'SERVER'],
        //DELETE: ['SERVER'],
    },
    '/am_i_logged_in': {
        //POST: ['UNAUTHENTICATED'],
        GET: ['competitor', 'judge', 'organizer', 'receiver', 'SERVER', 'UNAUTHENTICATED'],
        //PUT: ['competitor', 'judge', 'organizer', 'receiver', 'SERVER'],
        //DELETE: ['SERVER'],
    },
}

module.exports = rules