import { useState,useEffect } from "react";
import DataTable ,{createTheme}from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate} from 'react-router-dom';

import { Button } from 'react-bootstrap';

export  default function TablaRegProduccionAlimento(props) {

  const navigate = useNavigate();
  const [reg_produccion_alimento, setReg_produccion_alimento] = useState([]);
  const [id_produccion_alimento, setId_produccion_alimento] = useState('');

  const columns = [
    {
      name: 'Fecha compra',
      selector: row => row.Fecha_compra.substr(0,10)
    },
    {
      name: 'Cantidad de alimento',
      selector: row => row.Cantidad_alimento
    },
    {
      name: 'Valor alimento',
      selector: row => row.Valor_alimento
    },
    {
      name: 'Descripcion de alimento',
      selector: row => row.Descripcion_alimento
    },
    {
      name: 'Precio de compra',
      selector: row => row.Precio_compra
    },
    {
      name:'Editar',
      cell: row => <Button variant="success"  type="submit" onClick={()=>abrirEditarRegProduccionAlimento(row)}>Editar</Button>,
    },
    {
      name:'Eliminar',
      cell: row => <Button variant="danger" type="submit" onClick={()=>eliminarRegProduccionAlimentoId(row['Id_produccion_alimento'])}>Eliminar</Button>
    }
  ]

  const Crear = () => {
    navigate(`/CrearRegProduccionAlimento/${props.Id_lote_produccion}`);
  }

  useEffect(()=>{
    var ref=props.Id_lote_produccion
    fetch('http://localhost:4000/reg_produccion_alimento/ref/'+ref)
    .then(response => {
        return response.json();
    })
    .then(response => {
      setReg_produccion_alimento(response);  
    })
  },[]); 

  const abrirEditarRegProduccionAlimento=(row)=>{
    var id = row['Id_produccion_alimento']
    setId_produccion_alimento(row['Id_produccion_alimento'])
    navigate(`/EditarRegProduccionAlimento/${id}`);
  }

  const eliminarRegProduccionAlimentoId = (id)=>{
    var url = 'http://localhost:4000/reg_produccion_alimento/'+id;
    fetch(url , { method: 'DELETE' }) .then(() => console.log("elimino tru"));
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
              <Button  variant="success"  type="submit" onClick={Crear}>Crear</Button>

              <br />
              <br />

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