const express = require('express');
const router = express.Router();
const estudiantesController = require('../controllers/estudiantesController');

router.post('/guardar-datos', estudiantesController.guardarDatos);
// Puedes agregar más rutas aquí, como para obtener estudiantes, actualizarlos, etc.

module.exports = router;