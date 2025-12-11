const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');          // o bcrypt, pero usa el mismo en todo
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const { validarUsuarioRegistro } = require('../middlewares/validaciones');

// Registro de usuario (siempre role = 'user')
router.post('/registro', validarUsuarioRegistro, async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailNormalized = email.trim().toLowerCase();

    const existe = await Usuario.findOne({ email: emailNormalized });
    if (existe) {
      return res.status(400).json({ ok: false, error: 'Usuario ya registrado' });
    }

    // NO hacer hash aquí, lo hace el pre('save') del modelo Usuario
    const usuario = new Usuario({
      email: emailNormalized,
      password,      // texto plano aquí
      role: 'user'
    });

    await usuario.save();

    res.status(201).json({ ok: true, mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ ok: false, error: 'Error interno en el servidor' });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailNormalized = email.trim().toLowerCase();

    const usuario = await Usuario.findOne({ email: emailNormalized });
    if (!usuario) {
      return res.status(400).json({ ok: false, error: 'Usuario no encontrado' });
    }

    // Comparar usando bcrypt
    const match = await bcrypt.compare(password, usuario.password);
   

    if (!match) {
      return res.status(400).json({ ok: false, error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      {
        id: usuario._id,
        email: usuario.email,
        role: usuario.role
      },
      process.env.SECRETO_JWT,
      { expiresIn: '1h' }
    );

    res.json({
      ok: true,
      token,
      user: {
        id: usuario._id,
        email: usuario.email,
        role: usuario.role
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ ok: false, error: 'Error interno en el servidor' });
  }
});

console.log('authRoutes cargado');
module.exports = router;
