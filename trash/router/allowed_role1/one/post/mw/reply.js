module.exports = async function (req, res, next) {
    try {
        console.log('mw:reply(allowed_organizer/one/post/mw/reply)')

        // only organizers use this
        res.location(`/api/a/allowed_judge/o?_id=${res.locals.allowed_judge._id}`)

        return res.sendStatus(201)

    } catch (err) {
        return next(err)
    }
}