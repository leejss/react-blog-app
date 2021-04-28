import Joi from 'joi';
import User from '../../models/user';

// POST /api/auth/register
export const register = async (req, res) => {
  // requset body validation
  // schema 작성
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).json({
      error: result.error,
    });
  }

  // - register
  // extract data from req.body
  const { username, password } = req.body;
  try {
    // 중복 검사
    const exists = await User.findByUsername(username);
    if (exists) {
      return res.status(409).end();
    }
    // new user
    const user = new User({
      username,
    });
    // set password
    // hashed password를 데이터베이스에 저장
    await user.setPassword(password);
    await user.save();

    // token을 cookie에 담는다. - 토큰 발급
    const token = user.generateToken();
    return res
      .cookie('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      })
      .status(202)
      .json(user.serialize());
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
// POST /api/auth/login
export const login = async (req, res) => {
  // extract data from req.body
  const { username, password } = req.body;
  // validate data
  if (!username || !password) {
    return res.status(401).end();
  }

  try {
    // username 검사
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(401).end();
    }
    // password 검사
    const valid = await user.checkPassword(password);
    if (!valid) {
      return res.status(401).end();
    }
    // token을 cookie에 담는다.
    const token = user.generateToken();
    return res
      .cookie('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      })
      .status(202)
      .json(user.serialize());
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// GET /api/auth/check
export const check = async (req, res) => {
  const user = req.user;
  console.log(user);
  if (!user) {
    return res.status(401).end();
  }
  return res.status(202).json(user);
};

// POST /api/auth/logout
export const logout = async (req, res) => {
  res.clearCookie('access_token');
  return res.status(204).end();
};
