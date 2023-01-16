import { useState,useEffect } from "react";
import "../css/crearusuario.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button,  ModalHeader, ModalBody, FormGroup, ModalFooter} from "reactstrap";
import { useNavigate, useParams} from 'react-router-dom';

export  default function EditarLoteProduccion() {

    const navigate = useNavigate();
    const [lote_produccion , setLote_Produccion] = useState([]);
    const [id_ref_lote , setId_ref_lote] = useState('');
    const [fecha_entrada_pollos , setFecha_entrada_pollos] = useState('');
    const [fecha_sacrificio_final , setFecha_sacrificio_final] = useState('');
    const [cantidad_inicial_pollos , setCantidad_inicial_pollos] = useState(0);
    const [costo_pollo_unidad , setCosto_pollo_unidad] = useState(0);
    const [total_pollos_muertos , setTotal_pollos_muertos] = useState(0);
    const [mortalidad , setMortalidad] = useState(0);
    const [consumo_pollo , setConsumo_pollo] = useState(0);
    const [total_pollos_sacrificados , setTotal_pollos_sacrificados] = useState(0);
    const [cantidad_total_alimento , setCantidad_total_alimento] = useState(0);
    const [valor_total_alimento , setValor_total_alimento] = useState(0);
    const [costo_total_lote , setCosto_total_lote] = useState(0);
    const {id } = useParams();

    const Regresar = () => {
        navigate("/TablaLoteProduccion");
      }

      useEffect(()=>{
        fetch('http://localhost:4000/lote_produccion/'+id)
        .then(response => {
            return response.json();
        })
        .then(response => {
          setLote_Produccion(response); 
          setId_ref_lote(response['Id_ref_lote']);
          setFecha_entrada_pollos(response['Fecha_entrada_pollos']);
          setFecha_sacrificio_final(response['Fecha_sacrificio_final']);
          setCantidad_inicial_pollos(response['Cantidad_inicial_pollos']);
          setCosto_pollo_unidad(response['Costo_pollo_unidad']);
          setTotal_pollos_muertos(response['Total_pollos_muertos']);
          setMortalidad(response['Mortalidad']);
          setConsumo_pollo(response['Consumo_pollo']);
          setTotal_pollos_sacrificados(response['Total_pollos_sacrificados']);
          setCantidad_total_alimento(response['Cantidad_total_alimento']);
          setValor_total_alimento(response['Valor_total_alimento']);
          setCosto_total_lote(response['Costo_total_lote']);
        })
      },[]); 

      const editarLoteProduccion =()=>{
        var url = 'http://localhost:4000/lote_produccion/'+id;
        var data = 
          {  
            Id_ref_lote:  id_ref_lote,
            Fecha_entrada_pollos:  fecha_entrada_pollos,
            Fecha_sacrificio_final: fecha_sacrificio_final,
            Cantidad_inicial_pollos: cantidad_inicial_pollos,
            Costo_pollo_unidad: costo_pollo_unidad,
            Total_pollos_muertos: total_pollos_muertos,
            Mortalidad: mortalidad, 
            Consumo_pollo: consumo_pollo,
            Total_pollos_sacrificados: total_pollos_sacrificados,
            Cantidad_total_alimento: cantidad_total_alimento,
            Valor_total_alimento: valor_total_alimento,
            Costo_total_lote: costo_total_lote
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
        navigate("/TablaLoteProduccion");
      }

      return(
        <div>

                  <ModalHeader>
                   <div><h3>Editar lote de produccion </h3></div>
                  </ModalHeader>
        
                  <ModalBody>
                   
                    <FormGroup>
                      <label>
                      referencia de lote
                      </label>
                      
                      <input
                        className="form-control"
                        value={id_ref_lote}
                        onChange={event =>  setId_ref_lote(event.target.value)}
                        type="text"
                        name="id_ref_lote"
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <label>
                      fecha entrada de pollos
                      </label>
                      <input
                       value={fecha_entrada_pollos}
                        className="form-control"
                        name="fecha_entrada_pollo"
                        type="text"
                        onChange={event => setFecha_entrada_pollos(event.target.value)}
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <label>
                      fecha sacrificio final
                      </label>
                      <input
                       value={fecha_sacrificio_final}
                        className="form-control"
                        name="Fecha_sacrificio_final"
                        type="text"
                        onChange={event => setFecha_sacrificio_final(event.target.value)}
                      />
                    </FormGroup>
    
                    <FormGroup>
                      <label>
                      Cantidad inicial de pollos:
                      </label>
                      <input
                       value={cantidad_inicial_pollos}
                        className="form-control"
                        name="Cantidad_inicial_pollos"
                        type="number"
                        onChange={event => setCantidad_inicial_pollos(event.target.value)}
                      />
                    </FormGroup>
    
                    <FormGroup>
                      <label>
                      Costo pollo por unidad
                      </label>
                      <input
                       value={costo_pollo_unidad}
                        className="form-control"
                        name="Costo_pollo_unidad"
                        type="number"
                        onChange={event => setCosto_pollo_unidad(event.target.value)}
                      />
                    </FormGroup>
    
                    <FormGroup>
                      <label>
                      Mortalidad
                      </label>
                      <input
                       value={mortalidad}
                        className="form-control"
                        name="Mortalidad"
                        type="number"
                        onChange={event => setMortalidad(event.target.value)}
                      />
                    </FormGroup>
    
                    <FormGroup>
                      <label>
                      Total de pollos muertos
                      </label>
                      <input
                       value={total_pollos_muertos}
                        className="form-control"
                        name="Total_pollos_muertos"
                        type="number"
                        onChange={event => setTotal_pollos_muertos(event.target.value)}
                      />
                    </FormGroup>
    
                    <FormGroup>
                      <label>
                      Consumo de pollo
                      </label>
                      <input
                       value={consumo_pollo}
                        className="form-control"
                        name="Consumo_pollo"
                        type="number"
                        onChange={event => setConsumo_pollo(event.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <label>
                      Total de pollos sacrificados
                      </label>
                      
                      <input
                        className="form-control"
                        value={total_pollos_sacrificados}
                        onChange={event =>  setTotal_pollos_sacrificados(event.target.value)}
                        type="number"
                        name="Total_pollos_sacrificados"
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <label>
                      Cantidad total de alimento
                      </label>
                      <input
                       value={cantidad_total_alimento}
                        className="form-control"
                        name="Cantidad_total_alimento"
                        type="number"
                        onChange={event => setCantidad_total_alimento(event.target.value)}
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <label>
                      Valor total de alimento
                      </label>
                      <input
                       value={valor_total_alimento}
                        className="form-control"
                        name="Valor_total_alimento"
                        type="number"
                        onChange={event => setValor_total_alimento(event.target.value)}
                      />
                    </FormGroup>
    
                    <FormGroup>
                      <label>
                      Costo total del lote
                      </label>
                      <input
                       value={costo_total_lote}
                        className="form-control"
                        name="Costo_total_lote"
                        type="number"
                        onChange={event => setCosto_total_lote(event.target.value)}
                      />
                    </FormGroup>

                  </ModalBody>
        
                  <ModalFooter>
    
                    <Button
                      color="primary" type="submit"
                      onClick={editarLoteProduccion}>
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
