const passport = require('passport');

module.exports = {
    authenticate: (req, res, next) => {
        passport.authenticate('kakao', (err, user, info) => {
            if (err) return next(err);
            if (!user) {
                return res.redirect('/login'); // 로그인 실패 시 리다이렉트할 URL
            }
            req.logIn(user, (err) => {
                if (err) return next(err);
                return res.redirect('/'); // 로그인 성공 시 리다이렉트할 URL
            });
        })(req, res, next);
    }
};
