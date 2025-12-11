const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const productosRoutes = require('./routes/productosRoutes');
const pedidosRoutes = require('./routes/pedidosRoutes');
const clientesRoutes = require('./routes/clientesRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const categoriasRoutes = require('./routes/categoriasRoutes');
const marcasRoutes = require('./routes/marcasRoutes');
const autenticarToken = require('./middlewares/authMiddleware');
const usuarioDestacadosRoutes = require('./routes/usuarioDestacadosRoutes');

app.use(express.json());
app.use(cors());

// Opcional: inicialitzar esquemes 
require('./models/Marca');
require('./models/Producto');
require('./models/Categoria');
require('./models/Pedido');
require('./models/Cliente');
require('./models/Usuario');

// Rutes de autenticació públiques
app.use('/auth', authRoutes);

// Arxius estátics uploads
app.use('/uploads', express.static('uploads'));

// Rutes públiques per a productos
app.use('/productos', productosRoutes);

// Rutas protegides amb autenticarToken middleware
app.use('/pedidos', autenticarToken, pedidosRoutes);
app.use('/clientes', autenticarToken, clientesRoutes);

// Categories i marques 
app.use('/categorias', categoriasRoutes);
app.use('/marcas', marcasRoutes);

// Rutas para pujar arxius
app.use('/api', uploadRoutes);

// Ruta arrel simple
app.get('/', (req, res) => {
  res.send('API backend funcionando correctamente'); });
  
// Rutas para destacados por usuario (protegidas dentro del propio router)
app.use('/usuarios', usuarioDestacadosRoutes);

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
