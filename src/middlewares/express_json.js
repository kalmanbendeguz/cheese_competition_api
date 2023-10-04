const express = require('express')

const express_json_mw = express.json({
    inflate: true,
    limit: '200kb',
    strict: true,
    type: 'application/json',
})

module.exports = express_json_mw