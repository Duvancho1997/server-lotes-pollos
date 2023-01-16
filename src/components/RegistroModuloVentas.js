import Accordion from 'react-bootstrap/Accordion';
import "bootstrap/dist/css/bootstrap.min.css";
import TablaLoteVentasRegistro from './TablaLoteVentasRegistro';
import TablaGastosVenta from "./TablaGastosVentas";
import TablaNavegacion from "../components/TablaNavegacion";
import { useNavigate,useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useState,useEffect } from "react";

  function RegistroModuloVentas() {

  const navigate = useNavigate();
  const { id_lote_venta_total } = useParams();
  const [id_ref_lote, setId_ref_lote] = useState();
  var varSesion = sessionStorage.getItem("inicioSeccion");

const botonRegresar=()=>{
  navigate(`/RegistrarLote/${id_ref_lote}`)
}

useEffect(()=>{
  fetch('http://localhost:4000/lote_venta/'+id_lote_venta_total)
  .then(response => {
      return response.json();
  })
  .then(response => {
    setId_ref_lote(response.Id_ref_lote); 
  })
},[id_lote_venta_total]); 

if(varSesion=="true"){ 

    return(

        <div>
          <TablaNavegacion></TablaNavegacion>
          <div id="titReporte">
<div id="rep_title">
        <h1><p>CREAR LOTE</p></h1>
        </div>
        <div id="rep_id">
        <h1>LOTE N° {id_ref_lote}</h1>
        </div>
  </div>

<br></br>
        <div id="subTitInicio">
      <center><h1><p>Modulo Lotes Ventas</p></h1></center>

      </div>
      <div id="tablInicio">

      <br></br>        
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Tabla Lote Ventas Registro</Accordion.Header>
              <Accordion.Body>
                <TablaLoteVentasRegistro Id_lote_venta_total={id_lote_venta_total}/>
              </Accordion.Body>
            </Accordion.Item>
        </Accordion>

        <br></br> 

        <Accordion>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Tabla Gastos Venta</Accordion.Header>
              <Accordion.Body>
                <TablaGastosVenta Id_lote_venta_total={id_lote_venta_total}/>
              </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        
<br></br>
            <Button
              type="submit"
              variant="primary" 
              onClick={botonRegresar}>
              Regresar
            </Button>
            </div>
        </div>
    )
  }else{
    navigate("/");
  }
}
export  default RegistroModuloVentas