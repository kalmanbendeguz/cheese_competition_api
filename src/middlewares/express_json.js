const express = require('express')

const express_json = express.json({
    inflate: true,
    limit: '200kb',
    strict: true,
    type: 'application/json',
})

module.exports = express_json