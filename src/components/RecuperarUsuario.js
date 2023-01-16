import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import "../css/recuperarusuario.css";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useNavigate} from 'react-router-dom';
import { useState} from "react";
import emailjs from '@emailjs/browser';

export  default function RecuperarUsuario() {

  const navigate = useNavigate();
  const [documento , setDocumento] = useState();
  const [correo , setCorreo] = useState();
  const [user_usuario , setUser_usuario] = useState();
  let validar = /^[a-zA-Z0-9!#$%&'*_+-]([\.]?[a-zA-Z0-9!#$%&'*_+-])+@[a-zA-Z0-9]([^@&%$\/()=?¿!.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2})?$/;

  const sendEmail = (event) => {
    if(correo =="" || documento =="" ||correo ==null || documento ==null||!validar.test(correo)||documento < 100000000 || documento > 99999999999){
      alert("Llenar y corregir todos los campos")
    }else{
    event.preventDefault();
    fetch('http://localhost:4000/validacion/usuario/'+correo+"/"+documento)
      .then(response => {
          return response.json();
      })
      .then(response => {
        setUser_usuario(response.Nombre_usuario)
        event.target.user_usuario.value =response.Nombre_usuario   
        emailjs.sendForm('service_br3zl16','template_mmsdmnd',event.target,'Wdc9GyeNUYD3nyhoM')
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
      <center> <h3 className='title-form'>Recuperar Usuario</h3></center>
      <br></br>
        <form className='form-mail' onSubmit={sendEmail}>

        <InputGroup id="input" className="mb-3">
        <InputGroup.Text className="bi-envelope"></InputGroup.Text>
          <Form.Control
          type="email" 
          name='user_email' 
          onChange={event => setCorreo(event.target.value)}
          placeholder="Correo"
          pattern="[a-zA-Z0-9!#$%&'*_+-]([\.]?[a-zA-Z0-9!#$%&'*_+-])+@[a-zA-Z0-9]([^@&%$\/()=?¿!.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2})?"
          aria-label="Usuario"
          aria-describedby="basic-addon1"
          />
        </InputGroup>
        {!validar.test(correo) && correo!=null ? <h7 style={styles}>El correo debe tener ejemplo@email.com </h7> : console.log('bien')}

        <InputGroup  id="input2" className="mb-3">
        <InputGroup.Text className="bi-credit-card"></InputGroup.Text>
          <Form.Control 
          name='user_documento' 
          minLength="100000000"
          maxLength="99999999999"
          onChange={event => setDocumento(event.target.value)}
          placeholder="Documento"
          aria-label="Documento"
          type="number"
          aria-describedby="basic-addon1"
            />
        </InputGroup>
        {documento < 100000000  ? <h7 style={styles}>No puede ser menos de 9 dígitos </h7> : console.log('bien')}
        {documento > 99999999999  ? <h7 style={styles}>No puede tener más de 11 dígitos </h7> : console.log('bien')}

          <input type="hidden" name='user_usuario' value={user_usuario} onChange={event => setUser_usuario(event.target.value)} />
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