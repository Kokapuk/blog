import PostModel from '../models/Post.js';

export const create = async (req, res) => {
  try {
    const doc = new PostModel({ author: req.user._id, title: req.body.title, body: req.body.body });
    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find({})
      .sort({ createdAt: -1 })
      .skip(req.query.page ?? 0 * 10)
      .limit(10)
      .populate('author');
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const getMine = async (req, res) => {
  try {
    const posts = await PostModel.find({ author: req.user._id })
      .skip(req.query.page ?? 0 * 10)
      .limit(10)
      .populate('author');
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id).populate('author');

    if (!post) {
      return res.status(404).json({ message: 'Post does not exist or has been deleted' });
    }

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    const post = await PostModel.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post does not exist or has been deleted' });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    re.status(500).json({ message: err.message });
  }
};
