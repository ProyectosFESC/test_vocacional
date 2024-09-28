import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para redirigir
import '../../public/styles/formulario2.css';

function Formulario2() {  
  const apiUrl = import.meta.env.VITE_API_URL

  const [respuestas, setRespuestas] = useState({
    pregunta1: '',
    pregunta2: '',
    pregunta3: '',
    pregunta4: '',
    pregunta5: '',
    pregunta6: '',
    pregunta7: '',
    pregunta8: '',
    pregunta9: '',
  });

  const navigate = useNavigate(); // Inicializamos navigate para redirigir

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRespuestas((prevRespuestas) => ({
      ...prevRespuestas,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Respuestas del formulario:', respuestas);
    event.preventDefault();
    console.log('Respuestas del formulario:', respuestas);

    // Lógica para calcular la respuesta más seleccionada (igual que antes)
    const conteoRespuestas = {};
    Object.values(respuestas).forEach((respuesta) => {
      conteoRespuestas[respuesta] = (conteoRespuestas[respuesta] || 0) + 1;
    });
    const respuestaMasSeleccionada = Object.keys(conteoRespuestas).reduce(
      (a, b) => (conteoRespuestas[a] > conteoRespuestas[b] ? a : b)
    );

    try {
      const response = await fetch(`${apiUrl}/estudiantes/guardar-datos`, { 
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(respuestas),
      });

      if (response.ok) {
        console.log('Datos guardados exitosamente');
        // Redirigimos a la página de resultados y pasamos el número más seleccionado
        navigate(`/resultado`, { state: { respuestaMasSeleccionada } }); 
      } else {
        const errorData = await response.json();
        console.error('Error al guardar datos:', errorData.error);
        alert('Hubo un error al enviar tus respuestas. Por favor, inténtalo de nuevo.'); 
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Error de conexión. Por favor, verifica tu conexión a internet e inténtalo de nuevo.'); 
    }
  };


  const toggleMenu = () => {
    document.body.classList.toggle('open');
  };


  return (
    <div className="formulario">
      
      <header className="navbar">
        <div className="logo">
          <a href="https://www.fesc.edu.co" target="_blank" rel="noopener noreferrer">
            <img
              id="logo"
              src="https://www.fesc.edu.co/portal/images/logo.png"
              alt="Logo FESC"
              className="img1"
            />
          </a>
          <div className='idPrint'>
      <label htmlFor="documento">Verificación de Documento:</label>
      <input type="text" id="documento" name="documento" required size="10" 
             value={respuestas.documento} onChange={handleChange} /> 
    </div>
        </div>
        
        <nav>
          <button className="menu-toggle" onClick={toggleMenu}>
            &#9776;
          </button>
        </nav>
      </header>

      <div className='formdiv'>
      
      <form onSubmit={handleSubmit}>
        
        <div id="seccion1" className="section">
          <h2>Sección 1: Intereses Personales</h2>
          
          <label>

            <select
              name="pregunta1"
              value={respuestas.pregunta1}
              onChange={handleChange}
              required
            >
              <option value="">1. ¿Qué te gusta hacer en tu tiempo libre?</option>
              <option value="1">Dibujar y crear diseños visuales.</option>
              <option value="2">Explorar estilos de moda y tendencias.</option>
              <option value="3">Resolver problemas con tecnología y software.</option>
              <option value="4">Leer sobre negocios y comercio internacional.</option>
              <option value="5">Administrar dinero y planificar presupuestos.</option>
              <option value="6">Organizar eventos y conocer nuevas culturas.</option>
            </select>
          </label>

          <label>
            2. ¿Qué tipo de actividades disfrutas más?
            <select
              name="pregunta2"
              value={respuestas.pregunta2}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="1">Crear gráficos y editar fotos.</option>
              <option value="2">Diseñar ropa y accesorios.</option>
              <option value="3">Programar y desarrollar aplicaciones.</option>
              <option value="4">Negociar y aprender sobre mercados globales.</option>
              <option value="5">Manejar finanzas y analizar datos económicos.</option>
              <option value="6">Planear viajes y actividades turísticas.</option>
            </select>
          </label>

          <label>
            3. ¿Cuál de las siguientes materias te interesa más?
            <select
              name="pregunta3"
              value={respuestas.pregunta3}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="1">Arte y Diseño.</option>
              <option value="2">Textiles y Moda.</option>
              <option value="3">Tecnología e Informática.</option>
              <option value="4">Economía y Comercio.</option>
              <option value="5">Matemáticas y Contabilidad.</option>
              <option value="6">Geografía y Cultura.</option>
            </select>
          </label>
        </div>

        
        <div id="seccion2" className="section">
          <h2>Sección 2: Habilidades</h2>
          <label>
            4. ¿Cómo te describirías en cuanto a creatividad?

            <select
              name="pregunta4"
              value={respuestas.pregunta4}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="1">Muy creativo, siempre tengo nuevas ideas para diseños visuales.</option>
              <option value="2">Creativo en el diseño de ropa y moda.</option>
              <option value="3">Creativo en la resolución de problemas tecnológicos.</option>
              <option value="4">Creativo en la búsqueda de soluciones innovadoras para negocios.</option>
              <option value="5">Creativo en la gestión financiera y en la optimización de recursos.</option>
              <option value="6">Creativo en la organización de experiencias turísticas únicas.</option>
            </select>
          </label>

          <label>            
            5. ¿Qué tan cómodo te sientes trabajando con números y análisis?
            <select
              name="pregunta5"
              value={respuestas.pregunta5}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="1">No mucho, prefiero enfocarme en lo visual.</option>
              <option value="2">Solo cuando es necesario para mis diseños.</option>
              <option value="3">Me gusta cuando se trata de programación y análisis de datos. </option>
              <option value="4">Me siento muy cómodo analizando mercados y finanzas.</option>
              <option value="5">Es mi fuerte, disfruto trabajar con números y estadísticas.</option>
              <option value="6">Lo manejo bien, especialmente en el contexto de planificación de viajes.</option>
            </select>
          </label>

          <label>
            6.  ¿Cómo te manejas en situaciones de presión?
            <select
              name="pregunta6"
              value={respuestas.pregunta6}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="1">Prefiero trabajar a mi propio ritmo.</option>
              <option value="2">Me manejo bien, especialmente si se trata de cumplir plazos creativos.</option>
              <option value="3">Me gusta resolver problemas bajo presión.</option>
              <option value="4">Disfruto el desafío de trabajar bajo presión en un entorno de negocios.</option>
              <option value="5">Puedo manejar la presión cuando se trata de administrar dinero.</option>
              <option value="6">Me adapto bien, especialmente en la planificación de eventos.</option>
            </select>
          </label>
        </div>

        
        <div id="seccion3" className="section">
          <h2>Sección 3: Preferencias de Estudio y Trabajo</h2>
          <label>
            7. ¿Cómo prefieres trabajar?
            <select
              name="pregunta7"
              value={respuestas.pregunta7}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="1">De forma independiente, en proyectos de diseño gráfico.</option>
              <option value="2">En equipo, creando nuevas tendencias en moda.</option>
              <option value="3">Tanto de forma independiente como en equipo, desarrollando software.</option>
              <option value="4">
                En un entorno dinámico y global, interactuando con personas de diferentes culturas.
              </option>
              <option value="5">En un ambiente estructurado, gestionando finanzas.</option>
              <option value="6">
                En un entorno interactivo, organizando y gestionando experiencias turísticas.
              </option>
            </select>
          </label>

          <label>
            8. ¿Te gustaría viajar o trabajar en el extranjero?
            <select
              name="pregunta8"
              value={respuestas.pregunta8}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="1">
                No es mi prioridad, prefiero enfocarme en mi trabajo creativo.
              </option>
              <option value="2">Me gustaría, especialmente para explorar nuevas tendencias de moda.</option>
              <option value="3">
                Podría considerar trabajar en proyectos de tecnología en otros países.
              </option>
              <option value="4">Definitivamente, me interesa mucho el comercio internacional.</option>
              <option value="5">
                Solo si es necesario para mejorar mis habilidades financieras.
              </option>
              <option value="6">
                Sí, me encanta la idea de viajar y trabajar en el sector turístico.
              </option>
            </select>
          </label>

          <label>
            9. ¿Te interesaría emprender tu propio negocio?
            <select
              name="pregunta9"
              value={respuestas.pregunta9}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="1">Sí, un estudio de diseño gráfico.</option>
              <option value="2">Sí, una línea de moda propia.</option>
              <option value="3">Sí, una empresa de desarrollo de software.</option>
              <option value="4">Sí, una empresa de comercio internacional.</option>
              <option value="5">Sí, una firma de consultoría financiera.</option>
              <option value="6">
                Sí, una agencia de viajes o una empresa en la industria turística.
              </option>
            </select>
          </label>
        </div>

        <div className="botonEnviar">
          <button type="submit">Enviar</button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default Formulario2;