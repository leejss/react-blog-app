import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from 'joi';
import sanitizeHtml from 'sanitize-html';

// sanitize options

const sanitizeOptions = {
  allowedTags: [
    'h1',
    'h2',
    'b',
    'i',
    'u',
    's',
    'p',
    'ul',
    'ol',
    'li',
    'blockquote',
    'a',
    'img',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src'],
    li: ['class'],
  },
  allowedSchemes: ['data', 'http'],
};

// sanitize html
const removeHtmlAndShorten = (body) => {
  const filterd = sanitizeHtml(body, {
    allowedTags: [],
  });
  return filterd.length < 200 ? filterd : `${filterd.slice(0, 200)}...`;
};

const { ObjectId } = mongoose.Types;

// GET /api/posts?username=&tag=&page=&
/*
    pagination. limit(10) 일때
    page 1 => skip(0)
    page 2 => skip(10)
    page 3 => skip(20)
    ...
    page i => skip((i-1) * 10)
*/
export const list = async (req, res) => {
  const page = parseInt(req.query.page || '1', 10);
  if (page < 1) {
    return res.status(400).end();
  }

  // 쿼리 객체를 만들어서 쿼리 수행
  const { tag, username } = req.query;
  const query = {
    ...(username ? { 'user.username': username } : {}),
    ...(tag ? { tags: tag } : {}),
  };

  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec();
    const postCount = await Post.countDocuments(query).exec();
    res.set('Last-Page', postCount ? Math.ceil(postCount / 10) : 1);
    return res.status(202).json(
      posts.map((post) => ({
        ...post,
        body: removeHtmlAndShorten(post.body),
      })),
    );
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

// POST /api/posts
export const write = async (req, res) => {
  // validation
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).json({
      error: result.error,
    });
  }
  const { title, body, tags } = req.body;
  // post에 사용자정보 넣기
  const post = new Post({
    title,
    body: sanitizeHtml(body, sanitizeOptions),
    tags,
    user: req.user,
  });
  try {
    await post.save();
    return res.status(202).json(post);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

// GET /api/posts/:id
export const read = async (req, res) => {
  return res.status(202).json(req.post);
};

// DELETE /api/posts/:id
export const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndRemove(id);
    return res.status(204).end();
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

// PATCH /api/posts/:id
export const update = async (req, res) => {
  // validation
  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).json({
      error: result.error,
    });
  }
  const nextData = { ...req.body };
  if (nextData.body) {
    nextData.body = sanitizeHtml(nextData.body, sanitizeOptions);
  }
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndUpdate(id, nextData, {
      new: true,
    }).exec();
    if (!post) {
      return res.status(404).end();
    }
    return res.status(202).json(post);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

// id 검증 미들웨어

export const getPostById = async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).end();
  }

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).end();
    }
    req.post = post;
    return next();
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const checkOwnPost = (req, res, next) => {
  const { user, post } = req;
  if (post.user._id.toString() !== user._id) {
    return res.sendStatus(403); // forbidden
  }
  return next();
};
