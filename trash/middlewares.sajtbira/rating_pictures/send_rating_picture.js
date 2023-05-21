const send_rating_picture = function (req, res, next) {
    try {
        //console.log('send_rating_picture')

      const picture_buffer = Buffer.from(res.locals.rating_picture.buffer.buffer, 'hex')

      res.set('Content-Type', res.locals.rating_picture.mimetype)

      return res.send(picture_buffer)
    } catch (err) {
        return next(err)
    }
}

module.exports = send_rating_picture