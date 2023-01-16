import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import "../css/recuperarusuario.css";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useNavigate} from 'react-router-dom';
import { useState} from "react";
import emailjs from '@emailjs/browser';

export  default function RecuperarContrasena() {

    const navigate = useNavigate();
    const [documento , setDocumento] = useState();
    const [usuario , setUsuario] = useState();
    const [user_email , setUser_email] = useState();
    const [user_text , setUser_text] = useState();
    let validar = /^([A-Za-z0-9]{4,30})*$/;

    const sendEmail = (event)=>{
      if(usuario =="" || documento =="" ||usuario ==null || documento ==null||documento < 100000000 || documento > 99999999999||!validar.test(usuario)){
        alert("Llenar y corregir todos los campos")
      }else{
      event.preventDefault();
        fetch('http://localhost:4000/validacion/contrasena/'+usuario+"/"+documento)
        .then(response => {
            return response.json();
        })
        .then(response => {
          setUser_email(response.Nombre_usuario);
          setUser_text(response.Id_usuario)
          event.target.user_email.value =response.Correo_usuario;
          event.target.user_text.value =response.Id_usuario;
          emailjs.sendForm('service_0gjaigp','template_raypsfl',event.target,'Wdc9GyeNUYD3nyhoM')
          .then(response => {
            alert("Se ha enviado la información al correo " )
          navigate("/"); 
        });
        });
      }
}

let styles = {
  fontWeight:"bold",
  color: "#dc3545"
}

return (

  <body >

  <div  className="col-sm-4 offset-sm-4">

  <div id="recpFrom">
  <div className='div-form'>
      <br></br>
    <center> <h3 className='title-form' >Recuperar Contraseña</h3></center>
    <br></br>

    <form className='form-mail' onSubmit={sendEmail}>

      <InputGroup id="input" className="mb-3">
      <InputGroup.Text className="bi bi-person-fill"></InputGroup.Text>
        <Form.Control
        onChange={event => setUsuario(event.target.value)}
        maxLength="30"
        minLength="4"
        placeholder="Usuario"
        aria-label="Usuario"
        aria-describedby="basic-addon1"
        name='user_usuario'
        type="text"
        />
      </InputGroup>
      {!validar.test(usuario) && usuario!=null ? <h7 style={styles}>El usuario debe tener mínimo 4 letras sin símbolos </h7> : console.log('bien')}

      <InputGroup  id="input2" className="mb-3">
      <InputGroup.Text className="bi-credit-card"></InputGroup.Text>
        <Form.Control
        onChange={event => setDocumento(event.target.value)}
        minLength="100000000"
        maxLength="99999999999"
        placeholder="Documento"
        aria-label="Documento"
        type="text"
        name='user_documento' 
        aria-describedby="basic-addon1"
          />
      </InputGroup>
      {documento < 100000000  ? <h7 style={styles}>No puede ser menos de 9 dígitos </h7> : console.log('bien')}
      {documento > 99999999999  ? <h7 style={styles}>No puede tener más de 11 dígitos </h7> : console.log('bien')}

      <input type="hidden" name='user_email' value={user_email} onChange={event =>  setUser_email(event.target.value)} />
      <input type="hidden" name='user_text' value={user_text} onChange={event =>  setUser_text(event.target.value)} />
      <button id="botRecuperar" variant="primary" >Enviar</button>
  </form>

      <div id="RecuperarContrasena">
      <Breadcrumb id="href">
          <Breadcrumb.Item href="/">Volver al login</Breadcrumb.Item>
      </Breadcrumb>
      </div>
      </div>
        </div>
    </div>
  </body>

)
}