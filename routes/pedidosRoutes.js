const express = require('express');
const router = express.Router();
const Pedido = require('../models/Pedido');
const mongoose = require('mongoose');

// Crear pedido
router.post('/', async (req, res) => {
  try {
    const pedido = new Pedido(req.body);
    await pedido.save();
    res.status(201).json({ ok: true, pedido });
  } catch (error) {
    console.error('Error al crear pedido:', error);
    res.status(400).json({ ok: false, error: 'Datos inválidos para crear pedido' });
  }
});

// Listar pedidos
router.get('/', async (req, res) => {
  try {
    const pedidos = await Pedido.find()
      .populate('cliente_id', 'nombre email')
      .populate('productos.producto_id', 'nombre precio');
    res.status(200).json({ ok: true, pedidos });
  } catch (error) {
    console.error('Error al listar pedidos:', error);
    res.status(500).json({ ok: false, error: 'Error interno al listar pedidos' });
  }
});

// Obtener pedido por id
router.get('/:id', async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id)
      .populate('cliente_id', 'nombre email')
      .populate('productos.producto_id', 'nombre precio');
    if (!pedido) {
      return res.status(404).json({ ok: false, error: 'Pedido no encontrado' });
    }
    res.status(200).json({ ok: true, pedido });
  } catch (error) {
    console.error(`Error al obtener pedido ${req.params.id}:`, error);
    res.status(500).json({ ok: false, error: 'Error interno al obtener pedido' });
  }
});

// Actualizar pedido
router.put('/:id', async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('cliente_id', 'nombre email')
      .populate('productos.producto_id', 'nombre precio');
    if (!pedido) {
      return res.status(404).json({ ok: false, error: 'Pedido no encontrado' });
    }
    res.json({ ok: true, pedido });
  } catch (error) {
    console.error(`Error al actualizar pedido ${req.params.id}:`, error);
    res.status(400).json({ ok: false, error: 'Datos inválidos para actualizar pedido' });
  }
});

// Eliminar pedido
router.delete('/:id', async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndDelete(req.params.id);
    if (!pedido) {
      return res.status(404).json({ ok: false, error: 'Pedido no encontrado' });
    }
    res.json({ ok: true, mensaje: 'Pedido eliminado' });
  } catch (error) {
    console.error(`Error al eliminar pedido ${req.params.id}:`, error);
    res.status(400).json({ ok: false, error: 'Error al eliminar pedido' });
  }
});

module.exports = router;
