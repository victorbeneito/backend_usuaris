const mongoose = require('mongoose');
require('dotenv').config();

const Categoria = require('../models/Categoria');
const Marca = require('../models/Marca');
const Producto = require('../models/Producto');
const Cliente = require('../models/Cliente');
const Pedido = require('../models/Pedido');

const categoriasData = require('../data/categorias.json');
const marcasData = require('../data/marcas.json');
const productosData = require('../data/productos.json');
const clientesData = require('../data/clientes.json');
const pedidosData = require('../data/pedidos.json');

async function cargarDatos() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Borra datos existentes (opcional)
    await Categoria.deleteMany();
    await Marca.deleteMany();
    await Producto.deleteMany();
    await Cliente.deleteMany();
    await Pedido.deleteMany();

    // Inserta nuevos datos
    const categorias = await Categoria.insertMany(categoriasData);
    console.log('Categorías cargadas');

    const marcas = await Marca.insertMany(marcasData);
    console.log('Marcas cargadas');

    // Notar que productos deben referenciar IDs reales de marcas y categorías cargadas
    // Por simplicidad acá se asume que tus productosData ya tiene los ObjectId correctos asignados

    await Producto.insertMany(productosData);
    console.log('Productos cargados');

    await Cliente.insertMany(clientesData);
    console.log('Clientes cargados');

    await Pedido.insertMany(pedidosData);
    console.log('Pedidos cargados');

    await mongoose.disconnect();
    console.log('Conexión cerrada');
  } catch(error) {
    console.error('Error cargando datos:', error);
    process.exit(1);
  }
}

cargarDatos();
