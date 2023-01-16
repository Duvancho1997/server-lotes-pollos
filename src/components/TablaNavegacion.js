import "../css/navegacion.css";
import { useNavigate} from 'react-router-dom';
import { useState,useEffect } from "react";
import img from'../img/imagen.png';
import img2 from'../img/boton.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function TablaNavegacion() {

  const navigate = useNavigate();
  const [id_usuario, setId_usuario] = useState("");
  const [fecha, setFecha] = useState("");
  const [user, setUser] = useState("");
  var  item_value = sessionStorage.getItem("item_key")

  useEffect(()=>{
    fetch('http://localhost:4000/sistemafecha')
    .then(response => {
        return response.json();
    })
    .then(response => {
      console.log("Fecha: ",response.fecha_bd.substr(0,10));
      setFecha( response.fecha_bd.substr(0,10))
    })
  },[]); 

  useEffect(()=>{
    
    console.log("consol que no se rompe:",item_value);
    fetch('http://localhost:4000/users/'+item_value)
    .then(response => {
        return response.json();
    })
    .then(response => {
      console.log("Usuario:---------------- ",response);
      setUser( response.Nombre_usuario)
      console.log("Nombre user dfcv",response[0].Nombre_usuario.value)
    })
  },[]);

  const  TablaLotes = () => {
    navigate("/TablaLotes");
  }

  const  TablaUsuario = () => {
    navigate("/TablaUsuario");
  }

  const  TablaClientes = () => {
    navigate("/TablaClientes");
  }

  const  CrearLote = () => {
    navigate("/CrearLoteSistema");
  }

  const Inicio = () => {
  navigate(`/Inicio/${item_value}`);
  }

  const Reportes2 = () => {
    navigate("/Reportes2");
    }

    const Salir = () => {
      sessionStorage.removeItem('inicioSeccion');
      sessionStorage.removeItem('item_key');
      navigate("/");
      }

  return (

    <div>
      

    <Navbar bg="dark" variant="dark"  id="navUsuario" >

    <Container>
          <Nav >
            <Nav.Link onClick={Inicio}>Inicio</Nav.Link>
            <Nav.Link onClick={CrearLote}>Crear Lote</Nav.Link>
            <Nav.Link onClick={TablaUsuario}>Registrar Usuario</Nav.Link>
            <Nav.Link onClick={TablaClientes}>Registrar Cliente</Nav.Link>
            <Nav.Link onClick={TablaLotes}>Tabla Lotes</Nav.Link>
            <Nav.Link onClick={Reportes2}>Reporte</Nav.Link>
          </Nav>
    </Container>

          <Navbar.Brand  className="justify-content-end" >

          <img
              src={img}
              width="35"
              height="35"
            />
            {user}{" "}
            <img
            onClick={Salir}
              src={img2}
              width="35"
              height="35"
            />
          </Navbar.Brand>

      </Navbar>

    </div>
  );
}