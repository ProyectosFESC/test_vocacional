const express = require('express');
const router = express.Router();
const administradorController = require('../controllers/administradorController');

// Ruta para el inicio de sesión del administrador
router.post('/login', administradorController.login);

module.exports = router;