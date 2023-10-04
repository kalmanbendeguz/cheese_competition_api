const authorize_endpoint = (req, res, next) => {

    const authenticated_char = req.isAuthenticated() ? 'A' : 'U'
    const method = req.method
    const url = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`)
    let full_path = url.pathname

    if (full_path.endsWith('/')) full_path = full_path.slice(0, -1)
    let full_path_array = full_path.split('/').slice(1)

    let node = require(`../../authorizers/endpoints`)
    let current_path = ''

    if (!(method in node)) {
        return res.status(403).json({
            message: `endpoint_authorization_error`,
            details: {
                path: '/',
                method: method,
                authenticated: req.isAuthenticated(),
                error: 'method_not_found_in_rules'
            }
        })
    }
    if (!(node[method].includes(authenticated_char))) {
        return res.status(403).json({
            message: `endpoint_authorization_error`,
            details: {
                path: '/',
                method: method,
                authenticated: req.isAuthenticated(),
                error: 'method_not_allowed'
            }
        })
    }

    for (const part of full_path_array) {
        current_path = `${current_path}/${part}`
        
        if (!(part in node)) {
            return res.status(403).json({
                message: `endpoint_authorization_error`,
                details: {
                    path: current_path,
                    method: method,
                    authenticated: req.isAuthenticated(),
                    error: 'endpoint_not_found_in_roles'
                }
            })
        }
        node = node[part]

        if (!(method in node)) {
            return res.status(403).json({
                message: `endpoint_authorization_error`,
                details: {
                    path: current_path,
                    method: method,
                    authenticated: req.isAuthenticated(),
                    error: 'method_not_found_in_roles'
                }
            })
        }

        if (!(node[method].includes(authenticated_char))) {
            return res.status(403).json({
                message: `endpoint_authorization_error`,
                details: {
                    path: current_path,
                    method: method,
                    authenticated: req.isAuthenticated(),
                    error: 'method_not_allowed'
                }
            })
        }
    }

    return next()
}

module.exports = authorize_endpoint