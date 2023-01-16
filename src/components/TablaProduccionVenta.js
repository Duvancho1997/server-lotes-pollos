import { useState,useEffect } from "react";
import "../css/crearusuario.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate} from 'react-router-dom';
import {Table, Button, Container, } from "reactstrap";

export  default function TablaProduccionVenta() {

  const navigate = useNavigate();
  const [produccion_venta, setProduccion_venta] = useState([]);
 
  const Regresar = () => {
    navigate("/Inicio");
  }

  useEffect(()=>{
    fetch('http://localhost:4000/produccion_venta')
    .then(response => {
        return response.json();
    })
    .then(response => {
      setProduccion_venta(response);
    })
  },[]); 
  
  return(
      
    <div>
            <h1><center><label>
                   Tabla de Registro de Produccion Venta
            </label></center></h1>
          <Container>
           <form>
            <br />
              <Button color="danger"  onClick={Regresar}>Regresar</Button>
              <br />
              <br />
              <Table>
                <thead>
                  <tr>
                    <th>Ganancia neta</th>
                    <th>Conversion</th>
                  </tr>
                </thead>
                <tbody>
                {
                produccion_venta.map(item => (
                <tr key={item.Id_produccion_venta}>
                  <td >{item.Ganancia_neta}</td>
                  <td >{item.Conversion}</td>
                </tr>
              ))}
            </tbody>
              </Table>
              </form>
            </Container>
                   
    </div>
    
    )
}