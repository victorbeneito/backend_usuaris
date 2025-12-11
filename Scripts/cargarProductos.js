const mongoose = require('mongoose');
require('dotenv').config();

const Producto = require('../models/Producto');
const productosData = require('../data/productos.json');

async function cargarProductos() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Producto.deleteMany();  // Borra los productos existentes (opcional)

    await Producto.insertMany(productosData);
    console.log('Productos cargados');

    await mongoose.disconnect();
    console.log('Conexión cerrada');
  } catch (error) {
    console.error('Error cargando productos:', error);
    process.exit(1);
  }
}

cargarProductos();
