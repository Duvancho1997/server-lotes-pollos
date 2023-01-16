import { useState,useEffect } from "react";
import DataTable ,{createTheme}from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate} from 'react-router-dom';
import { Button } from 'react-bootstrap';

export  default function TablaGastosProduccion(props) {

    const navigate = useNavigate();
    const [gastos_produccion, setGastos_produccion] = useState([]);
    const [id_gastos_produccion, setId_gastos_produccion] = useState('');
    const [total, setTotal] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [precio, setPrecio] = useState('');

    const columns = [
      {
        name:'Fecha gasto',
        selector: row => row.Fecha_gasto.substr(0,10)
      },
      {
        name:'Gasto creado',
        selector: row => row.Gasto_creado
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
        name:'Descripcion gasto',
        selector: row => row.Descripcion_gasto
      },
      {
        name:'Total',
        selector: row => (row.Cantidad*row.Precio).toFixed(2)
      },
      {
        name:'Editar',
        cell: row => <Button variant="success" type="submit" onClick={()=>abrirEditarGastosProduccion(row)}>Editar</Button>,
      },
      {
        name:'Eliminar',
        cell: row => <Button variant="danger" type="submit" onClick={()=>eliminarGastosProduccionId(row['Id_gastos_produccion'])}>Eliminar</Button>
      }
    ]

      const Crear = () => {
        navigate(`/CrearGastosProduccion/${props.Id_lote_produccion}`);
      }

      useEffect(()=>{
        var ref=props.Id_lote_produccion
        fetch('http://localhost:4000/gastos_produccion/ref/'+ref)
        .then(response => {
          return response.json();
        })
        .then(response => {
          setGastos_produccion(response);
          console.log("response",response[0].Precio)
          setCantidad(response[0].Cantidad)
          setPrecio(response[0].Precio)
        })
      },[cantidad,precio]); 

      const abrirEditarGastosProduccion=(row)=>{
        var id = row['Id_gastos_produccion']
        setId_gastos_produccion(row['Id_gastos_produccion'])
        navigate(`/EditarGastosProduccion/${id}`);
      }

      const eliminarGastosProduccionId = (id)=>{
        var url = 'http://localhost:4000/gastos_produccion/'+id;
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

                  <Button  variant="success"  type="submit" onClick={Crear}>Crear</Button>{" "}

                  <br />
                  <br />

                  <div id="dataInicio">

                  <DataTable
                  customStyles={customStyles}
                  responsiveLayout="scroll"
                  theme="solarized"
                  columns={columns}
                  data={gastos_produccion}
                  pagination>
                  </DataTable>

                  </div>

                  </form>

        )
}