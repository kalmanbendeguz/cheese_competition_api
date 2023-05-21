const send_status_200 = function (req, res, next) {
    try {
        //console.log('send_status_200')

        return res.sendStatus(200)

    } catch (err) {
        return next(err)
    }
}

module.exports = send_status_200