function isAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ ok: false, error: 'Acceso solo para administradores' });
  }
  next();
}

module.exports = { isAdmin };
