const req_files_to_req_body_content = (req, res, next) => {
    
    if (Array.isArray(req.body?.content)) {
        if(req.files.length !== req.body.content.length) return next()

        for (let i = 0; i < req.body.content.length; ++i) {
            req.body.content[i].picture = req.files[i]
        }
    } else if('body' in req && Object.isExtensible(req.body.content)){
        if(req.files.length !== 1) return next()
        
        req.body.content.picture = req.files[0]
    }

    return next()
}

module.exports = req_files_to_req_body_content