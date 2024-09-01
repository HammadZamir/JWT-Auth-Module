import Blogs from '../models/blogsModel.js';

const blogsController = async (req , res )=>{
    // console.log("hello " , req.user)
    try {
        const blogs = await Blogs.find()
        res.send(blogs);
    } catch (error) {
        res.status(500).send('Server error');
    }
}

export default blogsController;