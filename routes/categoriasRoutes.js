const express = require('express');
const router = express.Router();
const Categoria = require('../models/Categoria');
const authMiddleware = require('../middlewares/authMiddleware');
const mongoose = require('mongoose');

// Obtener todas las categorías
// router.get('/', authMiddleware, async (req, res) => {
  router.get('/', async (req, res) => {
  try {
    const categorias = await Categoria.find().sort({ nombre: 1 });
    res.json(categorias); // devolver directamente el array
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ error: 'Error al obtener categorías' });
  }
});

// Crear categoría
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { nombre } = req.body;
    const nuevaCategoria = new Categoria({ nombre });
    await nuevaCategoria.save();
    res.status(201).json(nuevaCategoria); // devolver el objeto directamente
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(500).json({ error: 'Error al crear categoría' });
  }
});

// Actualizar categoría
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { nombre } = req.body;
    const categoriaActualizada = await Categoria.findByIdAndUpdate(
      req.params.id,
      { nombre },
      { new: true }
    );

    if (!categoriaActualizada) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    res.json(categoriaActualizada);
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    res.status(500).json({ error: 'Error al actualizar categoría' });
  }
});

// Eliminar categoría
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const categoriaEliminada = await Categoria.findByIdAndDelete(req.params.id);
    if (!categoriaEliminada) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    res.json({ mensaje: 'Categoría eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    res.status(500).json({ error: 'Error al eliminar categoría' });
  }
});

module.exports = router;
