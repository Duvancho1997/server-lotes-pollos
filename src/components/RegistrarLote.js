import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate,useParams } from 'react-router-dom';
import TablaNavegacion from "./TablaNavegacion"
import { useState,useEffect } from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import "../css/registrarlote.css";

  function RegistrarLote () {

    var  item_value = sessionStorage.getItem("item_key")
    var varSesion = sessionStorage.getItem("inicioSeccion");
    const navigate = useNavigate();
    const { id_lote } = useParams();
    const [fecha, setFecha] = useState('');
    const [fecha_entrada_pollos, setFecha_entrada_pollos] = useState('');
    const [cantidad_inicial_pollos, setCantidad_inicial_pollos] = useState('');

    useEffect(()=>{
      fetch('http://localhost:4000/sistemafecha')
      .then(response => {
      return response.json();
      })
      .then(response => {
      console.log("Fecha: ",response.fecha_bd.substr(0,10));
      setFecha( response.fecha_bd.substr(0,10))      
      })
    },[]); 

    const  Produccion = () => {
      fetch('http://localhost:4000/lote_produccion/ref/'+id_lote)
      .then(response => {
          return response.json();
      })
      .then(response => {
      if( response != ""){
        var id_lote_produccion = response[0].Id_lote_produccion
        console.log("if------",id_lote_produccion)
      navigate(`/RegistroModuloProduccion/${id_lote_produccion}`);
      }else{
        console.log("else------",id_lote)
      navigate(`/CrearLoteProduccion/${id_lote}`)
      }
      });
      }

        const  Ventas = () => {
          fetch('http://localhost:4000/lote_venta/ref/'+id_lote)
          .then(response => {
              return response.json();
          })
          .then(response => {
          if( response != ""){
            var id_lote_venta_total = response[0].Id_lote_venta_total
            console.log("if------",id_lote_venta_total)
            navigate(`/RegistroModuloVentas/${response[0].Id_lote_venta_total}`);
          }else{
            console.log("else------",id_lote)
            var url = 'http://localhost:4000/lote_venta';
            var data = 
              {
                Id_ref_lote: id_lote,
                Total_pollos_vendidos: 0, 
                Peso_total_vendido: 0,  
                Valor_promedio_peso: 0, 
                Total_venta_lote: 0, 
                Ganancia_bruta: 0, 
                Promedio_total_peso: 0, 
                Promedio_venta_pollo: 0, 
                Cantidad_ventas: 0,
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
          .then(response => navigate(`/RegistroModuloVentas/${response[0].Id_lote_venta_total}`)); 
          }
          });
          }

const  CerrarLote = () => {
          const v =0
 //-------Consulta para los campos de terminar lote produccion---------       
          fetch('http://localhost:4000/consultar_lote_terminar/'+id_lote)
          .then(response => {
              return response.json();
          })
          .then(response => {
          console.log("terminar",response)
          console.log("Fecha final:",response[0].Fecha_sacrificio_final.substring(0,10)) 
  //----------------------Terminar lote_producion--------------------------------------
  var pollos_muertos= response[0].Total_pollos_muertos;
  var cantidad_pollos_inicio=response[0].Cantidad_inicial_pollos;
  var mortalidad= (pollos_muertos*100)/cantidad_pollos_inicio;
  var consumo_pollo=(response[0].Cantidad_total_alimento/response[0].Total_pollos_sacrificados);
  var costo_total_pollos_inicio =(response[0].Cantidad_inicial_pollos * response[0].Costo_pollo_unidad);
  var costo_total_lote = costo_total_pollos_inicio + response[0].Gasto_total_produccion + response[0].Valor_total_alimento;
  console.log("costo_total_pollos_inicio:",costo_total_pollos_inicio);
  console.log("Gasto_total_produccion:",response[0].Gasto_total_produccion);
  console.log("Valor_total_alimento:",response[0].Valor_total_alimento);
  console.log("costo total pollos:",costo_total_lote);
  var url = 'http://localhost:4000/lote_produccion/terminar/'+response[0].Id_lote_produccion;
  var data = 
    {  
      Fecha_sacrificio_final: response[0].Fecha_sacrificio_final.substring(0,10),
      Total_pollos_muertos: response[0].Total_pollos_muertos,
      Mortalidad: mortalidad, 
      Consumo_pollo: consumo_pollo,
      Total_pollos_sacrificados: response[0].Total_pollos_sacrificados,
      Cantidad_total_alimento: response[0].Cantidad_total_alimento,
      Valor_total_alimento: response[0].Valor_total_alimento,
      Costo_total_lote: costo_total_lote,
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
  .then(response => {
    console.log("exitoso",response)
//------consulta para llenar los campos de lote ventas

})
fetch('http://localhost:4000/consultar_lote_venta_terminar/'+id_lote)
.then(response => {
    return response.json();
})
.then(response => {
console.log("terminar lote venta consulta",response)
//insertar los datos de lote ventas
var promedio_venta_pollo =((response[0].Total_venta_lote)/(response[0].Total_pollos_vendidos));
  var url = 'http://localhost:4000/lote_venta/'+response[0].Id_lote_venta_total;
  var data = 
    {  
      Id_ref_lote: id_lote,
        Total_pollos_vendidos: response[0].Total_pollos_vendidos, 
        Peso_total_vendido: response[0].Peso_total_vendido, 
        Valor_promedio_peso: response[0].Valor_promedio_peso, 
        Total_venta_lote: response[0].Total_venta_lote, 
        Ganancia_bruta: response[0].Ganancia_bruta, 
        Promedio_total_peso: response[0].Promedio_total_peso, 
        Promedio_venta_pollo: promedio_venta_pollo, 
        Cantidad_ventas: response[0].Cantidad_ventas,
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
  .then(response => {
//Consulta lotes ventas x produccion    
fetch('http://localhost:4000/consultar_lote_venta_produccion/'+id_lote)
.then(response => {
    return response.json();
})
.then(response => {
  console.log("consulta ventas x produccion:",response)
 //console.log("Fecha final:",response[0].Fecha_sacrificio_final.substring(0,10))
  var conversion = ((response[0].Consumo_pollo)/(response[0].Peso_total_vendido) );
  var ganancia_neta = ((response[0].Ganancia_bruta)-(response[0].Costo_total_lote) -(response[0].Gastos_ventas));
  var url = 'http://localhost:4000/produccion_venta';
    var data = 
      {
        Conversion: conversion,
        Ganancia_neta:  ganancia_neta,
        Id_ref_lote_venta: response[0].Id_lote_venta_total,
        Id_ref_lote_produccion: response[0].Id_lote_produccion,
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
    //Editar lote terminar
    var url = 'http://localhost:4000/lotes/'+id_lote;
      var data = 
        {  
        Fecha_terminacion_lote_sistema:  fecha,
        Estado_lote: "Terminado",
        Id_referencia_usuario: item_value,
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
      navigate(`/Inicio/${item_value}`);
  }); 
})
  });
  });
          })
        }

        useEffect(()=>{
          fetch ('http://localhost:4000/lote_produccion/ref/'+id_lote)
          .then(response => {
            return response.json();
        })
        .then(response => {
          console.log("holas locas",response[0].Fecha_entrada_pollos)
          setFecha_entrada_pollos(response[0].Fecha_entrada_pollos)
          setCantidad_inicial_pollos(response[0].Cantidad_inicial_pollos)
        })
        },[]); 

        if(varSesion=="true"){ 

      return(

        <div id="contInicio">

          <TablaNavegacion></TablaNavegacion>
          <div id="titReporte">
        <div id="rep_title">
        <h1><p>CREAR LOTE</p></h1>
        </div>
        <div id="rep_id">
        <h1>LOTE N° {id_lote}</h1>
          </div>
      </div>
      <br></br>
      <div id="tablInicio">
      <div id="subTitInicio">
      <center><h1><p>Registro Ventas o Producción</p></h1></center>
      </div>
      <br></br>
      
      <div id="repInicio">
      <div id="rep_costo_total_lote">
              <center>Fecha Entrada Pollos</center>
              <center>{fecha_entrada_pollos.substr(0,10)}</center>
      </div>

      <div id="rep_costo_total_lote">
              <center>Cantidad Inicial Pollos</center>
              <center>{cantidad_inicial_pollos}</center>
      </div>
      </div>

      <br></br>

          <div className="contenedor-produccion"> 
          <InputGroup className="mb-3">
          <Form.Control  
                      Value={"Producción Lote"}
                      name="Produccion"
                      readonly="readonly"
                    />

                      <Button
                        variant="primary" 
                        onClick={Produccion}>
                        Registro
                      </Button>
                      </InputGroup>

              </div>
              <div className="contenedor-ventas"> 

              <InputGroup className="mb-3">
              <Form.Control 
                    Value={"Ventas"}
                    name="Ventas"
                    readonly="readonly"
                  />
                    <Button
                      variant="primary" 
                      onClick={Ventas}>
                      Registro
                    </Button>
                    </InputGroup>

              </div>
              <Button
                      variant="danger"
                      onClick={CerrarLote}>
                      Terminar Lote
                    </Button>
                    </div>
          </div>
          ) 
        }else{
          navigate("/");
        }

      }
      export  default  RegistrarLote;