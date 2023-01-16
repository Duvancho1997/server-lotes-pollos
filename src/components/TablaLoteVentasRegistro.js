import { useState,useEffect } from "react";
import DataTable ,{createTheme}from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export  default function TablaLoteVentasRegistro(props) {

    const navigate = useNavigate();
    const [lote_ventas_registro , setLote_ventas_registro] = useState([]);
    const [id_lote_ventas_registro, setId_lote_ventas_registro] = useState('');

    const columns = [
      {
        name: 'Fecha venta',
        selector: row => row.Fecha_venta.substr(0,10)
      },
      {
        name: 'Identificacion ',
        selector: row => row.Identificacion_cliente
      },
      {
        name: 'Nombre ',
        selector: row => row.Nombre
      },
      {
        name: 'Valor unidad peso',
        selector: row => row.Valor_unidad_peso
      },
      {
        name: 'Cantidad',
        selector: row => row.Cantidad
      },
      {
        name: 'Cantidad pollos',
        selector: row => row.Cantidad_pollos
      },
      {
        name: 'Total venta',
        selector: row => row.Total_venta
      },
      {
        name:'Editar',
        cell: row => <Button variant="success" type="submit" onClick={()=>abrirEditarLoteVentasRegistro(row)}>Editar</Button>,
      },
      {
        name:'Eliminar',
        cell: row => <Button variant="danger" type="submit" onClick={()=>eliminarLoteVentasRegistroId (row['Id_lote_ventas_registro'])}>Eliminar</Button>
      }
    ]

    const Crear = () => {
      navigate(`/CrearLoteVentasRegistro/${props.Id_lote_venta_total}`);
    }

    useEffect(()=>{
      var ref=props.Id_lote_venta_total
        fetch('http://localhost:4000/lote_ventas_registro/tabla/'+ref)
      .then(response => {
          return response.json();
      })
      .then(response => {
        setLote_ventas_registro(response); 
      })
    },[]); 

    const abrirEditarLoteVentasRegistro=(row)=>{
      var id = row['Id_lote_ventas_registro']
      setId_lote_ventas_registro(row['Id_lote_ventas_registro'])
      navigate(`/EditarLoteVentasRegistro/${id}`);
    }

    const eliminarLoteVentasRegistroId = (id)=>{
      var url = 'http://localhost:4000/lote_ventas_registro/'+id;
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

                <Button variant="success"  type="submit" onClick={Crear}>Crear </Button>

                <br />
                <br />

                <div id="dataInicio">
                <DataTable
                  customStyles={customStyles}
                  responsiveLayout="scroll"
                  theme="solarized"
                  columns={columns}
                  data={lote_ventas_registro}
                  pagination>
                </DataTable>
                </div>
                </form>

      )
}