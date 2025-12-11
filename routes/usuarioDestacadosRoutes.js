// routes/usuarioDestacadosRoutes.js
const express = require('express');
const router = express.Router();
const autenticarToken = require('../middlewares/authMiddleware');
const Usuario = require('../models/Usuario');
const Producto = require('../models/Producto');

// Todas estas rutas requieren usuario autenticado
router.use(autenticarToken);

// Obtener productos destacados del usuario logueado
router.get('/me/destacados', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.user.id).populate('destacados');
    if (!usuario) {
      return res.status(404).json({ ok: false, error: 'Usuario no encontrado' });
    }
    res.json({ ok: true, destacados: usuario.destacados });
  } catch (error) {
    console.error('Error al obtener destacados:', error);
    res.status(500).json({ ok: false, error: 'Error interno al obtener destacados' });
  }
});

// Añadir un producto a destacados
router.post('/me/destacados/:productoId', async (req, res) => {
  try {
    const { productoId } = req.params;

    const existeProducto = await Producto.findById(productoId);
    if (!existeProducto) {
      return res.status(404).json({ ok: false, error: 'Producto no encontrado' });
    }

    const usuario = await Usuario.findById(req.user.id);
    if (!usuario) {
      return res.status(404).json({ ok: false, error: 'Usuario no encontrado' });
    }

    if (!usuario.destacados.includes(productoId)) {
      usuario.destacados.push(productoId);
      await usuario.save();
    }

    res.json({ ok: true, mensaje: 'Producto añadido a favoritos' });
  } catch (error) {
    console.error('Error al añadir destacado:', error);
    res.status(500).json({ ok: false, error: 'Error interno al añadir destacado' });
  }
});

// Quitar un producto de destacados
router.delete('/me/destacados/:productoId', async (req, res) => {
  try {
    const { productoId } = req.params;

    const usuario = await Usuario.findById(req.user.id);
    if (!usuario) {
      return res.status(404).json({ ok: false, error: 'Usuario no encontrado' });
    }

    usuario.destacados = usuario.destacados.filter(
      (id) => id.toString() !== productoId
    );

    await usuario.save();

    res.json({ ok: true, mensaje: 'Producto eliminado de favoritos' });
  } catch (error) {
    console.error('Error al eliminar destacado:', error);
    res.status(500).json({ ok: false, error: 'Error interno al eliminar destacado' });
  }
});

module.exports = router;
