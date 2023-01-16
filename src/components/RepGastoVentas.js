import { useState,useEffect } from "react";
import DataTable ,{createTheme}from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";

export  default function RegGastosVentas(props) {

    const [gastos_ventas, setGastos_ventas] = useState([]);


    const columns = [
      {
        name:'Fecha gasto',
        selector: row => row.Fecha_gasto.substr(0,10)
      },
      {
        name:'Precio',
        selector: row => row.Precio
      },
      {
        name:'Cantidad',
        selector: row => row.Cantidad
      },
      {
        name:'Total',
        selector: row => (row.Cantidad*row.Precio).toFixed(2)
      },
      {
        name:'Descripcion gasto',
        selector: row => row.Descripcion_gasto
      },
    ]

      useEffect(()=>{ 
        var id=props.Id_lote
        fetch('http://localhost:4000/gasto_ventas/'+id)
        .then(response => {
          return response.json();
        })
        .then(response => {
          setGastos_ventas(response);
        })
      },[]); 

      const customStyles = {
        rows: {
          style: {
            minHeight: '0px', 
          }
        },
        headCells: {
          style: {
            background: 'rgb(45, 121, 244)',
            paddingLeft: '8px', 
            paddingRight: '0px',
          },
        },
        cells: {
          style: {
            paddingLeft: '8px', 
            paddingRight: '8px',
          },
        },
      };

      createTheme('solarized', {
        text: {
          primary: '#FBFCFC',
          secondary: '#FBFCFC',
        },
        background: {
          default: '#305bdc  ',
        },
        context: {
          background: '#17202A',
          text: '#17202A',
        },
        divider: {
          default: '#17202A ',
        },
        action: {
          button: 'rgba(0,0,0,.54)',
          hover: 'rgba(0,0,0,.08)',
          disabled: 'rgba(0,0,0,.12)',
        },
      });
      
      return(

        <form>

                  <div id="dataInicio">

                  <DataTable
                  customStyles={customStyles}
                  responsiveLayout="scroll"
                  theme="solarized"
                  columns={columns}
                  data={gastos_ventas}
                  pagination>
                  </DataTable>

                  </div>

                  </form>

        )
}