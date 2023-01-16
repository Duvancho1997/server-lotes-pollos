import React, { useState,useEffect} from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Graficas2(props) {

  const [venta, setVenta ] = useState([]);
  const [gasto, setGasto ] = useState([]);
  const labels = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  const options = {
    fill: true,
    animations: false,
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

  useEffect(() => {
    var id=props.Id_lote
    fetch('http://localhost:4000/lote_venta/ref/'+id)
    .then((response) =>response.json())
    .then(response => {
      console.log("remolacha --------",response)
      setVenta(response[0])
    });
  }, []); 

  useEffect(() => {
    var id=props.Id_lote
    fetch('http://localhost:4000/gasto_total/'+id)
    .then(response => {
        return response.json();
    })
    .then(response => {
      console.log("rsonsome",response)
      setGasto(response[0])
    });
  }, []); 

  const data = {
      datasets: [
        {
          label: "Ventas",
          data:venta,
          tension: 0.3,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.3)",
        },
        {
          label: "Gastos",
          data: gasto,
          tension:0.3,
          borderColor: "green",
          backgroundColor: "rgba(0, 255, 0, 0.3)",
        },
      ],
      
      labels,
    };

  
  return <div>
  <Line data={data} options={options} />
  </div>
}
