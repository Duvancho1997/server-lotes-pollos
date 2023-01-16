import { useState,useEffect } from "react";
import DataTable ,{createTheme}from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";

export  default function RepRegProduccionAlimento(props) {

    const [reg_produccion_alimento, setReg_produccion_alimento] = useState([]);

    const columns = [
      {
        name:'Fecha compra',
        selector: row => row.Fecha_compra.substr(0,10)
      },
      {
        name:'Cantidad alimento',
        selector: row => row.Cantidad_alimento
      },
      {
        name:'Valor Alimento',
        selector: row => row.Valor_Alimento
      },
      {
        name:'Descripcion alimento',
        selector: row => row.Descripcion_alimento
      },
      {
        name:'Precio compra',
        selector: row => row.Precio_compra
      },
    ]

      useEffect(()=>{ 
        var id=props.Id_lote
        fetch('http://localhost:4000/reg_produccion_alimentos/'+id)
        .then(response => {
          return response.json();
        })
        .then(response => {
          setReg_produccion_alimento(response);
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
                  data={reg_produccion_alimento}
                  pagination>
                  </DataTable>

                  </div>

                  </form>

        )
}