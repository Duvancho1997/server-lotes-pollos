import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate,useParams} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import "../css/crearcliente.css";

  function CrearCliente() {

  const navigate = useNavigate();
  const {id } = useParams();
  const [fecha_creacion , setFecha_creacion] = useState();
  const [nombre_cliente , setNombre_cliente] = useState();
  const [identificacion_cliente , setIdentificacion_Cliente] = useState();
  const [numero_contacto_cliente , setNumero_contacto_cliente] = useState();
  const [dirrecion_cliente , setDirrecion_cliente] = useState();
  const [correo_cliente , setCorreo_cliente] = useState();
  const [descripcion_cliente , setDescripcion_cliente] = useState();
  var varSesion = sessionStorage.getItem("inicioSeccion");
  let validar = /^[A-Za-z ]*$/;
  let validar2 = /^[a-zA-Z0-9!#$%&'*_+-]([\.]?[a-zA-Z0-9!#$%&'*_+-])+@[a-zA-Z0-9]([^@&%$\/()=?¿!.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2})?$/;

  const Regresar = () => {
    navigate("/TablaClientes");
  }

//metodo para crear el nuevo cliente
const crearCliente=()=>{
  if( fecha_creacion=="" ||fecha_creacion==null|| identificacion_cliente=="" ||identificacion_cliente==null|| nombre_cliente=="" ||nombre_cliente==null || numero_contacto_cliente=="" ||numero_contacto_cliente==null || dirrecion_cliente=="" ||dirrecion_cliente==null || correo_cliente=="" ||correo_cliente==null|| descripcion_cliente=="" ||descripcion_cliente==null||  identificacion_cliente < 100000000 ||identificacion_cliente > 99999999999||numero_contacto_cliente < 1000000||numero_contacto_cliente > 999999999999999){
    alert("Llenar y corregir todos los campos que tengan *  ")
  }else{
      var url = 'http://localhost:4000/cliente';
      var data = 
        {
        Fecha_creacion: fecha_creacion,
        Identificacion_cliente: identificacion_cliente,
        Nombre: nombre_cliente,
        Numero_contacto_cliente: numero_contacto_cliente,
        Direccion_Cliente: dirrecion_cliente,
        Correo_Cliente: correo_cliente,
        Descripcion_cliente: descripcion_cliente, 
        Id_referencia_usuario: id
    };  
        fetch(url, {
        method: 'POST', 
          headers:{
            'Access-Control-Allow-Origin':'*', 
            'Content-Type':'application/json' 
          }, 
          body: JSON.stringify(data)
        })
    .then(res => res.json())
    .catch(error => console.error('Error:', error) )
    .then(response => console.log('Success:', response));  
    navigate("/TablaClientes");
  }
}

  let styles = {
    fontWeight:"bold",
    color: "#dc3545"
  }

  if(varSesion=="true"){ 

  return(

    <div className="col-sm-3 offset-sm-4">
    <div id="fondCrearCliente" >

    <center><h3>Insertar Cliente</h3></center>

              <hr></hr>

                  <label>
                  Fecha Creación *
                  </label>

                  <input
                    className="form-control"
                    onChange={event =>  setFecha_creacion(event.target.value)}
                    type="date"
                    name="Fecha_creacion"
                  />

              <br></br>

                  <label>
                  Identificación *
                  </label>
                  <input
                    minLength="100000000"
                    maxLength="99999999999"
                    className="form-control"
                    name="Identificacion_Cliente"
                    type="number"
                    onChange={event => setIdentificacion_Cliente(event.target.value)}
                  />
                  {identificacion_cliente < 100000000  ? <h7 style={styles}>No puede ser menos de 9 dígitos </h7> : console.log('bien')}
                  {identificacion_cliente > 99999999999  ? <h7 style={styles}>No puede tener más de 11 dígitos </h7> : console.log('bien')}


              <br></br>
                  <label>
                  Numero de Contacto *
                  </label>
                  <input
                    maxLength= "999999999999999"
                    minLength = "1000000"
                    className="form-control"
                    name="Numero_contacto_cliente"
                    type="number"
                    onChange={event => setNumero_contacto_cliente(event.target.value)}
                  />
                  {numero_contacto_cliente < 1000000  ? <h7 style={styles}>No puede ser menos de 7 dígitos </h7> : console.log('bien')}
                  {numero_contacto_cliente > 999999999999999  ? <h7 style={styles}>No puede tener más de 15 dígitos</h7> : console.log('bien')}

            <br></br>
                  <label>
                  Dirección del Cliente *
                  </label>
                  <input
                    maxLength= "30"
                    className="form-control"
                    name="Dirrecion_cliente"
                    type="text"
                    onChange={event => setDirrecion_cliente(event.target.value)}
                  />

                <br></br>
                  <label>
                  Nombre Cliente *
                  </label>
                  <input
                    maxLength="30"
                    pattern="[A-Za-z ]+"
                    className="form-control"
                    name="Nombre_cliente"
                    type="text"
                    onChange={event => setNombre_cliente(event.target.value)}
                  />
                  {!validar.test(nombre_cliente) && nombre_cliente!=null ? <h7 style={styles}>Solo letras </h7> : console.log('bien')}

              <br></br>
                  <label>
                  Correo de Cliente *
                  </label>
                  <input
                    maxLength="30"
                    pattern="[a-zA-Z0-9!#$%&'*_+-]([\.]?[a-zA-Z0-9!#$%&'*_+-])+@[a-zA-Z0-9]([^@&%$\/()=?¿!.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2})?"
                    className="form-control"
                    name="Correo_cliente"
                    type="text"
                    onChange={event => setCorreo_cliente(event.target.value)}
                  />
                  {!validar2.test(correo_cliente) && correo_cliente!=null ? <h7 style={styles}>El correo debe tener ejemplo@email.com </h7> : console.log('bien')}

                <br></br>
                  <label>
                  Descripción del Cliente *
                  </label>
                  <input
                    maxLength="30"
                    className="form-control"
                    name="Descripcion_cliente"
                    type="text"
                    onChange={event => setDescripcion_cliente(event.target.value)}
                  />

            <hr></hr>

<center>
                <Button
                  type="submit"
                  onClick={crearCliente}>
                  Insertar
                </Button>
{" "}
                <Button 
                  className="btn btn-danger"
                  onClick={Regresar}>
                  Cancelar
                </Button>

                </center>
            </div>
            </div>
  )
}else{
  navigate("/");
}

}
export  default CrearCliente