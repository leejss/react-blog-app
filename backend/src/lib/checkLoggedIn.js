// login 상태인지 확인
// protected auth
const checkedLoggedIn = (req, res, next) => {
    if (!req.user) {
        return res.status(401).end()
    }

    next()
}

export default checkedLoggedIn;