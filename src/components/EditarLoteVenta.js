import { useState,useEffect } from "react";
import "../css/crearusuario.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button,  ModalHeader, ModalBody, FormGroup, ModalFooter} from "reactstrap";
import { useNavigate, useParams} from 'react-router-dom';

export  default function EditarLoteVenta() {

  const navigate = useNavigate();
  const [lote_venta, setLote_venta] = useState([]);
  const [id_ref_lote_venta, setId_ref_lote_venta]  = useState('');
  const [total_pollos_vendidos, setTotal_pollos_vendidos] = useState(0);
  const [peso_total_vendido, setPeso_total_vendido] = useState(0);
  const [valor_promedio_peso, setValor_promedio_peso]  = useState(0);
  const [total_venta_lote, setTotal_venta_lote]  = useState(0);
  const [ganancia_bruta, setGanancia_bruta]  = useState(0);
  const [promedio_total_peso, setPromedio_total_peso] = useState(0);
  const [promedio_venta_pollo, setPromedio_venta_pollo] = useState(0);
  const [cantidad_ventas, setCantidad_ventas] = useState(0);
  const {id } = useParams();

  const Regresar = () => {
    navigate("/TablaLoteVenta");
  }

  useEffect(()=>{
    fetch('http://localhost:4000/lote_venta/'+id)
    .then(response => {
        return response.json();
    })
    .then(response => {
      setLote_venta(response); 
      setId_ref_lote_venta(response['Id_ref_lote_venta']);
      setTotal_pollos_vendidos(response['Total_pollos_vendidos']);
      setPeso_total_vendido(response['Peso_total_vendido']);
      setValor_promedio_peso(response['Valor_promedio_peso']);
      setTotal_venta_lote(response['Total_venta_lote']);
      setGanancia_bruta(response['Ganancia_bruta']);
      setPromedio_total_peso(response['Promedio_total_peso']);
      setPromedio_venta_pollo(response['Promedio_venta_pollo']);
      setCantidad_ventas(response['Cantidad_ventas']);
    })
  },[]);

  const editarLoteVenta =()=>{
    var url = 'http://localhost:4000/lote_venta/'+id;
    var data = 
      {  
        Id_ref_lote_venta: id_ref_lote_venta,
          Total_pollos_vendidos: total_pollos_vendidos, 
          Peso_total_vendido: peso_total_vendido, 
          Valor_promedio_peso: valor_promedio_peso, 
          Total_venta_lote: total_venta_lote, 
          Ganancia_bruta: ganancia_bruta, 
          Promedio_total_peso: promedio_total_peso, 
          Promedio_venta_pollo: promedio_venta_pollo, 
          Cantidad_ventas: cantidad_ventas,
    };
  fetch(url, {
    method: 'PUT',
    headers:{
        'Access-Control-Allow-Origin':'*', 
    'Content-Type':'application/json' 
  }, 
    body: JSON.stringify(data)
 
  }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
    navigate("/TablaLoteVenta");
  }
  return(
      
    <div>
        
              <ModalHeader>
               <div><h3>Editar lote de venta</h3></div>
              </ModalHeader>
    
              <ModalBody>
               
                <FormGroup>
                  <label>
                  Referencia del lote venta
                  </label>
                  
                  <input
                    value={id_ref_lote_venta}
                    className="form-control"
                    onChange={event =>  setId_ref_lote_venta(event.target.value)}
                    type="text"
                    name="Id_ref_lote"
                  />
                </FormGroup>
                
                <FormGroup>
                  <label>
                  Fecha de entrada de pollos
                  </label>
                  <input
                  value={total_pollos_vendidos}
                    className="form-control"
                    name="Fecha_entrada_pollos"
                    type="number"
                    onChange={event => setTotal_pollos_vendidos(event.target.value)}
                  />
                </FormGroup>
                
                <FormGroup>
                  <label>
                  Peso total vendido
                  </label>
                  <input
                  value={peso_total_vendido}
                    className="form-control"
                    name="Peso_total_vendido"
                    type="number"
                    onChange={event => setPeso_total_vendido(event.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                  Valor promedio peso
                  </label>
                  <input
                  value={valor_promedio_peso}
                    className="form-control"
                    name="Valor_promedio_peso"
                    type="number"
                    onChange={event => setValor_promedio_peso(event.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                  Total venta lote
                  </label>
                  <input
                  value={total_venta_lote}
                    className="form-control"
                    name="Total_venta_lote"
                    type="number"
                    onChange={event => setTotal_venta_lote(event.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                  Ganancia bruta
                  </label>
                  <input
                  value={ganancia_bruta}
                    className="form-control"
                    name="Ganancia_bruta"
                    type="number"
                    onChange={event => setGanancia_bruta(event.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                  Promedio total peso
                  </label>
                  <input
                  value={promedio_total_peso}
                    className="form-control"
                    name="Promedio total peso"
                    type="number"
                    onChange={event => setPromedio_total_peso(event.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                  Promedio venta pollo
                  </label>
                  <input
                  value={promedio_venta_pollo}
                    className="form-control"
                    name="Promedio_venta_pollo"
                    type="number"
                    onChange={event => setPromedio_venta_pollo(event.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                  Cantidad ventas
                  </label>
                  <input
                  value={cantidad_ventas}
                    className="form-control"
                    name="Cantidad_ventas"
                    type="number"
                    onChange={event => setCantidad_ventas(event.target.value)}
                  />
                </FormGroup>

              </ModalBody>
    
              <ModalFooter>

                <Button
                  color="primary" type="submit"
                  onClick={editarLoteVenta}>
                  Insertar
                </Button>

                <Button 
                  className="btn btn-danger"
                  onClick={Regresar}>
                  Cancelar
                </Button>

              </ModalFooter>
             
            </div>
  )


}