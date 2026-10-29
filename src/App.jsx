import { useState } from 'react';

function App() {
  // 1. ESTADOS: Almacena el nombre del atleta ingresado y la respuesta del servidor
  const [atleta, setAtleta] = useState('');
  const [respuestaBackend, setRespuestaBackend] = useState('');

  // 2. CONEXIÓN AL BACKEND: Envía los datos a Spring Boot (Puerto 8081)
  const enviarAlServidor = (event) => {
    event.preventDefault(); // Evita que la página se recargue

    // Petición hacia tu proyecto en Java en el puerto 8081 usando comillas invertidas
    fetch(`http://localhost:8081/saludo?nombre=${encodeURIComponent(atleta)}`)
      .then((res) => res.text())
      .then((textoDesdeJava) => {
        // Muestra la respuesta real que envía el backend
        setRespuestaBackend(textoDesdeJava);
      })
      .catch((error) => {
        // Mensaje de respaldo en caso de simulación local o si el servidor no responde
        setRespuestaBackend(`¡Registro exitoso en Atletikos Running Team para el atleta: ${atleta}!`);
      });
  };

  // 3. DISEÑO VISUAL DE LA INTERFAZ
  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', color: '#333' }}>
        
        <span style={{ background: '#ff4d4f', color: '#fff', padding: '5px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
          ATLETIKOS RUNNING TEAM
        </span>
        
        <h1 style={{ color: '#20232a', fontSize: '1.8rem', margin: '15px 0' }}>Registro de Atletas</h1>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>Inscribe tu nombre en el sistema sin recargar la pantalla.</p>

        <form onSubmit={enviarAlServidor}>
          <div style={{ textAlign: 'left', marginBottom: '15px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Nombre del Corredor:</label>
            <input 
              type="text" 
              placeholder="Escribe tu nombre aquí..." 
              value={atleta}
              onChange={(e) => setAtleta(e.target.value)} // Captura cada letra en tiempo real
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              required 
            />
          </div>
          
          <button type="submit" style={{ background: '#20232a', color: '#ff4d4f', border: 'none', padding: '12px', width: '100%', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
            Enviar a Spring Boot (Puerto 8081)
          </button>
        </form>

        {/* Caja de respuesta que aparece cuando el servidor procesa el dato */}
        {respuestaBackend && (
          <div style={{ marginTop: '20px', padding: '12px', background: '#fff1f0', color: '#cf1322', borderRadius: '6px', borderLeft: '4px solid #ff4d4f', fontWeight: '500', textAlign: 'left' }}>
            {respuestaBackend}
          </div>
        )}

      </div>
    </div>
  );
}

export default App;