import { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams} from 'react-router-dom';

import { Button } from 'react-bootstrap';
import "../css/crearregproduccionalimento.css";

export  default function EditarRegProduccionAlimento() {

    const navigate = useNavigate();
    const [registro_produccion_alimento, setRegistro_produccion_alimento] = useState([]);
    const [id_ref_lote_produccion, setId_ref_lote_produccion] = useState('');
    const [fecha_compra, setFecha_compra] = useState('');
    const [cantidad_alimento, setCantidad_alimento] = useState(0);
    const [valor_alimento, setValor_alimento] = useState(0);
    const [descripcion_alimento, setDescripcion_alimento] = useState('');
    const [precio_compra, setPrecio_compra] = useState(0);
    const {id } = useParams();

    const Regresar = () => {
      navigate(`/RegistroModuloProduccion/${id_ref_lote_produccion}`);
      }

      useEffect(()=>{
        fetch('http://localhost:4000/reg_produccion_alimento/'+id)
        .then(response => {
            return response.json();
        })
        .then(response => {
          setRegistro_produccion_alimento(response); 
          setId_ref_lote_produccion(response['Id_ref_lote_produccion']);
          setFecha_compra(response['Fecha_compra']);
          setCantidad_alimento(response['Cantidad_alimento']);
          setValor_alimento(response['Valor_alimento']);
          setDescripcion_alimento(response['Descripcion_alimento']);
          setPrecio_compra(response['Precio_compra']);
        })
      },[]); 

      const editarRegProduccionAlimento =()=>{
        var url = 'http://localhost:4000/reg_produccion_alimento/'+id;
        var data = 
          {  
            Id_ref_lote_produccion: id_ref_lote_produccion,
            Fecha_compra: fecha_compra,
            Cantidad_alimento: cantidad_alimento,
            Valor_alimento: valor_alimento,
            Descripcion_alimento: descripcion_alimento,
            Precio_compra: cantidad_alimento * valor_alimento
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
            navigate(`/RegistroModuloProduccion/${id_ref_lote_produccion}`);
      }

      return(
        <div className="col-sm-3 offset-sm-4">
    <div id="fondRegistroAlimento" >

                  <center><h3>Editar Alimento</h3></center>
                  <hr></hr>
                      <label>
                      Fecha diaria de compra:
                      </label>
                      <input
                        value={fecha_compra.substr(0,10)}
                        className="form-control"
                        name="Fecha_compra"
                        type="date"
                        onChange={event => setFecha_compra(event.target.value)}
                      />
                    <br></br>
                      <label>
                      Cantidad de alimento:
                      </label>
                      <input
                        value={cantidad_alimento}
                        className="form-control"
                        name="Cantidad_alimento"
                        type="number"
                        onChange={event => setCantidad_alimento(event.target.value)}
                      />
          <br></br>
                      <label>
                      Valor del alimento:
                      </label>
                      <input
                        value={valor_alimento}
                        className="form-control"
                        name="Valor_alimento"
                        type="number"
                        onChange={event => setValor_alimento(event.target.value)}
                      />
                    <br></br>
                      <label>
                      Descripcion_alimento:
                      </label>
                      <input
                        value={descripcion_alimento}
                        className="form-control"
                        name="descripcion_alimento"
                        type="text"
                        onChange={event => setDescripcion_alimento(event.target.value)}
                      />
                    <br></br>
                      <label>
                      Precio compra total:
                      </label>
                      <input
                        value={cantidad_alimento * valor_alimento}
                        className="form-control"
                        name="Precio_compra_total"
                        type="number"
                        onChange={event => setPrecio_compra(event.target.value)}
                      />

              <hr></hr>
                <center>
                    <Button
                      color="primary" 
                      type="submit"
                      onClick={editarRegProduccionAlimento}>
                      Insertar
                    </Button>
                    {" "}
                    <Button 
                      type="submit"
                      className="btn btn-danger"
                      onClick={Regresar}>
                      Cancelar
                    </Button>
                    </center>
                    </div>
                
                </div>
        )
      
}