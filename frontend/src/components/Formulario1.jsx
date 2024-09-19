import { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Asegúrate de tener React Router instalado y configurado
import '../../public/styles/formulario.css'

function FormularioData() {
    const [colegio, setColegio] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        data.colegio = colegio; 
        console.log(colegio);
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
                // Redirigir al Formulario 2
                navigate('/formularioPreguntas'); 
            } else {
                const errorData = await response.json();
                console.error('Error al guardar estudiante:', errorData.error);
            }
        } catch (error) {
            console.error('Error de red:', error);
            // Muestra un mensaje de error al usuario
        }
    }

    return (
        <div className="container-form-data">
            <form onSubmit={handleSubmit} className="formulariodata">
                <h1>Formulario 1</h1>
                <label htmlFor="colegio"> 
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
                <input type="number" min={1} max={12} name="grado" id="grado" required />
            </label>

            <label>
                correo:
                <input type="email" name="correo" id="correo"  required />
            </label>

            <label>
                Teléfono:
                <input type="text" name="telefono" id="telefono" required />
            </label>

            <button 
            type="submit" 
            onClick={() => window.location.href='/formularioPreguntas'} 
            style={{ 
                marginTop: "1em", 
                padding: "0.8em", 
                background: "#c30000", 
                textDecoration: "none", 
                marginBottom: "2em",  
                border: "1px solid #e5e5e5", 
                borderRadius: "8px", 
                color: "white" 
            }}
            >Continuar</button>        </form> 
        </div>
    )
}

export default FormularioData;
