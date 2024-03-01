import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import { db } from './config/db.js'
import servicesRoutes from './routes/servicesRoutes.js'
import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

//Variables de entorno
dotenv.config()

//Configurar la app
const app = express();

//Leer datos via body
app.use(express.json())

//Conectar a  DB
db()


//Configurar CORS
const whiteList = process.argv[2] === "--postman" ? [process.env.FRONTEND_URL,undefined] : [process.env.FRONTEND_URL];

const corsOption = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      //Permite la conexión
      callback(null, true)
    } else {
      //No permitir la conexión
      callback(new Error('Error de CORS'))
    }
  }
}

app.use(cors(corsOption));

//Definir una ruta
app.use('/api/services', servicesRoutes)
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);

//Definir puerto
const PORT = process.env.PORT || 4000;

//Arrancar la app
app.listen(PORT, () => {
  console.log(colors.blue('El servidor se esta ejecutando en el puerto'), colors.blue.bold(PORT))
})