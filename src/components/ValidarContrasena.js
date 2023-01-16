import { useState,useEffect } from "react";
import "../css/editarusuario.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

export  default function ValidarContrasena() {

    const navigate = useNavigate();
    const [contrasena_cf , setContrasena_cf] = useState("password");
    const [contrasena2_cf , setContrasena2_cf] = useState("password");
    const [usuarios , setUsuarios] = useState([]);
    const [correo , setCorreo] = useState('');
    const [identificacion , setIdentificacion] = useState('');
    const [nombre , setNombre] = useState('');
    const [apellido , setApellido] = useState('');
    const [numero_contacto , setNumero_contacto] = useState('');
    const [contrasena , setContrasena] = useState('');
    const [contrasena2 , setContrasena2] = useState('');
    const [nombre_usuario , setNombre_usuario] = useState('');
    const [id_usuario, setId_usuario] = useState('');
    const {id } = useParams();
    let validar=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/

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
        if(contrasena!=contrasena2){
          alert("la contaseña no considen ")
        }else{
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
          alert("Se ha cambiado la contraseña con éxito " )
          navigate("/");
        }
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

        return(

          <fom>
      <div className="col-sm-3 offset-sm-4">
          <div id="fondEditUsuar" >

            <center><h3>Cambiar Contraseña</h3></center>

                  <hr></hr>

                        <label>
                        Identificación
                        </label>

                        <input
                          className="form-control"
                          name="identificacion"
                          type="text"
                          value={identificacion}
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
                        />

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
                  {!validar.test(contrasena) && contrasena!="" ? <h7 style={styles}>La contraseña debe tener más de 8 caracteres incluido una mayúscula, una minúscula, un número y un carácter especial  </h7> : console.log('bien')}

                    <label>
                      Confirmar contraseña * 
                    </label>
                  <InputGroup className="mb-3">
                    <Form.Control 
                        maxLength="15"
                        pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$"
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
                  {!validar.test(contrasena2) && contrasena2!="" ? <h7 style={styles}>La contraseña debe tener más de 8 caracteres incluido una mayúscula, una minúscula, un número y un carácter especial  </h7> : console.log('bien')}

                    <hr></hr>
                    <center>

                      <Button 
                        id="botIngresar"
                        type="submit"
                        variant="primary"
                        onClick={editarUsuario}
                      >
                        Enviar
                    </Button>

                      </center>
                    </div>
                    </div>
                    </fom>
        )
      }