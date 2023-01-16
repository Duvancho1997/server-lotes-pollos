import Accordion from 'react-bootstrap/Accordion';
import { useNavigate,useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import TablaGastosProduccion from "./TablaGastosProduccion";
import TablaRegSacrificioPollo from "./TablaRegSacrificioPollo";
import TablaRegProduccionMortalidad from "./TablaRegProduccionMortalidad";
import TablaRegProduccionAlimento from "./TablaRegProduccionAlimento";
import TablaNavegacion from "../components/TablaNavegacion";
import { Button } from 'react-bootstrap';
import { useState,useEffect } from "react";

  function RegistroModuloProduccion() {

  const navigate = useNavigate();
  const { id_lote_produccion } = useParams();
  const [id_ref_lote, setId_ref_lote] = useState();
  var varSesion = sessionStorage.getItem("inicioSeccion");

  const botonRegresar=()=>{
    navigate(`/RegistrarLote/${id_ref_lote}`)
  }

  useEffect(()=>{
    fetch('http://localhost:4000/lote_produccion/'+id_lote_produccion)
    .then(response => {
        return response.json();
    })
    .then(response => {
      setId_ref_lote(response.Id_ref_lote); 
    })
  },[id_lote_produccion]); 

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
      <center><h1><p>Modulo Lotes Producción</p></h1></center>

      </div>

      <br></br>   

<div id="tablInicio">
<Accordion>
<Accordion.Item eventKey="3">
<Accordion.Header>Tabla Registro Producción Alimento</Accordion.Header>
<Accordion.Body>
<TablaRegProduccionAlimento Id_lote_produccion={id_lote_produccion}/>
</Accordion.Body>
</Accordion.Item>
</Accordion>

<br></br>

<Accordion>
<Accordion.Item eventKey="2">
<Accordion.Header>Tabla Registro Producción Mortalidad</Accordion.Header>
<Accordion.Body>
<TablaRegProduccionMortalidad Id_lote_produccion={id_lote_produccion}/>
</Accordion.Body>
</Accordion.Item>
</Accordion>

<br></br>

<Accordion>
<Accordion.Item eventKey="1">
<Accordion.Header>Tabla Registro Sacrificio Pollos</Accordion.Header>
<Accordion.Body>
<TablaRegSacrificioPollo Id_lote_produccion={id_lote_produccion}/>
</Accordion.Body>
</Accordion.Item>
</Accordion>

<br></br>

<Accordion>
<Accordion.Item eventKey="0">
<Accordion.Header>Tabla Gastos Producción</Accordion.Header>
<Accordion.Body>
<TablaGastosProduccion Id_lote_produccion={id_lote_produccion}/>
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
export  default  RegistroModuloProduccion;





