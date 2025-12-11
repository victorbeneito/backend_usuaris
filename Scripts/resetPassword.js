require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Usuario = require('./models/Usuario');

async function resetPassword(email, nuevaPassword) {
  await mongoose.connect(process.env.MONGO_URI);

  const usuario = await Usuario.findOne({ email: email.trim().toLowerCase() });
  if (!usuario) {
    console.log('Usuario no encontrado');
    return;
  }

  const hashed = await bcrypt.hash(nuevaPassword, 10);
  usuario.password = hashed;
  await usuario.save();
  console.log('Contraseña actualizada');
  process.exit(0);
}

resetPassword('correo@ejemplo.com', '12345678');
