import { useState ,useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate,useParams} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import "../css/creargastosventas.css";

  function CrearGastosVentas() {

    const navigate = useNavigate();
    const {ref } = useParams();
    const [fecha_creacion_lote_sistema, setFecha_creacion_lote_sistema] = useState();
    const [gasto_creado , setGasto_creado] = useState();
    const [precio , setPrecio] = useState();
    const [cantidad , setCantidad] = useState();
    const [descripcion_gasto , setDescripcion_gasto] = useState('');
    const [fecha_gasto , setFecha_gasto] = useState();
    var varSesion = sessionStorage.getItem("inicioSeccion");
    let validar = /^(\d+|\d+.\d{0,2})$/;

    const Regresar = () => {
      navigate(`/RegistroModuloVentas/${ref}`);
      }

      const crearGastosVentas=()=>{
        if( precio<1 || cantidad<1 || fecha_gasto  ==null ||  precio==null  || cantidad==null || gasto_creado==null  || fecha_gasto =="" ||  gasto_creado==""  || cantidad=="" || precio=="" ||   precio > 9999999999 ||!validar.test(precio)||  cantidad > 9999999999 ||!validar.test(cantidad)  ){
          alert("Llenar y corregir todos los campos que tengan * " )
        }else{
        var url = 'http://localhost:4000/gastos_ventas';
        var data = 
          {
          Id_ref_lote_venta: ref,
          Gasto_creado: gasto_creado,
          Precio: precio,
          Cantidad: cantidad,
          Descripcion_gasto: descripcion_gasto,
          Fecha_gasto: fecha_gasto,
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
    fetch('http://localhost:4000/sistemafecha')
    .then(response => {
    return response.json();
    })
    .then(response => {
    console.log("Fecha: ",response.fecha_bd.substr(0,10));
    setFecha_creacion_lote_sistema( response.fecha_bd.substr(0,10))      
    })
  },[]);

  let styles = {
    fontWeight:"bold",
    color: "#dc3545"
  }

  if(varSesion=="true"){ 

    return(

      <div className="col-sm-3 offset-sm-4">
      <div id="fondInsertarGastos" >

                  <center><h3>Insertar Gastos</h3></center>
                  <hr></hr>
                  <label>
                      Fecha de Gasto *
                      </label>
                      <input
                        max={fecha_creacion_lote_sistema}
                        className="form-control"
                        name="Fecha_gasto"
                        type="date"
                        onChange={event => setFecha_gasto(event.target.value)}
                      />
                      {fecha_gasto > fecha_creacion_lote_sistema ? <h7 style={styles}>La fecha no puede ser menor mayor al {fecha_creacion_lote_sistema}</h7> : console.log('bien')}

                      <br></br>
                      <label>
                      Gasto Creado *
                      </label>
                      <input
                        maxlength="100"
                        className="form-control"
                        name="Gasto_creado"
                        type="text"
                        onChange={event => setGasto_creado(event.target.value)}
                      />
                      <br></br>

                      <label>
                      Precio *
                      </label>
                      <input
                        step="0.01"
                        min="1" 
                        className="form-control"
                        name="Precio"
                        type="number"
                        onChange={event => setPrecio(event.target.value)}
                      />
                      {precio < 1 ? <h7 style={styles}> Los números no pueden ser negativos o menores a 1 </h7> : console.log('bien')}
                      {precio > 9999999999  ? <h7 style={styles}> No puede tener más de 9999999999 </h7> : console.log('bien')}
                      {!validar.test(precio) && precio!=null ? <h7 style={styles}> no se pueden tener más de 2 decimales </h7> : console.log('bien')}
                    <br></br>

                      <label>
                      Cantidad *
                      </label>
                      <input
                        step="0.01"
                        min="1" 
                        className="form-control"
                        name="Cantidad"
                        type="number"
                        onChange={event => setCantidad(event.target.value)}
                      />
                      {cantidad < 1 ? <h7 style={styles}> Los números no pueden ser negativos o menores a 1 </h7> : console.log('bien')}
                      {cantidad > 9999999999  ? <h7 style={styles}> No puede tener más de 9999999999 </h7> : console.log('bien')}
                      {!validar.test(cantidad) && cantidad!=null ? <h7 style={styles}> No se pueden tener más de 2 decimales </h7> : console.log('bien')}
                  <br></br>

                      <label>
                      Descripción del Gasto
                      </label>
                      <input
                        maxlength="100"
                        className="form-control"
                        name="Descripcion_gasto"
                        type="text"
                        onChange={event => setDescripcion_gasto(event.target.value)}
                      />

                      <br></br>
                      <label>
                      Total *
                      </label>
                      <input
                        value={(cantidad*precio).toFixed(2)}
                        className="form-control"
                        name="Descripcion_gasto"
                        type="number"
                      />

                <hr></hr>
                <center>
                    <Button
                      color="primary" 
                      type="submit"
                      onClick={crearGastosVentas}>
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
    }else{
      navigate("/");
    }

}
export  default  CrearGastosVentas;