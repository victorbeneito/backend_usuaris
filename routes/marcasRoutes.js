const express = require('express');
const router = express.Router();
const Marca = require('../models/Marca');
const authMiddleware = require('../middlewares/authMiddleware');
const mongoose = require('mongoose');

// Obtener todas las marcas
  router.get('/', async (req, res) => {
  try {
    const marcas = await Marca.find().sort({ nombre: 1 });
    res.json(marcas); // devolver array directamente
  } catch (error) {
    console.error('Error al obtener marcas:', error);
    res.status(500).json({ error: 'Error al obtener marcas' });
  }
});

// Crear marca
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { nombre } = req.body;
    const nuevaMarca = new Marca({ nombre });
    await nuevaMarca.save();
    res.status(201).json(nuevaMarca); // devolver el objeto directamente
  } catch (error) {
    console.error('Error al crear marca:', error);
    res.status(500).json({ error: 'Error al crear marca' });
  }
});

// Actualizar marca
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { nombre } = req.body;
    const marcaActualizada = await Marca.findByIdAndUpdate(
      req.params.id,
      { nombre },
      { new: true }
    );

    if (!marcaActualizada) {
      return res.status(404).json({ error: 'Marca no encontrada' });
    }

    res.json(marcaActualizada);
  } catch (error) {
    console.error('Error al actualizar marca:', error);
    res.status(500).json({ error: 'Error al actualizar marca' });
  }
});

// Eliminar marca
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const marcaEliminada = await Marca.findByIdAndDelete(req.params.id);
    if (!marcaEliminada) {
      return res.status(404).json({ error: 'Marca no encontrada' });
    }

    res.json({ mensaje: 'Marca eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar marca:', error);
    res.status(500).json({ error: 'Error al eliminar marca' });
  }
});

module.exports = router;

