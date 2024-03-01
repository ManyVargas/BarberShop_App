import { createTransporter } from '../config/nodemailer.js'

export async function sendEmailVerification({ name, email, token }) {
  const transporter = createTransporter(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS,
  );

  //Enviar el email
  const info = await transporter.sendMail({
    from: "BarberShop <cuentas@barbershop.com>",
    to: email,
    subject: "BarberShop - Confirma tu cuenta",
    text: "BarberShop - Confirma tu cuenta",
    html: `<p>Hola: ${name}, confirma tu cuenta en BarberShop</p>
    <p>Tu cuenta ha sido creada, solo debes confirmarla en el siguiente enlace</p>
    <a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}" target="_blank">Confirmar cuenta</a>
    <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>

    `,
  });

  console.log("mensaje enviado", info.messageId);
}
