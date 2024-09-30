import { useLocation } from 'react-router-dom';
import '../../public/styles/resultado.css';

function Resultado() {
  const location = useLocation();
  const { respuestaMasSeleccionada } = location.state || {};

  const mensajes = {
    1: 'Produccion Grafica.',
    2: 'Procesos de Diseño Grafico.',
    3: 'Soporte Informatico.',
    4: 'Procesos Aduaneros.',
    5: 'Procesos Contables.',
    6: 'Operaciones Turisticas'
  };

  return (
    <div className="resultado">
      <h1>De acuerdo a tus respuestas, el perfil profesional mas indicado es:</h1>
      {respuestaMasSeleccionada ? (
        <p>{mensajes[respuestaMasSeleccionada]}</p>
      ) : (
        <p>No se pudo determinar un resultado.</p>
      )}
    </div>
  );
}

export default Resultado;
