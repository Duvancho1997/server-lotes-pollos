import { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate,useParams} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import "../css/crearregsacrificadopollo.css";

  function CrearRegProduccionMortalidad() {

  const navigate = useNavigate();
  const {ref } = useParams();
  const [fecha_creacion_lote_sistema, setFecha_creacion_lote_sistema] = useState();
  const [fecha_reg_mortalidad, setFecha_reg_mortalidad] = useState();
  const [cantidad_pollos_muertos, setCantidad_pollos_muertos] = useState();
  const [fecha, setFecha] = useState();
  const [validacion, setValidacion] = useState();
  var varSesion = sessionStorage.getItem("inicioSeccion");
  let validar = /^[0-9]*$/;

  const Regresar = () => {
    navigate(`/RegistroModuloProduccion/${ref}`);
  }

  const crearRegProduccionMortalidad=()=>{
    let validar = /^[0-9]*$/;
    if( cantidad_pollos_muertos > validacion||cantidad_pollos_muertos<1 ||  fecha_reg_mortalidad==null || cantidad_pollos_muertos=="" ||fecha_reg_mortalidad==""||cantidad_pollos_muertos==null ||fecha_reg_mortalidad < fecha ||fecha_reg_mortalidad > fecha_creacion_lote_sistema|| !validar.test(cantidad_pollos_muertos) || cantidad_pollos_muertos > 9999999999){
      alert("llenar y corregir todos los campos que tengan * " )
    } else{
    var url = 'http://localhost:4000/reg_produccion_mortalidad';
    var data = 
      {
        Id_ref_lote_produccion: ref,
        Fecha_reg_mortalidad: fecha_reg_mortalidad,
        Cantidad_pollos_muertos: cantidad_pollos_muertos,
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

useEffect(()=>{
  fetch ('http://localhost:4000/lote_produccion/fechaP/'+ref)
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
  fetch('http://localhost:4000/validacion/'+ref)
  .then(response => {
  return response.json();
  })
  .then(response => {
  setValidacion( response.CANTIDAD_DIPONIBLE_MORTALIDAD)      
  })
},[]);

let styles = {
  fontWeight:"bold",
  color: "#dc3545"
}

if(varSesion=="true"){ 

return(
  <div className="col-sm-3 offset-sm-4">
  <div id="fondPollosSacrificio" >

            <center><h3>Insertar Registro de Mortalidad</h3></center>
            <hr>
            </hr>
                <label>
                Fecha Mortalidad *
                </label>
                <input
                  max={fecha_creacion_lote_sistema}
                  min={fecha}
                  className="form-control"
                  name="Fecha_reg_mortalidad"
                  type="date"
                  onChange={event => setFecha_reg_mortalidad(event.target.value)}
                />
                {fecha_reg_mortalidad < fecha ||fecha_reg_mortalidad > fecha_creacion_lote_sistema? <h7 style={styles}>La fecha no puede ser menor al {fecha} o mayor al {fecha_creacion_lote_sistema}</h7> : console.log('bien')}

            <br></br>
                <label>
                Pollos Muertos *
                </label>
                <input
                  maxLength="9999999999"
                  min="1" 
                  aria-label="required"
                  className="form-control"
                  name="Cantidad_pollos_muertos"
                  type="number"
                  onChange={event => setCantidad_pollos_muertos(event.target.value)}
                />
                { !validar.test(cantidad_pollos_muertos ) && cantidad_pollos_muertos!=null? <h7 style={styles}> No puede tener decimales y negativo </h7> : console.log('bien')}
                { cantidad_pollos_muertos < 1 ? <h7 style={styles}>  No puede estar vacío </h7> : console.log('bien')}
                { cantidad_pollos_muertos > 9999999999  ? <h7 style={styles}> No puede tener más de 9999999999 </h7> : console.log('bien')}
                { cantidad_pollos_muertos > validacion ? <h7 style={styles}> No puedes mas de {validacion} pollos muertos </h7> : console.log('bien')}

          <hr></hr>
              <center>
              <Button
                color="primary" 
                type="submit"
                onClick={crearRegProduccionMortalidad}>
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
export  default  CrearRegProduccionMortalidad;