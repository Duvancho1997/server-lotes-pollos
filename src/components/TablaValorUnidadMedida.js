import { useState,useEffect } from "react";
import "../css/crearusuario.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate} from 'react-router-dom';
import {Table, Button, Container} from "reactstrap";

export  default function TablaValorUnidadMedida() {

  const navigate = useNavigate();
  const [valor_unidad_medida , setValor_unidad_medida] = useState([]);
  const [id_Valor_unidad_medida, setId_valor_unidad_medida] = useState('');

  const Regresar = () => {
    navigate("/Inicio");
  }

  const Crear = () => {
    navigate("/CrearValorUnidadMedida");
  }

  useEffect(()=>{
    fetch('http://localhost:4000/valor_unidad_medida')
    .then(response => {
        return response.json();
    })
    .then(response => {
      setValor_unidad_medida(response);
    })
  },[]); 
  
  const abrirEditarValorUnidadMedida=(item)=>{
    var id = item['Id_valor_unidad_medida']
    setId_valor_unidad_medida(item['Id_valor_unidad_medida'])
   navigate(`/EditarValorUnidadMedida/${id}`);
  }

  const eliminarValorUnidadMedidaId = (id)=>{
    var url = 'http://localhost:4000/valor_unidad_medida/'+id;
    fetch(url , { method: 'DELETE' }) .then(() => console.log("elimino tru"));
  }

  return(
      
    <div>
            <h1><center><label>
                   Tabla de Valor Unidad Medida
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
                    <th>Fecha</th>
                    <th>Descripcion</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                {
                valor_unidad_medida.map(item => (
                <tr key={item.Id_valor_unidad_medida}>
                  <td >{item.Fecha}</td>
                  <td >{item.Descripcion}</td>
                  <td >{item.Valor}</td>
                  
                  <td>

                    <Button 
                      color="primary" onClick={()=>abrirEditarValorUnidadMedida(item)}>
                      Editar
                    </Button>{" "}
                   
                    <Button color="danger" type="submit" onClick={()=>eliminarValorUnidadMedidaId(item['Id_valor_unidad_medida'])}>
                      Eliminar</Button>
                      
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