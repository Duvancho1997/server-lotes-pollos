import TablaNavegacion from "../components/TablaNavegacion";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { React,useEffect,useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/reporte2.css";
import { useNavigate } from "react-router-dom";
import ReactExport from "@ibrahimrahmani/react-export-excel";
import jsPDF from "jspdf"
import "jspdf-autotable"
import Exporter from "vue-chartjs-exporter";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line,Bar,Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function Reportes2() {

  const navigate = useNavigate();
  const [mortalidad, setMortalidad] = useState([]);
  const [gastos , setGastos] = useState([]);
  const [cantidad_pollos , setCantidad_pollos] = useState([]);
  const [consumo, setConsumo]= useState();
  const labels = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const [ventas , setVentas] = useState([]);
  const [year, setYear ] = useState("");
  const [fecha_creacion_lote_sistema, setFecha_creacion_lote_sistema] = useState();
  const [combobox , setCombobox] = useState([]);
  const [total_venta, setTotal_venta ] = useState([]);
  const [total_gastos, setTotal_gastos ] = useState([]);
  const [total_ganancia_neta, setTotal_ganancia_neta ] = useState([]);
  const [total_pollos_sacrificados, setTotal_pollos_sacrificados ] = useState([]);

  var varSesion = sessionStorage.getItem("inicioSeccion");
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

    const MesLoteVenta=()=>{
    fetch('http://localhost:4000/grafica_lote_venta/'+year)
    .then((response) =>response.json())
    .then((response) => {
    setVentas(response);    
    });
  }

    const MesGasto=()=>{
    fetch('http://localhost:4000/grafica_gastos_mes/'+year)
    .then((response) =>response.json())
    .then((response) => {
    setGastos(response);

    });
  }

  useEffect(()=>{
    fetch('http://localhost:4000/sistemafecha')
    .then(response => {
    return response.json();
    })
  .then(response => {

    setFecha_creacion_lote_sistema( response.fecha_bd.substr(0,4)) 
    setYear(response.fecha_bd.substr(0,4))  
    })
  },[]); 

  const Combobox =()=>{
    fetch('http://localhost:4000/combobox')
    .then((response) => response.json())   
    .then((combobox) => {
      setCombobox(combobox)
    });
  }

  const handlerCargar =function(e){
    const opcion =e.target.value
  setYear(opcion)
  }

  const TotalPollosSacrificados=()=>{
    fetch('http://localhost:4000/total_pollos_sacrificados/'+year)
      .then((response) =>response.json())
      .then(response => {
        setTotal_pollos_sacrificados(response[0])
      });
      }

      const TotalVenta=()=>{
        fetch('http://localhost:4000/total_venta/'+year)
          .then((response) =>response.json())
          .then(response => {
            setTotal_venta(response[0])
          });
          }

      const TotalGananciaNeta=()=>{
        fetch('http://localhost:4000/total_ganancia_neta/'+year)
          .then((response) =>response.json())
          .then(response => {
            setTotal_ganancia_neta(response[0])
          });
          }

      const TotalGastos=()=>{
        fetch('http://localhost:4000/total_gastos/'+year)
          .then((response) =>response.json())
          .then(response => {
            setTotal_gastos(response[0])
          });
          }

          const graficaProduccionAlimento=()=>{
            fetch('http://localhost:4000/grafica_produccion_alimento/'+year)
            .then((response) =>response.json())
            .then((response) => {
            setConsumo(response);
            });
          }

          const graficaSacrificioPollo=()=>{
            fetch('http://localhost:4000/grafica_sacrificio_pollo/'+year)
            .then((response) =>response.json())
            .then((response) => {
              setCantidad_pollos(response);
            });
          }

          const graficaMortalidad=()=>{
            fetch('http://localhost:4000/grafica_mortalidad/'+year)
            .then((response) =>response.json())
            .then((response) => {
              setMortalidad(response[0]);
            });
          }

      useEffect(() => {
        graficaSacrificioPollo();
        graficaProduccionAlimento();
        TotalPollosSacrificados();
        TotalGananciaNeta();
        Combobox();
        TotalVenta();
        TotalGastos();
        MesLoteVenta()
        MesGasto()
        graficaMortalidad();
      }, [year]);

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

      const options2 = {
        fill: true,
        animations: false,
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
      };

      const data3 = {
        datasets: [
          {
            label: "cantida pollos",
            data: cantidad_pollos,  
            backgroundColor:  "rgba(0, 255, 0, 0.3)",
          },
        ],
        labels,   
      };

      const data = {
        datasets: [
          {
            label: "gastos",
            data: gastos,  
            backgroundColor:  "rgba(0, 255, 0, 0.3)",
          },
          {  
            label: "ventas",
            data: ventas,
            backgroundColor: "#0040FF",
          },
        ],
        labels,   
      };

      const data2 = {
        datasets: [
          {
            label: "consumo",
            data: consumo,  
            backgroundColor:  "rgba(0, 255, 0, 0.3)",
          },
        ],
        labels,   
      };

      const data4 = {
        datasets: [
          {
            label: "Mis datos",
            data: mortalidad,
            tension: 0.3,
            borderColor: "black",
            backgroundColor: ['blue','red'],
          },
        ],
        labels:[
          "Total", "Mortalidad"
        ],  
      };

      const execel = [
        {
          total_venta,
          total_gastos,
          total_ganancia_neta,
          total_pollos_sacrificados,
        }
      ]

      const execel2 = [
        {
          columns: [
            { value: "Enero", widthPx: 100 }, 
            { value: "Febreo", widthPx: 100 },
            { value: "Marzo", widthPx: 100 }, 
            { value: "Abril", widthPx: 100 },
            { value: "Mayo", widthPx: 100 }, 
            { value: "Junio", widthPx: 100 }, 
            { value: "Julio", widthPx: 100 },
            { value: "Agosto", widthPx: 100 }, 
            { value: "Septiembre", widthPx: 100 },
            { value: "Octubre", widthPx: 100 }, 
            { value: "Noviembre", widthPx: 100 },
            { value: "Diciembre", widthPx: 100 }, 
          ],
          data:[
            gastos,
          ] 
        },
      ];

      const execel3 = [
        {
          columns: [
            { value: "Enero", widthPx: 100 }, 
            { value: "Febreo", widthPx: 100 },
            { value: "Marzo", widthPx: 100 }, 
            { value: "Abril", widthPx: 100 },
            { value: "Mayo", widthPx: 100 }, 
            { value: "Junio", widthPx: 100 }, 
            { value: "Julio", widthPx: 100 },
            { value: "Agosto", widthPx: 100 }, 
            { value: "Septiembre", widthPx: 100 },
            { value: "Octubre", widthPx: 100 }, 
            { value: "Noviembre", widthPx: 100 },
            { value: "Diciembre", widthPx: 100 }, 
          ],
          data:[
            ventas,
          ] 
        },
      ];

      const execel4 = [
        {
          columns: [
            { value: "Enero", widthPx: 100 }, 
            { value: "Febreo", widthPx: 100 },
            { value: "Marzo", widthPx: 100 }, 
            { value: "Abril", widthPx: 100 },
            { value: "Mayo", widthPx: 100 }, 
            { value: "Junio", widthPx: 100 }, 
            { value: "Julio", widthPx: 100 },
            { value: "Agosto", widthPx: 100 }, 
            { value: "Septiembre", widthPx: 100 },
            { value: "Octubre", widthPx: 100 }, 
            { value: "Noviembre", widthPx: 100 },
            { value: "Diciembre", widthPx: 100 }, 
          ],
          data:[
            consumo,
          ] 
        },
      ];

      const execel5 = [
        {
          columns: [
            { value: "Enero", widthPx: 100 }, 
            { value: "Febreo", widthPx: 100 },
            { value: "Marzo", widthPx: 100 }, 
            { value: "Abril", widthPx: 100 },
            { value: "Mayo", widthPx: 100 }, 
            { value: "Junio", widthPx: 100 }, 
            { value: "Julio", widthPx: 100 },
            { value: "Agosto", widthPx: 100 }, 
            { value: "Septiembre", widthPx: 100 },
            { value: "Octubre", widthPx: 100 }, 
            { value: "Noviembre", widthPx: 100 },
            { value: "Diciembre", widthPx: 100 }, 
          ],
          data:[
            cantidad_pollos,
          ] 
        },
      ];

      const execel6 = [
        {
          columns: [
            { value: "Total", widthPx: 100 }, 
            { value: "Mortalidad", widthPx: 100 },
          ],
          data:[
            mortalidad,
          ] 
        },
      ];

      const downloadPdf=()=>{
        let pie = document.getElementById("pie");
        let line = document.getElementById("line");
        let line2 = document.getElementById("line2");
        let bar = document.getElementById("bar");
        const exp = new Exporter([pie,line,line2,bar]);
        const doc = new jsPDF();
        doc.autoTable({
          head:[[ 
            "Total Venta",
            "Total Gastos",
            "Total Ganancia Neta",
            "Total Pollos Sacrificados"
          ]],
          body:[[
          total_venta,
          total_gastos,
          total_ganancia_neta,
          total_pollos_sacrificados,
        ]],
        });
        exp.export_pdf().then((pdf) => {
          pdf.save("Graficas.pdf");
          this.download_status = "Download Charts";
        });
        doc.save("Reporte anual.pdf");
      }

      if(varSesion=="true"){

    return (

        <div>

            <TablaNavegacion></TablaNavegacion>

            <div id="titReporte">
            <h1><p>REPORTE ANUAL</p></h1>
            </div>
            <br></br>
            <div id="rep2Fondo2">
            <div id="rep2Combobox">
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

              <div id="rep2Excel">
              <ExcelFile element={ <button id="botReportesExcel">Excel</button> } filename="Reporte anual">
                <ExcelSheet data={execel} name="Kpi" >
                    <ExcelColumn label="Total Venta" value="total_venta" />
                    <ExcelColumn label="Total Gastos" value="total_gastos"/>
                    <ExcelColumn label="Ganancia Neta" value="total_ganancia_neta"/>
                    <ExcelColumn label="Pollos Sacrificados" value="total_pollos_sacrificados" />
                </ExcelSheet>
                <ExcelSheet dataSet={execel2} name="Gastos por mes" >
                </ExcelSheet>
                <ExcelSheet dataSet={execel3} name="Ventas por mes" >
                </ExcelSheet>
                <ExcelSheet dataSet={execel4} name="Cantidad aliemnto mensual" >
                </ExcelSheet>
                <ExcelSheet dataSet={execel5} name="Cantidad pollos mensual" >
                </ExcelSheet>
                <ExcelSheet dataSet={execel6} name="Mortalidad anual" >
                </ExcelSheet>
              </ExcelFile>
              </div>
              <div id="rep2Excel">
                <button id="botReportesPdf" onClick={downloadPdf}>
                  Pdf
                  </button >
                  </div>

              
              </div>
              <div id="rep2Fondo">
              <div id="repInicio">

              <div id="rep_costo_total_lote">
              <center>Total Venta</center>
              <center>{total_venta}</center>
              </div>

              <div id="rep_costo_total_lote">
              <center>Total gastos</center>
              <center>{total_gastos}</center>
              </div>

              <div id="rep_costo_total_lote">
              <center>Ganancia Neta</center>
              <center>{total_ganancia_neta}</center>
              </div>

              <div id="rep_costo_total_lote">
              <center>Pollos Sacrificados</center>
              <center>{total_pollos_sacrificados}</center>

              </div>
              </div>
              </div>

              <br></br>

              <div id="rep2Graficas">
              <div id="rep2GraficaGatosVentas">
              <center><h1><p>Gatos Vs Ventas</p></h1></center>   
              <Line data={data} options={options} id="line"/> 
              </div>

          <div id="rep2GraficaGatosVentas">
          <center><h1>Cantidad Alimento</h1></center>
          <Line data={data2} options={options} id="line2"/> 
          </div>
          </div>
          <br></br>

          <div id="rep2Graficas2">
          <div id="rep2GraficaGatosVentas">
          <center><h1>Cantidad Pollos</h1></center>
          <Bar data={data3} options={options} id="bar"></Bar> 
          </div>

          <div id="rep2Mortalidad">
          <center><h1>Mortalidad</h1></center>
          <Pie data={data4} options={options2} id="pie"></Pie> 
          </div>
          </div>

        </div>
    )
  }else{
    navigate("/");
  }

}
export default Reportes2