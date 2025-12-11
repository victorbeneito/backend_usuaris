const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');
const mongoose = require('mongoose');

// Listar clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json({ ok: true, clientes });
  } catch (error) {
    console.error('Error al listar clientes:', error);
    res.status(500).json({ ok: false, error: 'Error interno al listar clientes' });
  }
});

// Crear cliente
router.post('/', async (req, res) => {
  try {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.status(201).json({ ok: true, cliente });
  } catch (error) {
    console.error('Error al crear cliente:', error);
    res.status(400).json({ ok: false, error: 'Datos inválidos para crear cliente' });
  }
});

// Actualizar cliente
router.put('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cliente) {
      return res.status(404).json({ ok: false, error: 'Cliente no encontrado' });
    }
    res.json({ ok: true, cliente });
  } catch (error) {
    console.error(`Error al actualizar cliente ${req.params.id}:`, error);
    res.status(400).json({ ok: false, error: 'Datos inválidos para actualizar cliente' });
  }
});

// Eliminar cliente
router.delete('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente) {
      return res.status(404).json({ ok: false, error: 'Cliente no encontrado' });
    }
    res.json({ ok: true, mensaje: 'Cliente eliminado' });
  } catch (error) {
    console.error(`Error al eliminar cliente ${req.params.id}:`, error);
    res.status(400).json({ ok: false, error: 'Error al eliminar cliente' });
  }
});

module.exports = router;
