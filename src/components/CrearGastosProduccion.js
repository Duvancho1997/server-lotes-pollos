import { useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate,useParams} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import "../css/creargastosproduccion.css";

  function CrearGastosProduccion() {

    const navigate = useNavigate();
    var varSesion = sessionStorage.getItem("inicioSeccion");
    const {ref } = useParams();
    const [gasto_creado , setGasto_creado] = useState();
    const [precio , setPrecio] = useState();
    const [cantidad , setCantidad] = useState();
    const [descripcion_gasto , setDescripcion_gasto] = useState('');
    const [fecha_gasto , setFecha_gasto] = useState();
    const [fecha, setFecha] = useState();
    let validar = /^(\d+|\d+.\d{0,2})$/;

    const Regresar = () => {
        navigate(`/RegistroModuloProduccion/${ref}`);
      }

      const crearGastosProduccion=()=>{
        if( cantidad<1 || precio<1 ||gasto_creado==null || fecha_gasto==null || cantidad==null || precio==null  || gasto_creado=="" || fecha_gasto=="" || cantidad=="" || precio=="" || cantidad > 9999999999 || !validar.test(cantidad) ||precio > 9999999999 ||!validar.test(precio)  ){
          alert("Llenar y corregir todos los campos que tengan * " )
        }else{
        var url = 'http://localhost:4000/gastos_produccion';
        var data = 
          {
          Id_ref_lote_produccion: ref,
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
      navigate(`/RegistroModuloProduccion/${ref}`);
    }
    }

    let styles = {
      fontWeight:"bold",
      color: "#dc3545"
    }

    if(varSesion=="true"){ 

    return(
      
      <div className="col-sm-3 offset-sm-4">
    <div id="fondGastoProduccion" >

                <center><h3>Insertar Gastos de Producción</h3></center>
          <hr></hr>

                    <label>
                      Fecha de gasto * 
                    </label>
                    <input
                      min={fecha}
                      className="form-control"
                      name="Fecha_gasto"
                      type="date"
                      onChange={event => setFecha_gasto(event.target.value)}
                    />

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
                    {!validar.test(precio)  && precio!=null ? <h7 style={styles}> No se pueden tener más de 2 decimales </h7> : console.log('bien')}

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
                    {!validar.test(cantidad )  && cantidad!=null ? <h7 style={styles}> No se pueden tener más de 2 decimales </h7> : console.log('bien')}

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
                    Total Gasto Producción *
                    </label>
                    <input
                      className="form-control"
                      name="Fecha_gasto"
                      type="number"
                      value={(cantidad*precio).toFixed(2)}
                    />

                <hr></hr>

                  <center>
                  <Button
                    color="primary" 
                    type="submit"
                    onClick={crearGastosProduccion}>
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
export  default  CrearGastosProduccion; 