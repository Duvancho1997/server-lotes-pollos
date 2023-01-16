import React, { useState,useEffect} from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import "../css/graficas.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,  
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,   
  Legend,
  Filler
);        

export default function Graficas() {

  const [year , setYear] = useState();
  const [year2 , setYear2] = useState();
  const [combobox , setCombobox] = useState([]);
  const [combobox2, setCombobox2] = useState([]);  
  const [scores , setScores] = useState([]);
  const [scores2 , setScores2] = useState([]);
  const [fecha_creacion_lote_sistema, setFecha_creacion_lote_sistema] = useState();
  const labels = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  const options =   {
    fill: true,
    animations:  false,
    scales: {
      y: {
        min: 0,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  useEffect(()=>{
    fetch('http://localhost:4000/sistemafecha')
    .then(response => {
    return response.json();
    })
  .then(response => {
    console.log("Fecha: "+response.fecha_bd.substr(0,4)); 
    setFecha_creacion_lote_sistema( response.fecha_bd.substr(0,4)) 
    setYear(response.fecha_bd.substr(0,4)) 
    setYear2(response.fecha_bd.substr(0,4))   
    })
  },[]); 

  const handlerCargar =function(e){
    const opcion =e.target.value
  setYear(opcion)
  }

  const handlerCargar2 =function(e){
  const opcion =e.target.value
  setYear2(opcion)
} 

    const combobox1 =()=>{
      fetch('http://localhost:4000/combobox')
      .then((response) => response.json())   
      .then((combobox) => {
        setCombobox(combobox)
      });
    }

    const combobox3 =()=>{
      fetch('http://localhost:4000/combobox')
      .then((response) => response.json())   
      .then((combobox2) => setCombobox2(combobox2))
    }

    const peticionApi1=()=>{
      fetch('http://localhost:4000/grafica_lote_venta/'+year)
      .then((response) =>response.json())
      .then((scores) => {
      setScores(scores);
      });
    }

  const peticionApi2 =()=>{
    fetch('http://localhost:4000/grafica_lote_venta/'+year2)
    .then(response => {
        return response.json();
    })
    .then(response =>   {
      setScores2(response)
    })
  } 

  useEffect(() => {
    combobox1 ();  
    combobox3();
    peticionApi1();
    peticionApi2(); 
  }, [year,year2]);

  const data = {
      datasets: [
        {
          label: "Mis datos",
          data: scores,  
          backgroundColor:  "rgba(0, 255, 0, 0.3)",
        },
        {  
          label: "Mis datos (2)",
          data: scores2,
          backgroundColor: "#0040FF",
        },
      ],
      labels,   
    };

  return <div>

  <div id="subTitGrafica">
      <center><h1><p>Grafica Lote por Año</p></h1></center>
      </div>
      
      <br></br>
      <div id="fromGrafica">
      <div id="selGrafica">
      <InputGroup className="mb-3">
          <Form.Control  
                      Value="Seleccione Fecha"
                      name="select"
                      type="text"
                    />

    <select name="combobox"  id="selCombobox" onClick={handlerCargar}>
                  {  
                combobox.map((i)=>  (
                <option  key={"comboboxs"+i} value={i}>{i}</option>
                  ))
                  }
              </select>
              </InputGroup>
              </div>
              
              <div id="sel2Grafica">
              <InputGroup className="mb-3">
          <Form.Control  
                      Value="Seleccione Fecha"
                      name="select"
                      type="text"
                    />

    <select name="combobox2"  id="selCombobox2" onClick={handlerCargar2}>
                  {  
                  combobox2.map((i)=>  (
                <option  key={"comboboxs2"+i} value={i}>{i}</option>
                  ))
                  }
              </select>
              </InputGroup>

              </div>

              </div>

    <Bar data={data} options={options}></Bar> 

    </div>

}