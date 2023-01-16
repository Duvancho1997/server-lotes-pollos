import { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable,{createTheme} from "react-data-table-component";
import TablaNavegacion from "../components/TablaNavegacion";
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

  function TablaLotes() {

    const [lotes , setLotes] = useState([]);
    const [id_usuario, setId_usuario] = useState('');
    const navigate = useNavigate();
    var varSesion = sessionStorage.getItem("inicioSeccion");

    const columns = [
      {
        name: 'Lote N°',
        selector: row => row.Id_lote
      },
      {
        name: 'Fecha Creación Lote',
        selector: row => row.Fecha_creacion_lote_sistema.substr(0,10)
      },
      {
        name: 'Fecha Terminación Lote',
        selector: row => row.Fecha_terminacion_lote_sistema.substr(0,10)
      },
      {
        name: 'Estado Lote',
        selector: row => row.Estado_lote
      },
      {
        name: 'Nombre Usuario',
        selector: row => row.Nombre_usuario
      },
      {
        name:'Eliminar',
        cell: row => <Button className="btn btn-danger" type="submit" onClick={()=>eliminarLotesId(row['Id_lote'])}>Eliminar</Button>,
      }
    ]

      useEffect(()=>{
        fetch('http://localhost:4000/lotes')
        .then(response => {
            return response.json();
        })
        .then(response => {
          setLotes(response);
        })
      },[]); 

      const eliminarLotesId = (id)=>{
        var url = 'http://localhost:4000/lotes/'+id;
        fetch(url , { method: 'DELETE' }) 
      }

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

      if(varSesion=="true"){ 

      return(
        <form>
        <div id="contInicio">

          {<TablaNavegacion id_usuario={id_usuario}></TablaNavegacion>}
          <div id="titInicio">
          <h1><p>TABLA LOTE</p></h1>
          </div>
          <br />
          <div id="subTitInicio">
                <h1><center><label>
                      Tabla de Lotes 
                </label></center></h1>
                </div>

                <br />
                <div id="tablInicio">
                <div id="dataInicio">
                <DataTable
                responsiveLayout="scroll"
                customStyles={customStyles}
                theme="solarized"
                columns={columns}
                data={lotes}
                pagination>
              </DataTable>
                </div>  
                </div>
          
        </div>
        </form>
        )
      }else{
        navigate("/");
      }

}
export  default TablaLotes;