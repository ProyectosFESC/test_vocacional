const express = require('express');
const router = express.Router();
const estudiantesController = require('../controllers/estudiantesController');
const administradorController = require('../controllers/administradorController');
//idk
router.post('/guardar-datos', estudiantesController.guardarDatos);
router.get('/', estudiantesController.obtenerTodosLosEstudiantesConCarrera);
router.get('/filtrar', estudiantesController.filtrarEstudiantes);
router.post('/login', administradorController.login);
module.exports = router;