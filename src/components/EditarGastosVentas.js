import { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import "../css/creargastosventas.css";

export  default function EditarGastosVentas() {

  const navigate = useNavigate();
  const [gastos_venta, setGastos_venta] = useState([]);
  const [id_ref_lote_venta, setId_ref_lote_venta] = useState('');
  const [gasto_creado, setGasto_creado] = useState('');
  const [precio, setPrecio] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [descripcion_gasto, setDescripcion_gasto] = useState('');
  const [fecha_gasto, setFecha_gasto] = useState('');
  const {id } = useParams();

  const Regresar = () => {
    navigate(`/RegistroModuloVentas/${id_ref_lote_venta}`);
  }

  useEffect(()=>{
    fetch('http://localhost:4000/gastos_ventas/'+id)
    .then(response => {
        return response.json();
    })
    .then(response => {
      setGastos_venta(response); 
      setId_ref_lote_venta(response['Id_ref_lote_venta']);
      setGasto_creado(response['Gasto_creado']);
      setPrecio(response['Precio']);
      setCantidad(response['Cantidad']);
      setDescripcion_gasto(response['Descripcion_gasto']);
      setFecha_gasto(response['Fecha_gasto']);
    })
  },[]); 

  const editarGastosVentas =()=>{
    var url = 'http://localhost:4000/gastos_ventas/'+id;
    var data = 
      {  
        Id_ref_lote_venta: id_ref_lote_venta,
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
    navigate(`/RegistroModuloVentas/${id_ref_lote_venta}`);
  }

  return(
    <div className="col-sm-3 offset-sm-4">
    <div id="fondInsertarGastos" >

              <center><h3>Editar Gastos  </h3></center>

              <hr></hr>
                  <label>
                  Gasto creado
                  </label>
                  <input
                    value={gasto_creado}
                    className="form-control"
                    name="Gasto_cread"
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
                    name="Preci"
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
                    name="Cantida"
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
                    name="Descripcion_gast"
                    type="text"
                    onChange={event => setDescripcion_gasto(event.target.value)}
                  />
                <br></br>
                  <label>
                  Fecha_gasto
                  </label>
                  <input
                    value={fecha_gasto.substr(0,10)}
                    className="form-control"
                    name="Fecha_gast"
                    type="date"
                    onChange={event => setFecha_gasto(event.target.value)}
                  />

              <hr></hr>
              <center>
                <Button
                  color="primary" 
                  type="submit"
                  onClick={editarGastosVentas}>
                  Insertar
                </Button>
                {" "}
                <Button 
                  className="btn btn-danger"
                  type="submit"
                  onClick={Regresar}>
                  Cancelar
                </Button>
                </center>
                </div>

            </div>
    )

}