module.exports = async function (req, res, next) {
    try {
        console.log('mw:reply(product/many/del/mw/reply)')

        return res.sendStatus(200)

    } catch (err) {
        return next(err)
    }
}