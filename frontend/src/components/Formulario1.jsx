import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../../public/styles/formulario.css';

function FormularioData() {
  const [colegio, setColegio] = useState('');
  const [grado, setGrado] = useState('');
  const [, setError] = useState(null); 
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    // Validación básica en el frontend (puedes agregar más validaciones según tus necesidades)
    if (!colegio || !grado) {
      setError('Por favor, selecciona un colegio y un grado.');
      return; 
    }

    const data = Object.fromEntries(new FormData(e.target));
    data.colegio = colegio;
    data.grado = parseInt(grado, 10); 
    console.log(data);

    try {
      const response = await fetch("http://localhost:3006/estudiantes/guardar-datos", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const nuevoEstudiante = await response.json();
        console.log('Estudiante guardado:', nuevoEstudiante);
      
        // Almacenar el correo electrónico y el documento en localStorage
        localStorage.setItem('correoEstudiante', nuevoEstudiante.correo);
        localStorage.setItem('documentoEstudiante', nuevoEstudiante.documento);
        // Redirigir al Formulario 2 usando useNavigate
        navigate('/formularioPreguntas');
      } else {
        const errorData = await response.json();
        console.error('Error al guardar estudiante:', errorData.error);
        setError(errorData.error); // Mostrar el mensaje de error del backend
      }
    } catch (error) {
      console.error('Error de red:', error);
      setError('Error de conexión. Por favor, verifica tu conexión a internet e inténtalo de nuevo.');
    }
  }
    return (
        <div className="container-form-data">
            <form onSubmit={handleSubmit} className="formulariodata">
                <h1>Registro de Estudiante</h1>
                
                <label>
                    <select value={colegio} id="colegio" onChange={(e) => setColegio(e.target.value)}>
                        <option value="">Selecciona tu colegio</option>
                        <option value="COMFANORTE">COMFANORTE</option>
                        <option value="JULIO PEREZ FERRERO">JULIO PEREZ FERRERO</option>
                        <option value="SANTA CECILIA">SANTA CECILIA</option>
                        <option value="SANTISIMA TRINIDAD">SANTISIMA TRINIDAD</option>
                        <option value="CLARETIANO">CLARETIANO</option>
                        <option value="JUAN ATALAYA">JUAN ATALAYA</option>
                        <option value="ORIENTAL 26">ORIENTAL 26</option>
                        <option value="Otro">Otro</option>
                    </select>
                </label>

                <label>
                    Nombre del estudiante:
                    <input type="text" name="nombre" id="nombre" required />
                </label>
                <label>
                    Numero de Documento:
                    <input type="text" name="documento" id="documento" required />
                </label>

                <label>
                    <select value={grado} id="grado" onChange={(e) => setGrado(e.target.value)}>
                        <option value="">Selecciona tu grado</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                    </select>
                </label>

                <label>
                    Correo:
                    <input type="email" name="correo" id="correo" required />
                </label>

                <label>
                    Teléfono:
                    <input type="text" name="telefono" id="telefono" required />
                </label>

                <button type="submit" className="submit-button">Continuar</button>

                <div className="admin-button">
                <a href="/AdminLogin" className="button-2">
                Iniciar como admin
                </a>
                </div>

            </form>

          
            
        </div>
    );
}

export default FormularioData;
