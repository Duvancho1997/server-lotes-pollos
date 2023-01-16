import { useState,useEffect } from "react";
import "../css/crearusuario.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate} from 'react-router-dom';
import {Table, Button, Container, } from "reactstrap";

export  default function TablaLoteVenta() {

    const navigate = useNavigate();
    const [lote_venta , setLote_venta] = useState([]);
    const [id_lote_venta_total , setId_lote_venta_total] = useState('');

    const Regresar = () => {
        navigate("/Inicio");
      }

      const Crear = () => {
        navigate("/CrearLoteVenta");
      }

      useEffect(()=>{
        fetch('http://localhost:4000/lote_venta')
        .then(response => {
            return response.json();
        })
        .then(response => {
          setLote_venta(response);
        })
      },[]); 
      
      const abrirEditarLoteVenta=(item)=>{
        var id = item['Id_lote_venta_total']
        setId_lote_venta_total(item['Id_lote_venta_total'])
       navigate(`/EditarLoteVenta/${id}`);
      }

      return(

        <div>
          <br />
                <h1><center><label>
                       Tabla de Lotes de Ventas
                </label></center></h1>
      <Container>
          <form>
                <br />
                  <Button color="success"  onClick={Crear}>Crear</Button>{" "}
                  <Button color="danger"  onClick={Regresar}>regresar</Button>
                  <br />
                  <br />
                  <Table>
                    <thead>
                      <tr>
                        <th>referencia lote venta</th>
                        <th>Total pollos vendidos</th>
                        <th>Peso total vendido</th>
                        <th>Valor promedio peso</th>
                        <th>Total venta lote</th>
                        <th>Ganancia bruta</th>
                        <th>Promedio total peso</th>
                        <th>Promedio venta pollo</th>
                        <th>Cantidad ventas</th>
                        
                      </tr>
                    </thead>
                    <tbody>
        
                    {
                       
                    lote_venta.map(item => (
                    <tr key={item.Id_lote_venta_total}>
                      <td >{item.Id_ref_lote_venta}</td>
                      <td >{item.Total_pollos_vendidos}</td>
                      <td >{item.Peso_total_vendido}</td>
                      <td >{item.Valor_promedio_peso}</td>
                      <td >{item.Total_venta_lote}</td>
                      <td >{item.Ganancia_bruta}</td>
                      <td >{item.Promedio_total_peso}</td>
                      <td >{item.Promedio_venta_pollo}</td>
                      <td >{item.Cantidad_ventas}</td>
                      <td>
    
                        <Button 
                          color="primary" onClick={()=>abrirEditarLoteVenta(item)}>
                          Editar
                        </Button>{" "}
                      
                        
                          
                      </td>
                     
                    </tr>
                  ))}
                </tbody>
                  </Table>
                  </form>
      </Container>      
        </div>
        
        )
}
