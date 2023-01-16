import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button } from 'react-bootstrap';
import "../css/Iniciosesion.css";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useNavigate} from 'react-router-dom';
import { useState} from "react";

export  default function InicioSeccion() {

  const navigate = useNavigate();
  const [contrasena_cf , setContrasena_cf] = useState("password");
  const [contrasena , setContrasena] = useState('');
  const [nombre_usuario , setNombre_usuario] = useState('');
  let validar = /^([A-Za-z0-9]{4,30})*$/;
  let validar2=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/

const login=()=>{
  if(nombre_usuario =="" || contrasena ==""||!validar.test(nombre_usuario) ||!validar2.test(contrasena)){
    alert("Llenar todos los campos")
  }else{
  fetch('http://localhost:4000/users/login/'+contrasena+"/"+nombre_usuario)
  .then(response => {
      return response.json();
  })
  .then(response => {
    console.log("pruebaLogin",response)
    if (response =="") {
      alert("La contraseña y el usuario están mal escritos")
    } else if(nombre_usuario == response[0].Nombre_usuario && contrasena == response[0].Contrasena){
      var id_usuario = response[0].Id_usuario
      var inicioSeccion="true";
      sessionStorage.setItem("item_key",id_usuario);
      sessionStorage.setItem("inicioSeccion",inicioSeccion);
      console.log("if------",id_usuario)
      navigate(`/Inicio/${id_usuario}`);
    }
    else{
      alert("El usuario o la contraseña están mal escritas")
  }
  });
}
}

let styles = {
  fontWeight:"bold",
  color: "#dc3545"
}

const mostrarContrasena=()=>{
  if(contrasena_cf == "password"){
    setContrasena_cf("text");
  }else{
    setContrasena_cf("password");
  }
}

    return(

      <body >

            <div  className="col-sm-4 offset-sm-4">
              
              <div id="Inicicont">
                <br></br>
              <center> <h3 id="InicTitulo">Inicio de Sesión</h3></center>
              <br></br>

                <InputGroup id="input" className="mb-3">
                <InputGroup.Text className="bi bi-person-fill"></InputGroup.Text>
                  <Form.Control
                  minLength="4"
                  maxLength="30"
                  onChange={event => setNombre_usuario(event.target.value)}
                  placeholder="Usuario"
                  aria-label="Usuario"
                  pattern="[A-Za-z0-9]+"
                  type="text"
                  aria-describedby="basic-addon1"
                  />
                </InputGroup>
                {!validar.test(nombre_usuario) && nombre_usuario!=null ? <h7 style={styles}>El usuario debe tener mínimo 4 letras sin símbolos </h7> : console.log('bien')}

                <InputGroup  id="input2" className="mb-3">
                <InputGroup.Text className="bi bi-lock-fill"></InputGroup.Text>
                  <Form.Control
                  maxLength="15"
                  pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$"
                  onChange={event => setContrasena(event.target.value)}
                  placeholder="Contraseña"
                  aria-label="Contrasena"
                  type={contrasena_cf}
                  aria-describedby="basic-addon1"
                    />
                      <Button 
                      class="btn btn-primary" 
                      type="button"
                      onClick={mostrarContrasena}>
                      Mostrar
                    </Button>
                </InputGroup>
                {!validar2.test(contrasena) && contrasena!="" ? <h7 style={styles}>La contraseña debe tener más de 8 caracteres incluido una mayúscula, una minúscula, un número y un carácter especial  </h7> : console.log('bien')}

                <Button
                  id="botIngresar"
                  onClick={login}
                  variant="primary" >
                  Ingresar
                </Button>

                <div id="recuperacion">
                <div id="RecuperarContrasena">
                <Breadcrumb >
                    <Breadcrumb.Item href="/RecuperarContrasena">Recuperar Contraseña</Breadcrumb.Item>
                </Breadcrumb>
                </div>

                <div id="RecuperarUsuario">
                <Breadcrumb >
                    <Breadcrumb.Item  id="RecuperarUsuario" href="/RecuperarUsuario">Recuperar Usuario</Breadcrumb.Item>
                </Breadcrumb>
                </div>
                </div>

                </div>
                </div>

            </body>

        )

      }
