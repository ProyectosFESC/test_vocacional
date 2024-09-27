const Estudiante = require('../models/estudiante');
const RespuestaEstudiante = require('../models/respuestasEstudiante'); 
const bcrypt = require('bcrypt'); // npm install bcrypt
const jwt = require('jsonwebtoken'); // npm install jsonwebtoken

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
    const token = jwt.sign({ id: administrador.id }, 'tu_secreto_jwt', { expiresIn: '1h' }); // Ajusta la duración del token según tus necesidades

    res.json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
const guardarDatosEstudiante = async (data) => {
  const { colegio, nombre, grado, correo, telefono, documento } = data;

  let estudiante = await Estudiante.findOne({ where: { documento } }); // Buscar por documento

  if (!estudiante) {

        // Si el estudiante no existe, crearlo
        estudiante = await Estudiante.create({ colegio, nombre, grado, correo, telefono, documento });
  } else {
    // Si el estudiante existe, actualizar sus datos 
    await estudiante.update({ colegio, nombre, grado, telefono });
  }

  return estudiante;
};

exports.guardarDatos = async (req, res) => {
  try {
    // Manejar datos del primer formulario
    if (req.body.colegio && req.body.nombre) {
      const estudiante = await guardarDatosEstudiante(req.body);
      res.json({ mensaje: 'Datos guardados exitosamente', estudianteId: estudiante.documento }); 
    } 
    // Manejar datos del segundo formulario (preguntas)
    else if (req.body.pregunta1 && req.body.pregunta2) {
      const {
        pregunta1,
        pregunta2,
        pregunta3,
        pregunta4,
        pregunta5,
        pregunta6,
        pregunta7,
        pregunta8,
        pregunta9,
 // Asegúrate de que el frontend envíe el documento del estudiante, aqui iba ""documento"
      } = req.body; 
      // Array con todas las respuestas
      const respuestasArray = [pregunta1, pregunta2, pregunta3, pregunta4, pregunta5, pregunta6, pregunta7, pregunta8, pregunta9];

      // Encontrar la respuesta más repetida
      const conteoRespuestas = {};
      let respuestaMasRepetida = '';
      let maxRepeticiones = 0;

      for (const respuesta of respuestasArray) {
        conteoRespuestas[respuesta] = (conteoRespuestas[respuesta] || 0) + 1;
        if (conteoRespuestas[respuesta] > maxRepeticiones) {
          maxRepeticiones = conteoRespuestas[respuesta];
          respuestaMasRepetida = respuesta;
        }
      }

      // Obtener la carrera correspondiente a la respuesta más repetida
      const carreraElegida = carreraCorrespondiente(parseInt(respuestaMasRepetida));
      const estudianteDocumento = req.body.documento;
      let estudiante = await Estudiante.findOne({ where: { documento: estudianteDocumento } });

      if (!estudiante) {
        return res.status(400).json({ error: 'Estudiante no encontrado' });
      }
      await estudiante.update({ carreraElegida });   
      res.json({ mensaje: 'Datos guardados exitosamente' }); 
    } else {
      // Si no se reconoce el tipo de formulario, devolver un error
      return res.status(400).json({ error: 'Tipo de formulario no válido' });
    }

  } catch (error) {
    console.error('Error al guardar los datos:', error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'El correo electrónico o el documento ya están registrados' });
    }

    res.status(500).json({ error: 'Error interno del servidor' });
  }
};exports.obtenerTodosLosEstudiantesConCarrera = async (req, res) => {
  try {
    const estudiantes = await Estudiante.findAll({
      include: { 
        model: RespuestaEstudiante, 
        attributes: ['carreraElegida'] 
      }
    });

    // Formatear la respuesta para incluir solo nombre, colegio, perfil y documento
    const resultado = estudiantes.map(estudiante => ({
      name: estudiante.nombre,
      school: estudiante.colegio, // Incluir el colegio en la respuesta
      profile: estudiante.RespuestaEstudiante ? estudiante.RespuestaEstudiante.carreraElegida : 'Sin perfil', // Manejar el caso de perfil nulo
      documento: estudiante.estudianteDocumento // Cambiar 'document' a 'documento' para que coincida con los datos reales
    }));

    res.json(resultado);
  } catch (error) {
    console.error('Error al obtener estudiantes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Filtrar estudiantes por nombre, colegio y perfil
exports.filtrarEstudiantes = async (req, res) => {
  try {
    const { searchTerm, schoolFilter, profileFilter } = req.query;

    // Construir las condiciones de búsqueda
    const whereClause = {};
    if (searchTerm) {
      whereClause.documento = { [Op.like]: `%${searchTerm}%` }; // Búsqueda parcial por nombre
    }
    if (schoolFilter) {
      whereClause.colegio = schoolFilter;
    }

    // Realizar la consulta, incluyendo las respuestas y aplicando los filtros
    const estudiantes = await Estudiante.findAll({
      where: whereClause,
      include: { 
        model: RespuestaEstudiante, 
        attributes: ['carreraElegida'],
        where: profileFilter ? { carreraElegida: profileFilter } : {} // Filtrar por perfil si se proporciona
      }
    });

    // Formatear la respuesta
    const resultado = estudiantes.map(estudiante => ({
      name: estudiante.nombre,
      school: estudiante.colegio,
      profile: estudiante.RespuestaEstudiante ? estudiante.RespuestaEstudiante.carreraElegida : null
    }));

    res.json(resultado);
  } catch (error) {
    console.error('Error al filtrar estudiantes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
// Función auxiliar para obtener la carrera correspondiente a cada valor de respuesta
function carreraCorrespondiente(valor) {
  switch (valor) {
    case 1: return 'grafico';
    case 2: return 'modas';
    case 3: return 'software';
    case 4: return 'negocios';
    case 5: return 'financiero';
    case 6: return 'turismo';
    default: return null; 
  }
  
}