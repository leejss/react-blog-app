import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/user';

// token을 검증하는 미들웨어
const validateJwt = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next();
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    console.log(decoded);
    req.user = {
      _id: decoded._id,
      username: decoded.username,
    };

    const now = Math.floor(Date.now() / 1000);
    // 잔여 시간이 3.5일 미만이면 새로운 토큰을 발행
    if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
      const user = await User.findById(decoded._id);
      const token = user.generatedToken();
      res.cookie('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
    }
    return next();
  } catch (err) {
    return next();
  }
};

export default validateJwt;
