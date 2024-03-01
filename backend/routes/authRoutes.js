import express from 'express'
import {
  register,
  verifyAccount,
  login,
  user 
} from "../controllers/authController.js";
import authMiddleware from '../middleware/authMiddleware.js'
 

const router = express.Router()

//Rutas de autenticación y registro de usuario
router.post('/register', register)
router.get("/verified/:token", verifyAccount);
router.post('/login', login)


//Area Privada - Requier un JWT
router.get('/user', authMiddleware, user)


export default router