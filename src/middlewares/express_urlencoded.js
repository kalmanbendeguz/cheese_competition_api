const express = require('express')

const express_urlencoded_mw = express.urlencoded({
    extended: true,
    inflate: true,
    limit: '100kb',
    parameterLimit: 1000,
    type: 'application/x-www-form-urlencoded',
    verify: undefined,
})

module.exports = express_urlencoded_mw