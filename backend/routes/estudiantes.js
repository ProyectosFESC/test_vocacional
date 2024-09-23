const express = require('express');
const router = express.Router();
const estudiantesController = require('../controllers/estudiantesController');

router.post('/guardar-datos', estudiantesController.guardarDatos);
router.get('/consultar-por-nombre/:nombre', estudiantesController.consultarPorNombre);
router.get('/estadisticas-carreras', estudiantesController.obtenerEstadisticasCarreras);
router.get('/buscar-por-colegio/:colegio', estudiantesController.buscarPorColegio);


module.exports = router;