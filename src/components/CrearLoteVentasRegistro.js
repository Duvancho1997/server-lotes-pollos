import { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate,useParams} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import "../css/crearloteventasregistro.css";

  function CrearLoteVentasRegistro() {

  const navigate = useNavigate();
  const {ref } = useParams();
  const [fecha_venta , setFecha_venta] = useState();
  const [fecha_creacion_lote_sistema , setFecha_creacion_lote_sistema] = useState();
  const [valor_unidad_peso, setValor_unidad_peso] = useState();
  const [cantidad , setCantidad] = useState();
  const [validacion, setValidacion] = useState();
  const [cantidad_pollos , setCantidad_pollos] = useState();
  const [clientes , setClientes] = useState([]);
  const [nombre , setNombre] = useState();
  const [fecha, setFecha] = useState();
  var varSesion = sessionStorage.getItem("inicioSeccion");
  let validar = /^[0-9]*$/;
  let validar2 = /^(\d+|\d+.\d{0,2})$/;

  const Regresar = () => {
    navigate(`/RegistroModuloVentas/${ref}`);
  }

  const crearVentaRegistro=()=>{
    if(cantidad_pollos > validacion ||valor_unidad_peso<1 || nombre==null || nombre=="" ||nombre == "Selecciona Identificacion"|| cantidad<1 ||cantidad_pollos<1 || fecha_venta ==null ||  valor_unidad_peso==null  || cantidad_pollos==null || cantidad==null || fecha_venta =="" ||  valor_unidad_peso==""  || cantidad_pollos=="" || cantidad=="" || fecha_venta < fecha||fecha_venta > fecha_creacion_lote_sistema  ||!validar.test(cantidad_pollos)||cantidad > 9999999999 ||!validar2.test(cantidad) ||cantidad_pollos > 9999999999 ||!validar.test(cantidad_pollos)||valor_unidad_peso > 9999999999 ||!validar2.test(valor_unidad_peso) ){
      alert("Llenar y corregir todos los campos que tengan * " )
    }
    else{
    var url = 'http://localhost:4000/lote_ventas_registro';
    var data = 
      {
        Id_ref_lote_venta: ref,
        Id_referencia_cliente: nombre,
        Fecha_venta: fecha_venta,
        Valor_unidad_peso: valor_unidad_peso,
        Cantidad: cantidad,
        Cantidad_pollos: cantidad_pollos,
        Total_venta: valor_unidad_peso * cantidad  
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
  .then(response => console.log('Success:', response));
  navigate(`/RegistroModuloVentas/${ref}`);
}
}

useEffect(()=>{
  fetch('http://localhost:4000/cliente')
  .then(response => {
      return response.json();
  })
  .then(response => {
    setClientes(response); 
  })
},[]); 

const handlerCargar =function(e){
  const opcion =e.target.value
  setNombre(opcion)
}

useEffect(()=>{
  fetch ('http://localhost:4000/lote_venta/fechaV/'+ref)
  .then(response => {
    return response.json();
})
.then(response => {
  setFecha(response.Fecha_entrada_pollos.substr(0,10)); 
})
},[]); 

useEffect(()=>{
  fetch('http://localhost:4000/sistemafecha')
  .then(response => {
  return response.json();
  })
  .then(response => {
  console.log("Fecha: ",response.fecha_bd.substr(0,10));
  setFecha_creacion_lote_sistema( response.fecha_bd.substr(0,10))      
  })
},[]);

useEffect(()=>{
  fetch('http://localhost:4000/validacion/ventas/'+ref)
  .then(response => {
  return response.json();
  })
  .then(response => {
  setValidacion(response.disponible_venta)      
  })
},[]);

let styles = {
  fontWeight:"bold",
  color: "#dc3545"
}

if(varSesion=="true"){ 

return(

  <div className="col-sm-3 offset-sm-4">
  <div id="fondInsertarLoteVentas" >

      <center><h3>Insertar Lote Ventas</h3></center>
    <hr></hr>
    <label>
          Fecha Venta *
          </label>
          <input
            max={fecha_creacion_lote_sistema}
            min={fecha}
            className="form-control"
            name="Fecha_venta"
            type="date"
            onChange={event => setFecha_venta(event.target.value)}
          />
          {fecha_venta < fecha ||fecha_venta > fecha_creacion_lote_sistema? <h7 style={styles}>la fecha no puede ser menor al {fecha} o mayor al {fecha_creacion_lote_sistema}</h7> : console.log('bien')}

            <br></br>

          <label >
          Identificación *
          </label>

          <Form.Select name="clientes" aria-label="Default select example" onClick={handlerCargar}>
            <option > Selecciona Identificación</option>
          {clientes.map((i)=>(
          <option key={i.Id_Cliente} value={i.Id_Cliente}>{i.Identificacion_cliente} - {i.Nombre} </option>
          )
              )} 
      </Form.Select>
      {nombre == "" || nombre == "Selecciona Identificacion"? <h7 style={styles}> Selecciona una Identificación </h7> : console.log('bien')}

          <br></br>

          <label>
          Valor Unidad Peso *
          </label>
          <input
            maxLength="9999999999"
            step="0.01"
            min="1" 
            className="form-control"
            name="Valor_unidad_peso"
            type="number"
            onChange={event => setValor_unidad_peso(event.target.value)}
          />
          {valor_unidad_peso < 1  ? <h7 style={styles}>Los números no pueden ser negativos o menores a 1 </h7> : console.log('bien')}
          {valor_unidad_peso > 9999999999  ? <h7 style={styles}>No puede tener más de 9999999999 </h7> : console.log('bien')}
          {!validar2.test(valor_unidad_peso) && valor_unidad_peso!=null ? <h7 style={styles}>No se pueden tener más de 2 decimales </h7> : console.log('bien')}

          <br></br>

          <label>
          Cantidad kg*
          </label>
          <input
            maxLength="9999999999"
            step="0.01"
            min="1" 
            className="form-control"
            name="Cantidad"
            type="number"
            onChange={event => setCantidad(event.target.value)}
          />
          {cantidad < 1  ? <h7 style={styles}>Los números no pueden ser negativos o menores a 1 </h7> : console.log('bien')}
          {cantidad > 9999999999  ? <h7 style={styles}>No puede tener más de 9999999999 </h7> : console.log('bien')}
          {!validar2.test(cantidad) && cantidad!=null ? <h7 style={styles}>No se pueden tener más de 2 decimales </h7> : console.log('bien')}

          <br></br>

          <label>
          Cantidad Pollos * 
          </label>
          <input
            maxLength="9999999999"
            className="form-control"
            name="Cantidad_pollos"
            type="number"
            onChange={event => setCantidad_pollos(event.target.value)}
          />
          { !validar.test(cantidad_pollos) && cantidad_pollos!=null ? <h7 style={styles}> No puede tener decimales </h7> : console.log('bien')}
          { cantidad_pollos<1 ? <h7 style={styles}>Los números no pueden ser negativos o menores a 1 </h7> : console.log('bien')}
          { cantidad_pollos > 9999999999  ? <h7 style={styles}>No puede tener más de 9999999999 </h7> : console.log('bien')}
          { cantidad_pollos > validacion ? <h7 style={styles}> No puedes más de {validacion} pollos muertos </h7> : console.log('bien')}

          <br></br>
          <label>
          Total Venta *
          </label>
          <input
            className="form-control"
            name="Total_venta"
            type="number"
            value={(valor_unidad_peso * cantidad).toFixed(2)}
          />

    <hr></hr>
    <center>
          <Button
            color="primary" 
            type="submit"
            onClick={crearVentaRegistro}>
            Insertar
          </Button>
{" "}
        <Button 
          className="btn btn-danger"
          onClick={Regresar}>
          Cancelar
        </Button>
          </center>

          </div>
    </div>

        )
      }else{
        navigate("/");
      }
}
export  default CrearLoteVentasRegistro;