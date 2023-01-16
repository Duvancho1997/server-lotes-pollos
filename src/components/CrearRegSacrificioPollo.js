import { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate,useParams} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import "../css/crearregsacrificadopollo.css";

  function CrearRegSacrificioPollo() {

    const navigate = useNavigate();
    var varSesion = sessionStorage.getItem("inicioSeccion");
    const {ref } = useParams();
    const [fecha_creacion_lote_sistema, setFecha_creacion_lote_sistema] = useState();
    const [fecha_sacrificio, setFecha_sacrificio] = useState();
    const [cantidad_pollos, setCantidad_pollos] = useState();
    const [fecha, setFecha] = useState();
    const [validacion, setValidacion] = useState();
    let validar = /^[0-9]*$/;

    const Regresar = () => {
      navigate(`/RegistroModuloProduccion/${ref}`);
    }

      const crearRegSacrificioPollo=()=>{
        let validar = /^[0-9]*$/;
        
    if( cantidad_pollos > validacion||cantidad_pollos<1 ||  fecha_sacrificio==null || cantidad_pollos=="" ||fecha_sacrificio==""||cantidad_pollos==null ||fecha_sacrificio < fecha|| !validar.test(cantidad_pollos) || cantidad_pollos > 9999999999){
      alert("Llenar y corregir todos los campos que tengan * " );
    }else{
      fetch('http://localhost:4000/validacion/rango/'+ref+'/'+fecha_sacrificio)
      .then(response => {
          return response.json();
      })
      .then(response => {
        if(response.rango<45){
          var resultado = window.confirm('Se recomienda realizar el sacrificio desde pues de 45 días');
          if (resultado === true) {
            
            var url = 'http://localhost:4000/reg_sacrificio_pollo';
        var data = 
          {
            Id_ref_lote_produccion: ref,
            Fecha_sacrificio: fecha_sacrificio,
            Cantidad_pollos: cantidad_pollos,
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
        } else {
          
        }
        }else{
        var url = 'http://localhost:4000/reg_sacrificio_pollo';
        var data = 
          {
            Id_ref_lote_produccion: ref,
            Fecha_sacrificio: fecha_sacrificio,
            Cantidad_pollos: cantidad_pollos,
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
    })
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
      fetch('http://localhost:4000/validacion/'+ref)
      .then(response => {
      return response.json();
      })
      .then(response => {
        console.log("------",response.CANTIDAD_DIPONIBLE_MORTALIDAD)
      setValidacion( response.CANTIDAD_DIPONIBLE_MORTALIDAD)      
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

    let styles = {
      fontWeight:"bold",
      color: "#dc3545"
    }
    if(varSesion=="true"){ 

    return(
    <form>
    <div className="col-sm-3 offset-sm-4">
    <div id="fondPollosSacrificio" >

    <center><h3>Insertar Pollos de Sacrificio</h3> </center>
              <hr></hr>
                    <label>
                    Fecha diaria de Sacrificio * 
                    </label>
                    <input 
                      max={fecha_creacion_lote_sistema}
                      min={fecha}
                      className="form-control"
                      name="Fecha_sacrificio"
                      type="date"
                      onChange={event => setFecha_sacrificio(event.target.value)}
                    />
                    {fecha_sacrificio < fecha ||fecha_sacrificio > fecha_creacion_lote_sistema? <h7 style={styles}>La fecha no puede ser menor al {fecha} o mayor al {fecha_creacion_lote_sistema}</h7> : console.log('bien')}

                <br></br>

                    <label>
                    Pollos Sacrificados *
                    </label>
                    <input
                      maxLength="9999999999"
                      min="1" 
                      className="form-control"
                      name="Cantidad_sacrificio"
                      type="number"
                      onChange={event => setCantidad_pollos(event.target.value)}
                    />
                    { !validar.test(cantidad_pollos) && cantidad_pollos!=null? <h7 style={styles}> No puede tener decimales y negativo </h7> : console.log('bien')}
                    { cantidad_pollos < 1 ? <h7 style={styles}>  No puede estar vacío </h7> : console.log('bien')}
                    { cantidad_pollos > 9999999999  ? <h7 style={styles}> No puede tener más de 9999999999 </h7> : console.log('bien')}
                    { cantidad_pollos > validacion ? <h7 style={styles}> No puedes más de {validacion} pollos muertos </h7> : console.log('bien')}

              <hr></hr>
              <center>

                  <Button
                    color="primary" 
                    onClick={crearRegSacrificioPollo}>
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
              </form>
      )    
    }else{
      navigate("/");
    }
}
export  default CrearRegSacrificioPollo;