import { useState,useEffect } from "react";
import DataTable ,{createTheme}from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";

export  default function Rep_Lote_Venta_Registro(props) {

    const [lote_venta_registro, setLote_venta_registro] = useState([]);

    const columns = [
			{
        name:'Cliente',
        selector: row => row.Nombre
      },
      {
        name:'Fecha venta',
        selector: row => row.Fecha_venta.substr(0,10)
      },
      {
        name:'Valor unidad peso',
        selector: row => row.Valor_unidad_peso
      },
      {
        name:'Cantidad',
        selector: row => row.Cantidad
      },
      {
        name:'Cantidad pollos',
        selector: row => row.Cantidad_pollos
      },
			{
        name:'Total venta',
        selector: row => row.Total_venta
      },
    ]

      useEffect(()=>{ 
        var id=props.Id_lote
        fetch('http://localhost:4000/lote_venta_registro/'+id)
        .then(response => {
          return response.json();
        })
        .then(response => {
          setLote_venta_registro(response);
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
                  data={lote_venta_registro}
                  pagination>
                  </DataTable>

                  </div>

                  </form>

        )
}