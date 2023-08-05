const multer = require('multer')

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        /** Maximum size of each form field name in bytes. (Default: 100) */
        fieldNameSize: 256,
        /** Maximum size of each form field value in bytes. (Default: 1048576) */
        fieldSize: 5242880, // 5 MiB = 5 * 1024^2 bytes
        /** Maximum size of each file in bytes. (Default: Infinity) */
        fileSize: 5242880, // 5 MiB = 5 * 1024^2 bytes
    }
})

/**
* Returns middleware that processes all files contained in the multipart
* request.
*
* The `Request` object will be populated with a `files` array containing
* an information object for each processed file.
*/
const multer_upload_any = upload.any()

const req_files_to_req_body = (req, res, next) => {
    if (Array.isArray(req.body)) {
        for (let i = 0; i < req.body.length; ++i) {
            req.body[i].picture = req.files[i]
        }
    } else {
        req.body.picture = req.files[0]
    }

    return next()
}

const multer_to_body_rating_picture = [multer_upload_any, req_files_to_req_body]

module.exports = multer_to_body_rating_picture