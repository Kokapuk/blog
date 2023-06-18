import PostModel from '../models/Post.js';

const checkOwner = async (req, res, next) => {
  try {
    const post = await PostModel.findById(req.params.id).populate('author');

    if (!post) {
      return res.status(404).json({ message: 'Post does not exists or it has been deleted' });
    }

    if (post.author._id.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Post does not belong to current user' });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export default checkOwner;
