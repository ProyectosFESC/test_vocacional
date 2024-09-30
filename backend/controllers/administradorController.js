const Administrador = require('../models/administrador');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    // Buscar al administrador por email
    const administrador = await Administrador.findOne({ where: { email } });
    if (!administrador) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Verificar la contraseña (usando bcrypt)
    const passwordMatch = await (password, administrador.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Autenticación exitosa (sin token)
    // Puedes usar sesiones para mantener la autenticación
    req.session.administradorId = administrador.id; // Guardar el ID del administrador en la sesión

    res.json({ mensaje: 'Inicio de sesión exitoso' }); 
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};