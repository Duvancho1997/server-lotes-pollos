import { useState,useEffect } from "react";
import DataTable ,{createTheme}from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate} from 'react-router-dom';
import { Button } from 'react-bootstrap';

export  default function TablaRegProduccionMortalidad(props) {

    const navigate = useNavigate();
    const [registro_produccion_mortalidad, setRegistro_produccion_mortalidad] = useState([]);
    const [id_registro_mortalidad, setId_reg_produccion_mortalidad] = useState('');

    const columns = [
      {
        name: 'Fecha registro mortalidad',
        selector: row => row.Fecha_reg_mortalidad.substr(0,10)
      },
      {
        name: 'Cantidad pollos muertos',
        selector: row => row.Cantidad_pollos_muertos
      },
      {
        name:'Editar',
        cell: row => <Button variant="success" type="submit" onClick={()=>abrirEditarRegProduccionMortalidad(row)}>Editar</Button>,
      },
      {
        name:'Eliminar',
        cell: row => <Button variant="danger" type="submit" onClick={()=>eliminarRegProduccionMortalidadId(row['Id_reg_produccion_mortalidad'])}>Eliminar</Button>
      }
    ]

      const Crear = () => {
        navigate(`/CrearRegProduccionMortalidad/${props.Id_lote_produccion}`);
      }

      useEffect(()=>{
        var ref=props.Id_lote_produccion
        fetch('http://localhost:4000/reg_produccion_mortalidad/ref/'+ref)
        .then(response => {
            return response.json();
        })
        .then(response => {
          setRegistro_produccion_mortalidad(response);
        })
      },[]); 

      const abrirEditarRegProduccionMortalidad=(row)=>{
        var id = row['Id_reg_produccion_mortalidad']
        setId_reg_produccion_mortalidad(row['Id_reg_produccion_mortalidad'])
        navigate(`/EditarRegProduccionMortalidad/${id}`);
      }

      const eliminarRegProduccionMortalidadId = (id)=>{
        var url = 'http://localhost:4000/reg_produccion_mortalidad/'+id;
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
                    data={registro_produccion_mortalidad}
                    pagination>
                  </DataTable>

                  </div>

                  </form>

        )
}