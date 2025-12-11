const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/'); // carpeta subida, debe existir o crear
  },
  filename: function(req, file, cb) {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniquePrefix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ ok: false, error: 'Archivo no enviado' });
  
  // Puedes adaptar la ruta pública si usas servidor estático
  const url = `/uploads/${req.file.filename}`;
  res.json({ ok: true, url });
});

module.exports = router;
