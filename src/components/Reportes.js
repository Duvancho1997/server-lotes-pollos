import TablaNavegacion from "../components/TablaNavegacion";
import RepLoteVentaRegistro from "../components/RepLoteVentaRegistro";
import RepGastoProduccion from "../components/RepGastoProduccion";
import RepGastoVentas from "../components/RepGastoVentas";
import { React,useEffect,useState } from "react";
import { useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/reporte.css";
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
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
  function Reportes() { 

  const { id_lote } = useParams(); 
  const [scores3, setScores3]= useState();
  const labels = ['Mortalidad',"total"];
  const [consumo_Pollo, setConsumo_Pollo ] = useState();
  const [costo_total_lote, setCosto_total_lote ] = useState();
  const [total_venta_lote, setTotal_venta_lote ] = useState();
  const [ganancia_bruta, setGanancia_bruta ] = useState();
  const [utilidad_neta, setUtilidad_neta ] = useState();
  const [gasto_total, setGasto_total ] = useState();
  const [fecha_entrada_pollos, setFecha_entrada_pollos ] = useState();
  const [fecha_sacrificio_final, setFecha_sacrificio_final ] = useState();
  const [cantidad_inicial_pollos, setCantidad_inicial_pollos ] = useState();
  const [costo_pollo_unidad, setCosto_pollo_unidad ] = useState();
  const [total_pollos_muertos, setTotal_pollos_muertos ] = useState();
  const [total_pollos_sacrificados, setTotal_pollos_sacrificados ] = useState();
  const [cantidad_total_alimento, setCantidad_total_alimento ] = useState();
  const [valor_total_alimento, setValor_total_alimento ] = useState();
  const [peso_total_vendido, setPeso_total_vendido ] = useState();
  const [conversion, setConversion ] = useState();
  const [color, setColor ] = useState();
  const [total, setTotal ] = useState();
  const [mortalidad, setMortalidad ] = useState();
  const [gastos_ventas, setGastos_ventas] = useState();
  const [arrayExcel, setArrayExcel] = useState([]);
  const [arrayExcel2, setArrayExcel2] = useState([]);
  const [arrayExcel3, setArrayExcel3] = useState([]);

  const navigate = useNavigate();
  var varSesion = sessionStorage.getItem("inicioSeccion");
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  const  Produccion = () => {
    fetch('http://localhost:4000/lote_produccion/ref/'+id_lote)
    .then(response => {
        return response.json();
    })
    .then(response => {
      setConsumo_Pollo(response[0]['Consumo_pollo']);
      setCosto_total_lote(response[0]['Costo_total_lote']);
      setFecha_entrada_pollos(response[0]['Fecha_entrada_pollos'].substr(0,10))
      setFecha_sacrificio_final(response[0]['Fecha_sacrificio_final'].substr(0,10))
      setCantidad_inicial_pollos(response[0]['Cantidad_inicial_pollos'])
      setCosto_pollo_unidad(response[0]['Costo_pollo_unidad'])
      setTotal_pollos_muertos(response[0]['Total_pollos_muertos'])
      setTotal_pollos_sacrificados(response[0]['Total_pollos_sacrificados'])
      setCantidad_total_alimento(response[0]['Cantidad_total_alimento'])
      setValor_total_alimento(response[0]['Valor_total_alimento'])
    });
    }

    const  Ventas = () => {
      fetch('http://localhost:4000/lote_venta/ref/'+id_lote)
      .then((response) =>response.json())
      .then(response => {
        setTotal_venta_lote(response[0]['Total_venta_lote'])
        setPeso_total_vendido(response[0]['Peso_total_vendido'])
        setGanancia_bruta(response[0]['Ganancia_bruta'])
        setGastos_ventas(response[0]['gastos_ventas'])
      });
      }

      const UtilidadNeta=()=>{
        setUtilidad_neta(total_venta_lote - costo_total_lote)
      }

      const  GastoTotal = () => {
        fetch('http://localhost:4000/gasto_total/'+id_lote)
        .then(response => {
            return response.json();
        })
        .then(response => {
          setGasto_total(response[0])
        });
        }

        const  Conversion = () => {
          fetch('http://localhost:4000/conversion/'+id_lote)
          .then(response => {
              return response.json();
          })
          .then(response => {
            if (response[0]['Conversion']<1.8){
              setColor("#FE2EF7")
            setConversion(response[0]['Conversion'])
            }else if(response[0]['Conversion']>=1.8 && response[0]['Conversion']<=2 ) {
              setColor("#81F7BE")
              setConversion(response[0]['Conversion'])
            }else if(response[0]['Conversion']>=2.1 && response[0]['Conversion']<=2.4 ) {
              setColor("#F2F5A9")
              setConversion(response[0]['Conversion'])
            } else if(response[0]['Conversion']>=2.5 ) {
              setColor("#FE2E2E")
              setConversion(response[0]['Conversion'])
            }
          });
          }

      useEffect(() => {
        Ventas();
        peticioApiTorta();
        Produccion();
        UtilidadNeta();
        GastoTotal();
        Conversion();
      }, [total_venta_lote,costo_total_lote]);

      const options = {
        fill: true,
        animations: false,
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
      };

      const peticioApiTorta=()=>{
        fetch('http://localhost:4000/grafica_mortalidad_total/'+id_lote)
        .then((response) =>response.json())
        .then((response) => {
          setMortalidad(response[0][0]);
          setTotal(response[0][1]);
          setScores3(response[0]);
        });
      }

      useEffect(()=>{ 
        fetch('http://localhost:4000/gasto_produccion/'+id_lote)
        .then(response => {
          return response.json();
        })
        .then(response => {
          var arrayGrande =[];
          for (var i = 0; i <response.length; i++) {
            var arrayPequeno=[response[i]['Fecha_gasto'].substr(0,10),response[i]["Precio"],response[i]["Cantidad"],(response[i]["Cantidad"])*(response[i]["Precio"]),response[i]["Descripcion_gasto"]];
            arrayGrande.push(arrayPequeno);
        }
        setArrayExcel(arrayGrande);
        })
      },[]); 

      useEffect(()=>{ 
        fetch('http://localhost:4000/gasto_ventas/'+id_lote)
        .then(response => {
          return response.json();
        })
        .then(response => {
          var arrayGrande =[];
          for (var i = 0; i <response.length; i++) {
            var arrayPequeno=[response[i]['Fecha_gasto'].substr(0,10),response[i]["Precio"],response[i]["Cantidad"],(response[i]["Cantidad"])*(response[i]["Precio"]),response[i]["Descripcion_gasto"]];
            arrayGrande.push(arrayPequeno);
        }
        setArrayExcel2(arrayGrande);
        })
      },[]); 

      useEffect(()=>{ 
        fetch('http://localhost:4000/lote_venta_registro/'+id_lote)
        .then(response => {
          return response.json();
        })
        .then(response => {
          var arrayGrande =[];
          for (var i = 0; i <response.length; i++) {
            var arrayPequeno=[response[i]["Fecha_venta"].substr(0,10),response[i]['Nombre'],response[i]["Valor_unidad_peso"],response[i]["Cantidad"],response[i]["Cantidad_pollos"],response[i]["Total_venta"]];
            arrayGrande.push(arrayPequeno);
        }
        setArrayExcel3(arrayGrande);
        })
      },[]); 

      const data = {
          datasets: [
            {
              label: "Mis datos",
              data: scores3,
              tension: 0.3,
              borderColor: "black",
              backgroundColor: ['red','blue'],
            },
          ],
          labels,
        };

        const execel = [
          {
            conversion,
            costo_total_lote,
            total_venta_lote,
            ganancia_bruta,
            gasto_total,
            utilidad_neta,
            mortalidad,
            total
          }
        ]

        const execel2 = [
          {
            fecha_entrada_pollos,
            fecha_sacrificio_final,
            cantidad_inicial_pollos,
            costo_pollo_unidad,
            total_pollos_muertos,
            total_pollos_sacrificados,
            cantidad_total_alimento,
            valor_total_alimento,
            consumo_Pollo,
            peso_total_vendido,
          }
        ]

        const execel3 = [
          {
            columns: [
              { value: "Fecha", widthPx: 100 }, 
              { value: "Precio", widthPx: 100 },
              { value: "Cantidad", widthPx: 100 }, 
              { value: "Total", widthPx: 100 },
              { value: "Descripcion", widthPx: 100 }, 
            ],
            data: 
            arrayExcel,
          },
        ];

        const execel4 = [
          {
            columns: [
              { value: "Fecha", widthPx: 100 }, 
              { value: "Precio", widthPx: 100 },
              { value: "Cantidad", widthPx: 100 }, 
              { value: "Total", widthPx: 100 },
              { value: "Descripcion", widthPx: 100 }, 
            ],
            data: 
            arrayExcel2,
          },
        ];

        const execel5 = [
          {
            columns: [
              { value: "Fecha", widthPx: 100 },
              { value: "Cliente", widthPx: 100 }, 
              { value: "Valor unidad peso", widthPx: 100 }, 
              { value: "Cantidad", widthPx: 100 },
              { value: "Cantidad pollos", widthPx: 100 }, 
              { value: "Total venta", widthPx: 100 }, 
            ],
            data: 
            arrayExcel3,
          },
        ];

        const downloadPdf=()=>{
          let pie = document.getElementById("pie");
          const exp = new Exporter([pie]);
          const doc = new jsPDF();
          doc.autoTable({
            head:[["conversion","Costo Total","Total Venta","Ganancia Bruta","Gasto Total","Utilidad Neta","Mortalidad","Cantidad Inicial Pollos"]],
            body:[[ 
              conversion,
              costo_total_lote,
              total_venta_lote,
              ganancia_bruta,
              gasto_total,
              utilidad_neta,
              mortalidad,
              total
            ]],
          })
          doc.autoTable({
            head:[[ 
              "Fecha Entrada de Pollos",
              "Fecha de Sacrificio",
              "Cantidad Inicial Pollos",
              "Costo Pollos Unidad",
              "Total de Pollos Muertos",
              "Total de Pollos Sacrificados",
              "Cantidad Total de Alimento",
              "Valor Total Alimento",
              "Consumo de Pollo",
              "Peso Total Vendido",
            ]],
            body:[[
              fecha_entrada_pollos,
              fecha_sacrificio_final,
              cantidad_inicial_pollos,
              costo_pollo_unidad,
              total_pollos_muertos,
              total_pollos_sacrificados,
              cantidad_total_alimento,
              valor_total_alimento,
              consumo_Pollo,
              peso_total_vendido,
            ]],
          });
          doc.autoTable({
            head:[[ 
              "Fecha gasto produccion",
              "Precio gasto produccion",
              "Cantidad gasto produccion",
              "Descripcion gasto produccion",
              "Total gasto produccion",
            ]],
            body:
              arrayExcel,
          });
          doc.autoTable({
            head:[[ 
              "Fecha gasto ventas",
              "Precio gasto ventas",
              "Cantidad gasto ventas",
              "Descripcion gasto ventas",
              "Total gasto ventas",
            ]],
            body:
              arrayExcel2,
          });
          doc.autoTable({
            head:[[ 
              "Fecha venta",
              "Cliente",
              "Valor unidad peso venta",
              "Cantidad venta",
              "Cantidad pollos venta",
              "Total venta venta",
            ]],
            body:
              arrayExcel3,
          });
          exp.export_pdf().then((pdf) => {
            pdf.save("Mortalidad.pdf");
            this.download_status = "Download Charts";
          });
          doc.save("Reporte.pdf");
        }

        if(varSesion=="true"){

    return (

        <div>

              <TablaNavegacion></TablaNavegacion>

              <div id="titReporte">
              <div id="rep_title">
              <h1><p>REPORTES LOTE</p></h1>
              </div>
              <div id="rep_id">
              <h1>LOTE {id_lote} </h1>
              </div>
              </div>

              <br></br>
              <div id="repFondoInicio">
              <div id="repFondo">
              <div id="repInicio">

              <div id="rep_consumo_Pollo" style={{backgroundColor: color}}>
              <center>Conversion</center> 
              <center> {conversion}</center>
              </div>

              <div id="rep_costo_total_lote">
              <center>Costo Total</center>
              <center>{costo_total_lote + gastos_ventas}</center>
              </div>

              <div id="rep_total_venta_lote">
              <center>Total Venta</center>
              <center>{total_venta_lote}</center>
              </div>

              <div id="rep_ganancia_bruta">
              <center>Ganancia Bruta</center>
              <center>{ganancia_bruta}</center>
              </div>

              <div id="re_gasto_total">
              <center>Gasto Total</center>
              <center>{gasto_total}</center>
              </div>

              <div id="rep_Utilidad_neta">
              <center>Utilidad Neta</center>
              <center>{utilidad_neta}</center>
              </div>
              </div>

              <br></br>

              <div id="rep_tabla_general"> 

              <div id="rep_tabla_divicion">
              <div id="rep_tabla_titulo_campo">
              CAMPO
              </div>
              <div id="rep_tabla_titulo_valor">
              VALOR
              </div>
              </div>

              <div id="rep_tabla_divicion">
              <div id="rep_tabla_campo">
              Fecha Entrada de Pollos
              </div>
              <div id="rep_tabla_valor">
              {fecha_entrada_pollos}
              </div>
              </div>

              <div id="rep_tabla_divicion">
              <div id="rep_tabla_campo">
              Fecha de Sacrificio
              </div>
              <div id="rep_tabla_valor">
              {fecha_sacrificio_final}
              </div>
              </div>

              <div id="rep_tabla_divicion">
              <div id="rep_tabla_campo">
              Cantidad Inicial de Pollos
              </div>
              <div id="rep_tabla_valor">
              {cantidad_inicial_pollos}
              </div>
              </div>

              <div id="rep_tabla_divicion">
              <div id="rep_tabla_campo">
              Costo de Pollo por Unidad
              </div>
              <div id="rep_tabla_valor">
              {costo_pollo_unidad}
              </div>
              </div>

              <div id="rep_tabla_divicion">
              <div id="rep_tabla_campo">
              Total de Pollos Muertos
              </div>
              <div id="rep_tabla_valor">
              {total_pollos_muertos}
              </div>
              </div>

              <div id="rep_tabla_divicion">
              <div id="rep_tabla_campo">
              Total de pollos Sacrificados
              </div>
              <div id="rep_tabla_valor">
              {total_pollos_sacrificados}
              </div>
              </div>

              <div id="rep_tabla_divicion">
              <div id="rep_tabla_campo">
              Cantidad Total de Alimento
              </div>
              <div id="rep_tabla_valor">
              {cantidad_total_alimento}
              </div>
              </div>

              <div id="rep_tabla_divicion">
              <div id="rep_tabla_campo">
              Valor Total del Alimento
              </div>
              <div id="rep_tabla_valor">
              {valor_total_alimento}
              </div>
              </div>

              <div id="rep_tabla_divicion">
              <div id="rep_tabla_campo">
              Consumo de Pollos
              </div>
              <div id="rep_tabla_valor">
              {consumo_Pollo}
              </div>
              </div>
              <div id="rep_tabla_divicion">
              <div id="rep_tabla_campo">
              Peso Total Vendido
              </div>
              <div id="rep_tabla_valor">
              {peso_total_vendido}
              </div>
              </div>
              
              </div>

              <br></br>
              <div>
                <RepGastoProduccion Id_lote={id_lote}></RepGastoProduccion>
              </div>
              <br></br>
              <div>
                <RepGastoVentas Id_lote={id_lote}></RepGastoVentas>
              </div>
              <br></br>
                <RepLoteVentaRegistro Id_lote={id_lote}></RepLoteVentaRegistro>

                </div>
              <div id="repFondo2">
              <br></br>
                <br></br>
                <br></br>
                <br></br>
              <center><h1><p>Descargar</p></h1></center>
              <div id="repDecargas">
                <div id="repExcel">

              <ExcelFile element={ <button id="botReportesExcel">Excel</button> } filename="Reporte lote">
                <ExcelSheet data={execel} name="Kpi" >
                    <ExcelColumn label="Conversion" value="conversion" />
                    <ExcelColumn label="Costo Total" value="costo_total_lote"/>
                    <ExcelColumn label="Total Venta" value="total_venta_lote"/>
                    <ExcelColumn label="Ganancia Bruta" value="ganancia_bruta" />
                    <ExcelColumn label="Gasto Total" value="gasto_total"/>
                    <ExcelColumn label="Utilidad Neta" value="utilidad_neta"/>
                    <ExcelColumn label="Mortalidad" value="mortalidad"/>
                    <ExcelColumn label="Cantidad Inicial Pollos" value="total"/>
                </ExcelSheet>
                <ExcelSheet data={execel2} name="lote venta y produccion" >
                      <ExcelColumn label="Fecha Entrada de Pollos" value="fecha_entrada_pollos"/>
                      <ExcelColumn label="Fecha de Sacrificio" value="fecha_sacrificio_final"/>
                      <ExcelColumn label="Cantidad Inicial Pollos" value="cantidad_inicial_pollos"/>
                      <ExcelColumn label="Costo Pollos Unidad" value="costo_pollo_unidad"/>
                      <ExcelColumn label="Total de Pollos Muertos" value="total_pollos_muertos"/>
                      <ExcelColumn label="Total de Pollos Sacrificados" value="total_pollos_sacrificados"/>
                      <ExcelColumn label="Cantidad Total de Alimento" value="cantidad_total_alimento"/>
                      <ExcelColumn label="Valor Total Alimento" value="valor_total_alimento"/>
                      <ExcelColumn label="Consumo de Pollo" value="consumo_Pollo"/>
                      <ExcelColumn label="Peso Total Vendido" value="peso_total_vendido" />
                </ExcelSheet>
                <ExcelSheet dataSet={execel3} name="Gasto Produccion" >
                </ExcelSheet>
                <ExcelSheet dataSet={execel4} name="Gasto Ventas" >
                </ExcelSheet>
                <ExcelSheet dataSet={execel5} name="Lote ventas" >
                </ExcelSheet>
              </ExcelFile>

                </div>
                <div id="repPdf">
                <button id="botReportesPdf" onClick={downloadPdf}>
                  Pdf
                  </button >
                  </div>
                  </div>

            <div id="repGraficas">
            <br></br>
              <center><h1><p>Mortalidad</p></h1></center>
              <Pie data={data} options={options} id="pie" />

              </div> 
              </div>
              </div>
            </div>

    )

  }else{
    navigate("/");
  }


}
export default Reportes




