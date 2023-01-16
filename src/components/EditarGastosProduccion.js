import { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import "../css/editargastosproduccion.css";

export  default function EditarGastosProduccion() {

  const navigate = useNavigate();
  const [gasto_produccion, setGasto_produccion] = useState([]);
  const [id_ref_lote_produccion, setId_ref_lote_produccion] = useState('');
  const [gasto_creado, setGasto_creado] = useState('');
  const [precio, setPrecio] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [descripcion_gasto, setDescripcion_gasto] = useState('');
  const [fecha_gasto, setFecha_gasto] = useState('');
  const {id } = useParams();

  const Regresar = () => {
  navigate(`/RegistroModuloProduccion/${id_ref_lote_produccion}`);
  }

  useEffect(()=>{
    fetch('http://localhost:4000/gastos_produccion/'+id)
    .then(response => {
      return response.json();
    })
    .then(response => {
      setGasto_produccion(response); 
      setId_ref_lote_produccion(response['Id_ref_lote_produccion']);
      setGasto_creado(response['Gasto_creado']);
      setPrecio(response['Precio']);
      setCantidad(response['Cantidad']);
      setDescripcion_gasto(response['Descripcion_gasto']);
      setFecha_gasto(response['Fecha_gasto']);
    })
  },[]); 

  const editarGastosProduccion =()=>{
    var url = 'http://localhost:4000/gastos_produccion/'+id;
    var data = 
      {  
        Id_ref_lote_produccion: id_ref_lote_produccion,
        Gasto_creado: gasto_creado,
        Precio: precio,
        Cantidad: cantidad,
        Descripcion_gasto: descripcion_gasto,
        Fecha_gasto: fecha_gasto,
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
    <div id="fondEditGastoProduccion" >

              <h3>Editar Gastos de Produccion </h3>

              <hr></hr>

              <label>
                  Fecha_gasto
                  </label>
                  <input
                    value={fecha_gasto.substr(0,10)}
                    className="form-control"
                    name="Fecha_gasto"
                    type="date"
                    onChange={event => setFecha_gasto(event.target.value)}
                  />

                  <br></br>     

                  <label>
                  Gasto creado
                  </label>
                  <input
                    value={gasto_creado}
                    className="form-control"
                    name="Gasto_creado"
                    type="text"
                    onChange={event => setGasto_creado(event.target.value)}
                  />

                <br></br>

                  <label>
                  Precio
                  </label>
                  <input
                    value={precio}
                    className="form-control"
                    name="Precio"
                    type="number"
                    onChange={event => setPrecio(event.target.value)}
                  />

                <br></br>

                  <label>
                  Cantidad
                  </label>
                  <input
                    value={cantidad}
                    className="form-control"
                    name="Cantidad"
                    type="number"
                    onChange={event => setCantidad(event.target.value)}
                  />

                <br></br>

                  <label>
                  Descripcion de gasto
                  </label>
                  <input
                    value={descripcion_gasto}
                    className="form-control"
                    name="Descripcion_gasto"
                    type="text"
                    onChange={event => setDescripcion_gasto(event.target.value)}
                  />
                

                <br></br>

                  
                  <label>
                    Total gasto produccion
                  </label>
                    <input
                      className="form-control"
                      name="Fecha_gasto"
                      type="number"
                      value={cantidad*precio}
                    />

              <hr></hr>

              <center>
                <Button
                  color="primary" 
                  type="submit"
                  onClick={editarGastosProduccion}>
                  Insertar
                </Button>{" "}

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









