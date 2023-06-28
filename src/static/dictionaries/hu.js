const hu = (key, parameters) => {
    switch (key) {
        case 'confirm_registration_email_title': return `Sajtverseny regisztráció megerősítése`;
        case 'confirm_registration_email_content': return `A regisztráció megerősítéséhez kérlek kattints a linkre:<br>${parameters.server_url}/confirm_registration?confirm_registration_id=${parameters.confirm_registration_id}<br>Ez egy automatikusan generált e-mail, kérlek ne válaszolj rá!`
        default: throw `${key} string not found for language 'hu'`
    }
}

module.exports = hu