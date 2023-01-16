import { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import "../css/editarloteventaregistro.css";

export  default function EditarLoteVentasRegistro() {

    const navigate = useNavigate();
    const [lote_ventas_registro , setLote_ventas_registro] = useState('');
    const [id_ref_lote_venta , setId_ref_lote_venta] = useState('');
    const [id_referencia_cliente , setId_referencia_cliente] = useState('');
    const [fecha_venta , setFecha_venta] = useState('');
    const [valor_unidad_peso, setValor_unidad_peso] = useState(0);
    const [cantidad , setCantidad] = useState(0);
    const [cantidad_pollos , setCantidad_pollos] = useState(0);
    const [total_venta , setTotal_venta] = useState(0);
    const {id } = useParams();

    const Regresar = () => {
        navigate(`/RegistroModuloVentas/${id_ref_lote_venta}`);
      }

      useEffect(()=>{
        fetch('http://localhost:4000/lote_ventas_registro/'+id)
      .then(response => {
          return response.json();
        })
        .then(response => {
            setLote_ventas_registro(response); 
            setId_ref_lote_venta(response['Id_ref_lote_venta'])
            setId_referencia_cliente(response['Id_referencia_cliente'])
            setFecha_venta(response['Fecha_venta'])
            setValor_unidad_peso(response['Valor_unidad_peso'])
            setCantidad(response['Cantidad'])
            setCantidad_pollos(response['Cantidad_pollos'])
            setTotal_venta(response['Total_venta'])
        })
      },[]); 

      const editarLoteVentasRegistro=()=>{
            var url = 'http://localhost:4000/lote_ventas_registro/'+id;
            var data = 
              { 
                Id_ref_lote_venta: id_ref_lote_venta,
                Id_referencia_cliente: id_referencia_cliente,
                Fecha_venta: fecha_venta,
                Valor_unidad_peso: valor_unidad_peso,
                Cantidad: cantidad,
                Cantidad_pollos: cantidad_pollos,
                Total_venta: valor_unidad_peso * cantidad  
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
          <div id="fondEditarRegistro" >

                    <center><h3>Editar Registro</h3></center>

                    <hr></hr>

          <label>
          referencia cliente 
          </label>
          <input
            className="form-control"
            name="Id_referencia_cliente"
            type="text"
            value={id_referencia_cliente}
            onChange={event => setId_referencia_cliente(event.target.value)}
          />

        <br></br>

          <label>
          Fecha venta
          </label>
          <input
            className="form-control"
            name="Fecha_venta"
            type="date"
            value={fecha_venta.substr(0,10)}
            onChange={event => setFecha_venta(event.target.value)}
          />
        <br></br>
          <label>
          Valor unidad peso
          </label>
          <input
            className="form-control"
            name="Valor_unidad_peso"
            type="number"
            value={valor_unidad_peso}
            onChange={event => setValor_unidad_peso(event.target.value)}
          />
      <br></br>
          <label>
          Cantidad
          </label>
          <input
            className="form-control"
            name="Cantidad"
            type="number"
            value={cantidad}
            onChange={event => setCantidad(event.target.value)}
          />
      <br></br>
          <label>
          Cantidad pollos
          </label>
          <input
            className="form-control"
            name="Cantidad_pollos"
            type="number"
            value={cantidad_pollos}
            onChange={event => setCantidad_pollos(event.target.value)}
          />
        <br></br>
          <label>
          Total venta
          </label>
          <input
            className="form-control"
            name="Total_venta"
            type="number"
            value={ valor_unidad_peso * cantidad }
            onChange={event => setTotal_venta(event.target.value)}
          />

                  <hr></hr>
                    <center>
                      <Button 
                        type="submit"
                        onClick={editarLoteVentasRegistro}
                        >
                        Editar
                      </Button>
                        {" "}
                      <Button
                        className="btn btn-danger"
                        type="submit"
                        onClick={Regresar}
                        >
                        Cancelar
                      </Button>
                      </center>

                    </div>
                    </div>
        )
}