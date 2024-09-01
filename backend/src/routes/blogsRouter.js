import express from 'express';
import ensureAuthenticated from '../middlewares/blogsAuthMiddleware.js';
import blogsController from '../controllers/blogsController.js';
import blogsValidation from '../middlewares/blogsValidation.js';
import Blogs from '../models/blogsModel.js';

const router = express.Router();

router.post('/', blogsValidation, async (req, res) => {
    const blog = new Blogs({
        uid: req.body.uid,
        title: req.body.title,
        category: req.body.category,
        content: req.body.content,
    });

    try {
        const savedBlog = await blog.save();
        res.send(savedBlog);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.get('/', ensureAuthenticated, blogsController);

export default router;
