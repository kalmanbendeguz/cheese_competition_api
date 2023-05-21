const render_restore_password_email_sent = function () {

    return function (req, res, next) {
        console.log('render_restore_password_email_sent')

        ;(res.locals.successes ||= []).push('A jelszó-helyreállító linket elküldtük a megadott e-mail címre. A linket a következő 15 percben tudod használni új jelszó beállítására.')
        
        return res.render('forget_password')

    }
  
}

module.exports = render_restore_password_email_sent