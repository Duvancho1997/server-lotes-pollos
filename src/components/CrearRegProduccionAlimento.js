import { useState,useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate,useParams} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import "../css/crearregproduccionalimento.css";

  function CrearRegProduccionAlimento() {

    const navigate = useNavigate();
    const {ref } = useParams();
    const [fecha_creacion_lote_sistema, setFecha_creacion_lote_sistema] = useState();
    var varSesion = sessionStorage.getItem("inicioSeccion");
    const [fecha_compra, setFecha_compra] = useState();
    const [cantidad_alimento, setCantidad_alimento] = useState();
    const [valor_alimento, setValor_alimento] = useState();
    const [descripcion_alimento, setDescripcion_alimento] = useState();
    let validar = /^(\d+|\d+.\d{0,2})$/;

    const Regresar = () => {
      navigate(`/RegistroModuloProduccion/${ref}`);
      }

      const crearRegProduccionAlimento=()=>{
        if( cantidad_alimento<1 || valor_alimento<1  || fecha_compra==null || cantidad_alimento==null || valor_alimento==null ||descripcion_alimento==null  || fecha_compra=="" || cantidad_alimento=="" || valor_alimento=="" ||descripcion_alimento=="" || cantidad_alimento > 9999999999 || !validar.test(cantidad_alimento) ||valor_alimento > 9999999999 ||!validar.test(valor_alimento) ){
          alert("Llenar y corregir todos los campos que tengan * " )
        }
      else{
        var url = 'http://localhost:4000/reg_produccion_alimento';
        var data = 
          {
            Id_ref_lote_produccion: ref,
            Fecha_compra: fecha_compra,
            Cantidad_alimento: cantidad_alimento,
            Valor_alimento: valor_alimento,
            Descripcion_alimento: descripcion_alimento,
            Precio_compra: valor_alimento*cantidad_alimento
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

    if(varSesion=="true"){ 

    return(

      <div className="col-sm-3 offset-sm-4">
    <div id="fondRegistroAlimento" >
                  
                <center><h3>Registro de Alimento</h3></center>
                <hr></hr>
                    <label>
                    Fecha Diaria de Compra * 
                    </label>
                    <input
                      max={fecha_creacion_lote_sistema}
                      className="form-control"
                      name="Fecha_compra"
                      type="date"
                      onChange={event => setFecha_compra(event.target.value)
                      }
                    />
                    {fecha_compra > fecha_creacion_lote_sistema? <h7 style={styles}>La fecha no puede ser mayor al {fecha_creacion_lote_sistema}</h7> : console.log('bien')}
                    <br></br>

                    <label>
                    Cantidad de Alimento *
                    </label>
                    <input
                      maxLength="9999999999"
                      aria-label="required"
                      step="0.01"
                      min="1" 
                      className="form-control"
                      name="Cantidad_alimento"
                      type="number"
                      onChange={event => setCantidad_alimento(event.target.value)}
                    />
                    {cantidad_alimento < 1  ? <h7 style={styles}>Los números no pueden ser negativos o menores a 1 </h7> : console.log('bien')}
                    {cantidad_alimento > 9999999999  ? <h7 style={styles}>No puede tener más de 9999999999 </h7> : console.log('bien')}
                    {!validar.test(cantidad_alimento) && cantidad_alimento!=null  ? <h7 style={styles}>No se pueden tener más de 2 decimales </h7> : console.log('bien')}

                <br></br>
                    <label>
                    Valor del Alimento *
                    </label>
                    <input
                      maxLength="9999999999"
                      aria-label="required"
                      step="0.01" 
                      min="1" 
                      className="form-control"
                      name="Valor_alimento"
                      type="number"
                      onChange={event => setValor_alimento(event.target.value)}
                    />
                    {valor_alimento < 1 ? <h7 style={styles}>Los números no pueden ser negativos o menores a 1 </h7> : console.log('bien')}
                    {valor_alimento > 9999999999  ? <h7 style={styles}> No puede tener más de 9999999999 </h7> : console.log('bien')}
                    {!validar.test(valor_alimento)  && valor_alimento!=null  ? <h7 style={styles}> No se pueden tener más de 2 decimales </h7> : console.log('bien')}

                  <br></br>
                    <label>
                    Descripción Alimento *
                    </label>
                    <input
                      maxlength="100"
                      className="form-control"
                      name="Descripcion_alimento"
                      type="text"
                      onChange={event => setDescripcion_alimento(event.target.value)}
                    />

                <br></br>
                    <label>
                    Precio Compra *
                    </label>
                    <input
                      value={(valor_alimento*cantidad_alimento).toFixed(2)}
                      className="form-control"
                      name="Precio_compra"
                      type="number"
                    />

              <hr></hr>
              <center>
                  <Button
                    type="submit"
                    onClick={crearRegProduccionAlimento}>
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
export  default  CrearRegProduccionAlimento