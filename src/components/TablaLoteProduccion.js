import { useState,useEffect } from "react";
import "../css/crearusuario.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import { Table, Button, Container } from "reactstrap";

export  default function TablaLoteProduccion() {
  
  const navigate = useNavigate();
  const [lote_produccion , setLote_produccion] = useState([]);
  const [id_lote_produccion, setId_lote_produccion] = useState('');

  const Regresar = () => {
    navigate("/Inicio");
  }

  useEffect(()=>{
    fetch('http://localhost:4000/lote_produccion')
    .then(response => {
        return response.json();
    })
    .then(response => {
      setLote_produccion(response); 
    })
  },[]); 

  const abrirEditarLoteProduccion=(item)=>{
    var id = item['Id_lote_produccion']
    setId_lote_produccion(item['Id_lote_produccion'])
   navigate(`/EditarLoteProduccion/${id}`);
  }
  
  return(

    <div>
      <br />
            <h1><center><label>
                   Tabla del Lote produccion
            </label></center></h1>
  <Container>
      <form>
            <br />
              <Button color="danger"  onClick={Regresar}>regresar</Button>
              <br />
              <br />
              <Table>
                <thead>
                  <tr>

                    <th>Referncia lote</th>
                    <th>Fecha entrada pollos</th>
                    <th>Fecha sacrificio final</th>
                    <th>Cantidad inicial de pollos</th>
                    <th>Costo pollo unidad</th>
                    <th>Total pollos muertos</th>
                    <th>Mortalidad</th>
                    <th>Consumo pollo</th>
                    <th>Total pollos sacrificados</th>
                    <th>Cantidad total alimento</th>
                    <th>Valor total alimento</th>
                    <th>Costo total lote</th>
                    
                  </tr>
                </thead>
                <tbody>
    
                {
                lote_produccion.map(item => (
                <tr key={item.Id_lote_produccion}>
                  <td >{item.Id_ref_lote}</td>
                  <td >{item.Fecha_entrada_pollos}</td>
                  <td >{item.Fecha_sacrificio_final}</td>
                  <td >{item.Cantidad_inicial_pollos}</td>
                  <td >{item.Costo_pollo_unidad}</td>
                  <td >{item.Total_pollos_muertos}</td>
                  <td >{item.Mortalidad}</td>
                  <td >{item.Consumo_pollo}</td>
                  <td >{item.Total_pollos_sacrificados}</td>
                  <td >{item.Cantidad_total_alimento}</td>
                  <td >{item.Valor_total_alimento}</td>
                  <td >{item.Costo_total_lote}</td>
                    <td>
    
                        <Button 
                          color="primary" onClick={()=>abrirEditarLoteProduccion(item)}>
                          Editar
                        </Button>
                          
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