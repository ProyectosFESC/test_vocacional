const Estudiante = require('../models/estudiante');

exports.guardarDatos = async (req, res) => {
  try {
    const { 
      colegio, 
      nombre, 
      grado, 
      correo, 
      telefono, 
      pregunta1, 
      pregunta2, 
      pregunta3, 
      pregunta4, 
      pregunta5, 
      pregunta6 
    } = req.body;

    if (!colegio || !nombre || !grado || !correo || !telefono ||
        !pregunta1 || !pregunta2 || !pregunta3 || 
        !pregunta4 || !pregunta5 || !pregunta6) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    // Calcular puntajes para cada carrera
    const puntajes = {
      grafico: 0,
      modas: 0,
      software: 0,
      negocios: 0,
      financiero: 0,
      turismo: 0
    };

    for (const respuesta of [pregunta1, pregunta2, pregunta3, pregunta4, pregunta5, pregunta6]) {
      if (respuesta === '1') {
        puntajes.grafico++;
      } else if (respuesta === '2') {
        puntajes.modas++;
      } else if (respuesta === '3') {
        puntajes.software++;
      } else if (respuesta === '4') {
        puntajes.negocios++;
      } else if (respuesta === '5') {
        puntajes.financiero++;
      } else if (respuesta === '6') {
        puntajes.turismo++;
      }
    }
    // Encontrar la carrera con el puntaje más alto
    let carreraRecomendada = null;
    let maxPuntaje = 0;
    for (const carrera in puntajes) {
      if (puntajes[carrera] > maxPuntaje) {
        maxPuntaje = puntajes[carrera];
        carreraRecomendada = carrera;
      }
    }

    // Guardar en la base de datos
    const nuevoEstudiante = await Estudiante.create({
      colegio, 
      nombre, 
      grado, 
      correo, 
      telefono,
      puntajeGrafico: puntajes.grafico,
      puntajeModas: puntajes.modas,
      puntajeSoftware: puntajes.software,
      puntajeNegocios: puntajes.negocios,
      puntajeFinanciero: puntajes.financiero,
      puntajeTurismo: puntajes.turismo,
      carreraRecomendada 
    });

    res.json(nuevoEstudiante); 
  } catch (error) {
    console.error('Error al guardar los datos:', error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    } 

    res.status(500).json({ error: 'Error interno del servidor' });
  }
};