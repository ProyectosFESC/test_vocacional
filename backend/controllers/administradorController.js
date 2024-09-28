const Administrador = require('../models/administrador');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación básica (puedes agregar más validaciones)
    if (!email || !password) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    // Buscar al administrador por email
    const administrador = await Administrador.findOne({ where: { email } });
    if (!administrador) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Verificar la contraseña (usando bcrypt)
    const passwordMatch = await bcrypt.compare(password, administrador.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar un token JWT (Json Web Token)
    const token = jwt.sign({ id: administrador.id }, 'tu_secreto_jwt', { expiresIn: '1h' }); 

    res.json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};