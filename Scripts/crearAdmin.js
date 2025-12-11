require('dotenv').config();
const mongoose = require('mongoose');
const Usuario = require('../models/Usuario');

async function crearAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = 'liberiosgs@gmail.com';
    const password = 'Admin2025';

    // Verificar si ya existe
    const existente = await Usuario.findOne({ email });
    if (existente) {
      console.log('Usuario administrador ya existe');
    } else {
      const user = new Usuario({ email, password });
      await user.save();
      console.log('Usuario administrador creado con éxito');
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error creando usuario administrador:', error);
  }
}

crearAdmin();
