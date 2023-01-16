import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate,useParams} from 'react-router-dom';
import TablaNavegacion from "../components/TablaNavegacion";
import "../css/crearloteproduccion.css";
import { Button } from 'react-bootstrap';

export  default function CrearLoteProduccion() {

  const { id_lote } = useParams();
  const navigate = useNavigate();
  const [fecha_entrada_pollos , setFecha_entrada_pollos] = useState('');
  const [cantidad_inicial_pollos , setCantidad_inicial_pollos] = useState(0);
  const [costo_pollo_unidad , setCosto_pollo_unidad] = useState(0);

const crearLoteProduccion=()=>{
      var url = 'http://localhost:4000/lote_produccion';
      var data = 
        {
          Id_ref_lote: id_lote,
          Fecha_entrada_pollos:  fecha_entrada_pollos,
          Fecha_sacrificio_final:fecha_entrada_pollos ,
          Cantidad_inicial_pollos: cantidad_inicial_pollos,
          Costo_pollo_unidad: costo_pollo_unidad,
          Total_pollos_muertos: 0,
          Mortalidad: 0, 
          Consumo_pollo:  0,
          Total_pollos_sacrificados: 0,
          Cantidad_total_alimento: 0,
          Valor_total_alimento:0,
          Costo_total_lote: 0
        };  
        fetch(url, {
        method: 'POST', 
        headers:{
        'Access-Control-Allow-Origin':'*', 
        'Content-Type':'application/json' 
          }, 
            body: JSON.stringify(data)
        })
    .then(res => res.json())
    .catch(error => console.error('Error:', error) )
    .then(response => navigate(`/RegistroModuloProduccion/${response[0].Id_lote_produccion}`));  
  }

  return(
      
    <div>
        <TablaNavegacion></TablaNavegacion>
        <div id="titInicio">
        <h1><p>CREAR LOTE</p></h1>

      </div>
      <div className="col-sm-3 offset-sm-4">
    <div id="fondCrearLoteProduccion" >
              <center><h3> Registro Produccion</h3></center>

                <hr></hr>

                  <label>
                    Id lote
                  </label>

                  <input
                    className="form-control"
                    value={id_lote}
                    type="text"
                    name="Id_ref_lote"
                  />
                <br></br>

                  <label>
                  Fecha Entrada Pollos
                  </label>
                  <input
                    className="form-control"
                    name="Fecha_entrada_pollos"
                    type="date"
                    onChange={event => setFecha_entrada_pollos(event.target.value)}
                  />

                <br></br>
                  <label>
                  Cantidad pollos
                  </label>
                  <input
                    className="form-control"
                    name="Cantidad_inicial_pollos"
                    type="number"
                    onChange={event => setCantidad_inicial_pollos(event.target.value)}
                  />

            <br></br>
                  <label>
                  Costo pollo unidad
                  </label>
                  <input
                    className="form-control"
                    name="Costo_pollo_unidad"
                    type="number"
                    onChange={event => setCosto_pollo_unidad(event.target.value)}
                  />

                <hr></hr>

                <Button
                id="botIngresar"
                  color="primary" type="submit"
                  onClick={crearLoteProduccion}>
                  Insertar
                </Button>

                </div>
                </div>

            </div>
  )
}