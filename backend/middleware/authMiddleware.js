import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      console.log(decoded);
    } catch {
      const error = new Error("Token no válido o inexistente");
      res.status(403).json({ msg: error.message });
    }
  } else {
    console.log('no hay token')
    const error = new Error('Token no válido o inexistente')
    res.status(403).json({msg: error.message})
  }
  
  //next();
}
export default authMiddleware