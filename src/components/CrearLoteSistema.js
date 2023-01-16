import "bootstrap/dist/css/bootstrap.min.css";
import "../css/crearreportes.css";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import TablaNavegacion from "./TablaNavegacion"
import { Button } from 'react-bootstrap';

function CrearLoteSistema () {

  const [fecha_creacion_lote_sistema, setFecha_creacion_lote_sistema] = useState();
  const [fecha_entrada_pollos, setFecha__entrada_pollos] = useState();
  const navigate = useNavigate();
  var  item_value = sessionStorage.getItem("item_key")
  const [cantidad_inicial_pollos , setCantidad_inicial_pollos] = useState();
  const [costo_pollo_unidad , setCosto_pollo_unidad] = useState();
  var varSesion = sessionStorage.getItem("inicioSeccion");
  let validar = /^(\d+|\d+.\d{0,2})$/;
  let validar2 = /^[0-9]*$/;

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

    const crearLotes=()=>{
        if( costo_pollo_unidad<1 || cantidad_inicial_pollos<1 || cantidad_inicial_pollos  ==null  || costo_pollo_unidad ==null ||  costo_pollo_unidad==""  || cantidad_inicial_pollos=="" || cantidad_inicial_pollos > 9999999999 ||!validar2.test(cantidad_inicial_pollos)||  costo_pollo_unidad > 9999999999 ||!validar.test(costo_pollo_unidad)   ){
          alert("Llenar y corregir todos los campos que tengan * " )
        }else{
          var resultado = window.confirm('Esta seguro de que desea crear el lote');
          if (resultado === true) {
      var url = 'http://localhost:4000/lotes';
      var data = 
        {
          Fecha_creacion_lote_sistema: fecha_creacion_lote_sistema,
          Fecha_terminacion_lote_sistema:fecha_creacion_lote_sistema,
          Estado_lote:"Activo",
          Id_referencia_usuario: item_value
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
    .then(response => { 
      if (cantidad_inicial_pollos==null || costo_pollo_unidad== null  ||cantidad_inicial_pollos==""|| costo_pollo_unidad== ""){
        alert("llenar todos los campos")
      }else{
        var id_lotes =response[0].Id;
        var url = 'http://localhost:4000/lote_produccion';
        var data = 
          {
            Id_ref_lote: id_lotes,
            Fecha_entrada_pollos:  fecha_entrada_pollos,
            Fecha_sacrificio_final:fecha_creacion_lote_sistema ,
            Cantidad_inicial_pollos: cantidad_inicial_pollos,
            Costo_pollo_unidad: costo_pollo_unidad,
            Total_pollos_muertos: 0,
            Mortalidad: 0, 
            Consumo_pollo:  0,
            Total_pollos_sacrificados: 0,
            Cantidad_total_alimento: 0,
            Valor_total_alimento:0,
            Costo_total_lote: 0
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
              navigate(`/RegistrarLote/${id_lotes}`);
      }

    }
  );
        } else{

        }
        }  
  }

  let styles = {
    fontWeight:"bold",
    color: "#dc3545"
  }

  if(varSesion=="true"){ 

        return(

            <div> 

              <TablaNavegacion></TablaNavegacion>
              <div id="titInicio">
              <h1><p>CREAR LOTE</p></h1>

              </div>
              <div className="col-sm-3 offset-sm-4">
              <div id="fondCrearLoteSistemas" >

      <center><h1><p>Registrar Lotes</p></h1></center>

      <hr></hr>
                  <label>
                    Fecha Entrada Pollos *
                  </label>
                  <input
                    className="form-control"
                    name="Fecha_entrada_pollos"
                    type="date"
                    onChange={event => setFecha__entrada_pollos(event.target.value)}
                  />

                <br></br>
                  <label>
                  Cantidad Pollos *
                  </label>
                  <input
                    maxLength="9999999999"
                    className="form-control"
                    name="Cantidad_inicial_pollos"
                    type="number"
                    onChange={event => setCantidad_inicial_pollos(event.target.value)}
                  />
                  { !validar2.test(cantidad_inicial_pollos) && cantidad_inicial_pollos!=null ? <h7 style={styles}> No puede tener decimales </h7> : console.log('bien')}
                  { cantidad_inicial_pollos<1 ? <h7 style={styles}>Los números no pueden ser negativos o menores a 1</h7> : console.log('bien')}
                  { cantidad_inicial_pollos > 9999999999  ? <h7 style={styles}>No puede tener más de 9999999999 </h7> : console.log('bien')}

            <br></br>
                  <label>
                  Costo Pollo Unidad *
                  </label>
                  <input
                    maxLength="9999999999"
                    step="0.01"
                    min="1" 
                    className="form-control"
                    name="Costo_pollo_unidad"
                    type="number"
                    onChange={event => setCosto_pollo_unidad(event.target.value)}
                  />
                  {costo_pollo_unidad < 1  ? <h7 style={styles}>Los numeros no pueden ser negativos o menores a 1 </h7> : console.log('bien')}
                  {costo_pollo_unidad > 9999999999  ? <h7 style={styles}>No puede tener más de 9999999999 </h7> : console.log('bien')}
                  {!validar.test(costo_pollo_unidad) && costo_pollo_unidad!=null ? <h7 style={styles}>No se pueden tener más de 2 decimales </h7> : console.log('bien')}

                  <hr></hr>
                  <center>
                      <Button
                        id="botIngresar"
                        onClick={crearLotes}>
                        Crear 
                      </Button>
                      </center>

              </div>
              </div>
            </div>

          ) 
        }else{
          navigate("/");
        }
      }
      export default CrearLoteSistema;