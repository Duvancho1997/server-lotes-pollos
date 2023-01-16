import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate} from 'react-router-dom';
import "../css/crearusuario.css";
import { Button } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

  function CrearUsuario() {

    const navigate = useNavigate();
    var varSesion = sessionStorage.getItem("inicioSeccion");
    const [correo , setCorreo] = useState();
    const [identificacion , setIdentificacion] = useState();
    const [nombre , setNombre] = useState();
    const [apellido , setApellido] = useState();
    const [numero_contacto , setNumero_contacto] = useState();
    const [contrasena_cf , setContrasena_cf] = useState("password");
    const [contrasena2_cf , setContrasena2_cf] = useState("password");
    const [nombre_usuario , setNombre_usuario] = useState();
    const [contrasena , setContrasena] = useState();
    const [contrasena2 , setContrasena2] = useState();
    let validar = /^([A-Za-z0-9]{4,30})*$/;
    let validar2=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/
    let validar5 = /^[A-Za-z ]*$/;
    let validar6 = /^[a-zA-Z0-9!#$%&'*_+-]([\.]?[a-zA-Z0-9!#$%&'*_+-])+@[a-zA-Z0-9]([^@&%$\/()=?¿!.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2})?$/;

    const Regresar = () => {
        navigate("/TablaUsuario");
      }

      const crearUsuario=()=>{
        fetch('http://localhost:4000/users/usuario/'+nombre_usuario) 
        .then(response => {
            return response.json();
        })
        .then(response => {
          if (response[0]==nombre_usuario && nombre_usuario!=null){
            alert("El nombre del usuario ya está existe ")
          }else if( correo=="" ||correo==null|| contrasena2=="" ||contrasena2==null || !validar2.test(contrasena2)|| contrasena=="" ||contrasena==null || !validar2.test(contrasena)|| identificacion=="" ||identificacion==null || nombre=="" ||nombre==null || apellido=="" ||apellido==null|| numero_contacto=="" ||numero_contacto==null|| nombre_usuario=="" ||nombre_usuario==null||!validar5.test(nombre)||!validar5.test(apellido)||!validar6.test(correo)||!validar.test(nombre_usuario)||identificacion < 100000000 || identificacion > 99999999999 || numero_contacto < 1000000 || numero_contacto > 999999999999999 ){
            alert("Llenar y corregir todos los campos que tengan *  ")
          }else if(contrasena!=contrasena2){
            alert("La contraseña no coincide ")
          }else{
              var url = 'http://localhost:4000/users';
              var data = 
                {
                Identificacion: identificacion,
                Nombre: nombre,
                Correo_usuario: correo,
                Apellido: apellido,
                Numero_contacto: numero_contacto,
                Contrasena: contrasena,
                Nombre_usuario: nombre_usuario
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
            navigate("/TablaUsuario");
          }
        })
      }

      const mostrarContrasena=()=>{
        if(contrasena_cf == "password"){
          setContrasena_cf("text");
        }else{
          setContrasena_cf("password");
        }
    }

    const mostrarContrasena2=()=>{
      if(contrasena2_cf == "password"){
        setContrasena2_cf("text");
      }else{
        setContrasena2_cf("password");
      }
  }

  let styles = {
    fontWeight:"bold",
    color: "#dc3545"
  }

  if(varSesion=="true"){ 

      return( 
        <form>
        <div className="col-sm-3 offset-sm-4">
        <div id="fondCrearUsuario" >

    <center><h3>Insertar Usuario</h3></center>

    <hr></hr>

        <label>
        Identificación *
        </label>

        <input 
          minLength="100000000"
          maxLength="99999999999"
          className="form-control"
          onChange={event => setIdentificacion(event.target.value)}
          type="number"
          name="Identificacion"
        />
        {identificacion < 100000000  ? <h7 style={styles}>No puede ser menos de 9 dígitos </h7> : console.log('bien')}
        {identificacion > 99999999999  ? <h7 style={styles}>No puede tener más de 11 dígitos </h7> : console.log('bien')}

      <br></br>

        <label>
          Nombre *
        </label>
        <input
          maxLength="30"
          pattern="[A-Za-z ]+"
          className="form-control"
          name="nombre"
          type="text"
          onChange={event => setNombre(event.target.value)}
        />
        {!validar5.test(nombre) && nombre!=null ? <h7 style={styles}>Solo letras </h7> : console.log('bien')}

    <br></br>

        <label>
          Apellido *
        </label>
        <input
          maxLength="30"
          pattern="[A-Za-z ]+"
          className="form-control"
          name="apellido"
          type="text"
          onChange={event => setApellido(event.target.value)}
        />
        {!validar5.test(apellido) && apellido!=null ? <h7 style={styles}>Solo letras </h7> : console.log('bien')}

      <br></br>

        <label>
          Correo Electrónico *
        </label>
        <input
          maxLength="30"
          pattern="[a-zA-Z0-9!#$%&'*_+-]([\.]?[a-zA-Z0-9!#$%&'*_+-])+@[a-zA-Z0-9]([^@&%$\/()=?¿!.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2})?"
          className="form-control"
          name="Correo"
          type="email"
          onChange={event => setCorreo(event.target.value)}
        />
        {!validar6.test(correo) && correo!=null ? <h7 style={styles}>El correo debe tener ejemplo@email.com </h7> : console.log('bien')}

  <br></br>

        <label>
          Numero Contacto *
        </label>
        <input
          maxLength= "999999999999999"
          minLength = "1000000"
          className="form-control"
          name="Numero_contacto"
          type="number"
          onChange={event => setNumero_contacto(event.target.value)}
        />
        {numero_contacto < 1000000  ? <h7 style={styles}>No puede ser menos de 7 dígitos  </h7> : console.log('bien')}
        {numero_contacto > 999999999999999  ? <h7 style={styles}>No puede ser mas de 15 dígitos </h7> : console.log('bien')}

                    <br></br>
                    <label>
                      Contraseña * 
                    </label>
                    <InputGroup className="mb-3">
                    <Form.Control 
                      maxLength="15"
                      pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$"
                      type={contrasena_cf}
                      className="form-control"
                      name="Contrasena"
                      onChange={event => setContrasena(event.target.value)}/>
                    <Button 
                      class="btn btn-primary" 
                      type="button"
                      onClick={mostrarContrasena}>
                      Mostrar
                    </Button>
                  </InputGroup>
                  {!validar2.test(contrasena) && contrasena!=null ? <h7 style={styles}>La contraseña debe tener más de 8 caracteres incluido una mayúscula, una minúscula, un número y un carácter especial  </h7> : console.log('bien')}

                      <br></br>
                    <label>
                      Confirmar contraseña * 
                    </label>
                  <InputGroup className="mb-3">
                    <Form.Control 
                        maxLength="15"
                        pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$"
                        minLength = "8"
                        type={contrasena2_cf}
                        className="form-control"
                        name="Contrasena"
                        onChange={event => setContrasena2(event.target.value)}/>
                    <Button 
                      class="btn btn-primary"  
                      type="button"
                      onClick={mostrarContrasena2}>
                      Mostrar
                    </Button>
                  </InputGroup>
                  {!validar2.test(contrasena2) && contrasena2!=null ? <h7 style={styles}>La contraseña debe tener más de 8 caracteres incluido una mayúscula, una minúscula, un número y un carácter especial  </h7> : console.log('bien')}

      <br></br>
        <label>
          Nombre Usuario *
        </label>
        <input
          minLength="4"
          maxLength="30"
          pattern="[A-Za-z0-9]+"
          className="form-control"
          name="Nombre_usuario"
          type="text"
          onChange={event => setNombre_usuario(event.target.value)}
        />
        {!validar.test(nombre_usuario) && nombre_usuario!=null ? <h7 style={styles}>El usuario debe tener mínimo 4 letras sin símbolos </h7> : console.log('bien')}
      <hr></hr>
<center>
        <Button
          color="primary" 
          onClick={crearUsuario}>
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
            </form>
      )
    }else{
      navigate("/");
    }
}
export  default CrearUsuario