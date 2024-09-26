const express = require('express');
const router = express.Router();
const estudiantesController = require('../controllers/estudiantesController');
const administradorController = require('../controllers/administradorController');

router.post('/guardar-datos', estudiantesController.guardarDatos);
router.post('/login', administradorController.login);
router.get('/', estudiantesController.obtenerTodosLosEstudiantesConCarrera);
router.get('/filtrar', estudiantesController.filtrarEstudiantes);


module.exports = router;