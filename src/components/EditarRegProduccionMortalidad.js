import { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams} from 'react-router-dom';

import { Button } from 'react-bootstrap';
import "../css/crearregsacrificadopollo.css";

export  default function EditarRegProduccionMortalidad() {

    const navigate = useNavigate();
    const [registro_produccion_mortalidad, setRegistro_produccion_mortalidad] = useState([]);
    const [id_ref_lote_produccion, setId_ref_lote_produccion] = useState('');
    const [fecha_reg_mortalidad, setFecha_reg_mortalidad] = useState('');
    const [cantidad_pollos_muertos, setCantidad_pollos_muertos] = useState(0);
    const {id } = useParams();

    const Regresar = () => {
      navigate(`/RegistroModuloProduccion/${id_ref_lote_produccion}`);
    }

    useEffect(()=>{
      fetch('http://localhost:4000/reg_produccion_mortalidad/'+id)
      .then(response => {
          return response.json();
      })
      .then(response => {
        setRegistro_produccion_mortalidad(response); 
        setId_ref_lote_produccion(response['Id_ref_lote_produccion']);
        setFecha_reg_mortalidad(response['Fecha_reg_mortalidad']);
        setCantidad_pollos_muertos(response['Cantidad_pollos_muertos']);
      })
    },[]); 

    const editarRegProduccionMortalidad =()=>{
      var url = 'http://localhost:4000/reg_produccion_mortalidad/'+id;
      var data = 
        {  
          Id_ref_lote_produccion: id_ref_lote_produccion,
          Fecha_reg_mortalidad: fecha_reg_mortalidad,
          Cantidad_pollos_muertos: cantidad_pollos_muertos
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
      <div id="fondPollosSacrificio" >

                <center><h3>Editar Mortalidad  </h3></center>

                <hr></hr>
                    <label>
                    fecha diaria de compra:
                    </label>
                    <input
                      value={fecha_reg_mortalidad.substr(0,10)}
                      className="form-control"
                      name="Fecha_diaria"
                      type="date"
                      onChange={event => setFecha_reg_mortalidad(event.target.value)}
                    />
              <br></br>
                    <label>
                    Pollos muertos:
                    </label>
                    <input
                      value={cantidad_pollos_muertos}
                      className="form-control"
                      name="Cantidad_pollos"
                      type="number"
                      onChange={event => setCantidad_pollos_muertos(event.target.value)}
                    />

                    <hr></hr>
                    <center>
                  <Button
                    color="primary"
                    type="submit"
                    onClick={editarRegProduccionMortalidad}>
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