const multer = require('multer')

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        /** Maximum size of each form field name in bytes. (Default: 100) */
        fieldNameSize: 200,
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

module.exports = multer_upload_any