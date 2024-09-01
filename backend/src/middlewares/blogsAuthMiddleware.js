import jwt from 'jsonwebtoken';

const  ensureAuthenticated = (req , res , next ) => {
    const token = req.header("Authorization");
    // console.log(token)
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY )
        req.user = decoded;
        next()
    } catch (error) {
        res.status(401).send('Invalid token');
    }
}

export default ensureAuthenticated;