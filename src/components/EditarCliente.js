import { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import "../css/editarcliente.css";

export  default function EditarCliente() {

  const navigate = useNavigate();
  const [clientes , setClientes] = useState([]);
  const [nombre_cliente, setNombre_cliente] = useState('');
  const [fecha_creacion , setFecha_creacion] = useState('');
  const [identificacion_cliente , setIdentificacion_Cliente] = useState('');
  const [numero_contacto_cliente , setNumero_contacto_cliente] = useState('');
  const [direccion_cliente , setDireccion_cliente] = useState('');
  const [correo_cliente , setCorreo_cliente] = useState('');
  const [descripcion_cliente , setDescripcion_cliente] = useState('');
  const [id_referencia_usuario , setId_referencia_usuario] = useState('');
  const {id } = useParams();
  
  const Regresar = () => {
    navigate("/TablaClientes");
  }

  useEffect(()=>{
    fetch('http://localhost:4000/cliente/'+id)
    .then(response => {
        return response.json();
    })
    .then(response => {
      setClientes(response); 
      setFecha_creacion(response['Fecha_creacion']);
      setIdentificacion_Cliente(response['Identificacion_cliente']);
      setNombre_cliente(response['Nombre']);
      setNumero_contacto_cliente(response['Numero_contacto_cliente']);
      setDireccion_cliente(response['Direccion_cliente']);
      setCorreo_cliente(response['Correo_cliente']);
      setDescripcion_cliente(response['Descripcion_cliente']);
      setId_referencia_usuario(response['Id_referencia_usuario']);
    })
  },[]); 

//metodo que manda la informacion editada a la base de datos 
const editarCliente =()=>{
    var url = 'http://localhost:4000/cliente/'+id;
    var data = 
      {  
        Fecha_creacion: fecha_creacion,
        Identificacion_cliente: identificacion_cliente,
        Numero_contacto_cliente: numero_contacto_cliente,
        Nombre: nombre_cliente,
        Direccion_Cliente: direccion_cliente,
        Correo_Cliente: correo_cliente,
        Descripcion_cliente: descripcion_cliente, 
        Id_referencia_usuario: id_referencia_usuario
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
    navigate("/TablaClientes");
  }

  return(
<div className="col-sm-3 offset-sm-4">
    <div id="fondEditCliente" >

              <center><h3>Editar Cliente </h3></center>

              <hr></hr>

                  <label>
                  Fecha de creacion:
                  </label>

                  <input
                    className="form-control"
                    value={fecha_creacion.substr(0,10)}
                    onChange={event =>  setFecha_creacion(event.target.value)}
                    type="date"
                    name="Fecha_creacion"
                  />

                <br></br>

                  <label>
                  Identificacion del Cliente
                  </label>
                  <input
                    value={identificacion_cliente}
                    className="form-control"
                    name="Identificacion_Cliente"
                    type="text"
                    onChange={event => setIdentificacion_Cliente(event.target.value)}
                  />

              <br></br>
                  <label>
                  Nombre:
                  </label>
                  <input
                    value={nombre_cliente}
                    className="form-control"
                    name="nombre_cliente"
                    type="text"
                    onChange={event => setNombre_cliente(event.target.value)}
                  />

                <br></br>
                  <label>
                  Numero de contacto de cliente:
                  </label>
                  <input
                    value={numero_contacto_cliente}
                    className="form-control"
                    name="numero_contacto_cliente"
                    type="text"
                    onChange={event => setNumero_contacto_cliente(event.target.value)}
                  />

                <br></br>

                  <label>
                  Dirrecion del cliente:
                  </label>
                  <input
                    value={direccion_cliente}
                    className="form-control"
                    name="direccion_cliente"
                    type="text"
                    onChange={event => setDireccion_cliente(event.target.value)}
                  />

              <br></br>
                  <label>
                  Correo de cliente:
                  </label>
                  <input
                    value={correo_cliente}
                    className="form-control"
                    name="correo_cliente"
                    type="text"
                    onChange={event => setCorreo_cliente(event.target.value)}
                  />

                <br></br>
                  <label>
                  Descripcion del cliente:
                  </label>
                  <input
                    value={descripcion_cliente}
                    className="form-control"
                    name="descripcion_cliente"
                    type="text"
                    onChange={event => setDescripcion_cliente(event.target.value)}
                  />

              <br></br>
                  <label>
                  Referencia del usuario:
                  </label>
                  <input
                    value={id_referencia_usuario}
                    className="form-control"
                    name="Id_referencia_usuario"
                    type="text"
                    onChange={event => setId_referencia_usuario(event.target.value)}
                  />

                <hr></hr>
                <center>
                <Button
                  color="primary" 
                  type="submit"
                  onClick={editarCliente}>
                  Insertar
                </Button>
                {" "} 
                <Button 
                  type="submit"
                  className="btn btn-danger"
                  onClick={Regresar}>
                  Cancelar
                </Button>

                </center>
                </div>
            </div>
    )
}