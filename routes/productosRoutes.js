const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');
const { validarProducto } = require('../middlewares/validaciones');
const autenticarToken = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/roleMiddleware');
const mongoose = require('mongoose');

// Listar productos (pública)
router.get('/', async (req, res) => {
  try {
    const q = req.query.q || '';
    const categoria = req.query.categoria || '';
    let filtro = {};

    if (q.trim() !== '') {
      const regex = new RegExp(q, 'i');
      filtro.nombre = regex;
    }

    if (categoria.trim() !== '') {
      if (!mongoose.Types.ObjectId.isValid(categoria)) {
        return res.status(400).json({ ok: false, error: 'ID categoría inválido' });
      }
      filtro.categoria = categoria;
    }

    const productos = await Producto.find(filtro)
      .populate('marca', 'nombre descripcion logo_url')
      .populate('categoria', 'nombre');

    res.json({ ok: true, productos });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ ok: false, error: 'Error interno al obtener productos' });
  }
});

// Obtener producto por ID (pública)
router.get('/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id)
      .populate('marca', 'nombre descripcion logo_url')
      .populate('categoria', 'nombre');

    if (!producto) {
      return res.status(404).json({ ok: false, error: 'Producto no encontrado' });
    }

    res.json({ ok: true, producto });
  } catch (error) {
    console.error(`Error al obtener producto ${req.params.id}:`, error);
    res.status(500).json({ ok: false, error: 'Error interno al obtener producto' });
  }
});

// A partir de aquí, solo usuarios autenticados y admin para escritura
router.use(autenticarToken);
router.use(isAdmin);

// Crear producto (solo admin)
router.post('/', validarProducto, async (req, res) => {
  try {
    const producto = new Producto(req.body);
    await producto.save();
    res.status(201).json({ ok: true, producto });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(400).json({ ok: false, error: 'Datos inválidos para crear producto' });
  }
});

// Actualizar producto (solo admin)
router.put('/:id', validarProducto, async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate('marca', 'nombre descripcion logo_url')
      .populate('categoria', 'nombre');

    if (!producto) {
      return res.status(404).json({ ok: false, error: 'Producto no encontrado' });
    }

    res.json({ ok: true, producto });
  } catch (error) {
    console.error(`Error al actualizar producto ${req.params.id}:`, error);
    res.status(400).json({ ok: false, error: 'Datos inválidos para actualizar producto' });
  }
});

// Eliminar producto (solo admin)
router.delete('/:id', async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) {
      return res.status(404).json({ ok: false, error: 'Producto no encontrado' });
    }
    res.json({ ok: true, mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error(`Error al eliminar producto ${req.params.id}:`, error);
    res.status(500).json({ ok: false, error: 'Error interno al eliminar producto' });
  }
});

module.exports = router;
