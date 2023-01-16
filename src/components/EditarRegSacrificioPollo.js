import { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import "../css/crearregsacrificadopollo.css";

export  default function EditarRegistroSacrificio() {

    const navigate = useNavigate();
    const [reg_sacrificio_pollo, setReg_sacrificio_pollo] = useState([]);
    const [id_ref_lote_produccion, setId_ref_lote_produccion] = useState('');
    const [fecha_sacrificio, setFecha_sacrificio] = useState('');
    const [cantidad_pollos, setCantidad_pollos] = useState(0);
    const {id } = useParams();

    const Regresar = () => {
      navigate(`/RegistroModuloProduccion/${id_ref_lote_produccion}`);
  }

  useEffect(()=>{
    fetch('http://localhost:4000/reg_sacrificio_pollo/'+id)
    .then(response => {
        return response.json();
    })
    .then(response => {
      setReg_sacrificio_pollo(response); 
      setId_ref_lote_produccion(response['Id_ref_lote_produccion']);
      setFecha_sacrificio(response['Fecha_sacrificio']);
      setCantidad_pollos(response['Cantidad_pollos']);
    })
  },[]);

  const editarRegistroSacrificio =()=>{
    var url = 'http://localhost:4000/reg_sacrificio_pollo/'+id;
    var data = 
      {  
        Id_ref_lote_produccion: id_ref_lote_produccion,
        Fecha_sacrificio: fecha_sacrificio,
        Cantidad_pollos: cantidad_pollos
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

      <center><h3>Editar Sacrificio de pollos  </h3></center>
      <hr></hr>
          <label>
          Fecha diaria de Sacrificio:
          </label>
          <input
            value={fecha_sacrificio.substr(0,10)}
            className="form-control"
            name="Fecha_diaria"
            type="date"
            onChange={event => setFecha_sacrificio(event.target.value)}
          />
          <br></br>

          <label>
          Pollos Sacrificados:
          </label>
          <input
            value={cantidad_pollos}
            className="form-control"
            name="Cantidad_pollos"
            type="number"
            onChange={event => setCantidad_pollos(event.target.value)}
          />

<hr></hr>
<center>
        <Button
          color="primary" 
          type="submit"
          onClick={editarRegistroSacrificio}>
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