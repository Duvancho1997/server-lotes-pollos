import { useState,useEffect } from "react";
import "../css/editarusuario.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export  default function EditarUsuario() {

  const navigate = useNavigate();
  const [usuarios , setUsuarios] = useState([]);
  const [correo , setCorreo] = useState('');
  const [identificacion , setIdentificacion] = useState('');
  const [nombre , setNombre] = useState('');
  const [apellido , setApellido] = useState('');
  const [numero_contacto , setNumero_contacto] = useState('');
  const [contrasena , setContrasena] = useState('');
  const [nombre_usuario , setNombre_usuario] = useState('');
  const [id_usuario, setId_usuario] = useState('');
  const {id } = useParams();

  const Regresar = () => {
    navigate("/TablaUsuario");
  }

  useEffect(()=>{
    fetch('http://localhost:4000/users/'+id)
  .then(response => {
      return response.json();
    })
    .then(response => {
        setUsuarios(response); 
        setId_usuario(response['Id_usuario'])
        setIdentificacion(response['Identificacion'])
        setNombre(response['Nombre'])
        setApellido(response['Apellido'])
        setCorreo(response['Correo_usuario'])
        setNumero_contacto(response['Numero_contacto'])
        setContrasena(response['Contrasena'])
        setNombre_usuario(response['Nombre_usuario'])
    })
  },[]); 

  const editarUsuario=()=>{
    var id =id_usuario
        var url = 'http://localhost:4000/users/'+id;
        var data = 
          {Identificacion: identificacion,
          Nombre: nombre,
          Apellido: apellido,
          Correo_usuario: correo,
          Numero_contacto: numero_contacto,
          Contrasena: contrasena,
          Nombre_usuario: nombre_usuario  
        };
      fetch(url, {
        method: 'PUT',
        headers:{
            'Access-Control-Allow-Origin':'*', 
        'Content-Type':'application/json'
      }, 
        body: JSON.stringify(data)
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
      navigate("/TablaUsuario");
    }

  return(
    <fom>
<div className="col-sm-3 offset-sm-4">
    <div id="fondEditUsuar" >

      <center><h3>Editar Registro </h3></center>

            <hr></hr>

                  <label>
                    Identificacion
                  </label>

                  <input
                    className="form-control"
                    name="identificacion"
                    type="text"
                    value={identificacion}
                    onChange={event => setIdentificacion(event.target.value)}
                  />

              <br></br>
                  <label>
                    Nombre
                  </label>
                  <input
                    className="form-control"
                    name="nombre"
                    type="text"
                    value={nombre}
                    onChange={event => setNombre(event.target.value)}
                  />

                <br></br>

                  <label>
                    Apellido 
                  </label>
                  <input
                    className="form-control"
                    name="apellido "
                    type="text"
                    value={apellido}
                    onChange={event => setApellido(event.target.value)}
                  />

                <br></br>

                  <label>
                  Correo electronico:
                  </label>
                  <input
                    className="form-control"
                    name="Correo"
                    type="text"
                    value={correo}
                    onChange={event => setCorreo(event.target.value)}
                  />
              
              <br></br>
                
                  <label>
                    Numero de contacto 
                  </label>
                  <input
                    className="form-control"
                    name="Numero_contacto "
                    type="text"
                    value={numero_contacto}
                    onChange={event => setNumero_contacto(event.target.value)}
                  />

                <br></br>
                  <label>
                  Contraseña
                  </label>
                  <input
                    className="form-control"
                    name="contrasena"
                    type="text"
                    value={contrasena}
                    onChange={event => setContrasena(event.target.value)}
                  />

              <br></br>
                  <label>
                    Nombre de usuario
                  </label>
                  <input
                    className="form-control"
                    name="nombre_usuario"
                    type="text"
                    value={nombre_usuario}
                    onChange={event => setNombre_usuario(event.target.value)}
                  />

              <hr></hr>
              <center>

                <Button 
                  type="submit"
                  variant="primary"
                  onClick={editarUsuario}
                >
                  Editar
              </Button>
              {" "} 
                <Button
                  type="submit"
                  variant="danger"
                  onClick={Regresar}
                >
                  Cancelar
                </Button>

                </center>
              </div>
              </div>
              </fom>
  )
}