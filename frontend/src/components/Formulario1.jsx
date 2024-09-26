import { useState } from "react";
import '../../public/styles/formulario.css';


function FormularioData() {
    const [colegio, setColegio] = useState('');
    const [grado, setGrado] = useState('');
    

    async function handleSubmit(e) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        data.colegio = colegio;
        data.grado = parseInt(grado); // Asegúrate de que 'grado' sea un número
        console.log(data);

        try {
            const response = await fetch("http://localhost:3001/estudiantes/guardar-datos", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const nuevoEstudiante = await response.json();
                console.log('Estudiante guardado:', nuevoEstudiante);

                // Almacenar el correo electrónico y el ID en localStorage
                localStorage.setItem('correoEstudiante', nuevoEstudiante.correo);
                localStorage.setItem('idEstudiante', nuevoEstudiante.id);

                // Redirigir a la fromulario 2
                window.location.href = '/formularioPreguntas';

            } else {
                const errorData = await response.json();
                console.error('Error al guardar estudiante:', errorData.error);
                // Muestra un mensaje de error al usuario (puedes usar un estado o una biblioteca para esto)
                alert('Error al guardar los datos. Por favor, inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error de red:', error);
            // Muestra un mensaje de error al usuario
            window.location.href = '/formularioPreguntas';
            alert('Error de conexión. Por favor, verifica tu conexión a internet e inténtalo de nuevo.');
        }
    }

    return (
        <div className="container-form-data">
            <form onSubmit={handleSubmit} className="formulariodata">
                <h1>Formulario 1</h1>
                
                <label>
                    Colegio:
                    <select value={colegio} id="colegio" onChange={(e) => setColegio(e.target.value)}>
                        <option value="">Selecciona...</option>
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
                    Grado:
                    <select value={grado} id="grado" onChange={(e) => setGrado(e.target.value)}>
                        <option value="">Selecciona...</option>
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
