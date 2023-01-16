import { useState,useEffect } from "react";
import DataTable ,{createTheme}from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate} from 'react-router-dom';
import { Button } from 'react-bootstrap';

export  default function TablaRegSacrificioPollo(props) {

    const navigate = useNavigate();
    const [reg_sacrificio_pollo, setReg_sacrificio_pollo] = useState([]);
    const [id_reg_sacrificio_pollo, setId_reg_sacrificio_pollo] = useState('');

    const columns = [
      {
        name: 'Fecha sacrificio',
        selector: row => row.Fecha_sacrificio.substr(0,10)
      },
      {
        name: 'Cantidad pollos',
        selector: row => row.Cantidad_pollos
      },
      {
        name:'Editar',
        cell: row => <Button  variant="success"  type="submit" onClick={()=>abrirEditarRegSacrificioPollo(row)}>Editar</Button>,
      },
      {
        name:'Eliminar',
        cell: row => <Button  variant="danger" type="submit" onClick={()=>eliminarRegSacrificioPolloId(row['Id_reg_sacrificio_pollo'])}>Eliminar</Button>
      }
    ]

      const Crear = () => {
        navigate(`/CrearRegSacrificioPollo/${props.Id_lote_produccion}`);
      }

      useEffect(()=>{
        var ref=props.Id_lote_produccion
        fetch('http://localhost:4000/reg_sacrificio_pollo/ref/'+ref)
        .then(response => {
          return response.json();
        })
        .then(response => {
          setReg_sacrificio_pollo(response);
        })
      },[]); 

      const abrirEditarRegSacrificioPollo=(row)=>{
        var id = row['Id_reg_sacrificio_pollo']
        setId_reg_sacrificio_pollo(row['Id_reg_sacrificio_pollo'])
        navigate(`/EditarRegSacrificioPollo/${id}`);
      }

      const eliminarRegSacrificioPolloId = (id)=>{
        var url = 'http://localhost:4000/reg_sacrificio_pollo/'+id;
        fetch(url , { method: 'DELETE' }) 
        .then(() => console.log("elimino tru"));
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

      return(

      <form>

                  <Button variant="success"  type="submit" onClick={Crear}>Crear</Button>

                  <br />
                  <br />

                  <div id="dataInicio">
                  <DataTable
                  customStyles={customStyles}
                  responsiveLayout="scroll"
                  theme="solarized"
                    columns={columns}
                    data={reg_sacrificio_pollo}
                    pagination>
                  </DataTable>
                </div>

                </form>

        )

}