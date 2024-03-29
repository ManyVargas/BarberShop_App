import User from '../models/User.js'
import { sendEmailVerification } from '../emails/authEmailService.js';
import {generateJWT} from '../utils/index.js'

const register = async (req, res) => {
  console.log(req.body)
  
  //Valida todos los campos
  if (Object.values(req.body).includes('')) {
    const error = new Error("Todos los campos son obligatorios");
    return res.status(400).json({
      msg: error.message
    })
  }

  const { email, password, name} = req.body

  //Evitar registros duplicados
  const userExists = await User.findOne({ email })
  
  if (userExists) {
    const error = new Error("Este usuario ya está registrado");
    return res.status(400).json({
      msg: error.message,
    });
  }

  //Validar la extensión del password
  const minPasswordLength = 8
  if (password.trim().length < minPasswordLength) {
    const error = new Error(`El password debe contener ${minPasswordLength} caracteres`);
    return res.status(400).json({
      msg: error.message,
    });
  }
  
  try {
    const user = new User(req.body)
    const result = await user.save()

    const {name, email,token} = result
    sendEmailVerification({
      name,
      email,
      token
    })

    res.json({
      msg: "El usuario se creó correctamente, revisa tu email"
    })
  } catch (error) {
    console.log(error)
  }
}

const verifyAccount = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ token })
  if (!user) {
    const error = new Error('Hubo un error, token no válido')
    return res.status(401).json({msg: error.message})
  }

  //Si el token es válido, confirmar la cuenta
  try {
    user.verified = true
    user.token = ''
    await user.save()
    res.json({msg: 'Usuario confirmado correctamente'})
  } catch (error) {
    console.log(error)
  }
}

const login = async (req, res) => {
  const {email,password} = req.body
  //Revisar que el usuario exista
  const user = await User.findOne({ email })
  if (!user) {
    const error = new Error("El usuario no existe");
    return res.status(401).json({ msg: error.message });
  }

  //Revisar si el usuario confirmó su cuenta
  if (!user.verified) {
    const error = new Error("Tu cuenta no ha sido confirmada aún");
    return res.status(401).json({ msg: error.message });
  }

  //Comprobar el password
  if (await user.checkPassword(password)) {

    const token = generateJWT(user._id)

    res.json({
      token
    })
  } else { 
    const error = new Error("El password es incorrecto");
    return res.status(401).json({ msg: error.message });
  }
}

const user = async (req, res) => {
  const {user} = req
  res.json({
    user
  })
}

export { register, verifyAccount, login, user };